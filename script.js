"use strict";

// Désactiver les écouteurs d'événements 'unload' et 'beforeunload' pour éviter les avertissements de dépréciation
const originalAddEventListener = EventTarget.prototype.addEventListener;
EventTarget.prototype.addEventListener = function(type, listener, options) {
    if (type === 'unload' || type === 'beforeunload') {
        // Ne pas ajouter l'écouteur d'événement déprécié
        console.log('Écouteur d\'événement déprécié évité:', type);
        return;
    }
    return originalAddEventListener.call(this, type, listener, options);
};

document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const nav = document.querySelector('.nav-container');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const parallaxSection = document.querySelector('.parallax-section');
    const parallaxBg = document.querySelector('.parallax-bg');
    const faqItems = document.querySelectorAll('.faq-item');

    // Gestion de la FAQ
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Ferme toutes les réponses
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherAnswer.style.maxHeight = null;
                }
            });

            // Toggle la réponse actuelle
            item.classList.toggle('active');
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // Variables pour le scroll
    let lastScroll = 0;
    let scrollTimer = null;
    let isScrolling = false;

    // Gestion du menu mobile
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Fonction principale de gestion du scroll
    function handleScroll() {
        const currentScroll = window.pageYOffset;
        
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(() => {
                // Gestion de la navigation
                if (currentScroll > 50) {
                    nav.classList.add('scrolled');
                } else {
                    nav.classList.remove('scrolled');
                }

                // Effet parallaxe
                if (parallaxSection && parallaxBg) {
                    const rate = currentScroll * 0.5;
                    parallaxBg.style.transform = `translate3d(0, ${rate}px, 0)`;
                }

                lastScroll = currentScroll;
                isScrolling = false;
            });
        }
    }

    // Optimisation des performances avec throttling
    function throttleScroll() {
        if (scrollTimer === null) {
            scrollTimer = setTimeout(() => {
                handleScroll();
                scrollTimer = null;
            }, 10);
        }
    }

    // Écouteurs d'événements
    window.addEventListener('scroll', throttleScroll, { passive: true });

    // Défilement fluide pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                    top: targetPosition - navHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Gestion du redimensionnement de la fenêtre
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }, 250);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      
      // Sélectionnez votre élément parallaxe
      const parallaxElement = document.querySelector('.parallax-container');
      
      // Calculez la position de l'image de fond basée sur le défilement
      // La valeur 0.5 détermine la vitesse de l'effet (plus petit = plus lent)
      if (parallaxElement) {
        parallaxElement.style.backgroundPositionY = (scrollPosition * 0.5) + 'px';
      }
    });
  });
  

function scrollToVideoSection() {
    const videoSection = document.getElementById('video-section');
    if (videoSection) {
      videoSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
// Animation de la barre de navigation
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !nav.classList.contains('scroll-down')) {
        // Scroll Down
        nav.classList.remove('scroll-up');
        nav.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && nav.classList.contains('scroll-down')) {
        // Scroll Up
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Gestion des animations au scroll
function handleScrollAnimations() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.classList.add('fade-in-section');
    });

    const fadeInElements = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });
}

// Initialisation des animations
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimations();
});

// Gestion du curseur personnalisé
document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const ring = document.createElement('div');
    ring.className = 'cursor-ring';
    document.body.appendChild(ring);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        ring.style.left = e.clientX + 'px';
        ring.style.top = e.clientY + 'px';
    });

    // Ajouter la classe hover sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .nav-link, .video-redirect-btn, .faq-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            ring.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            ring.classList.remove('hover');
        });
    });
});

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});





