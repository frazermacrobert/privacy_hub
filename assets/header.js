document.addEventListener('DOMContentLoaded', () => {
    function getPathPrefix() {
        const scriptTag = document.querySelector('script[src*="assets/header.js"]');
        if (!scriptTag) return '';
        const src = scriptTag.getAttribute('src');
        return src.replace('assets/header.js', '');
    }

    const pathPrefix = getPathPrefix();

    async function injectHeader() {
        try {
            const existingHeader = document.querySelector('header');
            if (existingHeader) {
                existingHeader.remove();
            }

            const response = await fetch(`${pathPrefix}assets/header.html`);
            if (!response.ok) throw new Error('Failed to fetch header HTML');
            const headerHTML = await response.text();
            document.body.insertAdjacentHTML('afterbegin', headerHTML);

            const stylesheet = document.createElement('link');
            stylesheet.rel = 'stylesheet';
            stylesheet.href = `${pathPrefix}styles/header.css`;
            document.head.appendChild(stylesheet);
        } catch (error) {
            console.error('Error injecting header:', error);
        }
    }

    injectHeader();
});
