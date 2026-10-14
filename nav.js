function load(file, target, fallbackHtml) {
    const container = document.getElementById(target);
    if (!container) return;

    fetch(file, { cache: "no-store" })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load " + file);
            }
            return response.text();
        })
        .then(html => {
            container.innerHTML = html;
        })
        .catch(() => {
            container.innerHTML = fallbackHtml;
        });
}

load('nav.html', 'site-header', `
    <nav aria-label="Main navigation">
        <a class="logo" href="index.html">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/>
                <path d="M5 21h14"/>
            </svg>
            <span>My Photography Projects</span>
        </a>
        <ul class="links">
            <li><a href="index.html">Home</a></li>
            <li><a href="project.html">Projects</a></li>
            <li><a href="quotes.html">Quotes</a></li>
            <li><a href="machine.html">Machine</a></li>
            <li><a href="about.html">About</a></li>
        </ul>
        <a class="action" href="about.html#contact">Contact</a>
    </nav>
`);

load('footer.html', 'site-footer', `
    <p>My Photography Projects · Web Technologies 2026</p>
    <address>
        <a href="mailto:me@example.com">me@example.com</a>
    </address>
`);
