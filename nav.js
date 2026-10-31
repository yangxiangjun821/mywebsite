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
            <span>Vanishing Wild</span>
        </a>
        <ul class="links">
            <li><a href="index.html">Home</a></li>
            <li><a href="project.html">Animals</a></li>
            <li><a href="quotes.html">Quotes</a></li>
            <li><a href="machine.html">Paper Sanctuary</a></li>
            <li><a href="about.html">About</a></li>
        </ul>
        <a class="action" href="about.html#contact">Contact</a>
    </nav>
`);

load('footer.html', 'site-footer', `
    <p>Vanishing Wild · Web Technologies 2026</p>
    <address>
        <a href="mailto:me@example.com">me@example.com</a>
    </address>
`);
