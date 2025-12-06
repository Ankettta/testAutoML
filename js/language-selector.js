// Функциональность языкового селектора + загрузка переводов
document.addEventListener('DOMContentLoaded', function() {
    // работа с селектором
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

    // === сюда можно новый код (загрузка переводов) ===
    let currentLang = 'ru'; // Язык по умолчанию

    // Загрузка переводов из JSON
    async function loadTranslations(lang) {
        try {
            // путь к JSON файлам
            const response = await fetch(`locales/${lang}.json`);
            if (!response.ok) throw new Error(`Не удалось загрузить переводы для ${lang}`);
            
            const translations = await response.json();
            applyTranslations(translations);
            currentLang = lang;
            document.documentElement.lang = lang; // Обновляем lang атрибут html
        } catch (error) {
            console.error('Ошибка загрузки переводов:', error);
        }
    }

    // Применение переводов к элементам с data-i18n
    function applyTranslations(translations) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key]) {
                // Для изображений обновляем alt, для остальных — текст
                if (element.tagName === 'IMG') {
                    element.alt = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });
    }

    // Обновление активного языка + загрузка переводов при выборе
    document.querySelectorAll('.language-selector__link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const langCode = link.getAttribute('data-lang');
            const langCodeDisplay = link.querySelector('.language-selector__code').textContent;
            
            // Сохраняем твои существующие действия
            document.querySelectorAll('.language-selector__current').forEach(current => {
                current.textContent = langCodeDisplay;
            });
            link.closest('.language-selector').classList.remove('open');
            
            // загружаем переводы, если язык изменен
            if (langCode !== currentLang) {
                loadTranslations(langCode);
              
            }
        });
    });

    // Инициализация: загружаем русский язык по умолчанию
    loadTranslations(currentLang);
});