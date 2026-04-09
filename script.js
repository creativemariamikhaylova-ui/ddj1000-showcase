(function() {
    const navItems = document.querySelectorAll('.nav-menu li a');
    const pages = {
        home: document.getElementById('home-page'),
        specs: document.getElementById('specs-page'),
        experience: document.getElementById('experience-page'),
        resources: document.getElementById('resources-page')
    };

    function showPage(pageId) {
        Object.values(pages).forEach(page => {
            if(page) page.classList.remove('active-page');
        });
        
        if(pages[pageId]) {
            pages[pageId].classList.add('active-page');
        }
        
        navItems.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('data-page') === pageId) {
                link.classList.add('active');
            }
        });
        
        history.pushState(null, null, '#' + pageId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    navItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageId = this.getAttribute('data-page');
            if(pageId && pages[pageId]) {
                showPage(pageId);
            }
        });
    });

    function hashChange() {
        let hash = window.location.hash.substring(1);
        if(hash && pages[hash]) {
            showPage(hash);
        } else {
            showPage('home');
        }
    }
    
    window.addEventListener('popstate', hashChange);
    hashChange();

    const statValues = document.querySelectorAll('.stat-value');
    
    function animateStats() {
        statValues.forEach(el => {
            const target = parseInt(el.getAttribute('data-count'));
            if(!target) return;
            
            let current = 0;
            const increment = target / 50;
            const update = () => {
                current += increment;
                if(current < target) {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            };
            update();
        });
    }
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                animateStats();
                observer.disconnect();
            }
        });
    });
    
    const homePage = document.getElementById('home-page');
    if(homePage) observer.observe(homePage);

    const techCards = document.querySelectorAll('.tech-card');
    techCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if(menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    const lightBeams = document.querySelectorAll('.light-beam');
    setInterval(() => {
        lightBeams.forEach(beam => {
            const randomDelay = Math.random() * 8;
            beam.style.animationDelay = `${randomDelay}s`;
        });
    }, 10000);
})();