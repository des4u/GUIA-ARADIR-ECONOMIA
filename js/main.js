document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.card, .test-card, .stat-box, .ref-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target === Infinity ? '∞' : Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(start);
            }
        }, 16);
    }

    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const target = entry.target.textContent.trim();
                if (target === '∞') {
                    entry.target.style.animation = 'pulse 2s ease-in-out infinite';
                } else {
                    const value = parseInt(target);
                    entry.target.textContent = '0';
                    animateCounter(entry.target, value);
                }
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statObserver.observe(stat));

    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && scrolled < 500) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const cards = document.querySelectorAll('.card, .test-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = '';
        });
    });

    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > 10) konamiCode.shift();
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            showEasterEgg();
            konamiCode = [];
        }
    });

    function showEasterEgg() {
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(139, 21, 56, 0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.5s;
        `;
        
        overlay.innerHTML = `
            <div style="text-align: center; color: #D4AF37; font-family: 'Cinzel', serif;">
                <h1 style="font-size: 3rem; margin-bottom: 20px;">🎩 ¡FELICIDADES! 🎩</h1>
                <p style="font-size: 1.5rem; max-width: 600px;">
                    Has desbloqueado el logro secreto:<br>
                    <strong style="font-size: 2rem;">"The Victorian Konami Capitalist"</strong>
                </p>
                <p style="margin-top: 30px; font-style: italic;">
                    Bonus: +10% de descuento en todas las transacciones durante 24 horas
                </p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="margin-top: 40px; padding: 15px 40px; font-size: 1.2rem; 
                               background: #D4AF37; border: none; color: #3E2723; 
                               font-family: 'Cinzel', serif; cursor: pointer; border-radius: 5px;">
                    Cerrar
                </button>
            </div>
        `;
        
        document.body.appendChild(overlay);
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) overlay.remove();
        });
    }

    // Añadir estilo para animación fadeIn
    if (!document.querySelector('#dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
        `;
        document.head.appendChild(style);
    }

    console.log('%c🎩 Academia de Economía 🎩', 
                'font-size: 20px; color: #D4AF37; font-weight: bold; font-family: Cinzel, serif;');
    console.log('%cInspired by Victoria II • Attila Studios Economic Institute', 
                'font-size: 12px; color: #8B1538; font-style: italic;');
    console.log('%cTip: Try the Konami Code for a surprise...', 
                'font-size: 10px; color: #666;');
});
