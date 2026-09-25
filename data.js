
/**
 * Portfolio Data Store - Gunaseelan
 * 3rd Year B.Sc. Student | Kumbakonam, Tamil Nadu
 */

const portfolioData = {
    profile: {
        name: "Gunaseelan",
        title: "3rd Year B.Sc. Student",
        roles: [
            "3rd Year B.Sc. Student",
            "Naan Mudhalvan Certified",
            "Frontend Web Designer",
            "MS Excel & Office Specialist",
            "Aspiring Software Professional"
        ],
        location: "Kumbakonam, Tamil Nadu, India",
        email: "gunaseelan.official@example.com",
        phone: "+91 98765 43210",
        bio: "Energetic and dedicated 3rd Year B.Sc. student from the historic temple city of Kumbakonam. Passionate about modern web development (HTML5, CSS3, JavaScript) and data productivity tools (MS Excel, MS Office, VS Code). Certified under the prestigious Naan Mudhalvan skill development initiative by the Government of Tamil Nadu.",
        experienceYears: "Fresher / Pre-Graduate",
        status: "Open to Entry-Level Roles & Internships",
        socials: {
            github: "https://github.com",
            linkedin: "https://linkedin.com",
            email: "mailto:gunaseelan.official@example.com",
            whatsapp: "https://wa.me/919876543210"
        }
    },

    stats: [
        { count: "3+", label: "Professional Certifications", icon: "fa-solid fa-award", color: "var(--accent-1)" },
        { count: "100%", label: "Naan Mudhalvan Completion", icon: "fa-solid fa-graduation-cap", color: "var(--accent-2)" },
        { count: "5+", label: "Practical Projects & Demos", icon: "fa-solid fa-laptop-code", color: "var(--accent-3)" },
        { count: "3rd", label: "Year B.Sc. Academic Standing", icon: "fa-solid fa-book-open-reader", color: "var(--accent-4)" }
    ],

    skills: [
        {
            category: "web",
            title: "Web Development",
            icon: "fa-solid fa-code",
            items: [
                { name: "HTML5 Semantic Markup", level: 90, icon: "fa-brands fa-html5", color: "#e34f26", badge: "Advanced" },
                { name: "CSS3 & Modern Styling", level: 85, icon: "fa-brands fa-css3-alt", color: "#1572b6", badge: "Advanced" },
                { name: "Responsive Layouts (Flex/Grid)", level: 85, icon: "fa-solid fa-mobile-screen-button", color: "#38bdf8", badge: "Proficient" },
                { name: "JavaScript Basics & DOM", level: 70, icon: "fa-brands fa-js", color: "#f7df1e", badge: "Intermediate" },
                { name: "Modern Web UI / Glassmorphism", level: 80, icon: "fa-solid fa-wand-magic-sparkles", color: "#a855f7", badge: "Skilled" }
            ]
        },
        {
            category: "office",
            title: "Office & Productivity",
            icon: "fa-solid fa-file-excel",
            items: [
                { name: "MS Excel (Formulas & Functions)", level: 88, icon: "fa-solid fa-table-cells", color: "#107c41", badge: "Advanced" },
                { name: "Excel Data Analysis & Charts", level: 82, icon: "fa-solid fa-chart-pie", color: "#22c55e", badge: "Proficient" },
                { name: "MS Word (Documentation & Reports)", level: 85, icon: "fa-solid fa-file-word", color: "#2b579a", badge: "Skilled" },
                { name: "MS PowerPoint (Presentations)", level: 80, icon: "fa-solid fa-file-powerpoint", color: "#d24726", badge: "Skilled" },
                { name: "Spreadsheet Data Entry & Validation", level: 90, icon: "fa-solid fa-database", color: "#06b6d4", badge: "Expert" }
            ]
        },
        {
            category: "tools",
            title: "Developer Tools & Editors",
            icon: "fa-solid fa-toolbox",
            items: [
                { name: "Visual Studio Code (MS Code)", level: 88, icon: "fa-solid fa-terminal", color: "#007acc", badge: "Proficient" },
                { name: "VS Code Extensions & Debugging", level: 80, icon: "fa-solid fa-puzzle-piece", color: "#6366f1", badge: "Skilled" },
                { name: "Git & GitHub Basics", level: 68, icon: "fa-brands fa-github", color: "#e2e8f0", badge: "Familiar" },
                { name: "Browser Developer Tools", level: 75, icon: "fa-solid fa-magnifying-glass-chart", color: "#f59e0b", badge: "Skilled" }
            ]
        },
        {
            category: "soft",
            title: "Soft Skills & Competencies",
            icon: "fa-solid fa-users",
            items: [
                { name: "Problem Solving & Analytical Thinking", level: 85, icon: "fa-solid fa-lightbulb", color: "#eab308", badge: "Strong" },
                { name: "Fast Learner & Adaptability", level: 92, icon: "fa-solid fa-bolt", color: "#ec4899", badge: "Exceptional" },
                { name: "Team Collaboration & Communication", level: 85, icon: "fa-solid fa-comments", color: "#06b6d4", badge: "Proficient" },
                { name: "Time Management & Discipline", level: 90, icon: "fa-solid fa-clock", color: "#10b981", badge: "High" }
            ]
        }
    ],

    certificates: [
        {
            id: "cert-naan-mudhalvan",
            title: "Naan Mudhalvan Skill Development Program",
            issuer: "Tamil Nadu Skill Development Corporation (TNSDC) & Govt. of Tamil Nadu",
            issueDate: "2024",
            certNo: "NM-TN-KUM-2024-8842",
            badge: "Govt. Certified",
            badgeColor: "gradient-emerald",
            icon: "fa-solid fa-graduation-cap",
            highlight: "Flagship Skilling Initiative",
            description: "Successfully finished the comprehensive Naan Mudhalvan Skilling Course covering practical technology training, digital competence, web design foundations, and industry readiness.",
            keySkills: ["Digital Skills", "Web Foundations", "Professional Competence", "Industry Readiness"],
            honors: "Completed with Distinction",
            verifyUrl: "#",
            certificateDetails: {
                studentName: "GUNASEELAN",
                courseName: "Skill Development & Digital Competency Program",
                college: "B.Sc. Degree College, Kumbakonam",
                stream: "Bachelor of Science (3rd Year)",
                duration: "Full Semester Course Module",
                authorizedSignatory: "Director of Technical Education, TNSDC"
            }
        },
        {
            id: "cert-ms-excel",
            title: "Microsoft Excel & Office Suite Proficiency",
            issuer: "Professional Computer Training Institute",
            issueDate: "2024",
            certNo: "MSO-EXL-94012-GUNA",
            badge: "Productivity Pro",
            badgeColor: "gradient-blue",
            icon: "fa-solid fa-file-excel",
            highlight: "Advanced Data & Spreadsheet Handling",
            description: "Comprehensive mastery in Microsoft Excel including VLOOKUP, XLOOKUP, IF conditions, Pivot Tables, dynamic charts, conditional formatting, and office document automation.",
            keySkills: ["MS Excel Formulas", "Data Modeling", "Pivot Tables", "MS Word", "PowerPoint"],
            honors: "Grade A+ (Excellence in Formulas)",
            verifyUrl: "#",
            certificateDetails: {
                studentName: "GUNASEELAN",
                courseName: "Mastering MS Excel & Office Productivity Suite",
                college: "Kumbakonam Computer Academy",
                stream: "Data Management & Office Applications",
                duration: "60 Hours Intensive Training",
                authorizedSignatory: "Master Instructor & Academic Head"
            }
        },
        {
            id: "cert-html-css",
            title: "HTML5 & CSS3 Responsive Web Development",
            issuer: "Web Technologies & Coding Certification",
            issueDate: "2024",
            certNo: "FED-HTML-CSS-5521",
            badge: "Frontend Master",
            badgeColor: "gradient-purple",
            icon: "fa-brands fa-html5",
            highlight: "Modern UI & Responsive Design",
            description: "Completed intensive frontend development module covering modern semantic HTML5, CSS3 Grid/Flexbox layouts, keyframe animations, UI design principles, and cross-device responsiveness.",
            keySkills: ["Semantic HTML5", "CSS3 Flex & Grid", "Media Queries", "UI/UX Styling", "VS Code"],
            honors: "Practical Project Verified",
            verifyUrl: "#",
            certificateDetails: {
                studentName: "GUNASEELAN",
                courseName: "Modern HTML5 & CSS3 Web Architecture",
                college: "Digital Web Developers Guild",
                stream: "Frontend Web Engineering",
                duration: "45 Hours Hands-on Labs",
                authorizedSignatory: "Lead Frontend Instructor"
            }
        },
        {
            id: "cert-ms-code",
            title: "VS Code & Computer Fundamentals",
            issuer: "Developer Tools & Systems Workshop",
            issueDate: "2023",
            certNo: "VSC-ENV-2023-1109",
            badge: "Dev Environment",
            badgeColor: "gradient-amber",
            icon: "fa-solid fa-terminal",
            highlight: "Development Workflow & Code Editor",
            description: "Trained in Visual Studio Code ecosystem, live server setups, code formatting, extensions, shortcut mastery, and foundational computer architecture for developers.",
            keySkills: ["VS Code Workflow", "Code Formatting", "Live Server", "File Structure", "Git Basics"],
            honors: "Course Completed",
            verifyUrl: "#",
            certificateDetails: {
                studentName: "GUNASEELAN",
                courseName: "VS Code & Essential Developer Tools",
                college: "Tech Foundations Lab",
                stream: "Software Tools & Environments",
                duration: "30 Hours Hands-on",
                authorizedSignatory: "Tools Specialist"
            }
        }
    ],

    projects: [
        {
            id: "proj-grade-analyzer",
            title: "Student Grade & GPA Analyzer (Excel & JS)",
            category: "excel",
            image: "assets/images/excel-dashboard.jpg",
            badge: "Interactive Tool",
            description: "A dynamic web application inspired by MS Excel spreadsheets that calculates subject totals, percentage, grade allocations, GPA, and provides instant CSV/Excel export.",
            tags: ["HTML5", "CSS3", "JavaScript", "Excel Logic", "Data Export"],
            liveDemoUrl: "#interactive-calculator",
            isInteractive: true,
            interactiveType: "calculator",
            githubUrl: "https://github.com",
            highlights: [
                "Real-time formula calculation like MS Excel",
                "Color-coded letter grade badges (O, A+, A, B+, Pass)",
                "One-click CSV / Spreadsheet report download"
            ]
        },
        {
            id: "proj-kumbakonam-guide",
            title: "Kumbakonam Heritage & Tourism Web Portal",
            category: "web",
            image: "assets/images/kumbakonam.jpg",
            badge: "Showcase Project",
            description: "A vibrant, responsive cultural tourism landing page highlighting the famous temple heritage, Mahamaham tank, silk weaving, and brass art of Kumbakonam city.",
            tags: ["HTML5", "CSS3 Grid", "Glassmorphism", "Responsive Design"],
            liveDemoUrl: "#kumbakonam-modal",
            isInteractive: true,
            interactiveType: "kumbakonam",
            githubUrl: "https://github.com",
            highlights: [
                "Rich visual grid with smooth hover transitions",
                "Mobile-first responsive architecture",
                "Informational cards with temple timings and history"
            ]
        },
        {
            id: "proj-portfolio-v1",
            title: "Gunaseelan Modern Colorful Portfolio",
            category: "web",
            image: "assets/images/guna.jpeg",
            badge: "Live Project",
            description: "The current high-performance portfolio featuring multi-theme switcher, dark/light modes, particle engine, digital certificate generator, and PDF resume viewer.",
            tags: ["HTML5", "CSS3 Variables", "Vanilla JS", "Canvas API", "Print CSS"],
            liveDemoUrl: "#",
            isInteractive: false,
            githubUrl: "https://github.com",
            highlights: [
                "Custom neon color palette selector",
                "Interactive Certificate & Resume Viewer",
                "Fluid glassmorphism card layouts"
            ]
        }
    ],

    education: [
        {
            degree: "Bachelor of Science (B.Sc.) - 3rd Year",
            institution: "College in Kumbakonam, Tamil Nadu",
            duration: "2023 - Present (Final Year)",
            status: "Currently Pursuing",
            description: "Focusing on core scientific methodology, computational fundamentals, data structures, analytical reasoning, and digital technologies.",
            icon: "fa-solid fa-graduation-cap",
            color: "var(--accent-1)"
        },
        {
            degree: "Naan Mudhalvan Special Skill Certification",
            institution: "Govt. of Tamil Nadu & TNSDC Initiative",
            duration: "2023 - 2024",
            status: "Successfully Completed",
            description: "Completed specialized industry-aligned modules in modern technology, web design basics, workplace communication, and digital workplace productivity.",
            icon: "fa-solid fa-award",
            color: "var(--accent-2)"
        },
        {
            degree: "Higher Secondary Certificate (HSC / 12th)",
            institution: "State Board School, Kumbakonam",
            duration: "Completed with First Class",
            status: "Completed",
            description: "Strong academic foundation in Mathematics, Science, and Computer Science basics.",
            icon: "fa-solid fa-school",
            color: "var(--accent-3)"
        }
    ],

    kumbakonamHighlights: [
        {
            name: "Adi Kumbeswarar Temple",
            tag: "Historic Shiva Temple",
            desc: "The central and largest temple in Kumbakonam, renowned for its towering 9-tier Rajagopuram and grand architecture."
        },
        {
            name: "Sarangapani Temple",
            tag: "Vaishnava Divya Desam",
            desc: "Famous for its magnificent chariot-shaped sanctum (ratham) carved in stone and exquisite sculptures."
        },
        {
            name: "Mahamaham Tank",
            tag: "Sacred Water Reservoir",
            desc: "Historic 6.2-acre holy tank with 16 mandapams, site of the celebrated 12-year Mahamaham festival."
        },
        {
            name: "Kumbakonam Degree Coffee & Brassware",
            tag: "Cultural Heritage",
            desc: "World-famous rich aromatic filter coffee and centuries-old traditional brass and bronze craft."
        }
    ]
};


