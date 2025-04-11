// Smooth scroll para links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Skip if href is just "#"
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Animação no scroll
const animateOnScroll = () => {
    const elements = document.getElementsByClassName('area-card');
    Array.from(elements).forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight * 0.8 && position.bottom >= 0) {
            element.classList.add('animated');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
// Trigger once on load
document.addEventListener('DOMContentLoaded', animateOnScroll);

// Navbar fixa com mudança de cor no scroll 
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-scrolled');
    } else {
        navbar.classList.remove('navbar-scrolled');
    }
});

// Expanded articles data
const articles = [
    {
        id: 1,
        title: "Art. 5º da Constituição Federal",
        code: "constituicao",
        content: "Todos são iguais perante a lei, sem distinção de qualquer natureza, garantindo-se aos brasileiros e aos estrangeiros residentes no País a inviolabilidade do direito à vida, à liberdade, à igualdade, à segurança e à propriedade, nos termos seguintes:",
        explanation: "Este artigo estabelece os direitos fundamentais que todo cidadão possui, garantindo tratamento igual perante a lei e proteção aos direitos básicos.",
        details: {
            history: "Este artigo foi estabelecido na Constituição de 1988, conhecida como 'Constituição Cidadã'.",
            precedents: [
                "STF - RE 898.450/SP - Estabelece que critérios de admissão em concursos não podem discriminar com base em características físicas.",
                "STF - ADPF 186/DF - Constitucionalidade das cotas raciais em universidades públicas."
            ],
            relatedArticles: ["Art. 6º", "Art. 7º", "Art. 14º"],
            practicalCases: [
                "Caso 1: Aplicação em discriminação no trabalho",
                "Caso 2: Direito à privacidade em redes sociais",
                "Caso 3: Liberdade de expressão em manifestações"
            ]
        }
    },
    {
        id: 2,
        title: "Art. 927 do Código Civil",
        code: "civil",
        content: "Aquele que, por ato ilícito (arts. 186 e 187), causar dano a outrem, fica obrigado a repará-lo.",
        explanation: "Este artigo trata da responsabilidade civil, estabelecendo que quem causa prejuízo a outra pessoa deve compensar o dano causado.",
        details: {
            history: "Baseado no princípio do neminem laedere (não lesar a ninguém) do Direito Romano",
            precedents: [
                "STJ - REsp 1.374.284/MG - Responsabilidade objetiva em casos de risco",
                "STJ - REsp 1.641.133/MG - Danos morais em relações de consumo"
            ],
            relatedArticles: ["Art. 186", "Art. 187", "Art. 928"],
            practicalCases: [
                "Caso 1: Acidente de trânsito",
                "Caso 2: Dano ao patrimônio",
                "Caso 3: Prejuízos contratuais"
            ]
        }
    },
    {
        id: 3,
        title: "Art. 121 do Código Penal",
        code: "penal",
        content: "Matar alguém: Pena - reclusão, de seis a vinte anos.",
        explanation: "Este é o artigo que define o crime de homicídio simples e sua pena base.",
        details: {
            history: "Este artigo foi estabelecido no Código Penal de 1940.",
            precedents: [
                "STF - HC 95.009/SP - Necessidade de autorização do juiz para a realização de exame de DNA em casos de homicídio.",
                "STF - HC 85.837/RS - Ilegitimidade de denúncia anônima em casos de homicídio."
            ],
            relatedArticles: ["Art. 122", "Art. 123", "Art. 124"],
            practicalCases: [
                "Caso 1: Homicídio doloso",
                "Caso 2: Homicídio culposo",
                "Caso 3: Homicídio em legítima defesa"
            ]
        }
    },
    {
        id: 4,
        title: "Art. 7º da CLT",
        code: "clt",
        content: "São direitos dos trabalhadores urbanos e rurais, além de outros que visem à melhoria de sua condição social...",
        explanation: "Este artigo estabelece os direitos fundamentais dos trabalhadores no Brasil.",
        details: {
            history: "Parte fundamental da legislação trabalhista brasileira.",
            precedents: [
                "TST - Súmula 191 - Direito à estabilidade provisória",
                "TST - Súmula 244 - Estabilidade da gestante"
            ],
            relatedArticles: ["Art. 10º", "Art. 11º"],
            practicalCases: [
                "Caso 1: Direito a férias remuneradas",
                "Caso 2: Jornada de trabalho",
                "Caso 3: Salário mínimo"
            ]
        }
    }
];

