document.addEventListener('DOMContentLoaded', function() {
    const burgerButton = document.querySelector('.header__burger');
    const mobileNav = document.querySelector('.header__nav--mobile');

 
    burgerButton?.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        

        document.querySelectorAll('.language-selector').forEach(selector => {
            selector.classList.remove('open');
        });
    });

 
    document.addEventListener('click', (e) => {
        const isClickInsideNav = mobileNav.contains(e.target);
        const isClickOnBurger = burgerButton.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnBurger && mobileNav?.classList.contains('active')) {
            mobileNav.classList.remove('active');
        }
    });
});