// Функциональность языкового селектора
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.language-selector__trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const selector = trigger.closest('.language-selector');
            selector.classList.toggle('open');
            
           
            document.querySelectorAll('.language-selector').forEach(otherSelector => {
                if (otherSelector !== selector) {
                    otherSelector.classList.remove('open');
                }
            });
        });
    });

    // Закрываем селектор при клике вне его
    document.addEventListener('click', () => {
        document.querySelectorAll('.language-selector').forEach(selector => {
            selector.classList.remove('open');
        });
    });

    // Закрываем селектор при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            document.querySelectorAll('.language-selector').forEach(selector => {
                selector.classList.remove('open');
            });
        }
    });

    // Обновляем активный язык при выборе
    document.querySelectorAll('.language-selector__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const langCode = link.getAttribute('data-lang');
            const langName = link.querySelector('.language-selector__name').textContent;
            const langCodeDisplay = link.querySelector('.language-selector__code').textContent;
            
            // Обновляем текст на триггере (всех селекторов, чтобы был единый активный язык)
            document.querySelectorAll('.language-selector__current').forEach(current => {
                current.textContent = langCodeDisplay;
            });
            
            // Закрываем селектор
            link.closest('.language-selector').classList.remove('open');
            
           
            console.log(`Переключение на язык: ${langCode} (${langName})`);
            // alert(`Переключение на язык: ${langName}`);
        });
    });
});