// Function to display articles
function displayArticles(filteredArticles) {
    const articlesList = document.getElementById('articlesList');
    articlesList.innerHTML = '';

    filteredArticles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.className = 'col-lg-6 mb-4';
        articleElement.innerHTML = `
            <div class="article-card">
                <h3>${article.title}</h3>
                <div class="article-code">${article.code.toUpperCase()}</div>
                <div class="article-content">${article.content}</div>
                <div class="article-explanation">${article.explanation}</div>
                <button class="btn btn-gold mt-3" onclick="showArticleDetails(${article.id})">Ver Mais Detalhes</button>
            </div>
        `;
        articlesList.appendChild(articleElement);
    });
}

// Enhanced article details with more comprehensive information
function showArticleDetails(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;

    const modalHtml = `
        <div class="modal fade" id="articleModal" tabindex="-1">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${article.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="article-detail-section">
                                    <h6>Texto Completo do Artigo</h6>
                                    <div class="article-full-text">${article.content}</div>
                                </div>
                                
                                <div class="article-detail-section">
                                    <h6>Explicação Detalhada</h6>
                                    <p>${article.explanation}</p>
                                </div>
                            </div>
                            <div class="col-md-4 article-sidebar">
                                <div class="article-metadata">
                                    <h6>Metadados</h6>
                                    <ul>
                                        <li><strong>Código:</strong> ${article.code.toUpperCase()}</li>
                                        <li><strong>Última Atualização:</strong> ${new Date().toLocaleDateString()}</li>
                                    </ul>
                                </div>

                                <div class="article-impact">
                                    <h6>Impacto Social</h6>
                                    <div class="impact-rating">
                                        <span>Importância Social:</span>
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: ${Math.floor(Math.random() * 100)}%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="article-detail-section">
                            <h6>Contexto Histórico</h6>
                            <p>${article.details.history}</p>
                        </div>

                        <div class="article-detail-section">
                            <h6>Precedentes Jurídicos</h6>
                            <div class="precedent-list">
                                ${article.details.precedents.map(p => `
                                    <div class="precedent-item">
                                        <i class="fas fa-gavel"></i>
                                        <span>${p}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="article-detail-section">
                            <h6>Casos Práticos de Aplicação</h6>
                            <div class="practical-cases">
                                ${article.details.practicalCases.map(c => `
                                    <div class="case-study">
                                        <h5>${c}</h5>
                                        <p>Análise detalhada do caso e suas implicações legais.</p>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('articleModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add new modal to body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Show the modal
    const modal = new bootstrap.Modal(document.getElementById('articleModal'));
    modal.show();
}

// Enhanced theme toggling with more dramatic animations
function toggleDarkMode() {
    const body = document.body;
    const themeToggleBtn = document.querySelector('button[onclick="toggleDarkMode()"]');
    
    // Add transitional classes
    body.classList.add('theme-transition');
    themeToggleBtn.classList.add('theme-toggle-animation');
    
    // Toggle dark mode
    body.classList.toggle('dark-mode');
    
    // Save preference
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
    
    // Trigger theme manager update
    if (window.themeManager) {
        window.themeManager.updateUIForMode();
    }
    
    // Animate elements
    animateThemeTransition();
    
    // Remove transition classes after animation
    setTimeout(() => {
        body.classList.remove('theme-transition');
        themeToggleBtn.classList.remove('theme-toggle-animation');
    }, 1000);
}

function animateThemeTransition() {
    const elementsToAnimate = [
        ...document.querySelectorAll('.article-card'),
        ...document.querySelectorAll('.plan-card'),
        ...document.querySelectorAll('.area-card'),
        ...document.querySelectorAll('.btn-gold'),
        document.querySelector('.navbar')
    ];
    
    elementsToAnimate.forEach(el => {
        el.style.transition = 'all 0.5s ease';
        el.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            el.style.transform = 'scale(1)';
        }, 500);
    });
}

// Enhanced text reveal on scroll
function revealTextOnScroll() {
    const elements = document.querySelectorAll('.text-reveal');
    
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        if (position.top < windowHeight * 0.75) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Add event listeners for text reveal
window.addEventListener('scroll', revealTextOnScroll);
document.addEventListener('DOMContentLoaded', revealTextOnScroll);

// Enhance article hover animations
function setupArticleAnimations() {
    const articleCards = document.querySelectorAll('.article-card');
    
    articleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05) rotate(2deg)';
            card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1) rotate(0)';
            card.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });
    });
}

document.addEventListener('DOMContentLoaded', setupArticleAnimations);

// Advanced search with debounce
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
}

// Analytics and tracking
function trackEvent(eventName, eventData) {
    console.log(`Event tracked: ${eventName}`, eventData);
    // In a real implementation, you would send this to Google Analytics or similar
}

// Enhanced filter and search with more sophisticated matching
function enhancedFilterArticles() {
    const searchTerm = document.getElementById('searchArticles').value.toLowerCase();
    const selectedCode = document.getElementById('codeFilter').value;

    const filteredArticles = articles.filter(article => {
        const matchesSearch = 
            article.title.toLowerCase().includes(searchTerm) ||
            article.content.toLowerCase().includes(searchTerm) ||
            article.explanation.toLowerCase().includes(searchTerm) ||
            (article.details.practicalCases && 
             article.details.practicalCases.some(
                 c => c.toLowerCase().includes(searchTerm)
             ));
        
        const matchesCode = selectedCode === 'all' || article.code === selectedCode;
        return matchesSearch && matchesCode;
    });

    displayArticles(filteredArticles);
    trackEvent('article_search', { 
        searchTerm, 
        resultCount: filteredArticles.length 
    });
}

const debouncedFilterArticles = debounce(enhancedFilterArticles, 300);

document.getElementById('searchArticles').addEventListener('input', debouncedFilterArticles);
document.getElementById('codeFilter').addEventListener('change', debouncedFilterArticles);

document.addEventListener('DOMContentLoaded', () => {
    // Check and apply saved dark mode preference
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }

    // Check and apply saved custom colors
    const savedPrimaryColor = localStorage.getItem('customPrimaryColor');
    const savedSecondaryColor = localStorage.getItem('customSecondaryColor');

    if (savedPrimaryColor) {
        document.getElementById('primaryColor').value = savedPrimaryColor;
    }

    if (savedSecondaryColor) {
        document.getElementById('secondaryColor').value = savedSecondaryColor;
    }

    displayArticles(articles);
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.themeManager) {
        document.getElementById('primaryColor').addEventListener('input', () => window.themeManager.updateColors());
        document.getElementById('secondaryColor').addEventListener('input', () => window.themeManager.updateColors());
    }

    const darkModeToggle = document.querySelector('button[onclick="toggleDarkMode()"]');
    if (darkModeToggle) {
        darkModeToggle.onclick = () => window.themeManager.toggleDarkMode();
    }
});

// Color Customization
let colorCustomizationVisible = false;

function toggleColorCustomization() {
    const colorCustomization = document.getElementById('color-customization');
    colorCustomizationVisible = !colorCustomizationVisible;
    
    if (colorCustomizationVisible) {
        colorCustomization.style.display = 'block';
        colorCustomization.style.opacity = '1';
        colorCustomization.style.transform = 'translateY(0)';
    } else {
        colorCustomization.style.opacity = '0';
        colorCustomization.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            colorCustomization.style.display = 'none';
        }, 300);
    }
}

// PWA (Progressive Web App) registration hint
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}

// Remove splash screen after animation
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    setTimeout(() => {
        splashScreen.style.display = 'none';
    }, 4000);
});