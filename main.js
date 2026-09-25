
/**
 * Gunaseelan Portfolio - Core Interactive Engine
 * 3rd Year B.Sc. Student | Kumbakonam
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeAndPalette();
    initCanvasParticles();
    initTypewriter();
    renderStats();
    renderSkills('all');
    renderCertificates();
    renderEducation();
    initGradeCalculator();
    initNavigation();
    initContactForm();
    initModals();
});

/* ==========================================================================
   1. THEME & COLOR PALETTE MANAGEMENT
   ========================================================================== */
function initThemeAndPalette() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const paletteBtns = document.querySelectorAll('.palette-btn');
    
    // Load saved preferences or defaults
    const savedTheme = localStorage.getItem('guna_theme') || 'dark';
    const savedPalette = localStorage.getItem('guna_palette') || 'violet';

    document.documentElement.setAttribute('data-theme', savedTheme);
    document.documentElement.setAttribute('data-palette', savedPalette);
    updateThemeIcon(savedTheme);

    // Active palette button marker
    paletteBtns.forEach(btn => {
        if (btn.getAttribute('data-color') === savedPalette) {
            btn.classList.add('active');
        }
        btn.addEventListener('click', () => {
            paletteBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const palette = btn.getAttribute('data-color');
            document.documentElement.setAttribute('data-palette', palette);
            localStorage.setItem('guna_palette', palette);
            showToast(`🎨 Switched to ${palette.toUpperCase()} theme palette!`);
        });
    });

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('guna_theme', newTheme);
            updateThemeIcon(newTheme);
            showToast(`☀️ Switched to ${newTheme.toUpperCase()} mode!`);
        });
    }
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('#theme-toggle i');
    if (icon) {
        if (theme === 'light') {
            icon.className = 'fa-solid fa-moon';
        } else {
            icon.className = 'fa-solid fa-sun';
        }
    }
}

/* ==========================================================================
   2. BACKGROUND PARTICLE CANVAS
   ========================================================================== */
function initCanvasParticles() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 45);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 2.5 + 1,
            color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 150 + 100)}, 255, ${Math.random() * 0.4 + 0.2})`
        });
    }

    function animateParticles() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.15 * (1 - dist / 130)})`;
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw and update particles
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();
}

/* ==========================================================================
   3. TYPEWRITER EFFECT IN HERO
   ========================================================================== */
function initTypewriter() {
    const typedTextElem = document.getElementById('typed-role');
    if (!typedTextElem) return;

    const roles = portfolioData.profile.roles;
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 90;
    const deleteSpeed = 45;
    const pauseTime = 1800;

    function type() {
        const currentRole = roles[roleIdx];

        if (isDeleting) {
            typedTextElem.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
        } else {
            typedTextElem.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
        }

        if (!isDeleting && charIdx === currentRole.length) {
            isDeleting = true;
            setTimeout(type, pauseTime);
            return;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            setTimeout(type, 300);
            return;
        }

        setTimeout(type, isDeleting ? deleteSpeed : typeSpeed);
    }

    type();
}

/* ==========================================================================
   4. RENDER STATS
   ========================================================================== */
function renderStats() {
    const statsContainer = document.getElementById('stats-grid');
    if (!statsContainer) return;

    statsContainer.innerHTML = portfolioData.stats.map(s => `
        <div class="stat-card glass-card">
            <div class="stat-icon" style="color: ${s.color};">
                <i class="${s.icon}"></i>
            </div>
            <div class="stat-number gradient-text">${s.count}</div>
            <div class="stat-label">${s.label}</div>
        </div>
    `).join('');
}

/* ==========================================================================
   5. RENDER SKILLS & TABS
   ========================================================================== */
