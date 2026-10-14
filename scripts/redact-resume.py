"""
Copy the resume PDF into public/ with the phone number removed.

The site must never publish a phone number, but the source PDF has one in
its header. Run this again whenever the resume changes:

    pip install pymupdf
    python scripts/redact-resume.py
"""
import re
import sys
from pathlib import Path

import pymupdf as fitz

SRC = Path("Shawn_Lasrado_Resume_2026.pdf")
DST = Path("public/Shawn_Lasrado_Resume_2026.pdf")
PHONE = re.compile(r"\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}")


def main() -> int:
    doc = fitz.open(SRC)
    hits = 0
    for page in doc:
        for match in set(PHONE.findall(page.get_text())):
            for rect in page.search_for(match):
                page.add_redact_annot(rect, fill=(1, 1, 1))
                hits += 1
                # Also remove the "•" separator just before the number, if any.
                for word in page.get_text("words"):
                    w = fitz.Rect(word[:4])
                    same_line = abs(w.y0 - rect.y0) < 3
                    if same_line and w.x1 <= rect.x0 + 1 and rect.x0 - w.x1 < 4 and word[4].endswith("•"):
                        page.add_redact_annot(fitz.Rect(w.x1 - 2, w.y0, w.x1, w.y1), fill=(1, 1, 1))
        page.apply_redactions()
    leftover = [m for page in doc for m in PHONE.findall(page.get_text())]
    if leftover:
        print(f"Phone number still present: {leftover}", file=sys.stderr)
        return 1
    DST.parent.mkdir(exist_ok=True)
    doc.save(DST, garbage=4, deflate=True)
    print(f"Wrote {DST} ({hits} redaction(s))")
    return 0


if __name__ == "__main__":
    sys.exit(main())
