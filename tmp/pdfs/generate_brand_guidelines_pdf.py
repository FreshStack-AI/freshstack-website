from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import (
    HRFlowable,
    Image,
    PageBreak,
    Paragraph,
    Preformatted,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path("/Users/kelano/Documents/Codex/Freshstack")
SOURCE_MD = ROOT / "docs" / "brand-guidelines.md"
OUTPUT_PDF = ROOT / "output" / "pdf" / "freshstack-brand-guidelines-explainer.pdf"
ASSET_LOGO = ROOT / "public" / "freshstack-navbar-logo.png"
ASSET_MARK = ROOT / "public" / "freshstack-brand-mark.png"


@dataclass
class Section:
    title: str
    body: str


def parse_sections(markdown: str) -> dict[str, Section]:
    chunks = re.split(r"^##\s+", markdown, flags=re.MULTILINE)
    sections: dict[str, Section] = {}
    for chunk in chunks[1:]:
        lines = chunk.splitlines()
        title = lines[0].strip()
        body = "\n".join(lines[1:]).strip()
        sections[title] = Section(title=title, body=body)
    return sections


def extract_bullets(block: str, heading: str | None = None) -> list[str]:
    text = block
    if heading:
        match = re.search(
            rf"^###\s+{re.escape(heading)}\s*$([\s\S]*?)(?=^###\s+|\Z)",
            block,
            flags=re.MULTILINE,
        )
        if not match:
            return []
        text = match.group(1)
    return [line[2:].strip() for line in text.splitlines() if line.startswith("- ")]


def extract_inline_code_value(text: str, label: str) -> str | None:
    match = re.search(rf"{re.escape(label)}:\s+`([^`]+)`", text)
    return match.group(1) if match else None


def extract_table(section_text: str) -> list[list[str]]:
    rows: list[list[str]] = []
    in_table = False
    for line in section_text.splitlines():
        if line.startswith("| "):
            in_table = True
            cols = [part.strip() for part in line.strip().strip("|").split("|")]
            rows.append(cols)
        elif in_table:
            break
    return [row for row in rows if not all(col.startswith("---") for col in row)]


def clean_md(line: str) -> str:
    line = re.sub(r"\[`([^`]+)`\]\([^)]+\)", r"\1", line)
    line = re.sub(r"`([^`]+)`", r"§CODEOPEN§\1§CODECLOSE§", line)
    line = line.replace("&", "&amp;")
    line = line.replace("<", "&lt;").replace(">", "&gt;")
    line = line.replace("§CODEOPEN§", "<font face='Courier'>").replace("§CODECLOSE§", "</font>")
    return line


def css_color_to_reportlab(value: str):
    value = value.strip().strip("`")
    if value.startswith("#"):
        return colors.HexColor(value)
    rgba = re.fullmatch(r"rgba\((\d+),(\d+),(\d+),([0-9.]+)\)", value.replace(" ", ""))
    if rgba:
        red, green, blue, alpha = rgba.groups()
        alpha_f = float(alpha)
        return colors.Color(
            int(red) / 255.0 * alpha_f,
            int(green) / 255.0 * alpha_f,
            int(blue) / 255.0 * alpha_f,
        )
    return colors.HexColor("#111111")


def make_styles():
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "Title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=28,
            leading=32,
            textColor=colors.white,
            alignment=TA_LEFT,
            spaceAfter=8,
        ),
        "eyebrow": ParagraphStyle(
            "Eyebrow",
            parent=base["BodyText"],
            fontName="Courier",
            fontSize=10,
            leading=12,
            textColor=colors.HexColor("#A6A6A6"),
            alignment=TA_LEFT,
            uppercase=True,
            spaceAfter=8,
        ),
        "subtitle": ParagraphStyle(
            "Subtitle",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=13,
            leading=18,
            textColor=colors.HexColor("#CFCFCF"),
            spaceAfter=14,
        ),
        "h1": ParagraphStyle(
            "H1",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=22,
            textColor=colors.white,
            spaceBefore=8,
            spaceAfter=10,
        ),
        "h2": ParagraphStyle(
            "H2",
            parent=base["Heading2"],
            fontName="Helvetica-Bold",
            fontSize=13,
            leading=17,
            textColor=colors.white,
            spaceBefore=4,
            spaceAfter=6,
        ),
        "body": ParagraphStyle(
            "Body",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10.5,
            leading=15,
            textColor=colors.HexColor("#E8E8E8"),
            spaceAfter=6,
        ),
        "muted": ParagraphStyle(
            "Muted",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=13,
            textColor=colors.HexColor("#B9B9B9"),
            spaceAfter=4,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=10,
            leading=14,
            textColor=colors.HexColor("#F2F2F2"),
            leftIndent=12,
            bulletIndent=0,
            spaceAfter=3,
        ),
        "code": ParagraphStyle(
            "Code",
            parent=base["Code"],
            fontName="Courier",
            fontSize=9.2,
            leading=12.5,
            textColor=colors.white,
            backColor=colors.HexColor("#111111"),
            borderPadding=8,
            leftIndent=0,
            rightIndent=0,
        ),
        "cover_meta": ParagraphStyle(
            "CoverMeta",
            parent=base["BodyText"],
            fontName="Courier",
            fontSize=9.5,
            leading=12,
            textColor=colors.HexColor("#BDBDBD"),
            alignment=TA_CENTER,
        ),
        "center_body": ParagraphStyle(
            "CenterBody",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=11,
            leading=15,
            textColor=colors.HexColor("#D9D9D9"),
            alignment=TA_CENTER,
        ),
        "swatch_name": ParagraphStyle(
            "SwatchName",
            parent=base["BodyText"],
            fontName="Courier-Bold",
            fontSize=9.2,
            leading=12,
            textColor=colors.white,
            alignment=TA_CENTER,
        ),
        "swatch_value": ParagraphStyle(
            "SwatchValue",
            parent=base["BodyText"],
            fontName="Courier",
            fontSize=8.6,
            leading=11,
            textColor=colors.HexColor("#D0D0D0"),
            alignment=TA_CENTER,
        ),
    }


