(function () {
    // Переменные для управления частицами
    var particles = []; // Массив частиц
    var particleIndex = 0;
    var isEmitting = true;
    
    function flashParticle(particle) { 
        gsap.killTweensOf(particle, { opacity: true });
        gsap.fromTo(particle, { 
            opacity: 1 
        }, { 
            duration: 0.07, 
            opacity: Math.random(), 
            repeat: -1 
        });
    }
    
    function emitParticle() {
        if (!isEmitting || particles.length === 0) return;
        
        var particle = particles[particleIndex];
        
        // Сбрасываем частицу на начальную позицию
        gsap.set(particle, { 
            x: gsap.getProperty(".pContainer", "x"), 
            y: gsap.getProperty(".pContainer", "y"), 
            scale: getRandomScale(),
            opacity: 1
        });
        
        // Удаляем старую анимацию
        gsap.killTweensOf(particle);
        
        // Новая анимация с ФИНАЛЬНЫМ УДАЛЕНИЕМ
        gsap.to(particle, {
            duration: gsap.utils.random(0.61, 6),
            x: "+=random(-50, 50)",
            y: "+=random(20, 100)",
            rotation: gsap.utils.random(-123, 360),
            scale: 0,
            opacity: 0, // Финальная прозрачность 0
            ease: "power1.in",
            onStart: function() {
                flashParticle(particle);
            },
            onComplete: function() {
                // ПОЛНОСТЬЮ СКРЫВАЕМ частицу после анимации
                gsap.set(particle, {
                    opacity: 0,
                    scale: 0,
                    x: -100,
                    y: -100
                });
            }
        });
        
        particleIndex = (particleIndex + 1) % particles.length;
    }
    
    // УДАЛЕНО: MorphSVGPlugin.convertToPath("polygon");
    
    var svgContainer = document.querySelector(".mainSVG");
    var sparkle = document.querySelector(".sparkle");
    var colors = "#E8F6F8 #ACE8F8 #F6FBFE #A2CBDC #B74551 #5DBA72 #910B28 #910B28 #446D39".split(" ");
    var shapes = ["#star", "#circ", "#cross", "#heart"];
    
    gsap.set("svg", { visibility: "visible" });
    gsap.set(sparkle, { transformOrigin: "50% 50%", y: -100 });
    
    // Функция для получения случайного размера
    function getRandomScale() {
        return gsap.utils.random(0.5, 3, 0.001);
    }
    
    // Функция для получения точек пути
    function getPathPoints(pathSelector) {
        var path = document.querySelector(pathSelector);
        if (!path) return [];
        
        var points = [];
        var length = path.getTotalLength();
        var segments = 20;
        
        for (var i = 0; i <= segments; i++) {
            var point = path.getPointAtLength((length / segments) * i);
            points.push({ x: point.x, y: point.y });
        }
        
        return points;
    }
    
    // Создаем частицы (только 50 вместо 201 для оптимизации)
    (function createParticles() {
        for (var i = 0; i < 50; i++) {
            var shapeIndex = i % shapes.length;
            var shape = document.querySelector(shapes[shapeIndex]);
            
            if (!shape) continue;
            
            var clone = shape.cloneNode(true);
            svgContainer.appendChild(clone);
            clone.setAttribute("fill", colors[i % colors.length]);
            clone.setAttribute("class", "particle");
            clone.setAttribute("opacity", "0"); // Начальная прозрачность 0
            
            particles.push(clone);
            
            gsap.set(clone, {
                x: -100,
                y: -100,
                scale: 0,
                opacity: 0,
                transformOrigin: "50% 50%"
            });
        }
    })();
    
    // Получаем точки путей
    var treePathPoints = getPathPoints(".treePath");
    var treeBottomPoints = getPathPoints(".treeBottomPath");
    
    var mainTimeline = gsap.timeline({ delay: 0, repeat: 0 });
    var particleTimeline;
    var randomScale = getRandomScale;
    
    // Создаем анимацию частиц
    (function createParticleAnimation() {
        particleTimeline = gsap.timeline({ 
            onUpdate: emitParticle,
            onComplete: function() {
                // КОГДА АНИМАЦИЯ ЗАВЕРШЕНА, ОСТАНАВЛИВАЕМ ВЫБРОС ЧАСТИЦ
                isEmitting = false;
                
                // СКРЫВАЕМ ВСЕ ЧАСТИЦЫ
                particles.forEach(function(particle) {
                    gsap.to(particle, {
                        duration: 0.5,
                        opacity: 0,
                        scale: 0,
                        onComplete: function() {
                            gsap.set(particle, {
                                x: -100,
                                y: -100
                            });
                        }
                    });
                });
            }
        });
        
        // Анимация по пути ёлки
        particleTimeline.to(".pContainer, .sparkle", { 
            duration: 6, 
            motionPath: { 
                path: ".treePath", 
                align: ".treePath",
                autoRotate: false 
            }, 
            ease: "linear" 
        })
        .to(".pContainer, .sparkle", { 
            duration: 1, 
            onStart: function() { 
                isEmitting = false; // Останавливаем частицы
            }, 
            x: treePathPoints[treePathPoints.length - 1].x, 
            y: treePathPoints[treePathPoints.length - 1].y 
        })
        .to(".pContainer, .sparkle", { 
            duration: 2, 
            onStart: function() { 
                isEmitting = true; // Возобновляем частицы
            }, 
            motionPath: { 
                path: ".treeBottomPath", 
                align: ".treeBottomPath",
                autoRotate: false 
            }, 
            ease: "linear" 
        }, "-=0.5");
    })();
    
    // Основная анимация
    mainTimeline.fromTo(".treePathMask, .treePotMask", {
        strokeDasharray: "0 1000"
    }, {
        duration: 6,
        strokeDasharray: "1000 1000",
        ease: "linear",
        stagger: 0.5
    })
    .from(".treeStar", { 
        duration: 3, 
        scaleY: 0, 
        scaleX: 0.15, 
        transformOrigin: "50% 50%", 
        ease: "elastic.out(1, 0.5)" 
    }, "-=4")
    .to(".sparkle", { 
        duration: 3, 
        opacity: 0, 
        ease: "power2.inOut" 
    }, "-=0")
    .to(".treeStarOutline", { 
        duration: 1, 
        opacity: 1, 
        ease: "power2.inOut" 
    }, "+=1");
    
    // Добавляем анимацию частиц в основную временную шкалу
    mainTimeline.add(particleTimeline, 0);
    
    // Ускоряем анимацию
    gsap.globalTimeline.timeScale(1.5);
    
    // Когда все завершено
    mainTimeline.eventCallback("onComplete", function() {
        // Останавливаем все мигания частиц
        particles.forEach(function(particle) {
            gsap.killTweensOf(particle);
        });
        
        // Показываем сообщение
        gsap.to('foreignObject', { 
            opacity: 1,
            duration: 1
        });
        
        // Финальная очистка - скрываем все частицы
        setTimeout(function() {
            particles.forEach(function(particle) {
                gsap.set(particle, {
                    opacity: 0,
                    scale: 0,
                    x: -100,
                    y: -100
                });
                // Опционально: удалить из DOM
                // particle.remove();
            });
        }, 1000);
    });
})();
