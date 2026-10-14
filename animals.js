const filterButtons = document.querySelectorAll('.filter');
const animalProfiles = document.querySelectorAll('.animal-profile');
const filterStatus = document.getElementById('filter-status');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const selectedHabitat = button.dataset.filter;
        let visibleCount = 0;

        filterButtons.forEach(item => {
            const isSelected = item === button;
            item.classList.toggle('is-active', isSelected);
            item.setAttribute('aria-pressed', String(isSelected));
        });

        animalProfiles.forEach(profile => {
            const matches = selectedHabitat === 'all' || profile.dataset.habitat === selectedHabitat;
            profile.hidden = !matches;
            if (matches) visibleCount += 1;
        });

        const label = selectedHabitat === 'all' ? 'all habitats' : `${selectedHabitat} habitats`;
        filterStatus.textContent = `Showing ${visibleCount} animals from ${label}.`;
    });
});
