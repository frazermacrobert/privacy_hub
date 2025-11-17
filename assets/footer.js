document.addEventListener('DOMContentLoaded', () => {
    const tools = [
        { slug: 'six-degrees', name: 'Six Degrees of Your Data' },
        { slug: 'metadata-unmasked', name: 'Metadata Unmasked' },
        { slug: 'global-gossip', name: 'Global Gossip Simulator' },
        { slug: 'inbox-domino', name: 'Inbox Domino Effect' },
        { slug: 'privacy-reflex', name: 'Privacy Reflex Trainer' },
        { slug: 'timeline-leak', name: 'Timeline of a Leak' },
        { slug: 'privacy-settings-lab', name: 'Privacy Settings Lab' },
        { slug: 'public-profile-scanner', name: 'Public Profile Scanner' }
    ];

    function getPathPrefix() {
        const scriptTag = document.querySelector('script[src*="assets/footer.js"]');
        if (!scriptTag) return '';
        const src = scriptTag.getAttribute('src');
        return src.replace('assets/footer.js', '');
    }

    const pathPrefix = getPathPrefix();

    async function injectFooter() {
        try {
            const existingFooter = document.querySelector('footer.main-nav');
            if (existingFooter) {
                existingFooter.remove();
            }

            const response = await fetch(`${pathPrefix}assets/footer.html`);
            if (!response.ok) throw new Error('Failed to fetch footer HTML');
            const footerHTML = await response.text();
            document.body.insertAdjacentHTML('beforeend', footerHTML);

            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = `${pathPrefix}styles/footer.css`;
            document.head.appendChild(stylesheet);

            setupNavigation();
        } catch (error) {
            console.error('Error injecting footer:', error);
        }
    }

    function setupNavigation() {
        const burgerMenu = document.querySelector('.burger-menu');
        const navLinksContainer = document.querySelector('.nav-links');
        if (burgerMenu && navLinksContainer) {
            burgerMenu.addEventListener('click', () => {
                burgerMenu.classList.toggle('open');
                navLinksContainer.classList.toggle('open');
            });
        }

        const currentPath = window.location.pathname;
        const isHomePage = !currentPath.includes('/tools/');
        const currentToolSlug = isHomePage ? null : currentPath.split('/tools/')[1].split('/')[0];

        const homePath = isHomePage ? '#' : `${pathPrefix}index.html`;
        let prevPath, nextPath;

        if (isHomePage) {
            prevPath = `${pathPrefix}tools/${tools[tools.length - 1].slug}/index.html`;
            nextPath = `${pathPrefix}tools/${tools[0].slug}/index.html`;
        } else {
            const currentIndex = tools.findIndex(tool => tool.slug === currentToolSlug);
            if (currentIndex === -1) return;

            prevPath = currentIndex === 0
                ? homePath
                : `${pathPrefix}tools/${tools[currentIndex - 1].slug}/index.html`;

            nextPath = currentIndex === tools.length - 1
                ? homePath
                : `${pathPrefix}tools/${tools[currentIndex + 1].slug}/index.html`;
        }

        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        if (prevArrow) prevArrow.href = prevPath;
        if (nextArrow) nextArrow.href = nextPath;

        const homeLink = navLinksContainer.querySelector('.home-link');
        if (homeLink) {
            homeLink.href = homePath;
        }

        const existingLinks = navLinksContainer.querySelectorAll('.nav-link:not(.home-link)');
        existingLinks.forEach(l => l.remove());

        tools.forEach(tool => {
            const link = document.createElement('a');
            link.href = `${pathPrefix}tools/${tool.slug}/index.html`;
            link.className = 'nav-link';
            link.textContent = tool.name;
            navLinksContainer.appendChild(link);
        });
    }

    injectFooter();
});