// ANIMATION PARALLAX AVANCÉE
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les couches parallax
    const parallaxLayers = {
        bg: document.querySelector('.layer-bg'),
        mid: document.querySelector('.layer-mid'),
        front: document.querySelector('.layer-front'),
        closest: document.querySelector('.layer-closest'),
        stars: document.querySelector('.stars-bg'),
        floatingElements: document.querySelectorAll('.floating-binary')
    };
    
    // Coefficients de vitesse pour chaque couche (plus le nombre est grand, plus le mouvement est important)
    const speedFactors = {
        bg: 0.05,      // Très lent (arrière-plan)
        mid: 0.1,      // Lent (milieu)
        front: 0.2,    // Moyen (avant-plan)
        closest: 0.3,  // Rapide (premier plan)
        stars: 0.03,   // Extrêmement lent (fond étoilé)
        floatingMin: 0.15, // Vitesse minimale pour les éléments flottants
        floatingMax: 0.25  // Vitesse maximale pour les éléments flottants
    };
    
    // Variables pour le suivi du défilement
    let lastScrollY = window.scrollY;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let ticking = false;
    
    // Fonction pour mettre à jour les transformations des couches parallax
    function updateParallaxLayers() {
        // Calculer la différence de défilement
        const scrollDiff = window.scrollY - lastScrollY;
        const scrollDirection = Math.sign(scrollDiff); // 1 pour descendre, -1 pour monter
        const scrollAmount = Math.abs(scrollDiff); // Quantité de défilement
        
        // Facteur de lissage pour rendre le mouvement plus fluide
        const smoothingFactor = 0.1;
        
        // Mettre à jour chaque couche avec un effet de parallaxe
        if (parallaxLayers.bg) {
            // La couche d'arrière-plan se déplace lentement dans la direction opposée au défilement
            const currentTransform = getTransformValues(parallaxLayers.bg);
            const newY = currentTransform.y - (scrollDiff * speedFactors.bg);
            parallaxLayers.bg.style.transform = `translate3d(0, ${newY}px, 0)`;
        }
        
        if (parallaxLayers.mid) {
            // La couche du milieu se déplace plus rapidement
            const currentTransform = getTransformValues(parallaxLayers.mid);
            const newY = currentTransform.y - (scrollDiff * speedFactors.mid);
            parallaxLayers.mid.style.transform = `translate3d(0, ${newY}px, 0)`;
        }
        
        if (parallaxLayers.front) {
            // La couche d'avant-plan se déplace encore plus rapidement
            const currentTransform = getTransformValues(parallaxLayers.front);
            const newY = currentTransform.y - (scrollDiff * speedFactors.front);
            parallaxLayers.front.style.transform = `translate3d(0, ${newY}px, 0)`;
        }
        
        if (parallaxLayers.closest) {
            // La couche la plus proche se déplace très rapidement
            const currentTransform = getTransformValues(parallaxLayers.closest);
            const newY = currentTransform.y - (scrollDiff * speedFactors.closest);
            parallaxLayers.closest.style.transform = `translate3d(0, ${newY}px, 0)`;
        }
        
        if (parallaxLayers.stars) {
            // Le fond étoilé se déplace très lentement
            const currentTransform = getTransformValues(parallaxLayers.stars);
            const newY = currentTransform.y - (scrollDiff * speedFactors.stars);
            parallaxLayers.stars.style.transform = `translate3d(0, ${newY}px, 0)`;
        }
        
        // Mettre à jour les éléments flottants avec des vitesses variables
        if (parallaxLayers.floatingElements) {
            parallaxLayers.floatingElements.forEach((element, index) => {
                // Chaque élément a une vitesse légèrement différente
                const elementSpeed = speedFactors.floatingMin + 
                    (index / parallaxLayers.floatingElements.length) * 
                    (speedFactors.floatingMax - speedFactors.floatingMin);
                
                // Récupérer la transformation actuelle
                const currentTransform = getTransformValues(element);
                
                // Calculer la nouvelle position Y avec un mouvement plus fluide
                const newY = currentTransform.y - (scrollDiff * elementSpeed);
                
                // Appliquer une légère rotation en fonction du défilement
                const rotationAmount = scrollDiff * 0.01 * (index % 2 === 0 ? 1 : -1);
                
                // Appliquer la nouvelle transformation avec rotation
                element.style.transform = `translate3d(0, ${newY}px, 0) rotate(${rotationAmount}deg)`;
                
                // Ajuster l'opacité en fonction de la position de défilement
                const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
                const opacity = Math.max(0.3, 1 - scrollPercent * 0.5);
                element.style.opacity = opacity;
                
                // Ajouter un effet de flou progressif
                const blur = Math.min(3, scrollPercent * 5);
                element.style.filter = `blur(${blur}px)`;
            });
        }
        
        // Mettre à jour la position de défilement
        lastScrollY = window.scrollY;
        ticking = false;
    }
    
    // Fonction pour extraire les valeurs de transformation actuelles
    function getTransformValues(element) {
        const transform = element.style.transform;
        let x = 0, y = 0, z = 0;
        
        if (transform && transform !== 'none') {
            const matches = transform.match(/translate3d\(([^,]+),\s*([^,]+),\s*([^)]+)\)/);
            if (matches) {
                x = parseFloat(matches[1]);
                y = parseFloat(matches[2]);
                z = parseFloat(matches[3]);
            } else {
                const translateYMatch = transform.match(/translateY\(([^)]+)\)/);
                if (translateYMatch) {
                    y = parseFloat(translateYMatch[1]);
                }
            }
        }
        
        return { x, y, z };
    }
    
    // Fonction pour ajouter un effet de parralaxe basé sur la position de la souris
    function handleMouseMove(e) {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                // Calculer le déplacement de la souris par rapport au centre
                const mouseX = e.clientX - window.innerWidth / 2;
                const mouseY = e.clientY - window.innerHeight / 2;
                
                // Normaliser les valeurs (entre -1 et 1)
                const normalizedX = mouseX / (window.innerWidth / 2);
                const normalizedY = mouseY / (window.innerHeight / 2);
                
                // Appliquer un effet de parallaxe léger basé sur la position de la souris
                if (parallaxLayers.floatingElements) {
                    parallaxLayers.floatingElements.forEach((element, index) => {
                        const depth = 0.5 + (index / parallaxLayers.floatingElements.length) * 2;
                        const moveX = normalizedX * depth * 5;
                        const moveY = normalizedY * depth * 5;
                        
                        // Récupérer la transformation actuelle
                        const currentTransform = getTransformValues(element);
                        
                        // Combiner le mouvement de défilement avec le mouvement de la souris
                        element.style.transform = `translate3d(${moveX}px, ${currentTransform.y}px, 0)`;
                    });
                }
                
                ticking = false;
            });
            
            ticking = true;
        }
    }
    
    // Optimiser les performances en limitant les appels d'animation lors du défilement
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateParallaxLayers();
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Ajouter l'effet de parallaxe basé sur la position de la souris
    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    
    // Initialiser les positions
    updateParallaxLayers();
});

