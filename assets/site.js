document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    const painCarousel = document.querySelector('[data-pain-carousel]');
    const painPrevButton = document.querySelector('[data-pain-prev]');
    const painNextButton = document.querySelector('[data-pain-next]');

    if (painCarousel && painPrevButton && painNextButton) {
        const toggleButton = (button, isDisabled) => {
            button.disabled = isDisabled;
            button.classList.toggle('opacity-40', isDisabled);
            button.classList.toggle('cursor-not-allowed', isDisabled);
        };

        const updateButtons = () => {
            const maxScrollLeft = painCarousel.scrollWidth - painCarousel.clientWidth;
            toggleButton(painPrevButton, painCarousel.scrollLeft <= 4);
            toggleButton(painNextButton, painCarousel.scrollLeft >= maxScrollLeft - 4);
        };

        const scrollByAmount = () => Math.round(painCarousel.clientWidth * 0.85);

        painPrevButton.addEventListener('click', () => {
            painCarousel.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
        });

        painNextButton.addEventListener('click', () => {
            painCarousel.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
        });

        painCarousel.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons);
        updateButtons();
    }

    const revealTargets = document.querySelectorAll('.scroll-reveal');
    if (!revealTargets.length) {
        return;
    }

    if (!('IntersectionObserver' in window)) {
        revealTargets.forEach((target) => target.classList.add('is-visible'));
        return;
    }

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.2,
            rootMargin: '0px 0px -10% 0px',
        },
    );

    revealTargets.forEach((target) => {
        const revealDelay = target.dataset.revealDelay;
        if (revealDelay) {
            const delayValue = /^\d+$/.test(revealDelay) ? `${revealDelay}ms` : revealDelay;
            target.style.transitionDelay = delayValue;
        }
        revealObserver.observe(target);
    });
});
