from pathlib import Path
import sys

from docx import Document
from docx.enum.section import WD_SECTION
from docx.enum.style import WD_STYLE_TYPE
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_BREAK, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


DOCS_SKILL = Path(
    "/home/sirus/.codex/plugins/cache/openai-primary-runtime/documents/"
    "26.813.12317/skills/documents"
)
sys.path.insert(0, str(DOCS_SKILL / "scripts"))
from table_geometry import apply_table_geometry  # noqa: E402


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "resume" / "Manish_Ukirade_Resume_2026.docx"

# compact_reference_guide with a named ATS-resume override. The override keeps
# the preset's compact hierarchy while using recruiter-friendly density.
TOKENS = {
    "font": "Arial",
    "page_margin": 0.58,
    "body_size": 9.25,
    "body_after": 2.4,
    "body_line": 1.04,
    "section_size": 10.6,
    "section_before": 7.0,
    "section_after": 3.0,
    "job_size": 10.0,
    "bullet_size": 9.05,
    "bullet_after": 1.5,
    "list_marker": 0.13,
    "list_text": 0.27,
    "list_hanging": 0.14,
    "navy": "17365D",
    "blue": "2563A6",
    "cyan": "0F766E",
    "ink": "18212F",
    "muted": "52606D",
    "line": "C8D4E3",
    "soft": "EEF4FA",
}


def set_cell_margins(cell, top=70, start=90, bottom=70, end=90):
    tc = cell._tc
    tc_pr = tc.get_or_add_tcPr()
    tc_mar = tc_pr.first_child_found_in("w:tcMar")
    if tc_mar is None:
        tc_mar = OxmlElement("w:tcMar")
        tc_pr.append(tc_mar)
    for name, value in (("top", top), ("start", start), ("bottom", bottom), ("end", end)):
        node = tc_mar.find(qn(f"w:{name}"))
        if node is None:
            node = OxmlElement(f"w:{name}")
            tc_mar.append(node)
        node.set(qn("w:w"), str(value))
        node.set(qn("w:type"), "dxa")


def shade_cell(cell, fill):
    shd = cell._tc.get_or_add_tcPr().find(qn("w:shd"))
    if shd is None:
        shd = OxmlElement("w:shd")
        cell._tc.get_or_add_tcPr().append(shd)
    shd.set(qn("w:fill"), fill)


def set_run(run, *, size=None, bold=None, italic=None, color=None, font=None):
    font_name = font or TOKENS["font"]
    run.font.name = font_name
    run._element.get_or_add_rPr().rFonts.set(qn("w:ascii"), font_name)
    run._element.get_or_add_rPr().rFonts.set(qn("w:hAnsi"), font_name)
    run._element.get_or_add_rPr().rFonts.set(qn("w:eastAsia"), font_name)
    if size is not None:
        run.font.size = Pt(size)
    if bold is not None:
        run.bold = bold
    if italic is not None:
        run.italic = italic
    if color is not None:
        run.font.color.rgb = RGBColor.from_string(color)
    return run


def add_bottom_border(paragraph, color=None, size="10", space="2"):
    p_pr = paragraph._p.get_or_add_pPr()
    p_bdr = p_pr.find(qn("w:pBdr"))
    if p_bdr is None:
        p_bdr = OxmlElement("w:pBdr")
        p_pr.append(p_bdr)
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), size)
    bottom.set(qn("w:space"), space)
    bottom.set(qn("w:color"), color or TOKENS["blue"])
    p_bdr.append(bottom)


def set_cell_border(cell, **edges):
    tc_pr = cell._tc.get_or_add_tcPr()
    tc_borders = tc_pr.first_child_found_in("w:tcBorders")
    if tc_borders is None:
        tc_borders = OxmlElement("w:tcBorders")
        tc_pr.append(tc_borders)
    for edge, options in edges.items():
        tag = f"w:{edge}"
        node = tc_borders.find(qn(tag))
        if node is None:
            node = OxmlElement(tag)
            tc_borders.append(node)
        for key, value in options.items():
            node.set(qn(f"w:{key}"), str(value))


def mark_row_as_header(row):
    tr_pr = row._tr.get_or_add_trPr()
    tbl_header = tr_pr.find(qn("w:tblHeader"))
    if tbl_header is None:
        tbl_header = OxmlElement("w:tblHeader")
        tr_pr.append(tbl_header)
    tbl_header.set(qn("w:val"), "true")


