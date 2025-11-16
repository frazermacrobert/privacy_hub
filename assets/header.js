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

    // --- Determine Page Context ---
    const currentPath = window.location.pathname;
    const isHomePage = !currentPath.includes('/tools/');

    // --- Pathing Logic ---
    const dirPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
    const pathDepth = isHomePage ? 0 : dirPath.split('/').filter(Boolean).length;
    const pathPrefix = '../'.repeat(pathDepth);

    async function injectHeader() {
        try {
            const response = await fetch(`${pathPrefix}assets/header.html`);
            if (!response.ok) throw new Error('Failed to fetch header HTML');
            const headerHTML = await response.text();
            document.body.insertAdjacentHTML('afterbegin', headerHTML);

            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = `${pathPrefix}styles/header.css`;
            stylesheet.href = `/styles/header.css`;
            document.head.appendChild(stylesheet);

            setupNavigation();
        } catch (error) {
            console.error('Error injecting header:', error);
        }
    }

    function setupNavigation() {
        const burgerMenu = document.querySelector('.burger-menu');
        const navLinksContainer = document.querySelector('.nav-links');

        if (burgerMenu && navLinksContainer) {
            burgerMenu.addEventListener('click', () => {
                burgerMenu.classList.toggle('open');
                navLinkmsContainer.classList.toggle('open');
            });
        }

        // --- Arrow Navigation Logic ---
        const pathParts = currentPath.split('/').filter(part => part && part !== 'index.html');
        const currentToolSlug = isHomePage ? null : pathParts[pathParts.length - 1];

        const homePath = isHomePage ? '#' : `${pathPrefix}index.html`;
        let prevPath, nextPath;

        if (isHomePage) {
            prevPath = `tools/${tools[tools.length - 1].slug}/index.html`;
            nextPath = `tools/${tools[0].slug}/index.html`;
        const homePath = isHomePage ? '#' : `/index.html`;
        let prevPath, nextPath;

        if (isHomePage) {
            prevPath = `/tools/${tools[tools.length - 1].slug}/index.html`;
            nextPath = `/tools/${tools[0].slug}/index.html`;
        } else {
            const currentIndex = tools.findIndex(tool => tool.slug === currentToolSlug);
            const base = pathPrefix.replace('../', ''); // Adjust for tool pages
            if (currentIndex === 0) {
                prevPath = homePath; // From tool 1 to home
            } else {
                prevPath = `${base}${tools[currentIndex - 1].slug}/index.html`;
                prevPath = `/tools/${tools[currentIndex - 1].slug}/index.html`;
            }

            if (currentIndex === tools.length - 1) {
                nextPath = homePath; // From last tool to home
            } else {
                nextPath = `${base}${tools[currentIndex + 1].slug}/index.html`;
                nextPath = `/tools/${tools[currentIndex + 1].slug}/index.html`;
            }
        }

        const prevArrow = document.querySelector('.prev-arrow');
        const nextArrow = document.querySelector('.next-arrow');
        if (prevArrow) prevArrow.href = prevPath;
        if (nextArrow) nextArrow.href = nextPath;

        // --- Populate Menu ---
        const homeLink = navLinksContainer.querySelector('.home-link');
        const generatedLinks = navLinksContainer.querySelectorAll('.nav-link');
        generatedLinks.forEach(l => l.remove()); // Clear existing tool links

        if (homeLink) {
            homeLink.href = homePath;
        }

        tools.forEach(tool => {
            const link = document.createElement('a');
            const base = isHomePage ? 'tools/' : pathPrefix.replace('../', '');
            const toolPath = `${base}${tool.slug}/index.html`;
            link.href = toolPath;
            link.href = `/tools/${tool.slug}/index.html`;
            link.className = 'nav-link';
            link.textContent = tool.name;
            navLinksContainer.appendChild(link);
        });
    }

    injectHeader();
});
