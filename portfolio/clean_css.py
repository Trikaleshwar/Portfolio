
import os

file_path = 'd:/projects/portfolio/css/vlsi-style.css'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the last valid block closing
valid_end_index = -1
for i, line in enumerate(lines):
    if '.btn {' in line:
        # The next few lines should be the content of .btn
        # We look for the closing brace
        for j in range(i, len(lines)):
            if '}' in lines[j]:
                valid_end_index = j
                break
        break

if valid_end_index != -1:
    # Keep up to the closing brace
    cleaned_lines = lines[:valid_end_index+1]
    
    # Check if the closing brace line has garbage
    # It might be `}. s k i l l ...`
    # We should ensure it's just `}` or `    }`
    last_line = cleaned_lines[-1]
    if '}' in last_line:
        brace_index = last_line.find('}')
        cleaned_lines[-1] = last_line[:brace_index+1] + '\n'

    # valid css to append
    new_css = """
.skill-image-container {
    width: 60px;
    height: 60px;
    margin-bottom: 1.5rem;
    border-radius: 12px;
    overflow: hidden;
    display: block;
    border: 1px solid rgba(0, 217, 255, 0.3);
    box-shadow: 0 0 15px rgba(0, 217, 255, 0.2);
}

.skill-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
"""
    cleaned_lines.append(new_css)

    with open(file_path, 'w', encoding='utf-8') as f:
        f.writelines(cleaned_lines)
    print("File cleaned successfully.")
else:
    print("Could not find .btn block to truncate.")
