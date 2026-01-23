document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
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
        revealObserver.observe(target);
    });
});
