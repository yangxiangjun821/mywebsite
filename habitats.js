const environments = {
    forest: {
        name: 'Forest',
        pressure: 'Deforestation & stream pollution',
        intact: 'dense woodland and a clear stream',
        degraded: 'clear-cut slopes, exposed soil, stream litter and polluted runoff',
        description: 'Real-world pressure shown: forest clearance removes habitat and exposes soil, while litter and runoff can degrade the stream below.'
    },
    ocean: {
        name: 'Ocean',
        asset: 'ocean-polluted',
        pressure: 'Ocean warming & marine pollution',
        intact: 'colorful coral, clear water and abundant fish',
        degraded: 'bleached coral, murky water, marine litter and fewer fish',
        description: 'Real-world pressures shown: prolonged heat stress can bleach coral, while sediment and plastic pollution reduce water quality and harm reef life.'
    },
    freshwater: {
        name: 'Freshwater',
        asset: 'freshwater-polluted',
        pressure: 'Runoff pollution & reduced flow',
        intact: 'clear river water and thriving reeds',
        degraded: 'low murky water, algal growth, litter, exposed banks and dried reeds',
        description: 'Real-world pressures shown: reduced flow concentrates pollution, while nutrient-rich runoff can feed algal growth and degrade freshwater habitat.'
    },
    island: {
        name: 'Island',
        asset: 'island-polluted',
        pressure: 'Coastal erosion & marine litter',
        intact: 'lush coastal vegetation and a wide clean beach',
        degraded: 'a narrowed beach with exposed roots and tide-carried plastic waste',
        description: 'Real-world pressures shown: waves and storms can erode beaches, while bottles, wrappers and lost fishing gear collect along the high-tide line.'
    },
    grassland: {
        name: 'Grassland',
        asset: 'grassland-degraded',
        pressure: 'Overgrazing & soil erosion',
        intact: 'dense native grasses and diverse wildflowers on rolling land',
        degraded: 'closely grazed vegetation, compacted livestock paths, bare soil and shallow erosion rills',
        description: 'Real-world pressure shown: sustained overgrazing can shorten the grass layer, reduce plant diversity, compact the ground and expose soil to wind and water erosion.'
    }
};

const choices = document.querySelectorAll('[data-environment]');
const scene = document.getElementById('habitat-scene');
const slider = document.getElementById('habitat-progress');
const reset = document.getElementById('reset-habitat');
const retry = document.getElementById('retry-image');
const status = document.getElementById('image-status');
const experience = document.getElementById('habitat-experience');
let selectedEnvironment = 'forest';
let loadRequest = 0;

function updateProgress() {
    const value = Number(slider.value);
    const environment = environments[selectedEnvironment];
    const stage = value === 0 ? 'Intact habitat' : value === 100 ? environment.pressure : 'Pressure emerging';
    // Blend the matched healthy and pressure panels continuously across the whole scene.
    scene.style.setProperty('--degradation', value / 100);
    document.getElementById('progress-value').textContent = `${value}%`;
    document.getElementById('stage-label').textContent = stage;
    slider.setAttribute('aria-valuetext', `${value} percent, ${stage.toLowerCase()}`);
    const description = value === 0
        ? environment.intact
        : value === 100
            ? environment.degraded
            : `a blend of ${environment.intact} and ${environment.degraded}`;
    scene.setAttribute('aria-label', `${environment.name} habitat illustration: ${description}.`);
}

function selectEnvironment(key) {
    const request = ++loadRequest;
    selectedEnvironment = key;
    const environment = environments[key];
    choices.forEach(button => {
        const active = button.dataset.environment === key;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('environment-title').textContent = environment.name;
    document.getElementById('environment-description').textContent = environment.description;
    slider.value = '0';
    slider.disabled = true;
    reset.disabled = true;
    retry.hidden = true;
    experience.setAttribute('aria-busy', 'true');
    status.textContent = `Loading the ${key} scene…`;
    // Hide the previous scene while loading, so a new label never describes an old image.
    scene.style.visibility = 'hidden';
    updateProgress();
    const asset = new Image();
    asset.onload = () => {
        if (request !== loadRequest) return;
        scene.style.setProperty('--habitat-image', `url("${asset.src}")`);
        scene.style.aspectRatio = `${asset.naturalWidth} / ${asset.naturalHeight / 2}`;
        scene.style.visibility = 'visible';
        slider.disabled = false;
        reset.disabled = false;
        experience.setAttribute('aria-busy', 'false');
        status.textContent = `${environment.name} ready. Move the slider to explore.`;
    };
    asset.onerror = () => {
        if (request !== loadRequest) return;
        experience.setAttribute('aria-busy', 'false');
        status.textContent = `The ${key} image could not load. Retry or choose another environment.`;
        retry.hidden = false;
    };
    const assetName = environment.asset || `${key}${key === 'forest' ? '-polluted' : ''}`;
    asset.src = `images/habitats/${assetName}.png`;
}

choices.forEach(button => button.addEventListener('click', () => selectEnvironment(button.dataset.environment)));
slider.addEventListener('input', updateProgress);
reset.addEventListener('click', () => {
    slider.value = '0';
    updateProgress();
});
retry.addEventListener('click', () => selectEnvironment(selectedEnvironment));
selectEnvironment('forest');
