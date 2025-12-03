// Анимация точек для секции "Решение"
document.addEventListener('DOMContentLoaded', function() {
    // Получаем секцию и canvas
    const solutionSection = document.getElementById('solution');
    const canvas = document.querySelector('.solution__animation-canvas');
    const ctx = canvas.getContext('2d');

    // Функция для обновления размера canvas
    function resizeCanvas() {
        const sectionRect = solutionSection.getBoundingClientRect();
        canvas.width = sectionRect.width;
        canvas.height = sectionRect.height;
        
        // Обновляем центральные точки для анимации
        maxx = canvas.width;
        maxy = canvas.height;
        halfx = maxx / 2;
        halfy = maxy / 2;
    }

    // Инициализация переменных
    let maxx, maxy, halfx, halfy;
    const dotCount = 450; // Количество точек 
    const dots = [];

    // Создаем точки
    function dot() {
        this.rad_x = 2 * Math.random() * halfx + 1;
        this.rad_y = 1.2 * Math.random() * halfy + 1;
        this.alpha = Math.random() * 360 + 1;
        this.speed = Math.random() * 100 < 50 ? 1 : -1;
        this.speed *= 0.02; // скорость
        this.size = Math.random() * 3 + 0.5; // размер точек
        this.color = Math.floor(Math.random() * 100) + 155; // Светлые цвета (155-255)
    }

    // Рисуем точку
    dot.prototype.draw = function() {
        const dx = halfx + this.rad_x * Math.cos(this.alpha / 180 * Math.PI);
        const dy = halfy + this.rad_y * Math.sin(this.alpha / 180 * Math.PI);
        
        // Цвет точек: светло-белый/светло-серая (под брендовый фон)
        ctx.fillStyle = `rgba(${this.color}, ${this.color}, ${this.color}, 0.7)`;
        ctx.fillRect(dx, dy, this.size, this.size);
    };

    // Обновляем позицию точки
    dot.prototype.move = function() {
        this.alpha += this.speed;
        
        // Плавное изменение цвета (светлее/темнее)
        if (Math.random() * 100 < 50) {
            this.color = Math.min(this.color + 1, 255);
        } else {
            this.color = Math.max(this.color - 1, 155);
        }
    };

    // Инициализируем точки
    function initDots() {
        dots.length = 0; // Очищаем массив при перезагрузке
        for (let i = 0; i < dotCount; i++) {
            dots.push(new dot());
        }
    }

    // Рендер анимации
    function render() {
        // Очищаем canvas (полупрозрачный фон для следа точек)
       ctx.clearRect(0, 0, maxx, maxy);
        
        // Обновляем и рисуем все точки
        for (let i = 0; i < dots.length; i++) {
            dots[i].draw();
            dots[i].move();
        }
        
        requestAnimationFrame(render);
    }

    // Запускаем анимацию при загрузке и при изменении размера окна
    resizeCanvas();
    initDots();
    render();

    // Обновляем canvas при ресайзе окна
    window.addEventListener('resize', function() {
        resizeCanvas();
        initDots(); // Пересоздаем точки для нового размера
    });

    // Запускаем анимацию только когда секция в поле зрения (оптимизация)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                render(); // Запускаем анимацию
            } else {
                // При уходе секции из поля зрения очищаем canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        });
    }, { threshold: 0.1 });

    observer.observe(solutionSection);
});