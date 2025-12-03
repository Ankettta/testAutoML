// Вспомогательная функция для троттлинга (оптимизация скролла)
export function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}

// Проверка, находится ли элемент в поле зрения
export function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= window.innerHeight - 100 && // 100px от низа экрана
        rect.bottom >= 0
    );
}