import os, urllib.request, cv2, numpy as np

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def download_and_grabcut(url, out_path, margin=15, is_white_bg=True):
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            arr = np.asarray(bytearray(resp.read()), dtype=np.uint8)
            img = cv2.imdecode(arr, -1)
        
        if img is None:
            print(f"Failed to decode {url}")
            return False
        
        h, w = img.shape[:2]
        # resize to max 800x800 for high quality and fast processing
        max_dim = max(h, w)
        if max_dim > 800:
            scale = 800.0 / max_dim
            img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
            h, w = img.shape[:2]
        
        # If image already has alpha channel
        if len(img.shape) == 3 and img.shape[2] == 4:
            b, g, r, a = cv2.split(img)
            # Check if alpha is already good
            if np.mean(a > 100) > 10:
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                cv2.imwrite(out_path, img)
                print(f"Saved pre-transparent PNG: {out_path}")
                return True
        else:
            b, g, r = cv2.split(img)
        
        # Run GrabCut
        mask = np.zeros((h, w), np.uint8)
        bgdModel = np.zeros((1, 65), np.float64)
        fgdModel = np.zeros((1, 65), np.float64)
        
        rect = (margin, margin, w - margin * 2, h - margin * 2)
        cv2.grabCut(cv2.merge([b, g, r]), mask, rect, bgdModel, fgdModel, 5, cv2.GC_INIT_WITH_RECT)
        fg_mask = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
        
        # Outer border is strictly background
        fg_mask[:margin, :] = 0
        fg_mask[-margin:, :] = 0
        fg_mask[:, :margin] = 0
        fg_mask[:, -margin:] = 0
        
        # If white background, remove bright neutral corners
        if is_white_bg:
            r_int = r.astype(np.int32)
            g_int = g.astype(np.int32)
            b_int = b.astype(np.int32)
            is_white = (r > 225) & (g > 225) & (b > 225) & (np.abs(r_int - g_int) < 15) & (np.abs(g_int - b_int) < 15)
            fg_mask[is_white] = 0
        
        # Smooth and feather
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        fg_mask = cv2.morphologyEx(fg_mask, cv2.MORPH_CLOSE, kernel)
        alpha = cv2.GaussianBlur(fg_mask.astype(np.float32), (5, 5), 0)
        alpha = np.clip(alpha, 0, 255).astype(np.uint8)
        
        # If grabcut failed and left too few pixels, fall back to smooth oval
        if np.mean(alpha > 100) < 5:
            print(f"Warning: GrabCut small fg for {out_path}, creating soft vignette")
            alpha = np.ones((h, w), dtype=np.float32) * 255.0
            for i in range(25):
                f = (i / 25.0) ** 1.5 * 255.0
                alpha[i, :] = np.minimum(alpha[i, :], f)
                alpha[h - 1 - i, :] = np.minimum(alpha[h - 1 - i, :], f)
                alpha[:, i] = np.minimum(alpha[:, i], f)
                alpha[:, w - 1 - i] = np.minimum(alpha[:, w - 1 - i], f)
            alpha = cv2.GaussianBlur(alpha, (9, 9), 0).astype(np.uint8)
        
        rgba = cv2.merge([b, g, r, alpha])
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        cv2.imwrite(out_path, rgba)
        solid = np.mean(alpha > 128) * 100
        print(f"Successfully saved {out_path} ({w}x{h}, solid={solid:.1f}%)")
        return True
    except Exception as e:
        print(f"Error for {out_path}: {e}")
        return False

# Authentic product images for the remaining items
ITEMS_TO_UPDATE = [
    # Tây Bắc
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/8/86/Chinese_gaiwan_%28cropped%29.jpg/800px-Chinese_gaiwan_%28cropped%29.jpg", "public/images/foods/tay-bac/tra-shan-tuyet.png"),
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/Dried_bamboo_shoots_%281%29.jpg/800px-Dried_bamboo_shoots_%281%29.jpg", "public/images/foods/tay-bac/mang-nua.png"),
    
    # Miền Tây
    ("https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/9981Filipino_fish_cracker_and_Kropek_drying_in_the_Philippines_01.jpg/800px-9981Filipino_fish_cracker_and_Kropek_drying_in_the_Philippines_01.jpg", "public/images/foods/mien-tay/kho-ca-loc.png"),
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2e/Bowl_of_garri_groundnut_and_cube_sugar_and_coconut_flakes.jpg/800px-Bowl_of_garri_groundnut_and_cube_sugar_and_coconut_flakes.jpg", "public/images/foods/mien-tay/mut-dua.png"),
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1d/Dried_apple_slices.jpg/800px-Dried_apple_slices.jpg", "public/images/foods/mien-tay/mang-cau.png"),
    
    # Huế
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1c/Lotus_flower_tea.jpg/800px-Lotus_flower_tea.jpg", "public/images/foods/hue/tra-sen.png"),
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Fresh_Lotus_Seed-4048.jpg/800px-Fresh_Lotus_Seed-4048.jpg", "public/images/foods/hue/mut-sen.png"),
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Peanut_candy_snack.jpg/800px-Peanut_candy_snack.jpg", "public/images/foods/hue/me-xung.png"),
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/7/78/Hue_Traditional_cakes.JPG/800px-Hue_Traditional_cakes.JPG", "public/images/foods/hue/banh-phuc-linh.png"),
    
    # Phú Quốc
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Roasted_peanuts_in_a_bowl.jpg/800px-Roasted_peanuts_in_a_bowl.jpg", "public/images/foods/phu-quoc/dau-phong-chou-chou.png"),
    ("https://upload.wikimedia.org/wikipedia/commons/7/7c/Dried_squid_3.png", "public/images/foods/phu-quoc/kho-muc.png"),
    ("https://thumb.wikimedia.org/wikipedia/commons/thumb/4/44/2020-03-04_22_17_06_A_purple_ring-shaped_fruit-flavored_hard_candy_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg/800px-2020-03-04_22_17_06_A_purple_ring-shaped_fruit-flavored_hard_candy_in_the_Dulles_section_of_Sterling%2C_Loudoun_County%2C_Virginia.jpg", "public/images/foods/phu-quoc/keo-sim.png"),
]

for url, out_path in ITEMS_TO_UPDATE:
    download_and_grabcut(url, out_path)

print("All remaining food assets updated!")
