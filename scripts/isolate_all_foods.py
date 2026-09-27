import os
import cv2
import numpy as np

def grabcut_isolate_food(img_path, output_path, margin=20, bg_bright_thresh=235):
    img = cv2.imread(img_path)
    if img is None:
        print(f"Error loading {img_path}")
        return False
    
    h, w = img.shape[:2]
    mask = np.zeros(img.shape[:2], np.uint8)
    bgdModel = np.zeros((1, 65), np.float64)
    fgdModel = np.zeros((1, 65), np.float64)
    
    rect = (margin, margin, w - margin * 2, h - margin * 2)
    cv2.grabCut(img, mask, rect, bgdModel, fgdModel, 6, cv2.GC_INIT_WITH_RECT)
    
    # Foreground mask: 1 or 3
    fg_mask = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
    
    # Outer margin is strictly 0
    fg_mask[:margin, :] = 0
    fg_mask[-margin:, :] = 0
    fg_mask[:, :margin] = 0
    fg_mask[:, -margin:] = 0
    
    # Filter out pure white studio background if mistakenly marked as fg
    b, g, r = cv2.split(img)
    is_pure_white_bg = (
        (r > bg_bright_thresh) & (g > bg_bright_thresh) & (b > bg_bright_thresh) &
        (np.abs(r.astype(int) - g.astype(int)) < 12) &
        (np.abs(g.astype(int) - b.astype(int)) < 12)
    )
    fg_mask[is_pure_white_bg] = 0
    
    # Clean up small noise and close small internal holes
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, kernel)
    
    # Smooth edge with slight feathering
    alpha = cv2.GaussianBlur(fg_mask.astype(np.float32), (5, 5), 0)
    alpha = np.clip(alpha, 0, 255).astype(np.uint8)
    
    rgba = cv2.merge([b, g, r, alpha])
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    cv2.imwrite(output_path, rgba)
    
    solid_pct = np.mean(alpha > 128) * 100
    mean_a = np.mean(alpha)
    print(f"Isolated: {output_path} | {w}x{h} | solid={solid_pct:.1f}% | mean_alpha={mean_a:.1f}")
    return True

artifact_dir = r"C:\Users\ASUS\.gemini\antigravity\brain\dbe53566-b274-4ea7-a611-d4eb8a4bd5ff"

foods = [
    # Tây Ninh
    ("banh_trang_tayninh_1790405605071.jpg", "public/images/foods/tay-ninh/banh-trang.png"),
    ("muoi_tom_tayninh_1790405630262.jpg", "public/images/foods/tay-ninh/muoi-tom.png"),
    ("bo_kho_tayninh_1790405810271.jpg", "public/images/foods/tay-ninh/bo-kho.png"),
    ("sate_tayninh_1790405657278.jpg", "public/images/foods/tay-ninh/sa-te.png"),
    
    # Đà Lạt
    ("hong_say_dalat_1790405432671.jpg", "public/images/foods/dalat/hong-say.png"),
    ("tra_atiso_dalat_1790405492085.jpg", "public/images/foods/dalat/tra-atiso.png"),
    ("mut_dau_dalat_1790405520794.jpg", "public/images/foods/dalat/mut-dau.png"),
    ("cafe_dalat_1790405540761.jpg", "public/images/foods/dalat/cafe.png"),
    ("cafe_dalat_1790405540761.jpg", "public/images/foods/dalat/hat-macca.png"),
    
    # Also da-lat alias folder
    ("hong_say_dalat_1790405432671.jpg", "public/images/foods/da-lat/hong-say.png"),
    ("tra_atiso_dalat_1790405492085.jpg", "public/images/foods/da-lat/tra-atiso.png"),
    ("mut_dau_dalat_1790405520794.jpg", "public/images/foods/da-lat/mut-dau.png"),
    ("cafe_dalat_1790405540761.jpg", "public/images/foods/da-lat/cafe.png"),
    
    # Tây Bắc
    ("thit_trau_taybac_1790405866486.jpg", "public/images/foods/tay-bac/thit-trau.png"),
]

for src_name, dst_path in foods:
    src_full = os.path.join(artifact_dir, src_name)
    if os.path.exists(src_full):
        grabcut_isolate_food(src_full, dst_path)
    else:
        print(f"Missing {src_full}")
