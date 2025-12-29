

(function () {
    function r(a) { 
        gsap.killTweensOf(a, { 
            opacity: !0 
        }); 
        gsap.fromTo(a, { 
            opacity: 1 
        }, 
        { 
            duration: .07, 
            opacity: Math.random(), 
            repeat: -1 }) 
        } 
        function t(a) {
        e && (a = l[d], gsap.set(a, { x: gsap.getProperty(".pContainer", "x"), y: gsap.getProperty(".pContainer", "y"), scale: m() }), gsap.timeline().to(a, {
            duration: gsap.utils.random(.61, 6), physics2D: { velocity: gsap.utils.random(-23, 23), angle: gsap.utils.random(-180, 180), gravity: gsap.utils.random(-6, 50) }, scale: 0, rotation: gsap.utils.random(-123, 360), ease: "power1", onStart: r, onStartParams: [a],
            onRepeat: function (b) { gsap.set(b, { scale: m() }) }, onRepeatParams: [a]
        }), d++, d = 201 <= d ? 0 : d)
    } MorphSVGPlugin.convertToPath("polygon"); document.querySelector(".pContainer"); var u = document.querySelector(".mainSVG"); document.querySelector("#star"); var c = document.querySelector(".sparkle"); document.querySelector("#tree"); var e = !0, n = "#E8F6F8 #ACE8F8 #F6FBFE #A2CBDC #B74551 #5DBA72 #910B28 #910B28 #446D39".split(" "), p = ["#star", "#circ", "#cross", "#heart"], l = [], d = 0; gsap.set("svg", { visibility: "visible" }); gsap.set(c,
        { transformOrigin: "50% 50%", y: -100 }); c = function (a) { var b = [], f = MotionPathPlugin.getRawPath(a)[0]; f.forEach(function (v, g) { var h = {}; h.x = f[2 * g]; h.y = f[2 * g + 1]; g % 2 && b.push(h) }); return b }; c(".treePath"); var q = c(".treeBottomPath"); c = gsap.timeline({ delay: 0, repeat: 0 }); var k, m = gsap.utils.random(.5, 3, .001, !0); (function () {
            for (var a = 201, b; -1 < --a;)b = document.querySelector(p[a % p.length]).cloneNode(!0), u.appendChild(b), b.setAttribute("fill", n[a % n.length]), b.setAttribute("class", "particle"), l.push(b), gsap.set(b, {
                x: -100,
                y: -100, transformOrigin: "50% 50%"
            })
        })(); (function () { k = gsap.timeline({ onUpdate: t }); k.to(".pContainer, .sparkle", { duration: 6, motionPath: { path: ".treePath", autoRotate: !1 }, ease: "linear" }).to(".pContainer, .sparkle", { duration: 1, onStart: function () { e = !1 }, x: q[0].x, y: q[0].y }).to(".pContainer, .sparkle", { duration: 2, onStart: function () { e = !0 }, motionPath: { path: ".treeBottomPath", autoRotate: !1 }, ease: "linear" }, "-=0").from(".treeBottomMask", { duration: 2, drawSVG: "0% 0%", stroke: "#FFF", ease: "linear" }, "-=2") })(); c.from([".treePathMask",
            ".treePotMask"], { drawSVG: "0% 0%", stroke: "#FFF", stagger: { each: 6 }, duration: gsap.utils.wrap([6, 1, 2]), ease: "linear" }).from(".treeStar", { duration: 3, scaleY: 0, scaleX: .15, transformOrigin: "50% 50%", ease: "elastic(1,0.5)" }, "-=4").to(".sparkle", { duration: 3, opacity: 0, ease: "rough({strength: 2, points: 100, template: linear, taper: both, randomize: true, clamp: false})" }, "-=0").to(".treeStarOutline", { duration: 1, opacity: 1, ease: "rough({strength: 2, points: 16, template: linear, taper: none, randomize: true, clamp: false})" },
                "+=1"); c.add(k, 0); gsap.globalTimeline.timeScale(1.5); k.vars.onComplete = function () { gsap.to('foreignObject', { opacity: 1 }) }
})();

