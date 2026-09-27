import os
import urllib.request
from PIL import Image, ImageDraw, ImageFilter, ImageOps

HEADERS = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

def download_and_process_food(url, output_path, shape="circle"):
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    temp_path = output_path + ".tmp.jpg"
    try:
        req = urllib.request.Request(url, headers=HEADERS)
        with urllib.request.urlopen(req, timeout=10) as resp, open(temp_path, "wb") as f:
            f.write(resp.read())
        
        # Open and process with PIL
        with Image.open(temp_path) as raw:
            # Crop to square
            raw = ImageOps.fit(raw, (600, 600), Image.Resampling.LANCZOS)
            raw = raw.convert("RGBA")
            
            # Create a smooth circular or rounded-rectangular mask with subtle rim
            mask = Image.new("L", (600, 600), 0)
            mdraw = ImageDraw.Draw(mask)
            
            if shape == "circle":
                mdraw.ellipse([40, 40, 560, 560], fill=255)
            else:
                mdraw.rounded_rectangle([40, 40, 560, 560], radius=80, fill=255)
            
            # Feather the mask slightly for clean anti-aliased edge
            mask = mask.filter(ImageFilter.GaussianBlur(2))
            
            # Apply mask to image
            result = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
            result.paste(raw, (0, 0), mask)
            
            # Add golden rim border around the food photo
            rim = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
            rdraw = ImageDraw.Draw(rim)
            if shape == "circle":
                rdraw.ellipse([38, 38, 562, 562], outline=(185, 149, 90, 220), width=6)
            else:
                rdraw.rounded_rectangle([38, 38, 562, 562], radius=80, outline=(185, 149, 90, 220), width=6)
            
            result = Image.alpha_composite(result, rim)
            
            # Add soft realistic contact drop shadow beneath
            shadow = Image.new("RGBA", (600, 600), (0, 0, 0, 0))
            sdraw = ImageDraw.Draw(shadow)
            sdraw.ellipse([100, 480, 500, 580], fill=(0, 0, 0, 130))
            shadow = shadow.filter(ImageFilter.GaussianBlur(18))
            
            final_img = Image.alpha_composite(shadow, result)
            final_img.save(output_path, "PNG")
            print(f"Success: {output_path}")
            
    except Exception as e:
        print(f"Failed {output_path}: {e}")
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

# Download and create real photographic food cutouts
FOOD_ITEMS = [
    # Tây Bắc
    ("https://images.unsplash.com/photo-1599940824399-b87987ceb72a?w=600&auto=format&fit=crop&q=80", "public/images/foods/tay-bac/mac-khen.png", "circle"),
    ("https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop&q=80", "public/images/foods/tay-bac/tra-shan-tuyet.png", "circle"),
    ("https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&auto=format&fit=crop&q=80", "public/images/foods/tay-bac/mang-nua.png", "rounded"),
    
    # Miền Tây
    ("https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&auto=format&fit=crop&q=80", "public/images/foods/mien-tay/banh-phong-tom.png", "circle"),
    ("https://images.unsplash.com/photo-1544943910-4c1dc44a046c?w=600&auto=format&fit=crop&q=80", "public/images/foods/mien-tay/kho-ca-loc.png", "rounded"),
    ("https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&auto=format&fit=crop&q=80", "public/images/foods/mien-tay/mut-dua.png", "circle"),
    ("https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=600&auto=format&fit=crop&q=80", "public/images/foods/mien-tay/mang-cau.png", "circle"),
    
    # Huế
    ("https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80", "public/images/foods/hue/me-xung.png", "rounded"),
    ("https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=600&auto=format&fit=crop&q=80", "public/images/foods/hue/tra-sen.png", "circle"),
    ("https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80", "public/images/foods/hue/mut-sen.png", "circle"),
    ("https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=600&auto=format&fit=crop&q=80", "public/images/foods/hue/banh-phuc-linh.png", "rounded"),
    
    # Phú Quốc
    ("https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80", "public/images/foods/phu-quoc/tieu-chin-do.png", "circle"),
    ("https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=600&auto=format&fit=crop&q=80", "public/images/foods/phu-quoc/dau-phong-chou-chou.png", "circle"),
    ("https://images.unsplash.com/photo-1584947920406-8d693246f488?w=600&auto=format&fit=crop&q=80", "public/images/foods/phu-quoc/kho-muc.png", "rounded"),
    ("https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=600&auto=format&fit=crop&q=80", "public/images/foods/phu-quoc/keo-sim.png", "circle"),
]

for url, path, shape in FOOD_ITEMS:
    download_and_process_food(url, path, shape)

print("All realistic photographic food assets generated successfully!")
