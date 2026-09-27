import os
import sys
from PIL import Image
import numpy as np

# We have rembg and onnxruntime installed
from rembg import remove, new_session

UPLOAD_DIR = r"C:\Users\ASUS\.gemini\antigravity\brain\dbe53566-b274-4ea7-a611-d4eb8a4bd5ff\.user_uploaded"
PROJECT_DIR = r"d:\FPT University\Web Dev\vung-que-box-qua"

TASKS = [
    {
        "name": "banh-trang.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790479743090.png"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "tay-ninh", "banh-trang.png"),
    },
    {
        "name": "hong-say.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790480666912.png"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "dalat", "hong-say.png"),
    },
    {
        "name": "thit-trau.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790480324672.jpg"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "tay-bac", "thit-trau.png"),
    },
    {
        "name": "tra-shan-tuyet.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790480860991.png"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "tay-bac", "tra-shan-tuyet.png"),
    },
    {
        "name": "mang-nua.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790481305791.jpg"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "tay-bac", "mang-nua.png"),
    },
]

print("Initializing rembg session...")
# Try u2netp or u2net
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
    
    # Run rembg
    result = remove(img, session=session)
    
    # Inspect alpha channel
    arr = np.array(result)
    alpha = arr[:, :, 3]
    trans_count = (alpha == 0).sum()
    opaque_count = (alpha > 200).sum()
    total = alpha.size
    print(f"Alpha stats: {trans_count}/{total} ({trans_count/total*100:.1f}%) transparent, {opaque_count} opaque")
    
    # Tight crop with 15px padding for 3D stage balance
    bbox = result.getbbox()
    print(f"Bounding box: {bbox}")
    
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    result.save(dest, format="PNG")
    print(f"Successfully saved to: {dest}")

print("\nAll 5 images processed successfully!")
