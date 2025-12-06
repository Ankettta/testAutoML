
// Функциональность аккордеонов
document.addEventListener('DOMContentLoaded', function() {
    const accordionTriggers = document.querySelectorAll('.accordion__trigger');

    accordionTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
            // Закрываем все остальные аккордеоны
            accordionTriggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
            // Открываем текущий
            trigger.setAttribute('aria-expanded', !isExpanded);
        });
    });
});