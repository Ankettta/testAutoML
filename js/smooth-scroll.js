document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            //  Если якорь пустой (#) — скроллим на самый верх
            if (targetId === '#') {
                window.scrollTo({
                    top: 0, // Самый верх страницы
                    behavior: 'smooth'
                });
                
                // Закрываем мобильное меню (если открыто)
                const mobileNav = document.querySelector('.header__nav--mobile');
                const burgerButton = document.querySelector('.header__burger');
                if (mobileNav?.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    burgerButton?.classList.remove('active');
                }
                return;
            }

            // Для обычных якорей — скроллим к элементу
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 90, // Отступ для хедера
                    behavior: 'smooth'
                });

                // Закрыть мобильное меню
                const mobileNav = document.querySelector('.header__nav--mobile');
                const burgerButton = document.querySelector('.header__burger');
                if (mobileNav?.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    burgerButton?.classList.remove('active');
                }
            }
        });
    });
});