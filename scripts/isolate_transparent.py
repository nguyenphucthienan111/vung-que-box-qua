import sys
import os
import cv2
import numpy as np
from PIL import Image

def isolate_white_background(img_path, output_path, tol=240, feather_px=3):
    img = cv2.imread(img_path)
    if img is None:
        print(f"Error loading {img_path}")
        return False
    
    h, w = img.shape[:2]
    # Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    
    # The background is white / light gray in studio photography
    # Let's use floodfill from corners to find connected background
    mask = np.zeros((h + 2, w + 2), np.uint8)
    bg_mask = np.zeros((h, w), np.uint8)
    
    # Check corners
    corners = [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), 
               (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)]
    
    for cx, cy in corners:
        if gray[cy, cx] > 210: # bright corner
            # floodfill
            cv2.floodFill(gray.copy(), mask, (cx, cy), 0, 
                          loDiff=15, upDiff=15, 
                          flags=4 | (255 << 8) | cv2.FLOODFILL_MASK_ONLY)
    
    bg_flood = mask[1:-1, 1:-1]
    
    # Create foreground mask (255 for object, 0 for background)
    fg_mask = np.where(bg_flood > 0, 0, 255).astype(np.uint8)
    
    # Also ensure any pixels above threshold that are adjacent to bg are cleaned
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, kernel)
    
    # Smooth edges with GaussianBlur for soft anti-aliased alpha
    blurred_alpha = cv2.GaussianBlur(fg_mask.astype(np.float32), (feather_px * 2 + 1, feather_px * 2 + 1), 0)
    
    # Re-normalize
    alpha = np.clip(blurred_alpha, 0, 255).astype(np.uint8)
    
    # Convert BGR to BGRA
    b, g, r = cv2.split(img)
    rgba = cv2.merge([b, g, r, alpha])
    
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    cv2.imwrite(output_path, rgba)
    print(f"Successfully processed {img_path} -> {output_path}")
    return True

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python test_bg.py <input> <output>")
    else:
        isolate_white_background(sys.argv[1], sys.argv[2])