def add_hyperlink(paragraph, text, url, color=None):
    part = paragraph.part
    rel_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), rel_id)
    run = OxmlElement("w:r")
    r_pr = OxmlElement("w:rPr")
    r_fonts = OxmlElement("w:rFonts")
    r_fonts.set(qn("w:ascii"), TOKENS["font"])
    r_fonts.set(qn("w:hAnsi"), TOKENS["font"])
    r_pr.append(r_fonts)
    r_color = OxmlElement("w:color")
    r_color.set(qn("w:val"), color or TOKENS["blue"])
    r_pr.append(r_color)
    r_size = OxmlElement("w:sz")
    r_size.set(qn("w:val"), "17")
    r_pr.append(r_size)
    run.append(r_pr)
    text_node = OxmlElement("w:t")
    text_node.text = text
    run.append(text_node)
    hyperlink.append(run)
    paragraph._p.append(hyperlink)


def add_page_field(paragraph):
    run = paragraph.add_run()
    fld_char_begin = OxmlElement("w:fldChar")
    fld_char_begin.set(qn("w:fldCharType"), "begin")
    instr_text = OxmlElement("w:instrText")
    instr_text.set(qn("xml:space"), "preserve")
    instr_text.text = " PAGE "
    fld_char_end = OxmlElement("w:fldChar")
    fld_char_end.set(qn("w:fldCharType"), "end")
    run._r.append(fld_char_begin)
    run._r.append(instr_text)
    run._r.append(fld_char_end)
    set_run(run, size=8.0, color=TOKENS["muted"])


def configure_document(doc):
    section = doc.sections[0]
    section.top_margin = Inches(TOKENS["page_margin"])
    section.bottom_margin = Inches(TOKENS["page_margin"])
    section.left_margin = Inches(TOKENS["page_margin"])
    section.right_margin = Inches(TOKENS["page_margin"])
    section.header_distance = Inches(0.28)
    section.footer_distance = Inches(0.28)

    normal = doc.styles["Normal"]
    normal.font.name = TOKENS["font"]
    normal._element.rPr.rFonts.set(qn("w:ascii"), TOKENS["font"])
    normal._element.rPr.rFonts.set(qn("w:hAnsi"), TOKENS["font"])
    normal.font.size = Pt(TOKENS["body_size"])
    normal.font.color.rgb = RGBColor.from_string(TOKENS["ink"])
    normal.paragraph_format.space_before = Pt(0)
    normal.paragraph_format.space_after = Pt(TOKENS["body_after"])
    normal.paragraph_format.line_spacing = TOKENS["body_line"]

    for style_name in ("List Bullet", "List Bullet 2"):
        style = doc.styles[style_name]
        style.font.name = TOKENS["font"]
        style._element.rPr.rFonts.set(qn("w:ascii"), TOKENS["font"])
        style._element.rPr.rFonts.set(qn("w:hAnsi"), TOKENS["font"])
        style.font.size = Pt(TOKENS["bullet_size"])
        style.font.color.rgb = RGBColor.from_string(TOKENS["ink"])
        style.paragraph_format.left_indent = Inches(TOKENS["list_text"])
        style.paragraph_format.first_line_indent = Inches(-TOKENS["list_hanging"])
        style.paragraph_format.tab_stops.add_tab_stop(Inches(TOKENS["list_text"]))
        style.paragraph_format.space_before = Pt(0)
        style.paragraph_format.space_after = Pt(TOKENS["bullet_after"])
        style.paragraph_format.line_spacing = 1.03

    for name in ("Resume Section", "Resume Job"):
        if name not in doc.styles:
            doc.styles.add_style(name, WD_STYLE_TYPE.PARAGRAPH)

    section_style = doc.styles["Resume Section"]
    section_style.font.name = TOKENS["font"]
    section_style._element.rPr.rFonts.set(qn("w:ascii"), TOKENS["font"])
    section_style._element.rPr.rFonts.set(qn("w:hAnsi"), TOKENS["font"])
    section_style.font.size = Pt(TOKENS["section_size"])
    section_style.font.bold = True
    section_style.font.color.rgb = RGBColor.from_string(TOKENS["navy"])
    section_style.paragraph_format.space_before = Pt(TOKENS["section_before"])
    section_style.paragraph_format.space_after = Pt(TOKENS["section_after"])
    section_style.paragraph_format.keep_with_next = True

    job_style = doc.styles["Resume Job"]
    job_style.font.name = TOKENS["font"]
    job_style._element.rPr.rFonts.set(qn("w:ascii"), TOKENS["font"])
    job_style._element.rPr.rFonts.set(qn("w:hAnsi"), TOKENS["font"])
    job_style.font.size = Pt(TOKENS["job_size"])
    job_style.font.bold = True
    job_style.font.color.rgb = RGBColor.from_string(TOKENS["navy"])
    job_style.paragraph_format.space_before = Pt(3.5)
    job_style.paragraph_format.space_after = Pt(0.5)
    job_style.paragraph_format.keep_with_next = True

    footer = section.footer
    fp = footer.paragraphs[0]
    fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    fp.paragraph_format.space_after = Pt(0)
    set_run(fp.add_run("Manish Ukirade  |  Page "), size=8.0, color=TOKENS["muted"])
    add_page_field(fp)


