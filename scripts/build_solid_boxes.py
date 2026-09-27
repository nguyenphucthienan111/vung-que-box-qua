import os
import cv2
import numpy as np

def extract_solid_fg(img_path, feather_px=2):
    img = cv2.imread(img_path)
    if img is None:
        raise FileNotFoundError(f"Cannot load {img_path}")
    
    h, w = img.shape[:2]
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Identify pure white/light gray background (bright + very low saturation)
    # Background in studio shot has gray > 238 and saturation < 18
    is_bg = ((gray > 238) & (hsv[:, :, 1] < 18)).astype(np.uint8)
    
    # FloodFill strictly from the 4 outer image corners
    mask = np.zeros((h + 2, w + 2), np.uint8)
    for x, y in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)]:
        if is_bg[y, x]:
            cv2.floodFill(is_bg, mask, (x, y), 255)
            
    bg_connected = mask[1:-1, 1:-1]
    
    # Foreground is everything that is NOT connected background
    fg = np.where(bg_connected > 0, 0, 255).astype(np.uint8)
    
    # Fill any tiny speckles inside foreground
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, kernel)
    
    # Anti-alias outer boundary with slight Gaussian blur
    alpha = cv2.GaussianBlur(fg.astype(np.float32), (feather_px * 2 + 1, feather_px * 2 + 1), 0)
    alpha = np.clip(alpha, 0, 255).astype(np.uint8)
    
    b, g, r = cv2.split(img)
    rgba = cv2.merge([b, g, r, alpha])
    return rgba

def recolor_lacquer(rgba, target_rgb):
    """
    Recolors the lacquer surfaces of the gift box while strictly preserving
    the kraft paper straw bed (tan/yellowish), the gold metallic trim (bright gold),
    and the alpha channel (100% solid, no holes).
    """
    b, g, r, a = cv2.split(rgba)
    bgr = cv2.merge([b, g, r])
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV).astype(np.float32)
    h, s, v = cv2.split(hsv)
    
    # Detect the box lacquer body (dark forest green: hue 35-90, saturation > 35, moderate value)
    # The kraft straw has warm light tan (v > 150, low-mid saturation, warm yellow hue 18-32)
    # The gold trim has bright yellow/gold (v > 180, s > 120, hue 20-35)
    is_lacquer = (h > 35) & (h < 95) & (s > 30) & (v < 210) & (a > 200)
    
    mask = is_lacquer.astype(np.float32)
    mask = cv2.GaussianBlur(mask, (9, 9), 0)
    
    # Target color in BGR & HSV
    tgt_bgr = np.uint8([[[target_rgb[2], target_rgb[1], target_rgb[0]]]])
    tgt_hsv = cv2.cvtColor(tgt_bgr, cv2.COLOR_BGR2HSV)[0][0]
    
    # Shift hue and saturation on the lacquer mask
    new_h = (h * (1 - mask) + float(tgt_hsv[0]) * mask).astype(np.uint8)
    new_s = (s * (1 - mask) + float(tgt_hsv[1]) * mask).astype(np.uint8)
    # Modulate brightness to give rich lacquer reflection
    val_scale = float(tgt_hsv[2]) / 120.0
    new_v = np.clip(v * (1 - mask) + (v * val_scale) * mask, 0, 255).astype(np.uint8)
    
    new_hsv = cv2.merge([new_h, new_s, new_v])
    new_bgr = cv2.cvtColor(new_hsv, cv2.COLOR_HSV2BGR)
    
    nb, ng, nr = cv2.split(new_bgr)
    return cv2.merge([nb, ng, nr, a])

# 1. Base input paths
raw_dalat_open = r"C:\Users\ASUS\.gemini\antigravity\brain\dbe53566-b274-4ea7-a611-d4eb8a4bd5ff\box_dalat_open_1790405414026.jpg"
raw_dalat_closed = r"C:\Users\ASUS\.gemini\antigravity\brain\dbe53566-b274-4ea7-a611-d4eb8a4bd5ff\box_dalat_closed_1790405565227.jpg"
raw_tayninh_open = r"C:\Users\ASUS\.gemini\antigravity\brain\dbe53566-b274-4ea7-a611-d4eb8a4bd5ff\box_tayninh_open_1790405586490.jpg"
raw_tayninh_closed = r"C:\Users\ASUS\.gemini\antigravity\brain\dbe53566-b274-4ea7-a611-d4eb8a4bd5ff\box_tayninh_closed_1790405837312.jpg"

# Extract 100% solid base images
dalat_open = extract_solid_fg(raw_dalat_open)
dalat_closed = extract_solid_fg(raw_dalat_closed)
tayninh_open = extract_solid_fg(raw_tayninh_open)
tayninh_closed = extract_solid_fg(raw_tayninh_closed)

def save_box(rgba, open_path, closed_rgba, closed_path):
    os.makedirs(os.path.dirname(open_path), exist_ok=True)
    cv2.imwrite(open_path, rgba)
    cv2.imwrite(closed_path, closed_rgba)
    print(f"Saved: {open_path} & {closed_path}")

# 1. Đà Lạt (Original Forest Green)
save_box(dalat_open, "public/images/boxes/dalat/box-open.png", dalat_closed, "public/images/boxes/dalat/box-closed.png")
save_box(dalat_open, "public/images/boxes/da-lat/box-open.png", dalat_closed, "public/images/boxes/da-lat/box-closed.png")

# 2. Tây Ninh (Warm Terracotta Orange-Brown)
save_box(tayninh_open, "public/images/boxes/tay-ninh/box-open.png", tayninh_closed, "public/images/boxes/tay-ninh/box-closed.png")

# 3. Tây Bắc (Rich Mountain Charcoal Slate Wood) -> RGB: [44, 40, 36]
tb_open = recolor_lacquer(dalat_open, [48, 44, 38])
tb_closed = recolor_lacquer(dalat_closed, [48, 44, 38])
save_box(tb_open, "public/images/boxes/tay-bac/box-open.png", tb_closed, "public/images/boxes/tay-bac/box-closed.png")

# 4. Miền Tây (Warm Golden Amber / Bamboo Bronze) -> RGB: [175, 105, 45]
mt_open = recolor_lacquer(dalat_open, [170, 100, 40])
mt_closed = recolor_lacquer(dalat_closed, [170, 100, 40])
save_box(mt_open, "public/images/boxes/mien-tay/box-open.png", mt_closed, "public/images/boxes/mien-tay/box-closed.png")

# 5. Cố Đô Huế (Regal Royal Imperial Purple) -> RGB: [95, 38, 88]
hue_open = recolor_lacquer(dalat_open, [95, 38, 88])
hue_closed = recolor_lacquer(dalat_closed, [95, 38, 88])
save_box(hue_open, "public/images/boxes/hue/box-open.png", hue_closed, "public/images/boxes/hue/box-closed.png")

# 6. Phú Quốc (Deep Ocean Blue-Teal) -> RGB: [24, 75, 96]
pq_open = recolor_lacquer(dalat_open, [24, 75, 96])
pq_closed = recolor_lacquer(dalat_closed, [24, 75, 96])
save_box(pq_open, "public/images/boxes/phu-quoc/box-open.png", pq_closed, "public/images/boxes/phu-quoc/box-closed.png")

print("All 6 regional boxes generated with 100% solid walls and vibrant custom colors!")
