import os

# Define the directory where your HTML files are located
directory = '/Users/robin/Documents/J2E'  # Update this path

# Function to update image paths in an HTML file
def update_image_paths(file_path):
    with open(file_path, 'r') as file:
        content = file.read()
    
    # Replace the GitHub URL with the local relative path
    updated_content = content.replace(
        "https://raw.githubusercontent.com/MyAlkalineVeganJourney/J2E/main/Images/",
        "Images/"
    )
    
    with open(file_path, 'w') as file:
        file.write(updated_content)
    print(f"Updated paths in {file_path}")

# Iterate over all files in the directory
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.html'):
            update_image_paths(os.path.join(root, file))
