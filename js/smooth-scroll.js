document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90, // Отступ для хедера
                    behavior: 'smooth'
                });

                // Закрыть мобильное меню
                const mobileNav = document.querySelector('.header__nav--mobile');
                if (mobileNav?.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                }
            }
        });
    });
});