def add_bullets(story: list, items: list[str], style):
    for item in items:
        story.append(Paragraph(clean_md(item), style, bulletText="•"))


def section_intro(story: list, styles, title: str, intro: str | None = None):
    story.append(Paragraph(title, styles["h1"]))
    story.append(HRFlowable(width="100%", thickness=0.6, color=colors.HexColor("#3B3B3B")))
    story.append(Spacer(1, 10))
    if intro:
        story.append(Paragraph(clean_md(intro), styles["body"]))


def make_swatch_table(styles, rows: list[list[str]]) -> Table:
    cards = []
    row_cards = []
    for token, value, usage in rows[1:]:
        fill = value.strip("`")
        bg = css_color_to_reportlab(fill)
        text_color = colors.black if fill.lower() == "#ffffff" else colors.white
        inner = Table(
            [
                [""],
                [Paragraph(token.replace("`", ""), ParagraphStyle("swatch_name_dynamic", parent=styles["swatch_name"], textColor=text_color))],
                [Paragraph(value.replace("`", ""), ParagraphStyle("swatch_value_dynamic", parent=styles["swatch_value"], textColor=text_color if fill.lower() != "#ffffff" else colors.HexColor("#222222")))],
                [Paragraph(clean_md(usage), ParagraphStyle("swatch_usage_dynamic", parent=styles["muted"], alignment=TA_CENTER, textColor=text_color if fill.lower() != "#ffffff" else colors.HexColor("#2B2B2B")))],
            ],
            colWidths=[1.55 * inch],
            rowHeights=[0.9 * inch, None, None, None],
        )
        inner.setStyle(
            TableStyle(
                [
                    ("BACKGROUND", (0, 0), (-1, -1), bg),
                    ("BOX", (0, 0), (-1, -1), 0.9, colors.HexColor("#565656") if fill.lower() == "#ffffff" else colors.HexColor("#2C2C2C")),
                    ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
                    ("TOPPADDING", (0, 0), (-1, -1), 8),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ]
            )
        )
        row_cards.append(inner)
        if len(row_cards) == 3:
            cards.append(row_cards)
            row_cards = []
    if row_cards:
        while len(row_cards) < 3:
            row_cards.append("")
        cards.append(row_cards)

    table = Table(cards, colWidths=[1.75 * inch] * 3, hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    return table


def make_two_column_table(left_flowables, right_flowables, width: float) -> Table:
    table = Table([[left_flowables, right_flowables]], colWidths=[width * 0.49, width * 0.49])
    table.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )
    return table


