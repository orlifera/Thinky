from PIL import Image
import os

# Load the composite image
img_path = "/Users/orli/Downloads/4av.png"
img = Image.open(img_path)

# Assume grid layout: 5 rows × 5 columns of 512x512 avatars
avatar_size = 490
columns = 2
rows = 2
avatars = []

# Output directory
output_dir = "/Users/orli/Downloads/avatars2"
os.makedirs(output_dir, exist_ok=True)

# Crop and save each avatar
for row in range(rows):
    for col in range(columns):
        left = col * avatar_size
        upper = row * avatar_size
        right = left + avatar_size
        lower = upper + avatar_size
        cropped = img.crop((left, upper, right, lower))
        filename = f"avatar_{row * columns + col + 1:02d}.png"
        save_path = os.path.join(output_dir, filename)
        cropped.save(save_path)
        avatars.append(save_path)

avatars
