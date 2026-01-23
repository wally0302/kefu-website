(() => {
    const baseConfig = {
        darkMode: 'class',
        theme: {
            extend: {
                fontFamily: {
                    sans: ['"Inter"', '"Noto Sans TC"', 'sans-serif'],
                },
                colors: {
                    brand: {
                        dark: '#0B0F19',
                        card: '#111827',
                        border: '#1F2937',
                        primary: '#6366F1',
                        accent: '#8B5CF6',
                        glow: '#3B82F6',
                        danger: '#EF4444',
                        success: '#10B981',
                    },
                },
                backgroundImage: {
                    'card-gradient': 'linear-gradient(145deg, rgba(17, 24, 39, 1) 0%, rgba(17, 24, 39, 0.6) 100%)',
                    'button-gradient': 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
                },
            },
        },
    };

    const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

    const mergeDeep = (target, source) => {
        const output = { ...target };
        if (isObject(target) && isObject(source)) {
            Object.keys(source).forEach((key) => {
                if (isObject(source[key])) {
                    output[key] = mergeDeep(target[key] || {}, source[key]);
                } else {
                    output[key] = source[key];
                }
            });
        }
        return output;
    };

    window.setTailwindConfig = (override = {}) => {
        window.tailwind = window.tailwind || {};
        window.tailwind.config = mergeDeep(baseConfig, override);
    };
})();