function renderSkills(activeCategory = 'all') {
    const container = document.getElementById('skills-container');
    const tabsContainer = document.getElementById('skills-tabs');
    if (!container) return;

    // Filter skills
    const categories = portfolioData.skills;
    const displayedCategories = activeCategory === 'all' 
        ? categories 
        : categories.filter(c => c.category === activeCategory);

    let html = '';
    displayedCategories.forEach(cat => {
        cat.items.forEach(skill => {
            html += `
                <div class="skill-card glass-card">
                    <div class="skill-header">
                        <div class="skill-meta">
                            <div class="skill-icon-wrap" style="background: rgba(255,255,255,0.06); color: ${skill.color}">
                                <i class="${skill.icon}"></i>
                            </div>
                            <div>
                                <h4 class="skill-title">${skill.name}</h4>
                                <small style="color: var(--text-dim);">${cat.title}</small>
                            </div>
                        </div>
                        <span class="skill-level-badge">${skill.badge}</span>
                    </div>
                    <div class="skill-progress-bar">
                        <div class="skill-progress-fill" style="width: ${skill.level}%;"></div>
                    </div>
                    <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--text-muted); font-family:var(--font-mono);">
                        <span>Proficiency</span>
                        <span style="font-weight:700; color:var(--primary-light);">${skill.level}%</span>
                    </div>
                </div>
            `;
        });
    });

    container.innerHTML = html;

    // Tab buttons event listeners
    if (tabsContainer) {
        const tabs = tabsContainer.querySelectorAll('.skill-tab-btn');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderSkills(tab.getAttribute('data-cat'));
            });
        });
    }
}

/* ==========================================================================
   6. RENDER CERTIFICATES
   ========================================================================== */
