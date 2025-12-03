// Подключение TweenLite (необходимо для анимации точек)
// Если не подключен через CDN, добавьте в head:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>

// Плавный скролл для ссылок на якоря
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 90, // Отступ для фиксированного хедера
                behavior: 'smooth'
            });

            // Закрыть мобильное меню при клике на ссылку
            const mobileNav = document.querySelector('.header__nav--mobile');
            if (mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        }
    });
});
  // Функциональность языкового селектора
    document.querySelectorAll('.language-selector__trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const selector = trigger.closest('.language-selector');
            selector.classList.toggle('open');
            
            // Закрываем другие открытые селекторы
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
            
            // Здесь можно добавить логику переключения языка (например, AJAX-запрос или редирект)
            console.log(`Переключение на язык: ${langCode} (${langName})`);
            // alert(`Переключение на язык: ${langName}`);
        });
    });

// Мобильное меню (бургер)
const burgerButton = document.querySelector('.header__burger');
const mobileNav = document.querySelector('.header__nav--mobile');

burgerButton.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    // Закрываем языковой селектор при открытии/закрытии мобильного меню
        document.querySelectorAll('.language-selector').forEach(selector => {
            selector.classList.remove('open');
        });
});

// Закрыть мобильное меню при клике вне его области
document.addEventListener('click', (e) => {
    const isClickInsideNav = mobileNav.contains(e.target);
    const isClickOnBurger = burgerButton.contains(e.target);
    
    if (!isClickInsideNav && !isClickOnBurger && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
    }
});

// Эффект скролла для хедера (изменение прозрачности)
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Анимация появления элементов при скролле (улучшенная логика)
const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.problem-card, .advantage-card, .roadmap__item, .solution__approach-item'
    );
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 100; // Ближе к низу экрана для более плавного появления
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate-fade-in');
        }
    });
};

// Инициализируем при загрузке страницы
window.addEventListener('load', () => {
    animateOnScroll();
    // Проверяем позицию скролла для хедера
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }
});

// Слушаем скролл с оптимизацией (throttle)
let lastScrollTime = 0;
window.addEventListener('scroll', () => {
    const currentTime = Date.now();
    if (currentTime - lastScrollTime > 100) { // Обновляем не чаще 10 раз в секунду
        animateOnScroll();
        lastScrollTime = currentTime;
    }
});

// ФОРМА (уже нет)
const formInputs = document.querySelectorAll('.contacts__form-input, .contacts__form-textarea');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.style.transform = 'translateY(-2px)';
    });
    input.addEventListener('blur', () => {
        input.style.transform = 'translateY(0)';
    });
});


(function() {
    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

    // Main
    initHeader();
    initAnimation();
    addListeners();

    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {x: width/2, y: height/2};

        largeHeader = document.querySelector('.banner');
        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        // Создаем точки
        points = [];
        for(var x = 0; x < width; x = x + width/20) {
            for(var y = 0; y < height; y = y + height/20) {
                var px = x + Math.random()*width/20;
                var py = y + Math.random()*height/20;
                var p = {x: px, originX: px, y: py, originY: py };
                points.push(p);
            }
        }

        // Для каждой точки находим 5 ближайших
        for(var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for(var j = 0; j < points.length; j++) {
                var p2 = points[j]
                if(!(p1 == p2)) {
                    var placed = false;
                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for(var k = 0; k < 5; k++) {
                        if(!placed) {
                            if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // Присваиваем каждой точке круг
        for(var i in points) {
            var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }

    // Обработчики событий
    function addListeners() {
        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }

    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }

    function scrollCheck() {
        // Останавливаем анимацию, когда скроллим ниже баннера
        if(document.body.scrollTop > height - 100) animateHeader = false;
        else animateHeader = true;
    }

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }

    // Анимация
    function initAnimation() {
        animate();
        for(var i in points) {
            shiftPoint(points[i]);
        }
    }

    function animate() {
        if(animateHeader) {
            ctx.clearRect(0,0,width,height);
            for(var i in points) {
                // Определяем активность точек в зависимости от расстояния до мыши
                if(Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }

                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }

    // Движение точек
    function shiftPoint(p) {
        gsap.to(p, 1+1*Math.random(), {
            x: p.originX-50+Math.random()*100,
            y: p.originY-50+Math.random()*100,
            ease: "circ.inOut",
            onComplete: function() {
                shiftPoint(p);
            }
        });
    }

    // Рисование линий между точками
    function drawLines(p) {
        if(!p.active) return;
        for(var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(37, 99, 235,'+ p.active+')'; //Цвет линий
            ctx.stroke();
        }
    }

    // Класс для кругов (точек)
    function Circle(pos,rad,color) {
        var _this = this;

        // Конструктор
        (function() {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        })();

        this.draw = function() {
            if(!_this.active) return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(37, 99, 235,'+ _this.active+')'; // Цвет точек
            ctx.fill();
        };
    }

    // Вспомогательная функция: расстояние между двумя точками
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
    
})();
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