def cover_page(story: list, styles):
    story.append(Spacer(1, 1.1 * inch))
    story.append(Image(str(ASSET_MARK), width=1.2 * inch, height=1.2 * inch))
    story.append(Spacer(1, 18))
    story.append(Paragraph("FreshStack Brand Guidelines", styles["title"]))
    story.append(Paragraph("Website brand system explainer", styles["subtitle"]))
    story.append(Spacer(1, 8))
    story.append(
        Paragraph(
            "A concise guide to the visual language, component rules, motion behavior, and voice conventions used across the current FreshStack marketing site.",
            styles["center_body"],
        )
    )
    story.append(Spacer(1, 22))
    story.append(Image(str(ASSET_LOGO), width=3.2 * inch, height=0.58 * inch))
    story.append(Spacer(1, 30))
    meta = Table(
        [
            [Paragraph("Source", styles["cover_meta"]), Paragraph("docs/brand-guidelines.md", styles["cover_meta"])],
            [Paragraph("Format", styles["cover_meta"]), Paragraph("PDF explainer", styles["cover_meta"])],
            [Paragraph("Brand lens", styles["cover_meta"]), Paragraph("Dark, premium, operator-focused", styles["cover_meta"])],
        ],
        colWidths=[1.5 * inch, 3.1 * inch],
        hAlign="CENTER",
    )
    meta.setStyle(
        TableStyle(
            [
                ("TEXTCOLOR", (0, 0), (-1, -1), colors.HexColor("#D0D0D0")),
                ("LINEABOVE", (0, 0), (-1, 0), 0.6, colors.HexColor("#3A3A3A")),
                ("LINEBELOW", (0, -1), (-1, -1), 0.6, colors.HexColor("#3A3A3A")),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ("LEFTPADDING", (0, 0), (-1, -1), 4),
                ("RIGHTPADDING", (0, 0), (-1, -1), 4),
                ("ALIGN", (0, 0), (-1, -1), "CENTER"),
            ]
        )
    )
    story.append(meta)
    story.append(PageBreak())


def draw_page_background(canvas, doc):
    width, height = A4
    canvas.saveState()
    canvas.setFillColor(colors.HexColor("#020202"))
    canvas.rect(0, 0, width, height, fill=1, stroke=0)
    canvas.setFillColor(colors.Color(1, 1, 1, alpha=0.045))
    canvas.circle(width * 0.5, height * 0.92, 145, fill=1, stroke=0)
    canvas.setFillColor(colors.Color(1, 1, 1, alpha=0.02))
    canvas.rect(0, height * 0.56, width, height * 0.44, fill=1, stroke=0)
    canvas.setStrokeColor(colors.Color(1, 1, 1, alpha=0.04))
    canvas.setLineWidth(0.4)
    for x in range(32, int(width), 24):
        canvas.line(x, 0, x, height)
    for y in range(30, int(height), 24):
        canvas.line(0, y, width, y)

    canvas.setFillColor(colors.HexColor("#A6A6A6"))
    canvas.setFont("Courier", 8)
    canvas.drawString(doc.leftMargin, 20, "FreshStack brand guidelines")
    canvas.drawRightString(width - doc.rightMargin, 20, f"{canvas.getPageNumber():02d}")
    canvas.restoreState()