def add_section_heading(doc, title):
    p = doc.add_paragraph(style="Resume Section")
    p.add_run(title.upper())
    add_bottom_border(p, color=TOKENS["line"], size="7", space="2")
    return p


def add_role(doc, title, period, company, location):
    p = doc.add_paragraph(style="Resume Job")
    usable = 8.5 - 2 * TOKENS["page_margin"]
    p.paragraph_format.tab_stops.add_tab_stop(Inches(usable), alignment=2)
    set_run(p.add_run(title), size=TOKENS["job_size"], bold=True, color=TOKENS["navy"])
    set_run(p.add_run(f"\t{period}"), size=9.0, italic=True, color=TOKENS["muted"])

    company_p = doc.add_paragraph()
    company_p.paragraph_format.space_after = Pt(1.5)
    company_p.paragraph_format.keep_with_next = True
    company_p.paragraph_format.tab_stops.add_tab_stop(Inches(usable), alignment=2)
    set_run(company_p.add_run(company), size=9.35, bold=True, color=TOKENS["ink"])
    set_run(company_p.add_run(f"\t{location}"), size=8.8, color=TOKENS["muted"])


def add_bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.widow_control = True
    p.paragraph_format.keep_together = True
    set_run(p.add_run(text), size=TOKENS["bullet_size"], color=TOKENS["ink"])
    return p


def add_skill_line(doc, label, content):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(1.4)
    p.paragraph_format.keep_together = True
    p.paragraph_format.left_indent = Inches(0)
    p.paragraph_format.first_line_indent = Inches(0)
    set_run(p.add_run(label + ": "), size=9.0, bold=True, color=TOKENS["navy"])
    set_run(p.add_run(content), size=8.95, color=TOKENS["ink"])


def add_header(doc):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(0.5)
    set_run(p.add_run("MANISH UKIRADE"), size=24, bold=True, color=TOKENS["navy"])

    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(3.5)
    set_run(
        p.add_run("Senior AI & Full-Stack Engineer  |  Generative AI, RAG, ML Platforms & Cloud"),
        size=11.0,
        bold=True,
        color=TOKENS["cyan"],
    )

    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(2.5)
    p.paragraph_format.line_spacing = 1.0
    set_run(p.add_run("Thane, India  |  +91 86919 83106  |  "), size=8.55, color=TOKENS["muted"])
    add_hyperlink(p, "ukirademanish9797@gmail.com", "mailto:ukirademanish9797@gmail.com")
    set_run(p.add_run("  |  "), size=8.55, color=TOKENS["muted"])
    add_hyperlink(p, "manishukirade.com", "https://manishukirade.com")
    set_run(p.add_run("  |  "), size=8.55, color=TOKENS["muted"])
    add_hyperlink(p, "LinkedIn", "https://www.linkedin.com/in/manish-ukirade-13b866124/")
    set_run(p.add_run("  |  "), size=8.55, color=TOKENS["muted"])
    add_hyperlink(p, "GitHub", "https://github.com/manishukirade")

    accent = doc.add_paragraph()
    accent.paragraph_format.space_after = Pt(2.0)
    add_bottom_border(accent, color=TOKENS["blue"], size="16", space="0")


