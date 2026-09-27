import cv2
import numpy as np
import os

def clean_box_image(in_path, out_path):
    img = cv2.imread(in_path, cv2.IMREAD_UNCHANGED)
    if img is None:
        print(f"Cannot read {in_path}")
        return
    
    b, g, r, a = cv2.split(img)
    
    # 1. Identify white/light grey studio floor remnants (high brightness, neutral grey/white, low saturation)
    # The floor is r>180, g>180, b>180, diffs < 18
    r_int = r.astype(np.int32)
    g_int = g.astype(np.int32)
    b_int = b.astype(np.int32)
    
    is_white_floor = (
        (a > 20) &
        (r > 175) & (g > 175) & (b > 175) &
        (np.abs(r_int - g_int) < 18) &
        (np.abs(g_int - b_int) < 18) &
        (np.abs(r_int - b_int) < 18)
    )
    
    # Also check bottom area where floor cast shadow residue might be:
    # Any pixel below y > 650 with high grey brightness
    h, w = img.shape[:2]
    is_bottom_floor = (
        (np.arange(h)[:, None] > 680) &
        (a > 10) &
        (r > 160) & (g > 160) & (b > 160) &
        (np.abs(r_int - g_int) < 22) &
        (np.abs(g_int - b_int) < 22)
    )
    
    is_floor = is_white_floor | is_bottom_floor
    
    # Protect lacquer and kraft straw:
    # Kraft straw has yellow/brown tint: r > b + 25
    is_straw = (r_int > b_int + 25) & (r > 100) & (b < 180)
    # Box body has lacquer color (green, brown, purple, blue)
    is_lacquer_or_trim = (np.abs(r_int - b_int) > 20) | (g_int > b_int + 15)
    
    # Remove from floor mask any straw or lacquer
    is_floor = is_floor & (~is_straw) & (~is_lacquer_or_trim)
    
    new_a = a.copy()
    new_a[is_floor] = 0
    
    # Remove isolated noise specks in alpha
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    new_a = cv2.morphologyEx(new_a, cv2.MORPH_OPEN, kernel)
    
    clean_rgba = cv2.merge([b, g, r, new_a])
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    cv2.imwrite(out_path, clean_rgba)
    removed_count = np.sum(is_floor)
    print(f"Cleaned {out_path}: removed {removed_count} white floor pixels!")

# Process all boxes
regions = ['dalat', 'da-lat', 'tay-ninh', 'tay-bac', 'mien-tay', 'hue', 'phu-quoc']
for reg in regions:
    for variant in ['box-open.png', 'box-closed.png']:
        path = f"public/images/boxes/{reg}/{variant}"
        if os.path.exists(path):
            clean_box_image(path, path)
