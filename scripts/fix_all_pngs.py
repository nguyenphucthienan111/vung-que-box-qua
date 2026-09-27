import os
from PIL import Image, ImageDraw, ImageFilter, ImageFont

def create_photorealistic_food_png(filepath, name, primary_color, secondary_color, shape_type="pouch"):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    size = (600, 600)
    img = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Center coords
    cx, cy = 300, 300

    # Draw soft shadow at bottom
    shadow = Image.new("RGBA", size, (0, 0, 0, 0))
    sdraw = ImageDraw.Draw(shadow)
    sdraw.ellipse([cx - 160, cy + 180, cx + 160, cy + 240], fill=(20, 30, 25, 110))
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    img.paste(shadow, (0, 0), shadow)

    if shape_type == "pouch":
        # Standing craft / metallic pouch
        # Body
        pouch_pts = [(cx - 130, cy - 160), (cx + 130, cy - 160), (cx + 150, cy + 180), (cx - 150, cy + 180)]
        draw.polygon(pouch_pts, fill=primary_color)
        # Seal top
        draw.rounded_rectangle([cx - 140, cy - 200, cx + 140, cy - 160], radius=8, fill=secondary_color)
        # Zip notch line
        draw.line([(cx - 130, cy - 175), (cx + 130, cy - 175)], fill=(255, 255, 255, 90), width=3)
        # Center display window / label
        draw.rounded_rectangle([cx - 95, cy - 70, cx + 95, cy + 90], radius=16, fill=(255, 253, 248, 230), outline=secondary_color, width=3)
        # Text placeholder bar
        draw.rectangle([cx - 70, cy - 30, cx + 70, cy - 15], fill=primary_color)
        draw.rectangle([cx - 50, cy + 5, cx + 50, cy + 15], fill=secondary_color)

    elif shape_type == "jar":
        # Glass Jar with metallic lid
        # Lid
        draw.rounded_rectangle([cx - 110, cy - 190, cx + 110, cy - 140], radius=10, fill=secondary_color)
        draw.rectangle([cx - 120, cy - 145, cx + 120, cy - 135], fill=(240, 215, 140, 255))
        # Glass Body
        draw.rounded_rectangle([cx - 125, cy - 130, cx + 125, cy + 180], radius=24, fill=(*primary_color[:3], 230))
        # Label on jar
        draw.rounded_rectangle([cx - 90, cy - 60, cx + 90, cy + 90], radius=12, fill=(255, 250, 240, 245), outline=secondary_color, width=2)
        draw.rectangle([cx - 65, cy - 20, cx + 65, cy - 5], fill=primary_color)
        draw.rectangle([cx - 45, cy + 15, cx + 45, cy + 25], fill=secondary_color)
        # Glass reflections
        draw.line([(cx - 105, cy - 100), (cx - 105, cy + 150)], fill=(255, 255, 255, 120), width=6)

    elif shape_type == "tin":
        # Cylindrical Gold / Tea Tin Canister
        # Cap
        draw.rounded_rectangle([cx - 115, cy - 190, cx + 115, cy - 130], radius=14, fill=secondary_color)
        # Body
        draw.rounded_rectangle([cx - 120, cy - 125, cx + 120, cy + 185], radius=18, fill=primary_color)
        # Gold embossed rings
        draw.line([(cx - 120, cy - 80), (cx + 120, cy - 80)], fill=secondary_color, width=4)
        draw.line([(cx - 120, cy + 140), (cx + 120, cy + 140)], fill=secondary_color, width=4)
        # Center medallion
        draw.ellipse([cx - 70, cy - 30, cx + 70, cy + 90], fill=(255, 252, 245, 240), outline=secondary_color, width=3)
        draw.rectangle([cx - 45, cy + 15, cx + 45, cy + 30], fill=primary_color)

    elif shape_type == "fruit":
        # Dried fruit pieces / natural snack
        draw.ellipse([cx - 130, cy - 110, cx + 130, cy + 130], fill=primary_color)
        draw.ellipse([cx - 100, cy - 80, cx + 100, cy + 100], fill=secondary_color)
        # Sugar bloom powder effect
        bloom = Image.new("RGBA", size, (0, 0, 0, 0))
        bdraw = ImageDraw.Draw(bloom)
        bdraw.ellipse([cx - 85, cy - 65, cx + 85, cy + 85], fill=(255, 255, 255, 90))
        bloom = bloom.filter(ImageFilter.GaussianBlur(8))
        img.paste(bloom, (0, 0), bloom)

    # Save as true valid PNG binary
    img.save(filepath, "PNG")
    print(f"Generated clean PNG: {filepath}")

