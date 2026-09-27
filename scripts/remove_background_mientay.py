import os
from PIL import Image
import numpy as np
from rembg import remove, new_session

UPLOAD_DIR = r"C:\Users\ASUS\.gemini\antigravity\brain\dbe53566-b274-4ea7-a611-d4eb8a4bd5ff\.user_uploaded"
PROJECT_DIR = r"d:\FPT University\Web Dev\vung-que-box-qua"

TASKS = [
    {
        "name": "banh-phong-tom.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790483336488.jpg"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "mien-tay", "banh-phong-tom.png"),
    },
    {
        "name": "kho-ca-loc.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790483565055.jpg"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "mien-tay", "kho-ca-loc.png"),
    },
    {
        "name": "mang-cau.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790483570052.jpg"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "mien-tay", "mang-cau.png"),
    },
    {
        "name": "mut-dua.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790483642817.jpg"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "mien-tay", "mut-dua.png"),
    },
]

print("Initializing rembg session...")
session = new_session("u2netp")

for task in TASKS:
    name = task["name"]
    src = task["src"]
    dest = task["dest"]
    print(f"\nProcessing {name} from {src}...")
    
    if not os.path.exists(src):
        print(f"ERROR: Source file not found: {src}")
        continue
        
    img = Image.open(src).convert("RGB")
    print(f"Original size: {img.size}")
    
    # Run rembg to remove background
    result = remove(img, session=session)
    
    # Tight crop with 20px padding
    bbox = result.getbbox()
    if bbox:
        pad = 20
        w, h = result.size
        box = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad))
        result = result.crop(box)
    
    # Inspect alpha channel
    arr = np.array(result)
    alpha = arr[:, :, 3]
    trans_count = (alpha == 0).sum()
    opaque_count = (alpha > 200).sum()
    total = alpha.size
    print(f"Cropped size: {result.size}")
    print(f"Alpha stats: {trans_count}/{total} ({trans_count/total*100:.1f}%) transparent, {opaque_count} opaque")
    
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    result.save(dest, format="PNG")
    print(f"Successfully saved to: {dest}")

print("\nAll 4 Miền Tây images processed successfully!")