def add_impact_strip(doc):
    table = doc.add_table(rows=1, cols=4)
    table.autofit = False
    widths = [1.85, 1.85, 1.85, 1.79]
    labels = [
        ("7+ YEARS", "Production engineering"),
        ("10+ CLIENTS", "Enterprise deployments"),
        ("20 CODEBASES", "Active in May-Aug 2026"),
        ("492 COMMITS", "Substantive delivery"),
    ]
    for index, cell in enumerate(table.rows[0].cells):
        cell.width = Inches(widths[index])
        set_cell_margins(cell)
        shade_cell(cell, TOKENS["soft"])
        set_cell_border(
            cell,
            top={"val": "single", "sz": 4, "color": TOKENS["line"]},
            bottom={"val": "single", "sz": 4, "color": TOKENS["line"]},
            start={"val": "single", "sz": 4, "color": TOKENS["line"]},
            end={"val": "single", "sz": 4, "color": TOKENS["line"]},
        )
        p = cell.paragraphs[0]
        p.paragraph_format.space_after = Pt(0.5)
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        set_run(p.add_run(labels[index][0]), size=9.2, bold=True, color=TOKENS["navy"])
        p2 = cell.add_paragraph()
        p2.paragraph_format.space_after = Pt(0)
        p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        set_run(p2.add_run(labels[index][1]), size=7.2, color=TOKENS["muted"])
    apply_table_geometry(
        table,
        [2664, 2664, 2664, 2578],
        table_width_dxa=10570,
        indent_dxa=90,
        cell_margins_dxa={"top": 70, "bottom": 70, "start": 90, "end": 90},
    )
    mark_row_as_header(table.rows[0])
    after = doc.add_paragraph()
    after.paragraph_format.space_after = Pt(0)
    after.paragraph_format.line_spacing = 0.7


