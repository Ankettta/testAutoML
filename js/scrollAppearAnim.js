
const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.problem-card, .advantage-card, .roadmap__item, .solution__approach-item'
    );
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100; 
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-fade-in');
        }
    });
};

window.addEventListener('load', () => {
    animateOnScroll();
   
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
});

let lastScrollTime = 0;
window.addEventListener('scroll', () => {
    const currentTime = Date.now();
    if (currentTime - lastScrollTime > 100) { 
        animateOnScroll();
        lastScrollTime = currentTime;
    }
});