// ========== СНЕГОПАД ==========
document.addEventListener('DOMContentLoaded', function () {
    const snowContainer = document.getElementById('snow-container');
    const snowflakesCount = 150; // Количество снежинок

    // Цвета снежинок для разнообразия
    const snowColors = [
        'rgba(255, 255, 255, 0.9)', // Белый
        'rgba(220, 240, 255, 0.8)', // Голубоватый
        'rgba(240, 248, 255, 0.7)', // Белый призрачный
        'rgba(230, 240, 255, 0.6)'  // Светло-голубой
    ];

    // Создание одной снежинки
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');

        // Случайный размер
        const size = Math.random() * 5 + 2; // 2-7px
        snowflake.style.width = `${size}px`;
        snowflake.style.height = `${size}px`;

        // Случайный цвет
        const colorIndex = Math.floor(Math.random() * snowColors.length);
        snowflake.style.backgroundColor = snowColors[colorIndex];

        // Начальная позиция
        snowflake.style.left = `${Math.random() * 100}vw`;
        snowflake.style.top = `-10px`;

        // Случайная прозрачность
        snowflake.style.opacity = Math.random() * 0.7 + 0.3;

        // Случайное размытие
        snowflake.style.filter = `blur(${Math.random() * 0.7 + 0.1}px)`;

        snowContainer.appendChild(snowflake);

        // Анимация падения
        animateSnowflake(snowflake);
    }

    // Анимация падения снежинки
    function animateSnowflake(snowflake) {
        // Случайная скорость падения
        const duration = Math.random() * 8 + 10; // 10-18 секунд

        // Случайное горизонтальное движение
        const horizontalMove = Math.random() * 100 - 50; // -50px до +50px

        // Случайное вращение
        const rotation = Math.random() * 720 - 360; // -360° до +360°

        // Случайная задержка перед началом
        const delay = Math.random() * 5;

        // Создаем анимацию с помощью GSAP
        gsap.to(snowflake, {
            y: window.innerHeight + 20,
            x: `+=${horizontalMove}`,
            rotation: rotation,
            duration: duration,
            delay: delay,
            ease: "linear",
            onComplete: function () {
                // Когда снежинка упала, удаляем её и создаём новую
                snowflake.remove();
                createSnowflake();
            }
        });

        // Добавляем легкое покачивание из стороны в сторону
        gsap.to(snowflake, {
            x: `+=${Math.random() * 20 - 10}`,
            duration: Math.random() * 2 + 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Создаем начальные снежинки
    for (let i = 0; i < snowflakesCount; i++) {
        setTimeout(() => {
            createSnowflake();
        }, i * 100); // Разносим появление снежинок во времени
    }

    // Добавляем новые снежинки каждые 2 секунды (чтобы общее количество поддерживалось)
    setInterval(() => {
        // Проверяем количество текущих снежинок
        const currentSnowflakes = document.querySelectorAll('.snowflake').length;
        if (currentSnowflakes < snowflakesCount * 0.8) {
            createSnowflake();
        }
    }, 2000);

    // Обработчик изменения размера окна (перезапускаем снег)
    window.addEventListener('resize', function () {
        // Удаляем все снежинки
        document.querySelectorAll('.snowflake').forEach(snowflake => {
            gsap.killTweensOf(snowflake);
            snowflake.remove();
        });

        // Создаем новые снежинки
        for (let i = 0; i < snowflakesCount; i++) {
            setTimeout(() => {
                createSnowflake();
            }, i * 50);
        }
    });
});

// ========== ЗВЁЗДОЧКИ, КОТОРЫЕ ОСТАЮТСЯ ==========
document.addEventListener('DOMContentLoaded', function () {
    const starsContainer = document.getElementById('stars-container');
    const maxStars = 200; // Максимальное количество звёздочек на экране
    let currentStars = 0;

    // Цветовые палитры
    const colorPalettes = {
        festive: ['#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4', '#FFEAA7', '#FF9FF3'],
        winter: ['#FFFFFF', '#A0E7FF', '#87CEEB', '#E0F7FF', '#F0F8FF'],
        christmas: ['#FF0000', '#00FF00', '#FFFFFF', '#FFD700', '#FF6B6B'],
        magic: ['#9D00FF', '#00FFFF', '#FF00FF', '#00FF00', '#FFFF00']
    };

    let currentPalette = 'festive';
    let starsArray = []; // Храним все звёздочки

    // Создание звёздочки
    function createStar(x, y) {
        // Если звёздочек слишком много, удаляем самые старые
        if (currentStars >= maxStars) {
            removeOldestStar();
        }

        const star = document.createElement('div');
        star.classList.add('star');

        // Размер (случайный от 8 до 20px)
        const size = 8 + Math.random() * 12;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        // Цвет
        const colors = colorPalettes[currentPalette];
        const color = colors[Math.floor(Math.random() * colors.length)];
        star.style.color = color;

        // Позиция
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;

        // Начальная анимация появления
        star.style.opacity = '0';
        star.style.transform = 'translate(-50%, -50%) scale(0)';

        starsContainer.appendChild(star);
        currentStars++;

        // Сохраняем информацию о звёздочке
        const starData = {
            element: star,
            createdAt: Date.now(),
            x: x,
            y: y,
            color: color,
            size: size
        };

        starsArray.push(starData);

        // Анимация появления
        gsap.to(star, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
            onComplete: () => {
                // Лёгкое пульсирование
                gsap.to(star, {
                    scale: 1.1,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        });

        // Медленное исчезновение через 10-15 секунд
        setTimeout(() => {
            fadeOutStar(starData);
        }, 10000 + Math.random() * 5000);
    }

    // Плавное исчезновение звёздочки
    function fadeOutStar(starData) {
        const star = starData.element;

        gsap.to(star, {
            opacity: 0,
            scale: 0.5,
            duration: 2,
            ease: "power2.in",
            onComplete: () => {
                // Удаляем из DOM и из массива
                star.remove();
                starsArray = starsArray.filter(s => s !== starData);
                currentStars--;
            }
        });
    }

    // Удаление самой старой звёздочки
    function removeOldestStar() {
        if (starsArray.length > 0) {
            const oldestStar = starsArray.reduce((oldest, current) =>
                current.createdAt < oldest.createdAt ? current : oldest
            );
            fadeOutStar(oldestStar);
        }
    }

    // Обработчик клика
    document.addEventListener('click', function (e) {
        // Создаём несколько звёздочек в области клика
        const clusterSize = 3 + Math.floor(Math.random() * 4);

        for (let i = 0; i < clusterSize; i++) {
            // Случайное смещение от точки клика
            const offsetX = (Math.random() - 0.5) * 40;
            const offsetY = (Math.random() - 0.5) * 40;

            setTimeout(() => {
                createStar(e.clientX + offsetX, e.clientY + offsetY);
            }, i * 100);
        }
    });

    // Для мобильных устройств
    document.addEventListener('touchstart', function (e) {
        e.preventDefault();
        const touch = e.touches[0];

        const clusterSize = 2 + Math.floor(Math.random() * 3);
        for (let i = 0; i < clusterSize; i++) {
            const offsetX = (Math.random() - 0.5) * 30;
            const offsetY = (Math.random() - 0.5) * 30;

            setTimeout(() => {
                createStar(touch.clientX + offsetX, touch.clientY + offsetY);
            }, i * 100);
        }
    }, { passive: false });

    // Функция для смены палитры
    function changePalette(paletteName) {
        if (colorPalettes[paletteName]) {
            currentPalette = paletteName;

            // Плавно меняем цвет всех существующих звёздочек
            starsArray.forEach((starData, index) => {
                setTimeout(() => {
                    const newColor = colorPalettes[paletteName][
                        Math.floor(Math.random() * colorPalettes[paletteName].length)
                    ];

                    gsap.to(starData.element, {
                        color: newColor,
                        duration: 1,
                        ease: "power2.inOut"
                    });

                    starData.color = newColor;
                }, index * 50);
            });
        }
    }

    // Создаём несколько звёздочек при загрузке
    function createInitialStars(count) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const x = Math.random() * window.innerWidth;
                const y = Math.random() * window.innerHeight;
                createStar(x, y);
            }, i * 200);
        }
    }

    // Создаём 10 звёздочек при загрузке (опционально)
    // createInitialStars(10);

    // Экспортируем функции для использования извне
    window.starEffects = {
        changePalette: changePalette,
        removeAllStars: function () {
            starsArray.forEach(starData => {
                starData.element.remove();
            });
            starsArray = [];
            currentStars = 0;
        },
        getStarCount: function () {
            return currentStars;
        }
    };
});