// Hero Animation System
// Phase 1: CSS keyframe entrance (2s) → text fades in via CSS class
// Phase 2: Scroll-driven border expansion

document.addEventListener("DOMContentLoaded", () => {
    const heroSection = document.querySelector(".hero-section");
    const videoWrapper = document.querySelector("#hero-bg-video");
    const textOverlay = document.querySelector(".hero-content-wrapper");
    const bottomTransition = document.querySelector(".hero-bottom-transition");
    const header = document.querySelector(".md-header");
    const tabs = document.querySelector(".md-tabs");

    if (!heroSection || !videoWrapper || !textOverlay || !bottomTransition) return;

    // Must match CSS heroZoomEntrance duration
    const ENTRANCE_MS   = 1500;
    // Short pause after entrance before text appears – feels snappy, not sluggish
    const TEXT_DELAY_MS = 50;

    // Must match resting clip-path in CSS
    const initialInset  = 12;
    const initialRadius = 20;
    // Border closes within the first 30% of hero scroll – feels premium and smooth
    const EXPAND_RANGE  = 0.30;

    // Only play entrance when page loads at the very top (scrollY < 50px).
    // If reloading mid-page, scroll to top instantly and skip the animation.
    const atTop = window.scrollY < 50;

    if (!atTop) {
        // Reload happened mid-page: jump to top silently, skip entrance
        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    let isEntering = atTop;

    if (atTop) {
        // Normal entrance flow
        document.body.classList.add('hero-animating');
        videoWrapper.classList.add('hero-entrance');

        setTimeout(() => {
            isEntering = false;
            videoWrapper.classList.remove('hero-entrance');
            document.body.classList.remove('hero-animating');

            if (header) {
                header.style.transition    = 'opacity 0.6s ease';
                header.style.opacity       = '1';
                header.style.pointerEvents = 'auto';
            }
            if (tabs) {
                tabs.style.transition    = 'opacity 0.6s ease';
                tabs.style.opacity       = '1';
                tabs.style.pointerEvents = 'auto';
            }

            setTimeout(() => textOverlay.classList.add('hero-text-visible'), TEXT_DELAY_MS);

            renderScrollAnimation();
        }, ENTRANCE_MS);
    } else {
        // Mid-page reload: skip entrance, show everything immediately
        textOverlay.classList.add('hero-text-visible');
        videoWrapper.style.clipPath       = 'none';
        videoWrapper.style.webkitClipPath = 'none';
        renderScrollAnimation();
    }

    // Phase 2: scroll-driven expansion
    function renderScrollAnimation() {
        if (isEntering) return;

        const scrolled  = window.scrollY;
        const maxScroll = Math.max(1, heroSection.offsetHeight - window.innerHeight);
        const progress  = Math.min(1, scrolled / maxScroll);

        // Border closes smoothly using an ease-out cubic curve (starts fast, decelerates gracefully to the edge)
        const linearProg = Math.min(progress / EXPAND_RANGE, 1);
        const expandProg = 1 - Math.pow(1 - linearProg, 3);
        const curInset   = initialInset  * (1 - expandProg);
        const curRadius  = initialRadius * (1 - expandProg);

        if (expandProg >= 1) {
            videoWrapper.style.clipPath       = 'none';
            videoWrapper.style.webkitClipPath = 'none';
            videoWrapper.style.transform      = 'translateZ(0)';
            updateThemeColor('#000000');
        } else {
            const clip = `inset(${curInset}px round ${curRadius}px)`;
            videoWrapper.style.clipPath       = clip;
            videoWrapper.style.webkitClipPath = clip;
            videoWrapper.style.transform      = 'translateZ(0)';
            updateThemeColor('#ffffff');
        }

        // Header blur and visibility tracking
        const highlights = document.querySelector('.highlights-section');
        
        // 1. Header blur once highlights section is past the top
        const pastHero = highlights ? highlights.getBoundingClientRect().top <= 0 : false;
        if (header) header.classList.toggle('header-scrolled', pastHero);
        if (tabs)   tabs.classList.toggle('header-scrolled',   pastHero);

        // 2. Track visibility of hero and highlights to toggle transparent header state
        const heroRect = heroSection.getBoundingClientRect();
        const heroVisible = heroRect.bottom > 0 && heroRect.top < window.innerHeight;
        const highlightsVisible = highlights 
            ? (highlights.getBoundingClientRect().bottom > 0 && highlights.getBoundingClientRect().top < window.innerHeight) 
            : false;
        document.body.classList.toggle("hero-highlight-visible", heroVisible || highlightsVisible);

        // Initial group: parallax out upward
        const initGroup = document.querySelector('.hero-group.initial-group');
        if (initGroup) {
            initGroup.style.transform     = `translateY(-${scrolled * 1.6}px)`;
            initGroup.style.pointerEvents = 'auto';
        }

        // Scroll group: Snappy staggered scroll reveal for title & subtitle
        const scrollGroup = document.querySelector('.hero-group.scroll-group');
        const scrollTitle = scrollGroup ? scrollGroup.querySelector('.hero-title') : null;
        const scrollSub   = scrollGroup ? scrollGroup.querySelector('.hero-subtitle') : null;

        if (scrollGroup && scrollTitle && scrollSub) {
            const fadeRange = 0.20;

            // 1. Title fade and skew (triggers at 55% progress, when well visible in the lower-middle viewport)
            const tStart1 = 0.55;
            const op1 = progress > tStart1 ? Math.min(1, (progress - tStart1) / fadeRange) : 0;
            scrollTitle.style.opacity = op1;
            scrollTitle.style.transform = `translateY(${30 * (1 - op1)}px) skewY(${2 * (1 - op1)}deg)`;
            scrollTitle.style.willChange = 'transform, opacity';

            // 2. Subtitle fade and skew (triggers staggered at 65% progress)
            const tStart2 = 0.65;
            const op2 = progress > tStart2 ? Math.min(1, (progress - tStart2) / fadeRange) : 0;
            scrollSub.style.opacity = op2;
            scrollSub.style.transform = `translateY(${30 * (1 - op2)}px) skewY(${2 * (1 - op2)}deg)`;
            scrollSub.style.willChange = 'transform, opacity';

            // Set pointer events on parent container based on title visibility
            scrollGroup.style.pointerEvents = op1 > 0.2 ? 'auto' : 'none';
        }

        // Bottom transition gradient (timed beautifully with the text reveal)
        const tStart = 0.45, tEnd = 0.90;
        bottomTransition.style.opacity = progress > tStart
            ? Math.min(1, (progress - tStart) / (tEnd - tStart)) : 0;

        textOverlay.style.clipPath       = 'none';
        textOverlay.style.webkitClipPath = 'none';
    }

    // Update theme color for browser chrome
    function updateThemeColor(color) {
        let meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            meta = document.createElement('meta');
            meta.name = "theme-color";
            document.head.appendChild(meta);
        }
        if (meta.content !== color) {
            meta.content = color;
        }
    }

    // Performance-optimized scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                renderScrollAnimation();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Handle resize
    window.addEventListener('resize', () => renderScrollAnimation());

    // Premium Scroll Reveal Observer
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    // Stop observing once animated to save resources
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -120px 0px', // Trigger precisely when element enters 120px into viewport (ensuring visibility)
            threshold: 0 // Trigger instantly on first pixel overlap for 100% reliable cross-browser timing
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

    // Initial render
    renderScrollAnimation();

});