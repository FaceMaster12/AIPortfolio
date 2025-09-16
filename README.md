from docx import Document

# Create a new document
doc = Document()

# Title
doc.add_heading('🌐 Responsive Portfolio Website', level=1)

# Intro
doc.add_paragraph(
    "A responsive personal portfolio website built with React, HTML, CSS, and modern web technologies. "
    "It showcases my projects, technical skills, and career highlights in a clean and accessible way."
)

# Features
doc.add_heading('✨ Features', level=2)
features = [
    "📱 Responsive design (works seamlessly on desktop & mobile)",
    "💼 Project showcase with live demos and source code",
    "👤 About Me, Skills, and Contact sections",
    "⚡ Built using modern frontend tools",
]
for f in features:
    doc.add_paragraph(f, style="List Bullet")

# Tech Stack
doc.add_heading('🛠 Tech Stack', level=2)
doc.add_paragraph("Frontend: React, HTML, CSS, JavaScript")
doc.add_paragraph("Tools & Platforms: Google AI Studio, GitHub, VS Code, Vercel")

# Live Demo
doc.add_heading('🚀 Live Demo', level=2)
doc.add_paragraph("🔗 View Portfolio: https://ai-portfolio-steel.vercel.app/")

# Getting Started
doc.add_heading('⚙️ Getting Started', level=2)

doc.add_heading('Prerequisites', level=3)
doc.add_paragraph("Install Node.js: https://nodejs.org/")
doc.add_paragraph("A valid GEMINI_API_KEY (for AI features)")

doc.add_heading('Installation', level=3)
steps = [
    "Clone the repository:\n   git clone https://github.com/your-username/your-repo.git\n   cd your-repo",
    "Install dependencies:\n   npm install",
    "Create a .env.local file and set your Gemini API key:\n   GEMINI_API_KEY=your_api_key_here",
    "Run the app locally:\n   npm run dev",
]
for s in steps:
    doc.add_paragraph(s, style="List Number")

# Contact
doc.add_heading('📬 Contact', level=2)
doc.add_paragraph("Email: mokoenababyface105@gmail.com")
doc.add_paragraph("LinkedIn: https://www.linkedin.com/in/babyface-mokoena-62a796208/")

# Save file
file_path = "/mnt/data/Portfolio_README.docx"
doc.save(file_path)

file_path
