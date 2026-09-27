import os
from PIL import Image
import numpy as np
from rembg import remove, new_session

UPLOAD_DIR = r"C:\Users\ASUS\.gemini\antigravity\brain\dbe53566-b274-4ea7-a611-d4eb8a4bd5ff\.user_uploaded"
PROJECT_DIR = r"d:\FPT University\Web Dev\vung-que-box-qua"

TASKS = [
    {
        "name": "dau-phong-chou-chou.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790484110326.jpg"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "phu-quoc", "dau-phong-chou-chou.png"),
    },
    {
        "name": "kho-muc.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790484212333.jpg"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "phu-quoc", "kho-muc.png"),
    },
    {
        "name": "keo-sim.png",
        "src": os.path.join(UPLOAD_DIR, "media_1790484299987.jpg"),
        "dest": os.path.join(PROJECT_DIR, "public", "images", "foods", "phu-quoc", "keo-sim.png"),
    },
]

print("Initializing rembg session...")
session = new_session("u2netp")

for task in TASKS:
    name = task["name"]
    src = task["src"]
    dest = task["dest"]
    print(f"Processing {name}...")
    
    if not os.path.exists(src):
        print(f"ERROR: Source file not found: {src}")
        continue
        
    img = Image.open(src).convert("RGB")
    
    # Run rembg
    result = remove(img, session=session)
    
    # Tight crop with 20px padding
    bbox = result.getbbox()
    if bbox:
        pad = 20
        w, h = result.size
        box = (max(0, bbox[0] - pad), max(0, bbox[1] - pad), min(w, bbox[2] + pad), min(h, bbox[3] + pad))
        result = result.crop(box)
        
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    result.save(dest, format="PNG")
    print(f"Saved {name} to {dest}, size: {result.size}")

print("Phu Quoc background removal completed!")
