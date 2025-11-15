document.addEventListener('DOMContentLoaded', () => {
    const tools = [
        'six-degrees',
        'metadata-unmasked',
        'global-gossip',
        'inbox-domino',
        'privacy-reflex',
        'timeline-leak',
        'privacy-settings-lab',
        'public-profile-scanner'
    ];

    const currentPath = window.location.pathname;
    const pathParts = currentPath.split('/').filter(part => part !== '');
    const currentToolSlug = pathParts.length > 1 ? pathParts[pathParts.length - 2] : null;

    if (!currentToolSlug || !tools.includes(currentToolSlug)) {
        return;
    }

    const currentIndex = tools.indexOf(currentToolSlug);
    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;

    const homePath = '../../index.html';
    const prevPath = prevIndex >= 0 ? `../${tools[prevIndex]}/index.html` : null;
    const nextPath = nextIndex < tools.length ? `../${tools[nextIndex]}/index.html` : null;

    // Create and inject the stylesheet link
    const stylesheet = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = '../../styles/floating-nav.css';
    document.head.appendChild(stylesheet);

    // Create and inject the navigation HTML
    const navHTML = `
        <nav class="floating-nav">
            <a href="${prevPath || '#'}" class="floating-nav-link prev-link ${!prevPath ? 'disabled' : ''}">‹ Prev</a>
            <a href="${homePath}" class="floating-nav-link home-link">Hub</a>
            <a href="${nextPath || '#'}" class="floating-nav-link next-link ${!nextPath ? 'disabled' : ''}">Next ›</a>
        </nav>
    `;
    document.body.insertAdjacentHTML('beforeend', navHTML);
});
