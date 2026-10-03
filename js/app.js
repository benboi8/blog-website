(() => {
    'use strict';

    const html = document.documentElement;
    const themeToggle = document.querySelector('[data-theme-toggle]');
    const navToggle = document.querySelector('[data-nav-toggle]');
    const nav = document.querySelector('[data-nav]');

    // -----------------------------
    // Theme
    // -----------------------------

    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
        html.dataset.theme = savedTheme;
    } else {
        const prefersDark = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;

        html.dataset.theme = prefersDark ? 'dark' : 'light';
    }

    function updateThemeButton() {
        if (!themeToggle) return;

        const dark = html.dataset.theme === 'dark';

        themeToggle.setAttribute('aria-pressed', String(dark));
        themeToggle.setAttribute(
            'aria-label',
            dark ? 'Switch to light mode' : 'Switch to dark mode'
        );
    }

    updateThemeButton();

    if (themeToggle) {
        themeToggle.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const nextTheme =
                html.dataset.theme === 'dark' ? 'light' : 'dark';

            html.dataset.theme = nextTheme;
            localStorage.setItem('theme', nextTheme);

            updateThemeButton();
        });
    }

    // -----------------------------
    // Mobile navigation
    // -----------------------------

    if (navToggle && nav) {
        navToggle.addEventListener('click', (event) => {
            event.preventDefault();
            event.stopPropagation();

            const isOpen = nav.classList.toggle('is-open');

            navToggle.setAttribute(
                'aria-expanded',
                String(isOpen)
            );
        });

        // Close mobile menu after clicking an actual navigation link.
        nav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                nav.classList.remove('is-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // -----------------------------
    // Archive search
    // -----------------------------

    const searchInput = document.querySelector('[data-search]');
    const posts = document.querySelectorAll('[data-post-card]');

    if (searchInput && posts.length) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value
                .trim()
                .toLowerCase();

            posts.forEach((post) => {
                const text = post.textContent.toLowerCase();
                post.hidden = query !== '' && !text.includes(query);
            });
        });
    }
})();