#!/usr/bin/env python3
"""
Image-to-Text Extraction Engine for Smart School Enterprise Platform
Extracts raw OCR text, UI hierarchies, route slugs, criteria forms, data tables,
and buttons from uploaded screenshots using Tesseract OCR and PIL.
"""

import sys
import os
import subprocess
import re
from pathlib import Path
from PIL import Image

def run_ocr(image_path: str) -> str:
    """Run Tesseract OCR on the given image path and return plain text."""
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")
    
    cmd = ["/usr/local/bin/tesseract", image_path, "stdout", "--oem", "1", "-l", "eng"]
    try:
        result = subprocess.run(cmd, capture_output=True, text=True, check=True)
        return result.stdout
    except subprocess.CalledProcessError as e:
        return f"Error executing OCR: {e.stderr}"

def analyze_image_dimensions(image_path: str) -> dict:
    """Extract image resolution, mode, and format."""
    with Image.open(image_path) as img:
        return {
            "width": img.width,
            "height": img.height,
            "format": img.format,
            "mode": img.mode,
            "aspect_ratio": round(img.width / img.height, 2)
        }

def parse_ui_zones(ocr_text: str) -> dict:
    """Identify key UI elements from OCR text."""
    lines = [line.strip() for line in ocr_text.splitlines() if line.strip()]
    
    zones = {
        "session": None,
        "active_route": None,
        "criteria_fields": [],
        "table_headers": [],
        "buttons": [],
        "status_lines": []
    }
    
    for line in lines:
        if "Session" in line or "2026-27" in line:
            zones["session"] = line
        elif any(btn in line.lower() for btn in ["search", "save", "add", "manage", "preview", "verify", "upload"]):
            zones["buttons"].append(line)
        elif any(header in line for header in ["Admission No", "Student Name", "Class", "Section", "Roll No", "Date", "Action", "Amount", "Phone"]):
            zones["table_headers"].append(line)
        elif any(status in line for status in ["Showing", "No data available", "No Record Found", "entries"]):
            zones["status_lines"].append(line)
            
    return zones

def format_markdown_extraction(image_path: str, ocr_text: str, meta: dict, zones: dict) -> str:
    """Generate structured markdown documentation for the extracted screenshot."""
    filename = Path(image_path).name
    
    md = []
    md.append(f"### Screen Extraction: `{filename}`")
    md.append(f"- **Resolution**: {meta['width']}x{meta['height']} ({meta['format']})")
    if zones['session']:
        md.append(f"- **Detected Session**: `{zones['session']}`")
    md.append("")
    md.append("#### Extracted UI Zones & Fields")
    if zones['buttons']:
        md.append(f"- **Detected Action Triggers**: {', '.join(set(zones['buttons'][:8]))}")
    if zones['table_headers']:
        md.append(f"- **Detected Data Headers**: {', '.join(set(zones['table_headers'][:8]))}")
    if zones['status_lines']:
        md.append(f"- **Status / Pagination**: {', '.join(set(zones['status_lines'][:4]))}")
    md.append("")
    md.append("#### Raw OCR Text Ingress")
    md.append("```text")
    md.append(ocr_text.strip())
    md.append("```")
    md.append("")
    return "\n".join(md)

def main():
    if len(sys.argv) < 2:
        print("Usage: extract_image_to_text.py <path_to_image_or_directory>")
        sys.exit(1)
        
    target = Path(sys.argv[1])
    
    if target.is_file():
        images = [target]
    elif target.is_dir():
        images = sorted(list(target.glob("*.png")) + list(target.glob("*.jpg")))
    else:
        print(f"Target path does not exist: {target}")
        sys.exit(1)
        
    for img in images:
        meta = analyze_image_dimensions(str(img))
        ocr_text = run_ocr(str(img))
        zones = parse_ui_zones(ocr_text)
        md_output = format_markdown_extraction(str(img), ocr_text, meta, zones)
        print(md_output)
        print("-" * 80)

if __name__ == "__main__":
    main()
