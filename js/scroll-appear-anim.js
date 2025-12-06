const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.problem-card, .advantage-card, .roadmap__item, .solution__approach-card, .contacts'
    );
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100; 
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-fade-in');
        }
    });
};


const header = document.querySelector('.header'); 

window.addEventListener('load', () => {
    animateOnScroll();
   

    if (header && window.scrollY > 50) {
        header.classList.add('scrolled');
    }
});

let lastScrollTime = 0;
window.addEventListener('scroll', () => {
    const currentTime = Date.now();
    if (currentTime - lastScrollTime > 100) { 
        animateOnScroll();
        lastScrollTime = currentTime;
        
        // === Опционально: добавляем класс scrolled при скролле (если нужно) ===
        if (header) {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }
});