def build_resume():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = Document()
    configure_document(doc)
    add_header(doc)

    add_section_heading(doc, "Professional Profile")
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(4.0)
    set_run(
        p.add_run(
            "Senior AI and full-stack engineer with 7+ years of experience shipping production "
            "Generative AI, RAG, machine-learning, enterprise SaaS, and cloud platforms. Leads "
            "systems from architecture and implementation through DevOps, security, compliance, "
            "and client delivery. Deep Azure experience with hands-on delivery across GCP and AWS."
        ),
        size=9.35,
        color=TOKENS["ink"],
    )

    add_impact_strip(doc)

    add_section_heading(doc, "Technical Skills")
    add_skill_line(doc, "Generative AI", "RAG, LangChain, ChromaDB, embeddings, semantic search, prompt engineering, OpenAI API, Groq, Hugging Face, multi-agent and tool-calling workflows")
    add_skill_line(doc, "ML & Data", "TensorFlow, CatBoost, NLP, text classification, sentiment analysis, feature engineering, MLflow, model evaluation, pandas, MySQL, PostgreSQL, Redis")
    add_skill_line(doc, "Backend", "Python, FastAPI, Node.js, TypeScript, Fastify, Hapi.js, REST APIs, WebSockets, microservices, JWT, system design")
    add_skill_line(doc, "Frontend", "React.js, Vue.js, JavaScript, TypeScript, responsive interfaces, data visualization, accessible UX")
    add_skill_line(doc, "Cloud & DevOps", "Azure, AWS, GCP, Docker, Kubernetes, Docker Swarm, CI/CD, Jenkins, GitHub Actions, Linux, Nginx")
    add_skill_line(doc, "Enterprise", "Azure AD, ADFS, SSO, SAML, OAuth 2.0, Microsoft Teams, HRMS integrations, SOC 2 Type II, VAPT, VPAT")

    add_section_heading(doc, "Professional Experience")
    add_role(doc, "Senior AI & Full-Stack Engineer / Tech Lead", "Apr 2023 - Present", "W.E. Matter - TheOther 2 Thirds Consulting LLP", "Mumbai, India")
    add_bullet(doc, "Delivered 492 substantive commits across 20 active codebases during the May-Aug 2026 evidence window, spanning frontend, backend, traditional ML, and Generative AI systems.")
    add_bullet(doc, "Expanded KYARA with intent recognition, scoped conversational query routing, chart and heatmap insights, retry-aware chat UX, and multi-turn FAQ orchestration with test coverage.")
    add_bullet(doc, "Built qualitative-insights pipelines for comment summarization and comparative sentiment analysis, including concurrency controls, LLM-call management, dashboard visualizations, and exports.")
    add_bullet(doc, "Shipped enterprise platform improvements across survey scorecards and reporting, HRMS attendance connectors, Microsoft Teams Adaptive Cards and bot security, and WhatsApp queue reliability.")
    add_bullet(doc, "Built KYARA's production RAG policy Q&A and conversational employee-intelligence platform using Python, FastAPI, LangChain, ChromaDB, and LLM prompting for 10+ enterprise clients.")
    add_bullet(doc, "Architected a multi-tenant employee-engagement SaaS platform for clients across India and the Middle East, contributing to 2x year-over-year revenue growth over 2.5 years.")
    add_bullet(doc, "Led SOC 2 Type II, CyberCube, and VPAT programs end to end; owned policy drafting, VAPT, vendor reviews, evidence, and audit coordination with one low-severity Nginx finding.")
    add_bullet(doc, "Owned infrastructure for 8+ production applications and completed the AWS-to-Azure migration in 15 days with zero downtime and a reported 30% cost-efficiency improvement; delivered SSO/SAML integrations for 5+ clients.")

    doc.add_page_break()

    add_section_heading(doc, "Earlier Experience")
    add_role(doc, "Software Engineer - Full Stack & DevOps", "Feb 2022 - Mar 2023", "BizPilot.in", "Delhi, Remote")
    add_bullet(doc, "Led the ground-up V2 rebuild using React, Node.js, PostgreSQL, and AWS, taking the platform from architecture through production deployment.")
    add_bullet(doc, "Built a financial-automation engine processing 1,000+ monthly transactions and reducing compliance-processing time by a reported 200%.")
    add_bullet(doc, "Implemented Jenkins and GitHub Actions CI/CD and independently managed production infrastructure and releases.")

    add_role(doc, "Software Engineer - Cloud Migration", "Sep 2021 - Feb 2022", "Raykor Technologies", "Mumbai, India")
    add_bullet(doc, "Migrated Intellinotion systems serving 50,000+ users from Azure to GCP with zero downtime across a three-month delivery window.")
    add_bullet(doc, "Built secure Hapi.js REST APIs with Firebase authentication, automated deployments, and improved infrastructure stability by a reported 40%.")

    add_role(doc, "Software Engineer - Platform & ML", "Aug 2019 - Aug 2021", "Nexsales Corporation", "Mumbai, India")
    add_bullet(doc, "Led development of a Vue.js microservices dialer integrated with SIP systems and used by 200+ sales agents each day.")
    add_bullet(doc, "Built Python and TensorFlow text-classification pipelines reaching 87% accuracy for lead qualification.")
    add_bullet(doc, "Owned GCP infrastructure, server provisioning, database architecture, CI/CD, and pub/sub systems; modernized Node.js 0.10 services to Node.js 14, removing three critical vulnerabilities and improving response time by 60%.")

    add_section_heading(doc, "Selected Systems & Recent Work")
    add_bullet(doc, "KYARA Intelligence Platform: RAG policy search, conversational analytics, intent routing, multi-turn FAQ orchestration, scorecards, and qualitative insights.")
    add_bullet(doc, "Production ML: Employee-attrition modeling with CatBoost, 122 engineered features, 83.48% accuracy, and 82% recall for at-risk employees.")
    add_bullet(doc, "Survey Intelligence: Theme score matrices, comparison dashboards, action-plan APIs, response-integrity controls, user-specific filter ordering, and production export tooling.")
    add_bullet(doc, "Automation: Voice generation and translation with SRT captions and video muxing, plus a supervised SEO agent with backup, restore, and search-optimization workflows.")

    add_section_heading(doc, "Leadership & Product Ownership")
    add_bullet(doc, "Designed and delivered a Performance Management System for NBFC clients and owned the product roadmap as Technical Product Manager across the engineering team.")
    add_bullet(doc, "Turns enterprise requirements into end-to-end releases spanning product architecture, AI, frontend, backend, cloud operations, security, compliance, and client integrations.")

    add_section_heading(doc, "Certifications & Compliance")
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(2)
    set_run(p.add_run("SOC 2 Type II"), size=9.15, bold=True, color=TOKENS["navy"])
    set_run(p.add_run(" - Technical lead for controls, evidence, VAPT, policies, and audit coordination.  "), size=9.0, color=TOKENS["ink"])
    set_run(p.add_run("CyberCube"), size=9.15, bold=True, color=TOKENS["navy"])
    set_run(p.add_run(" - Enterprise cyber-risk certification.  "), size=9.0, color=TOKENS["ink"])
    set_run(p.add_run("VPAT"), size=9.15, bold=True, color=TOKENS["navy"])
    set_run(p.add_run(" - Accessibility compliance supporting enterprise procurement."), size=9.0, color=TOKENS["ink"])

    add_section_heading(doc, "Education")
    add_role(doc, "B.E. in Information Technology", "2015 - 2019", "Bharati Vidyapeeth College of Engineering", "Navi Mumbai, India")

    # Keep document metadata professional and deterministic.
    props = doc.core_properties
    props.title = "Manish Ukirade - Senior AI & Full-Stack Engineer Resume"
    props.subject = "Resume updated with W.E. Matter engineering impact through August 2026"
    props.author = "Manish Ukirade"
    props.keywords = "Generative AI, RAG, Machine Learning, Full-Stack, Azure, Tech Lead"

    doc.save(OUTPUT)
    print(OUTPUT)


if __name__ == "__main__":
    build_resume()