function renderCertificates() {
    const certsContainer = document.getElementById('certificates-grid');
    if (!certsContainer) return;

    certsContainer.innerHTML = portfolioData.certificates.map(cert => {
        const isFeatured = cert.id === 'cert-naan-mudhalvan';
        const iconColorClass = cert.id === 'cert-naan-mudhalvan' ? 'emerald' : 
                               cert.id === 'cert-ms-excel' ? 'blue' : 
                               cert.id === 'cert-html-css' ? 'purple' : 'amber';

        return `
            <div class="cert-card glass-card ${isFeatured ? 'featured' : ''}">
                ${isFeatured ? '<div class="featured-ribbon">Flagship</div>' : ''}
                <div class="cert-top">
                    <div class="cert-icon-box ${iconColorClass}">
                        <i class="${cert.icon}"></i>
                    </div>
                    <span class="cert-badge-pill ${iconColorClass}">${cert.badge}</span>
                </div>
                <div class="cert-body">
                    <h3>${cert.title}</h3>
                    <div class="cert-issuer">
                        <i class="fa-solid fa-building-columns"></i>
                        <span>${cert.issuer}</span>
                    </div>
                    <p class="cert-desc">${cert.description}</p>
                    <div class="cert-skills-tags">
                        ${cert.keySkills.map(k => `<span class="cert-skill-tag"><i class="fa-solid fa-check" style="font-size:0.65rem; color:var(--accent-emerald);"></i> ${k}</span>`).join('')}
                    </div>
                </div>
                <div class="cert-footer">
                    <span class="cert-id"><i class="fa-solid fa-hashtag"></i> ${cert.certNo}</span>
                    <button class="btn btn-primary btn-sm view-cert-btn" data-cert-id="${cert.id}">
                        <i class="fa-solid fa-eye"></i> View Certificate
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Attach click handlers to certificate buttons
    document.querySelectorAll('.view-cert-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const certId = e.currentTarget.getAttribute('data-cert-id');
            openCertificateModal(certId);
        });
    });
}

/* ==========================================================================
   7. RENDER EDUCATION TIMELINE
   ========================================================================== */
function renderEducation() {
    const timelineElem = document.getElementById('education-timeline');
    if (!timelineElem) return;

    timelineElem.innerHTML = portfolioData.education.map((edu, idx) => {
        const side = idx % 2 === 0 ? 'left' : 'right';
        return `
            <div class="timeline-item ${side}">
                <div class="timeline-dot" style="border-color: ${edu.color}; box-shadow: 0 0 15px ${edu.color};"></div>
                <div class="timeline-card glass-card">
                    <span class="timeline-date"><i class="fa-regular fa-calendar-check"></i> ${edu.duration}</span>
                    <h3>${edu.degree}</h3>
                    <div class="timeline-inst"><i class="fa-solid fa-location-dot" style="color:${edu.color};"></i> ${edu.institution}</div>
                    <p>${edu.description}</p>
                </div>
            </div>
        `;
    }).join('');
}

/* ==========================================================================
   8. INTERACTIVE STUDENT GRADE & GPA CALCULATOR (MS EXCEL / JS TOOL)
   ========================================================================== */
function initGradeCalculator() {
    const calcContainer = document.getElementById('interactive-calc-wrapper');
    if (!calcContainer) return;

    let courses = [
        { name: "Web Development (HTML5 & CSS3)", credits: 4, marks: 92 },
        { name: "MS Excel & Office Automation", credits: 3, marks: 95 },
        { name: "Programming Fundamentals & VS Code", credits: 4, marks: 88 },
        { name: "Naan Mudhalvan Skill Practical Lab", credits: 3, marks: 94 },
        { name: "Quantitative Aptitude & Reasoning", credits: 3, marks: 85 }
    ];

    function renderCalcRows() {
        const tbody = document.getElementById('calc-tbody');
        if (!tbody) return;

        tbody.innerHTML = courses.map((c, i) => `
            <tr>
                <td>
                    <input type="text" class="calc-input course-name-input" data-index="${i}" value="${c.name}">
                </td>
                <td style="width: 110px;">
                    <input type="number" min="1" max="10" class="calc-input course-credits-input" data-index="${i}" value="${c.credits}">
                </td>
                <td style="width: 130px;">
                    <input type="number" min="0" max="100" class="calc-input course-marks-input" data-index="${i}" value="${c.marks}">
                </td>
                <td style="width: 100px; font-weight:700; font-family:var(--font-mono); text-align:center;">
                    <span class="grade-point-badge" id="gp-${i}">${calculateGradePoint(c.marks)}</span>
                </td>
                <td style="width: 70px; text-align:center;">
                    ${courses.length > 1 ? `<button class="btn-remove-row" data-index="${i}" title="Remove Subject" style="background:none; border:none; color:var(--accent-rose); cursor:pointer; font-size:1.1rem;"><i class="fa-solid fa-trash-can"></i></button>` : ''}
                </td>
            </tr>
        `).join('');

        attachCalcInputListeners();
        updateCalcTotals();
    }

    function calculateGradePoint(marks) {
        if (marks >= 90) return "10 (O)";
        if (marks >= 80) return "9 (A+)";
        if (marks >= 70) return "8 (A)";
        if (marks >= 60) return "7 (B+)";
        if (marks >= 50) return "6 (B)";
        return "0 (RA)";
    }

    function getGPAValue(marks) {
        if (marks >= 90) return 10;
        if (marks >= 80) return 9;
        if (marks >= 70) return 8;
        if (marks >= 60) return 7;
        if (marks >= 50) return 6;
        return 0;
    }

    function attachCalcInputListeners() {
        document.querySelectorAll('.course-name-input').forEach(inp => {
            inp.addEventListener('input', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                courses[idx].name = e.target.value;
            });
        });

        document.querySelectorAll('.course-credits-input').forEach(inp => {
            inp.addEventListener('input', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                courses[idx].credits = parseFloat(e.target.value) || 0;
                updateCalcTotals();
            });
        });

        document.querySelectorAll('.course-marks-input').forEach(inp => {
            inp.addEventListener('input', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                let val = parseFloat(e.target.value);
                if (val > 100) val = 100;
                courses[idx].marks = isNaN(val) ? 0 : val;
                document.getElementById(`gp-${idx}`).textContent = calculateGradePoint(courses[idx].marks);
                updateCalcTotals();
            });
        });

        document.querySelectorAll('.btn-remove-row').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.currentTarget.getAttribute('data-index'));
                courses.splice(idx, 1);
                renderCalcRows();
            });
        });
    }

    function updateCalcTotals() {
        let totalMarks = 0;
        let totalMax = courses.length * 100;
        let totalCredits = 0;
        let totalWeightedPoints = 0;

        courses.forEach(c => {
            totalMarks += c.marks;
            totalCredits += c.credits;
            totalWeightedPoints += getGPAValue(c.marks) * c.credits;
        });

        const percentage = totalMax > 0 ? ((totalMarks / totalMax) * 100).toFixed(1) : 0;
        const gpa = totalCredits > 0 ? (totalWeightedPoints / totalCredits).toFixed(2) : 0;

        let overallGrade = "O (Outstanding)";
        if (percentage < 90) overallGrade = "A+ (Distinction)";
        if (percentage < 80) overallGrade = "A (First Class)";
        if (percentage < 70) overallGrade = "B+ (Second Class)";
        if (percentage < 50) overallGrade = "Needs Improvement";

        document.getElementById('calc-total-marks').textContent = `${totalMarks} / ${totalMax}`;
        document.getElementById('calc-percentage').textContent = `${percentage}%`;
        document.getElementById('calc-gpa').textContent = `${gpa} / 10.0`;
        document.getElementById('calc-grade').textContent = overallGrade;
    }

    // Add subject button
    const addRowBtn = document.getElementById('calc-add-row');
    if (addRowBtn) {
        addRowBtn.addEventListener('click', () => {
            courses.push({ name: `Elective Subject ${courses.length + 1}`, credits: 3, marks: 85 });
            renderCalcRows();
            showToast("➕ Added new subject row!");
        });
    }

    // CSV / Excel Export Download
    const exportBtn = document.getElementById('calc-export-csv');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += "Subject Name,Credits,Marks Secured,Max Marks,Grade Point,Letter Grade\n";
            courses.forEach(c => {
                csvContent += `"${c.name}",${c.credits},${c.marks},100,${getGPAValue(c.marks)},${calculateGradePoint(c.marks)}\n`;
            });
            csvContent += `\nTotal Marks,${courses.reduce((a,b)=>a+b.marks,0)},Max Marks,${courses.length * 100}\n`;
            csvContent += `Percentage,${document.getElementById('calc-percentage').textContent}\n`;
            csvContent += `Cumulative GPA,${document.getElementById('calc-gpa').textContent}\n`;
            csvContent += `Final Academic Standing,${document.getElementById('calc-grade').textContent}\n`;

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "Gunaseelan_Academic_Grade_Report.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast("📊 Downloaded Grade Analysis Report (Excel CSV)!");
        });
    }

    renderCalcRows();
}

/* ==========================================================================
   9. MODALS (CERTIFICATE VIEWER, RESUME, KUMBAKONAM TOURISM)
   ========================================================================== */
function initModals() {
    const backdrop = document.getElementById('modal-backdrop');
    const closeBtn = document.getElementById('modal-close-btn');

    if (closeBtn && backdrop) {
        closeBtn.addEventListener('click', closeModal);
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Resume button trigger
    const resumeBtns = document.querySelectorAll('.open-resume-btn');
    resumeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openResumeModal();
        });
    });

    // Kumbakonam guide modal trigger
    const kumbakonamBtn = document.getElementById('open-kumbakonam-btn');
    if (kumbakonamBtn) {
        kumbakonamBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openKumbakonamModal();
        });
    }
}

function openModal(contentHtml) {
    const backdrop = document.getElementById('modal-backdrop');
    const modalContent = document.getElementById('modal-dynamic-content');
    if (!backdrop || !modalContent) return;

    modalContent.innerHTML = contentHtml;
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const backdrop = document.getElementById('modal-backdrop');
    if (!backdrop) return;
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
}

function openCertificateModal(certId) {
    const cert = portfolioData.certificates.find(c => c.id === certId) || portfolioData.certificates[0];
    const details = cert.certificateDetails;

    const html = `
        <div class="cert-modal-body">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;" class="modal-actions-bar">
                <span class="cert-badge-pill emerald"><i class="fa-solid fa-shield-halved"></i> Verified Digital Credential</span>
                <button onclick="window.print()" class="btn btn-primary btn-sm">
                    <i class="fa-solid fa-print"></i> Print / Save PDF
                </button>
            </div>

            <div class="digital-certificate">
                <div class="cert-watermark">GUNASEELAN CERTIFIED</div>
                
                <div class="cert-emblem-row">
                    <div class="cert-tn-seal">
                        <i class="fa-solid fa-landmark-dome cert-seal-icon"></i>
                        <div>
                            <div class="cert-authority-title">${cert.issuer}</div>
                            <small style="color:#64748b; font-family:var(--font-mono);">Certificate ID: ${cert.certNo}</small>
                        </div>
                    </div>
                    <div class="gold-seal-badge">
                        <i class="fa-solid fa-star" style="font-size:0.8rem; margin-bottom:2px;"></i>
                        <span>OFFICIAL</span>
                        <span>AWARD</span>
                    </div>
                </div>

                <div class="cert-title-area">
                    <h2 class="cert-main-title">CERTIFICATE OF COMPLETION</h2>
                    <p class="cert-pres-text">This is proudly presented to</p>
                </div>

                <div class="cert-recipient-container">
                    <div class="cert-recipient-name">${details.studentName}</div>
                </div>

                <p class="cert-desc-text">
                    For successfully fulfilling all prescribed academic and practical requirements for the course 
                    <span class="cert-course-highlight">"${details.courseName}"</span>, 
                    administered through <span class="cert-course-highlight">${details.college}</span>, 
                    under the <span class="cert-course-highlight">${cert.title}</span> framework.
                </p>

                <div style="display:flex; justify-content:center; gap:2rem; margin-bottom:1.5rem; font-family:var(--font-mono); font-size:0.85rem; color:#475569;">
                    <div><strong>Stream:</strong> ${details.stream}</div>
                    <div><strong>Duration:</strong> ${details.duration}</div>
                    <div><strong>Honors:</strong> ${cert.honors}</div>
                </div>

                <div class="cert-signatures-row">
                    <div class="cert-signature-box">
                        <div style="font-family: 'Brush Script MT', cursive; font-size: 1.5rem; color:#1e3a8a; margin-bottom:0.2rem;">K. Gunaseelan</div>
                        <div class="cert-sign-line"></div>
                        <div class="cert-sign-title">Student Signature (Gunaseelan)</div>
                    </div>

                    <div style="text-align:center;">
                        <i class="fa-solid fa-qrcode" style="font-size:3rem; color:#0f172a;"></i>
                        <div style="font-size:0.65rem; font-family:var(--font-mono); color:#64748b; margin-top:0.25rem;">Scan to Verify</div>
                    </div>

                    <div class="cert-signature-box">
                        <div style="font-family: 'Brush Script MT', cursive; font-size: 1.5rem; color:#047857; margin-bottom:0.2rem;">Authorized Dean</div>
                        <div class="cert-sign-line"></div>
                        <div class="cert-sign-title">${details.authorizedSignatory}</div>
                    </div>
                </div>
            </div>
        </div>
    `;

    openModal(html);
}

function openResumeModal() {
    const html = `
        <div style="padding: 2.5rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;" class="modal-actions-bar">
                <span class="section-tag"><i class="fa-solid fa-file-invoice"></i> Professional Resume Preview</span>
                <button onclick="window.print()" class="btn btn-primary btn-sm">
                    <i class="fa-solid fa-print"></i> Print / Download PDF
                </button>
            </div>

            <div class="resume-sheet">
                <div class="resume-header">
                    <div>
                        <h1>GUNASEELAN</h1>
                        <div class="resume-sub">3rd Year B.Sc. Student | Aspiring Web & Software Professional</div>
                        <div style="margin-top:0.35rem; color:#475569; font-size:0.85rem;"><i class="fa-solid fa-location-dot"></i> Kumbakonam, Tamil Nadu, India</div>
                    </div>
                    <div class="resume-contacts-grid">
                        <div><i class="fa-solid fa-envelope"></i> gunaseelan.official@example.com</div>
                        <div><i class="fa-solid fa-phone"></i> +91 98765 43210</div>
                        <div><i class="fa-brands fa-linkedin"></i> linkedin.com/in/gunaseelan-bsc</div>
                        <div><i class="fa-solid fa-certificate"></i> Naan Mudhalvan Certified</div>
                    </div>
                </div>

                <div class="resume-section-title"><i class="fa-solid fa-user"></i> Professional Summary</div>
                <p>Ambitious and disciplined 3rd Year B.Sc. student based in Kumbakonam with strong practical foundations in Web Development (HTML5, CSS3, JavaScript) and Microsoft Office Automation (MS Excel formulas, data modeling, reporting). Certified under the Government of Tamil Nadu's Naan Mudhalvan Skill Initiative. Eager to contribute technical curiosity, quick-learning ability, and problem-solving skills to entry-level software/analyst roles.</p>

                <div class="resume-section-title"><i class="fa-solid fa-graduation-cap"></i> Education</div>
                <div class="resume-item">
                    <div class="resume-item-top">
                        <span>Bachelor of Science (B.Sc.) — 3rd Year (Final Year)</span>
                        <span>2023 - Present</span>
                    </div>
                    <div class="resume-inst">College in Kumbakonam, Tamil Nadu</div>
                    <div>Key subjects: Computational Fundamentals, Data Analysis, Web Technologies, Scientific Methodology.</div>
                </div>

                <div class="resume-item">
                    <div class="resume-item-top">
                        <span>Higher Secondary Certificate (HSC / 12th)</span>
                        <span>Completed (First Class)</span>
                    </div>
                    <div class="resume-inst">State Board School, Kumbakonam</div>
                </div>

                <div class="resume-section-title"><i class="fa-solid fa-award"></i> Certifications & Credentials</div>
                <div class="resume-item">
                    <div class="resume-item-top">
                        <span>Naan Mudhalvan Skill Development Program Certification</span>
                        <span>2024</span>
                    </div>
                    <div class="resume-inst">Tamil Nadu Skill Development Corporation (TNSDC) & Govt. of Tamil Nadu</div>
                    <div>Finished intensive skilling curriculum in digital competency, modern web essentials, and corporate readiness.</div>
                </div>

                <div class="resume-item">
                    <div class="resume-item-top">
                        <span>Microsoft Excel & Office Suite Proficiency</span>
                        <span>2024</span>
                    </div>
                    <div class="resume-inst">Professional Training Institute</div>
                    <div>Formulas (VLOOKUP, XLOOKUP, IF), Pivot Tables, Charts, Data Entry, and Word/PowerPoint documentation.</div>
                </div>

                <div class="resume-item">
                    <div class="resume-item-top">
                        <span>HTML5 & CSS3 Responsive Web Architecture</span>
                        <span>2024</span>
                    </div>
                    <div class="resume-inst">Web Development Guild</div>
                    <div>Frontend markup, Flexbox, Grid, Media Queries, UI Glassmorphism, and VS Code developer workflows.</div>
                </div>

                <div class="resume-section-title"><i class="fa-solid fa-laptop-code"></i> Technical & Interpersonal Skills</div>
                <p><strong>Web Technologies:</strong> HTML5, CSS3, Responsive Design, CSS Flexbox & Grid, JavaScript Basics, UI Design</p>
                <p><strong>Office & Tools:</strong> MS Excel (Formulas, Pivot Tables, Charts), MS Word, PowerPoint, Visual Studio Code (MS Code), Git Basics</p>
                <p><strong>Soft Skills:</strong> Analytical Problem Solving, Fast Learner, Collaborative Team Player, Disciplined Time Management</p>
                <p><strong>Languages:</strong> Tamil (Native), English (Professional Working Proficiency)</p>
            </div>
        </div>
    `;
    openModal(html);
}

function openKumbakonamModal() {
    const html = `
        <div style="padding: 2.5rem;">
            <div style="margin-bottom:1.5rem;">
                <span class="section-tag"><i class="fa-solid fa-city"></i> My Hometown Showcase</span>
                <h2 style="font-size:2rem; font-weight:800; margin-top:0.5rem;" class="gradient-text">Kumbakonam — The Temple City</h2>
                <p style="color:var(--text-muted); font-size:0.95rem;">Exploring the rich heritage, classical art, and landmark temples of my home city in Thanjavur district, Tamil Nadu.</p>
            </div>

            <div style="border-radius:var(--radius-lg); overflow:hidden; margin-bottom:2rem; height:240px;">
                <img src="assets/images/kumbakonam.jpg" alt="Kumbakonam Temples" style="width:100%; height:100%; object-fit:cover;">
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:1.25rem;">
                ${portfolioData.kumbakonamHighlights.map(h => `
                    <div class="glass-card" style="padding:1.25rem; border-radius:var(--radius-md);">
                        <span class="skill-level-badge" style="margin-bottom:0.5rem; display:inline-block;">${h.tag}</span>
                        <h4 style="font-size:1.1rem; font-weight:700; margin-bottom:0.35rem;">${h.name}</h4>
                        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5;">${h.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    openModal(html);
}

/* ==========================================================================
   10. NAVIGATION & SCROLLSPY
   ========================================================================== */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const backToTopBtn = document.getElementById('back-to-top');

    // Scroll listener for sticky navbar & back to top
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Scrollspy active class update
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
        });

        // Close on link click
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            });
        });
    }
}

/* ==========================================================================
   11. CONTACT FORM HANDLER
   ========================================================================== */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        const submitBtn = form.querySelector('button[type="submit"]');

        if (!name || !email || !message) {
            showToast("⚠️ Please fill in all required fields!");
            return;
        }

        // Animate button
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Sending message...`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            form.reset();
            showToast(`🎉 Thank you, ${name}! Your message has been received.`);
        }, 1200);
    });
}

/* ==========================================================================
   12. TOAST NOTIFICATION UTILITY
   ========================================================================== */
function showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        toast.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            if (toast.parentNode) toast.parentNode.removeChild(toast);
        }, 300);
    }, 3500);
}