// Circular Shorts Carousel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Configuration du carrousel
    const container = document.querySelector('#shorts .grid');
    const items = document.querySelectorAll('#shorts .grid > div');
    const radius = 250; // Rayon du cercle
    const totalItems = items.length;
    let angle = 0;
    let currentIndex = 0;
    
    // Fonction pour initialiser le carrousel circulaire
    function initCarousel() {
        // Transformer le grid en un conteneur pour le carrousel
        container.style.position = 'relative';
        container.style.height = '600px';
        container.style.margin = '0 auto';
        container.style.perspective = '1000px';
        container.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-8');
        
        // Positionner chaque élément autour du cercle
        items.forEach((item, index) => {
            // Ajuster le style pour chaque élément du carrousel
            item.style.position = 'absolute';
            item.style.width = '180px';
            item.style.height = '320px';
            item.style.transition = 'all 1s ease-out';
            item.style.transformStyle = 'preserve-3d';
            
            // Ajouter un événement de clic pour chaque élément
            item.addEventListener('click', () => {
                rotateCarousel(index);
            });
            
            // Configuration initiale - positionner les éléments en cercle
            updatePosition(item, index);
        });
        
        // Créer les boutons de navigation
        createNavButtons();
        
        // Positionnement initial
        rotateCarousel(0);
    }
    
    // Fonction pour mettre à jour la position d'un élément
    function updatePosition(item, index) {
        // Calculer l'angle de chaque élément
        const itemAngle = (index * (360 / totalItems) + angle) % 360;
        const radian = itemAngle * Math.PI / 180;
        
        // Calculer la position x et z pour créer un cercle
        const x = Math.sin(radian) * radius;
        const z = Math.cos(radian) * radius;
        
        // Calculer l'échelle basée sur la position z (plus loin = plus petit)
        const scale = remapRange(z, -radius, radius, 0.6, 1.2);
        
        // Calculer l'opacité basée sur la position z (plus loin = plus transparent)
        const opacity = remapRange(z, -radius, radius, 0.5, 1);
        
        // Appliquer les transformations
        item.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${scale})`;
        item.style.opacity = opacity;
        item.style.zIndex = Math.round(z) + 1000;
        
        // Ajouter un effet de focus pour l'élément frontal
        if (Math.abs(z - radius) < 50) {
            item.classList.add('focused');
            item.style.boxShadow = '0 0 20px 5px rgba(46, 95, 170, 0.8)';
            item.style.filter = 'brightness(1.2)';
        } else {
            item.classList.remove('focused');
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            item.style.filter = 'brightness(0.9)';
        }
    }
    
    // Fonction pour remapper une valeur d'une plage à une autre
    function remapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    
    // Fonction pour faire tourner le carrousel
    function rotateCarousel(targetIndex) {
        // Calculer le nouvel angle
        const angleOffset = 360 / totalItems;
        angle = -(targetIndex * angleOffset);
        currentIndex = targetIndex;
        
        // Mettre à jour la position de chaque élément
        items.forEach((item, index) => {
            updatePosition(item, index);
        });
        
        // Mettre à jour l'indicateur actif
        updateActiveIndicator();
    }
    
    // Fonction pour créer les boutons de navigation
    function createNavButtons() {
        // Créer un conteneur pour les boutons
        const navContainer = document.createElement('div');
        navContainer.classList.add('carousel-nav');
        navContainer.style.display = 'flex';
        navContainer.style.justifyContent = 'center';
        navContainer.style.gap = '10px';
        navContainer.style.marginTop = '20px';
        
        // Ajouter un bouton précédent
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.classList.add('nav-btn', 'prev-btn');
        prevBtn.addEventListener('click', () => {
            rotateCarousel((currentIndex - 1 + totalItems) % totalItems);
        });
        
        // Ajouter les indicateurs
        const indicators = document.createElement('div');
        indicators.classList.add('carousel-indicators');
        indicators.style.display = 'flex';
        indicators.style.gap = '8px';
        
        // Créer un indicateur pour chaque élément
        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('carousel-indicator');
            indicator.dataset.index = i;
            indicator.style.width = '12px';
            indicator.style.height = '12px';
            indicator.style.borderRadius = '50%';
            indicator.style.background = '#2E5FAA';
            indicator.style.opacity = '0.5';
            indicator.style.cursor = 'pointer';
            indicator.style.transition = 'all 0.3s ease';
            
            // Ajouter un événement de clic pour chaque indicateur
            indicator.addEventListener('click', () => {
                rotateCarousel(i);
            });
            
            indicators.appendChild(indicator);
        }
        
        // Ajouter un bouton suivant
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.classList.add('nav-btn', 'next-btn');
        nextBtn.addEventListener('click', () => {
            rotateCarousel((currentIndex + 1) % totalItems);
        });
        
        // Styliser les boutons
        [prevBtn, nextBtn].forEach(btn => {
            btn.style.background = '#2E5FAA';
            btn.style.color = 'white';
            btn.style.border = 'none';
            btn.style.borderRadius = '50%';
            btn.style.width = '40px';
            btn.style.height = '40px';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.3s ease';
            btn.style.boxShadow = '0 4px 10px rgba(46, 95, 170, 0.5)';
            
            // Effet de survol
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.1)';
                btn.style.boxShadow = '0 6px 15px rgba(46, 95, 170, 0.7)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = '0 4px 10px rgba(46, 95, 170, 0.5)';
            });
        });
        
        // Ajouter les boutons au conteneur
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(indicators);
        navContainer.appendChild(nextBtn);
        
        // Ajouter le conteneur à la page
        container.parentNode.appendChild(navContainer);
    }
    
    // Fonction pour mettre à jour l'indicateur actif
    function updateActiveIndicator() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.style.opacity = '1';
                indicator.style.transform = 'scale(1.2)';
                indicator.style.boxShadow = '0 0 10px rgba(46, 95, 170, 0.7)';
            } else {
                indicator.style.opacity = '0.5';
                indicator.style.transform = 'scale(1)';
                indicator.style.boxShadow = 'none';
            }
        });
    }
    
    // Fonction pour l'autoplay
    function startAutoplay(interval = 3000) {
        return setInterval(() => {
            rotateCarousel((currentIndex + 1) % totalItems);
        }, interval);
    }
    
    // Initialiser le carrousel
    initCarousel();
    
    // Démarrer l'autoplay
    let autoplayInterval = startAutoplay();
    
    // Arrêter l'autoplay lors de l'interaction
    container.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    // Reprendre l'autoplay lorsque la souris quitte le carrousel
    container.addEventListener('mouseleave', () => {
        clearInterval(autoplayInterval);
        autoplayInterval = startAutoplay();
    });
});

// Configuration du carrousel compact pour les shorts
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionner les éléments du carrousel
    const container = document.querySelector('#shorts .grid');
    const items = document.querySelectorAll('#shorts .grid > div');
    
    // Configuration du carrousel
    const radius = 180; // Rayon réduit pour rapprocher les éléments
    const totalItems = items.length;
    let angle = 0;
    let currentIndex = 0;
    
    // Fonction pour initialiser le carrousel
    function initCarousel() {
        // Transformer le conteneur
        container.style.position = 'relative';
        container.style.height = '550px'; // Hauteur réduite
        container.style.width = '100%';
        container.style.maxWidth = '800px'; // Largeur maximale pour centrer
        container.style.margin = '0 auto';
        container.style.perspective = '1200px';
        container.classList.remove('grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-8');
        
        // Centre du cercle légèrement plus haut pour améliorer la visibilité
        const centerX = 0;
        const centerY = -50; // Décalage vers le haut
        
        // Positionner chaque élément en cercle plus serré
        items.forEach((item, index) => {
            // Style de base pour chaque item
            item.style.position = 'absolute';
            item.style.width = '160px'; // Taille réduite
            item.style.height = '285px'; // Taille réduite
            item.style.left = '50%';
            item.style.top = '50%';
            item.style.transform = 'translate(-50%, -50%)';
            item.style.transition = 'all 0.8s cubic-bezier(0.165, 0.84, 0.44, 1)';
            item.style.transformStyle = 'preserve-3d';
            
            // Événement de clic pour chaque élément
            item.addEventListener('click', () => {
                rotateCarousel(index);
            });
            
            // Appliquer la position initiale
            updatePosition(item, index, centerX, centerY);
        });
        
        // Créer les boutons de navigation
        createNavButtons();
        
        // Positionnement initial
        rotateCarousel(0);
        
        // Ajouter une classe pour le conteneur
        container.classList.add('shorts-carousel-container');
    }
    
    // Fonction pour mettre à jour la position
    function updatePosition(item, index, centerX, centerY) {
        // Calculer l'angle de position
        const itemAngle = (index * (360 / totalItems) + angle) % 360;
        const radian = itemAngle * Math.PI / 180;
        
        // Calculer les coordonnées X et Z dans un cercle
        const x = Math.sin(radian) * radius + centerX;
        const z = Math.cos(radian) * radius;
        
        // Calculer l'échelle basée sur la position Z
        const scale = remapRange(z, -radius, radius, 0.75, 1.1);
        
        // Calculer l'opacité basée sur la position
        const opacity = remapRange(z, -radius, radius, 0.6, 1);
        
        // Appliquer les transformations
        item.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${centerY}px)) translateZ(${z}px) scale(${scale})`;
        item.style.opacity = opacity;
        item.style.zIndex = Math.round(z + 1000);
        
        // Ajouter un effet de focus pour l'élément frontal
        if (Math.abs(z - radius) < 30) {
            item.classList.add('focused');
            item.style.boxShadow = '0 0 25px 5px rgba(46, 95, 170, 0.85)';
            item.style.filter = 'brightness(1.2)';
        } else {
            item.classList.remove('focused');
            item.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
            item.style.filter = 'brightness(0.9)';
        }
    }
    
    // Fonction utilitaire pour remapper une valeur d'une plage à une autre
    function remapRange(value, inMin, inMax, outMin, outMax) {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }
    
    // Fonction pour faire tourner le carrousel
    function rotateCarousel(targetIndex) {
        // Calculer le nouvel angle
        const angleOffset = 360 / totalItems;
        angle = -(targetIndex * angleOffset);
        currentIndex = targetIndex;
        
        // Mettre à jour la position de tous les éléments
        items.forEach((item, index) => {
            updatePosition(item, index, 0, -50);
        });
        
        // Mettre à jour l'indicateur actif
        updateActiveIndicator();
    }
    
    // Créer les contrôles de navigation
    function createNavButtons() {
        // Créer un conteneur pour les contrôles
        const navContainer = document.createElement('div');
        navContainer.classList.add('carousel-nav');
        navContainer.style.display = 'flex';
        navContainer.style.justifyContent = 'center';
        navContainer.style.alignItems = 'center';
        navContainer.style.gap = '12px';
        navContainer.style.marginTop = '30px';
        
        // Bouton précédent
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prevBtn.classList.add('nav-btn', 'prev-btn');
        prevBtn.addEventListener('click', () => {
            rotateCarousel((currentIndex - 1 + totalItems) % totalItems);
        });
        
        // Conteneur pour les indicateurs
        const indicators = document.createElement('div');
        indicators.classList.add('carousel-indicators');
        indicators.style.display = 'flex';
        indicators.style.gap = '8px';
        
        // Créer un indicateur pour chaque élément
        for (let i = 0; i < totalItems; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('carousel-indicator');
            indicator.dataset.index = i;
            indicator.style.width = '10px';
            indicator.style.height = '10px';
            indicator.style.borderRadius = '50%';
            indicator.style.background = '#2E5FAA';
            indicator.style.opacity = '0.5';
            indicator.style.cursor = 'pointer';
            indicator.style.transition = 'all 0.3s ease';
            
            // Ajouter un événement de clic
            indicator.addEventListener('click', () => {
                rotateCarousel(i);
            });
            
            indicators.appendChild(indicator);
        }
        
        // Bouton suivant
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        nextBtn.classList.add('nav-btn', 'next-btn');
        nextBtn.addEventListener('click', () => {
            rotateCarousel((currentIndex + 1) % totalItems);
        });
        
        // Styler les boutons
        [prevBtn, nextBtn].forEach(btn => {
            btn.style.background = '#2E5FAA';
            btn.style.color = 'white';
            btn.style.border = 'none';
            btn.style.borderRadius = '50%';
            btn.style.width = '36px';
            btn.style.height = '36px';
            btn.style.display = 'flex';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.cursor = 'pointer';
            btn.style.transition = 'all 0.3s ease';
            btn.style.boxShadow = '0 4px 10px rgba(46, 95, 170, 0.5)';
            
            // Effet au survol
            btn.addEventListener('mouseenter', () => {
                btn.style.transform = 'scale(1.1)';
                btn.style.boxShadow = '0 6px 15px rgba(46, 95, 170, 0.7)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = '0 4px 10px rgba(46, 95, 170, 0.5)';
            });
        });
        
        // Assembler les éléments de navigation
        navContainer.appendChild(prevBtn);
        navContainer.appendChild(indicators);
        navContainer.appendChild(nextBtn);
        
        // Ajouter le conteneur à la page
        container.parentNode.appendChild(navContainer);
    }
    
    // Mettre à jour l'indicateur actif
    function updateActiveIndicator() {
        const indicators = document.querySelectorAll('.carousel-indicator');
        indicators.forEach((indicator, index) => {
            if (index === currentIndex) {
                indicator.style.opacity = '1';
                indicator.style.transform = 'scale(1.3)';
                indicator.style.boxShadow = '0 0 10px rgba(46, 95, 170, 0.7)';
            } else {
                indicator.style.opacity = '0.5';
                indicator.style.transform = 'scale(1)';
                indicator.style.boxShadow = 'none';
            }
        });
    }
    
    // Autoplay du carrousel
    function startAutoplay(interval = 3500) {
        return setInterval(() => {
            rotateCarousel((currentIndex + 1) % totalItems);
        }, interval);
    }
    
    // Initialiser le carrousel
    initCarousel();
    
    // Démarrer l'autoplay
    let autoplayInterval = startAutoplay();
    
    // Gérer l'autoplay lors de l'interaction
    container.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    container.addEventListener('mouseleave', () => {
        clearInterval(autoplayInterval);
        autoplayInterval = startAutoplay();
    });
    
    // Ajouter des contrôles clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            rotateCarousel((currentIndex - 1 + totalItems) % totalItems);
        } else if (e.key === 'ArrowRight') {
            rotateCarousel((currentIndex + 1) % totalItems);
        }
    });
});
