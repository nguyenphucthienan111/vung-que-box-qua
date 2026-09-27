import os
import cv2
import numpy as np

def create_themed_luxury_box(base_img_path, output_path, target_hsv_color):
    """
    Transforms the lacquer body color of the 8K studio gift box while preserving
    the natural kraft shredded paper bed, shadows, and metallic gold trim.
    """
    img = cv2.imread(base_img_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Error loading {base_img_path}")
        return
    
    b, g, r, a = cv2.split(img)
    bgr = cv2.merge([b, g, r])
    hsv = cv2.cvtColor(bgr, cv2.COLOR_BGR2HSV).astype(np.float32)
    
    # Identify the green / terracotta lacquer box surface:
    # It has distinct hue and saturation, while the kraft straw is yellowish-tan and gold trim is bright yellow
    h, s, v = cv2.split(hsv)
    
    # Target color in HSV
    target_bgr = np.uint8([[target_hsv_color]])
    target_hsv = cv2.cvtColor(target_bgr, cv2.COLOR_BGR2HSV)[0][0]
    
    # Mask for the box outer panels (green or terracotta hues)
    # Green is roughly hue 35-85, Terracotta is roughly hue 5-25
    # Kraft straw has low saturation or distinct light brown
    is_box_lacquer = (s > 45) & (v < 220) & ((h > 35) & (h < 95) | (h < 25))
    
    # Smooth mask
    mask = is_box_lacquer.astype(np.float32)
    mask = cv2.GaussianBlur(mask, (15, 15), 0)
    
    # Shift hue and adjust saturation to target
    new_h = (h * (1 - mask) + float(target_hsv[0]) * mask).astype(np.uint8)
    new_s = (s * (1 - mask) + float(target_hsv[1]) * mask).astype(np.uint8)
    new_v = np.clip(v * (1 - mask) + (v * (float(target_hsv[2]) / 255.0)) * mask, 0, 255).astype(np.uint8)
    
    new_hsv = cv2.merge([new_h, new_s, new_v])
    new_bgr = cv2.cvtColor(new_hsv, cv2.COLOR_HSV2BGR)
    
    nb, ng, nr = cv2.split(new_bgr)
    new_rgba = cv2.merge([nb, ng, nr, a])
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    cv2.imwrite(output_path, new_rgba)
    print(f"Successfully generated custom themed box: {output_path}")

base = "public/images/boxes/dalat/box-open.png"
base_closed = "public/images/boxes/dalat/box-closed.png"

# Generate dedicated real photographic boxes for all regions:
# Tây Bắc: Dark Charcoal Wood / Slate (BGR: 35, 38, 44)
create_themed_luxury_box(base, "public/images/boxes/tay-bac/box-open.png", [35, 38, 44])
create_themed_luxury_box(base_closed, "public/images/boxes/tay-bac/box-closed.png", [35, 38, 44])

# Miền Tây: Warm Amber / Bamboo Wood (BGR: 38, 72, 110)
create_themed_luxury_box(base, "public/images/boxes/mien-tay/box-open.png", [38, 72, 110])
create_themed_luxury_box(base_closed, "public/images/boxes/mien-tay/box-closed.png", [38, 72, 110])

# Cố Đô Huế: Imperial Purple (BGR: 72, 46, 75)
create_themed_luxury_box(base, "public/images/boxes/hue/box-open.png", [72, 46, 75])
create_themed_luxury_box(base_closed, "public/images/boxes/hue/box-closed.png", [72, 46, 75])

# Phú Quốc: Ocean Teal / Turquoise (BGR: 72, 59, 27)
create_themed_luxury_box(base, "public/images/boxes/phu-quoc/box-open.png", [72, 59, 27])
create_themed_luxury_box(base_closed, "public/images/boxes/phu-quoc/box-closed.png", [72, 59, 27])

print("All 6 regions now have photorealistic luxury boxes!")