def build_pdf():
    markdown = SOURCE_MD.read_text()
    sections = parse_sections(markdown)
    styles = make_styles()
    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)

    overview = sections["Overview"].body
    logo = sections["Logo System"].body
    palette = sections["Color Palette"].body
    typography = sections["Typography"].body
    radius = sections["Radius, Borders, and Corners"].body
    surface = sections["Surface Style"].body
    layout = sections["Layout and Spacing"].body
    motion = sections["Motion"].body
    components = sections["Core Components"].body
    imagery = sections["Imagery"].body
    voice = sections["Copy and Voice"].body
    accessibility = sections["Accessibility Rules"].body
    breakpoints = sections["Breakpoints"].body
    sources = sections["Implementation Sources"].body
    checklist = sections["Quick Build Checklist"].body

    brand_name = extract_inline_code_value(overview, "Brand name") or "FreshStack"
    promise = extract_inline_code_value(overview, "Primary promise") or "Your AI growth partner"
    supporting = extract_inline_code_value(overview, "Supporting line") or ""

    story = []
    cover_page(story, styles)

    section_intro(
        story,
        styles,
        "1. Brand Overview",
        f"{brand_name} is positioned as a dark, premium, operator-focused AI systems brand. This PDF turns the markdown guide into a practical visual explainer for design, marketing, and engineering handoff.",
    )
    left = [
        Paragraph("Core positioning", styles["h2"]),
        Paragraph(f"<b>Brand name:</b> {brand_name}", styles["body"]),
        Paragraph(f"<b>Primary promise:</b> {clean_md(promise)}", styles["body"]),
        Paragraph(f"<b>Supporting line:</b> {clean_md(supporting)}", styles["body"]),
        Spacer(1, 8),
        Paragraph("The current site leans into", styles["h2"]),
    ]
    add_bullets(left, extract_bullets(overview)[4:], styles["bullet"])

    right = [
        Paragraph("Tone profile", styles["h2"]),
    ]
    add_bullets(right, extract_bullets(overview)[:4], styles["bullet"])
    right.extend(
        [
            Spacer(1, 10),
            Paragraph(
                "The practical takeaway: every page should feel decisive, high-contrast, and useful to founders or operators evaluating whether FreshStack can clean up a revenue or operations bottleneck.",
                styles["body"],
            ),
        ]
    )
    story.append(make_two_column_table(left, right, 6.8 * inch))
    story.append(PageBreak())

    section_intro(
        story,
        styles,
        "2. Logo System",
        "The brand mark is a stepped six-cell shape, used either as a full lockup with the wordmark or as a standalone icon in compact placements.",
    )
    story.append(
        make_two_column_table(
            [
                Paragraph("Primary lockup", styles["h2"]),
                Spacer(1, 8),
                Image(str(ASSET_LOGO), width=3.0 * inch, height=0.55 * inch),
                Spacer(1, 10),
                Paragraph("Use in navbars, headers, and primary branded placements.", styles["muted"]),
            ],
            [
                Paragraph("Icon-only mark", styles["h2"]),
                Spacer(1, 8),
                Image(str(ASSET_MARK), width=1.2 * inch, height=1.2 * inch),
                Spacer(1, 10),
                Paragraph("Use for favicons, avatars, app tiles, and small badges.", styles["muted"]),
            ],
            6.8 * inch,
        )
    )
    story.append(Spacer(1, 14))
    story.append(Paragraph("Construction details", styles["h2"]))
    add_bullets(story, extract_bullets(logo, "Construction"), styles["bullet"])
    story.append(Spacer(1, 8))
    usage = make_two_column_table(
        [Paragraph("Do", styles["h2"])] + [Paragraph(clean_md(item), styles["bullet"], bulletText="•") for item in extract_bullets(logo, "Logo usage rules")[:3]],
        [Paragraph("Do not", styles["h2"])] + [Paragraph(clean_md(item), styles["bullet"], bulletText="•") for item in extract_bullets(logo, "Logo usage rules")[3:]],
        6.8 * inch,
    )
    story.append(usage)
    story.append(PageBreak())

    section_intro(
        story,
        styles,
        "3. Color Palette",
        "FreshStack is intentionally monochrome. Hierarchy comes from contrast, transparency, and layering, not from a rainbow of accents.",
    )
    story.append(make_swatch_table(styles, extract_table(palette)))
    story.append(Spacer(1, 8))
    cols = make_two_column_table(
        [Paragraph("Background treatment", styles["h2"])] + [Paragraph(clean_md(item), styles["bullet"], bulletText="•") for item in extract_bullets(palette, "Background treatment")],
        [Paragraph("Usage rule", styles["h2"]), Paragraph("Stay in black, charcoal, smoke, and white. If a new color is introduced, start with transparency or grayscale and treat saturation as an exception rather than a default.", styles["body"])],
        6.8 * inch,
    )
    story.append(cols)
    story.append(PageBreak())

    section_intro(
        story,
        styles,
        "4. Typography",
        "The site uses a pragmatic, system-led type pairing: a bold sans-serif foundation for headlines and body, plus mono uppercase utility text for labels and controls.",
    )
    story.append(Paragraph("Primary font", styles["h2"]))
    story.append(Preformatted('"Helvetica Neue", Helvetica, Arial, sans-serif', styles["code"]))
    story.append(Spacer(1, 6))
    story.append(Paragraph("Secondary font", styles["h2"]))
    story.append(Preformatted('ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace', styles["code"]))
    story.append(Spacer(1, 12))

    type_left = [
        Paragraph("Headlines", styles["h2"]),
        Paragraph("Heavy, high-contrast, and often uppercase in hero contexts. Negative tracking is used to make display type feel tighter and more forceful.", styles["body"]),
        Paragraph("Body", styles["h2"]),
        Paragraph("Readable and relaxed, with a global line-height of 1.7 and muted-white color for secondary copy.", styles["body"]),
        Paragraph("Labels", styles["h2"]),
        Paragraph("Mono, uppercase, and lightly contrasted so they structure the page without stealing attention.", styles["body"]),
    ]
    type_right = [
        Paragraph("Common live sizes", styles["h2"]),
    ]
    add_bullets(type_right, extract_bullets(typography, "Key text sizes in the current site"), styles["bullet"])
    type_right += [Spacer(1, 8), Paragraph("Typography rules", styles["h2"])]
    add_bullets(type_right, extract_bullets(typography, "Typography rules"), styles["bullet"])
    story.append(make_two_column_table(type_left, type_right, 6.8 * inch))
    story.append(PageBreak())

    section_intro(
        story,
        styles,
        "5. Shape, Borders, and Surface Style",
        "FreshStack uses rounded glass panels on a nearly black canvas. The overall effect should feel premium and layered, not soft or whimsical.",
    )
    left_col = [
        Paragraph("Radius and border system", styles["h2"]),
    ]
    add_bullets(left_col, extract_bullets(radius, "Global radius tokens"), styles["bullet"])
    left_col.append(Spacer(1, 8))
    left_col.append(Paragraph("Border treatment", styles["h2"]))
    add_bullets(left_col, extract_bullets(radius, "Border system"), styles["bullet"])

    right_col = [
        Paragraph("Surface recipe", styles["h2"]),
    ]
    add_bullets(right_col, extract_bullets(surface)[:9], styles["bullet"])
    story.append(make_two_column_table(left_col, right_col, 6.8 * inch))
    story.append(Spacer(1, 12))
    story.append(Paragraph("Primary surface class: <font face='Courier'>.glass-panel</font>", styles["body"]))
    story.append(Paragraph("Panel specs", styles["h2"]))
    add_bullets(story, extract_bullets(surface, "Panel specs"), styles["bullet"])
    story.append(PageBreak())

    section_intro(
        story,
        styles,
        "6. Layout and Motion",
        "Spacing and animation are restrained. The site should feel deliberate and polished, never over-animated or cramped.",
    )
    layout_col = [Paragraph("Layout rules", styles["h2"])]
    add_bullets(layout_col, extract_bullets(layout, "Container width"), styles["bullet"])
    add_bullets(layout_col, extract_bullets(layout, "Section padding"), styles["bullet"])
    add_bullets(layout_col, extract_bullets(layout, "Header sizing"), styles["bullet"])
    add_bullets(layout_col, extract_bullets(layout, "Spacing rhythm"), styles["bullet"])

    motion_col = [Paragraph("Motion rules", styles["h2"])]
    add_bullets(motion_col, extract_bullets(motion, "Motion style"), styles["bullet"])
    motion_col.append(Spacer(1, 8))
    motion_col.append(Paragraph("Timings", styles["h2"]))
    add_bullets(motion_col, extract_bullets(motion, "Current motion tokens and timings"), styles["bullet"])
    motion_col.append(Spacer(1, 8))
    motion_col.append(Paragraph("Reduced motion", styles["h2"]))
    add_bullets(motion_col, extract_bullets(motion, "Reduced motion"), styles["bullet"])
    story.append(make_two_column_table(layout_col, motion_col, 6.8 * inch))
    story.append(PageBreak())

    section_intro(
        story,
        styles,
        "7. Components, Imagery, and Voice",
        "The design system works because the components, imagery, and language all reinforce the same brand posture: calm confidence and operational credibility.",
    )
    story.append(Paragraph("Core component traits", styles["h2"]))
    for heading in ["Navbar", "Hero", "Buttons", "Cards and panels", "Services rail", "Case study cards and dialog"]:
        bullets = extract_bullets(components, heading)
        if not bullets:
            continue
        story.append(Paragraph(heading, styles["h2"]))
        add_bullets(story, bullets, styles["bullet"])
    story.append(Spacer(1, 10))
    info_cols = make_two_column_table(
        [Paragraph("Imagery", styles["h2"])] + [Paragraph(clean_md(item), styles["bullet"], bulletText="•") for item in extract_bullets(imagery)],
        [Paragraph("Voice", styles["h2"])] + [Paragraph(clean_md(item), styles["bullet"], bulletText="•") for item in extract_bullets(voice, "Voice characteristics") + extract_bullets(voice, "Writing patterns on the site")],
        6.8 * inch,
    )
    story.append(info_cols)
    story.append(PageBreak())

    section_intro(
        story,
        styles,
        "8. Accessibility, Build Checks, and Source of Truth",
        "The brand should stay premium without sacrificing clarity, usability, or implementation consistency.",
    )
    left = [Paragraph("Accessibility rules", styles["h2"])]
    add_bullets(left, extract_bullets(accessibility), styles["bullet"])
    left.append(Spacer(1, 8))
    left.append(Paragraph("QA breakpoints", styles["h2"]))
    add_bullets(left, extract_bullets(breakpoints), styles["bullet"])

    right = [Paragraph("Source files", styles["h2"])]
    add_bullets(right, extract_bullets(sources), styles["bullet"])
    right.append(Spacer(1, 8))
    right.append(Paragraph("Quick build checklist", styles["h2"]))
    add_bullets(right, extract_bullets(checklist), styles["bullet"])
    story.append(make_two_column_table(left, right, 6.8 * inch))

    doc = SimpleDocTemplate(
        str(OUTPUT_PDF),
        pagesize=A4,
        leftMargin=0.72 * inch,
        rightMargin=0.72 * inch,
        topMargin=0.75 * inch,
        bottomMargin=0.65 * inch,
        title="FreshStack Brand Guidelines Explainer",
        author="Codex",
    )
    doc.build(story, onFirstPage=draw_page_background, onLaterPages=draw_page_background)


if __name__ == "__main__":
    build_pdf()