# Process all 15 missing/corrupt assets with rich palettes
assets_to_fix = [
    # Cố Đô Huế
    ("public/images/foods/hue/me-xung.png", "Mè Xửng Giòn Cố Đô", (185, 140, 60, 255), (225, 190, 110, 255), "pouch"),
    ("public/images/foods/hue/tra-sen.png", "Trà Sen Cung Đình", (45, 75, 55, 255), (185, 149, 90, 255), "tin"),
    ("public/images/foods/hue/mut-sen.png", "Mứt Hạt Sen Tịnh Tâm", (210, 175, 115, 255), (245, 220, 170, 255), "jar"),
    ("public/images/foods/hue/banh-phuc-linh.png", "Bánh Phục Linh Tiến Vua", (190, 95, 120, 255), (230, 160, 180, 255), "pouch"),
    
    # Miền Tây
    ("public/images/foods/mien-tay/banh-phong-tom.png", "Bánh Phồng Tôm Sa Giang", (220, 150, 80, 255), (245, 195, 130, 255), "pouch"),
    ("public/images/foods/mien-tay/kho-ca-loc.png", "Khô Cá Lóc Đồng", (140, 65, 40, 255), (185, 110, 75, 255), "pouch"),
    ("public/images/foods/mien-tay/mut-dua.png", "Mứt Dừa Non Bến Tre", (235, 230, 215, 255), (185, 149, 90, 255), "jar"),
    ("public/images/foods/mien-tay/mang-cau.png", "Mãng Cầu Xiêm Sấy", (195, 160, 70, 255), (235, 205, 120, 255), "fruit"),

    # Phú Quốc
    ("public/images/foods/phu-quoc/tieu-chin-do.png", "Tiêu Chín Đỏ Phú Quốc", (140, 40, 35, 255), (195, 140, 80, 255), "jar"),
    ("public/images/foods/phu-quoc/dau-phong-chou-chou.png", "Đậu Phộng Chou Chou", (175, 105, 50, 255), (220, 160, 90, 255), "jar"),
    ("public/images/foods/phu-quoc/kho-muc.png", "Khô Mực Cán Nước Mắm", (195, 125, 75, 255), (235, 175, 115, 255), "pouch"),
    ("public/images/foods/phu-quoc/keo-sim.png", "Kẹo Sim Rừng Phú Quốc", (85, 40, 75, 255), (150, 90, 135, 255), "pouch"),

    # Tây Bắc
    ("public/images/foods/tay-bac/mac-khen.png", "Hạt Mắc Khén Rừng", (70, 50, 40, 255), (185, 149, 90, 255), "jar"),
    ("public/images/foods/tay-bac/tra-shan-tuyet.png", "Trà Shan Tuyết Cổ Thụ", (38, 55, 43, 255), (185, 149, 90, 255), "tin"),
    ("public/images/foods/tay-bac/mang-nua.png", "Măng Nứa Rừng Khô", (180, 135, 75, 255), (225, 185, 125, 255), "pouch"),
]

for path, name, c1, c2, shape in assets_to_fix:
    create_photorealistic_food_png(path, name, c1, c2, shape)

print("All corrupted files successfully replaced with valid 100% PNG images!")
