import os, urllib.request, cv2, numpy as np, re

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

with open(r'C:\Users\ASUS\.gemini\antigravity\brain\dbe53566-b274-4ea7-a611-d4eb8a4bd5ff\scratch\commons_files.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Map key to target file
TARGETS = {
    'tra-shan-tuyet': 'public/images/foods/tay-bac/tra-shan-tuyet.png',
    'mang-nua': 'public/images/foods/tay-bac/mang-nua.png',
    'kho-ca-loc': 'public/images/foods/mien-tay/kho-ca-loc.png',
    'mut-dua': 'public/images/foods/mien-tay/mut-dua.png',
    'mang-cau': 'public/images/foods/mien-tay/mang-cau.png',
    'tra-sen': 'public/images/foods/hue/tra-sen.png',
    'mut-sen': 'public/images/foods/hue/mut-sen.png',
    'me-xung': 'public/images/foods/hue/me-xung.png',
    'banh-phuc-linh': 'public/images/foods/hue/banh-phuc-linh.png',
    'dau-phong-chou-chou': 'public/images/foods/phu-quoc/dau-phong-chou-chou.png',
    'kho-muc': 'public/images/foods/phu-quoc/kho-muc.png',
    'keo-sim': 'public/images/foods/phu-quoc/keo-sim.png',
}

# Find first URL for each section
sections = re.findall(r'\[([^\]]+)\][^:]*:(.*?)(?=\n\[|\Z)', text, re.DOTALL)
for key, block in sections:
    if key not in TARGETS:
        continue
    target_path = TARGETS[key]
    urls = re.findall(r'https://[^\s\n]+', block)
    # filter out pdfs
    valid_urls = [u for u in urls if not u.endswith('.pdf') and not '.pdf.' in u]
    if not valid_urls:
        print(f"No valid image for {key}")
        continue
    
    url = valid_urls[0]
    print(f"Downloading {key} from {url[:70]}...")
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=15) as resp:
            arr = np.asarray(bytearray(resp.read()), dtype=np.uint8)
            img = cv2.imdecode(arr, -1)
        
        if img is None:
            print(f"Decode failed for {key}")
            continue
        
        h, w = img.shape[:2]
        # resize to max 600x600 for optimal loading
        scale = min(600.0 / w, 600.0 / h)
        if scale < 1.0:
            img = cv2.resize(img, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
            h, w = img.shape[:2]
        
        if len(img.shape) == 3 and img.shape[2] == 4:
            b, g, r, a = cv2.split(img)
        else:
            b, g, r = cv2.split(img)
            a = np.ones((h, w), dtype=np.uint8) * 255
            
            # Run GrabCut with 15px margin to isolate the food item cleanly
            mask = np.zeros((h, w), np.uint8)
            bgdModel = np.zeros((1, 65), np.float64)
            fgdModel = np.zeros((1, 65), np.float64)
            margin = 15
            rect = (margin, margin, w - margin * 2, h - margin * 2)
            cv2.grabCut(cv2.merge([b, g, r]), mask, rect, bgdModel, fgdModel, 4, cv2.GC_INIT_WITH_RECT)
            fg = np.where((mask == 1) | (mask == 3), 255, 0).astype(np.uint8)
            
            # Smooth feather
            kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
            fg = cv2.morphologyEx(fg, cv2.MORPH_CLOSE, kernel)
            a = cv2.GaussianBlur(fg.astype(np.float32), (5, 5), 0)
            a = np.clip(a, 0, 255).astype(np.uint8)
            
            # If foreground is too small (<15%), use soft edge vignette without cutting subject
            if np.mean(a > 100) < 15:
                a = np.ones((h, w), dtype=np.float32) * 255.0
                for i in range(20):
                    f = (i / 20.0) ** 1.5 * 255.0
                    a[i, :] = np.minimum(a[i, :], f)
                    a[h - 1 - i, :] = np.minimum(a[h - 1 - i, :], f)
                    a[:, i] = np.minimum(a[:, i], f)
                    a[:, w - 1 - i] = np.minimum(a[:, w - 1 - i], f)
                a = cv2.GaussianBlur(a, (9, 9), 0).astype(np.uint8)
        
        rgba = cv2.merge([b, g, r, a])
        os.makedirs(os.path.dirname(target_path), exist_ok=True)
        cv2.imwrite(target_path, rgba)
        solid = np.mean(a > 128) * 100
        print(f"Saved: {target_path} ({w}x{h}, solid={solid:.1f}%)")
    except Exception as e:
        print(f"Failed {key}: {e}")

print("Done processing commons images!")
