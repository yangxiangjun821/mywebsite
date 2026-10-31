const machine = document.getElementById('machine');
const protectButton = document.getElementById('protect-button');
const statusText = document.getElementById('machine-status');

let state = 'ready';
let timers = [];

function setState(nextState, message) {
    state = nextState;
    machine.dataset.state = nextState;
    statusText.textContent = message;
}

function later(callback, delay) {
    const timer = window.setTimeout(callback, delay);
    timers.push(timer);
}

function resetMachine() {
    timers.forEach(window.clearTimeout);
    timers = [];
    setState('ready', 'The animal is waiting for real protection.');
    protectButton.disabled = false;
    protectButton.textContent = 'Protect this animal';
}

protectButton.addEventListener('click', () => {
    if (state !== 'ready') return;

    protectButton.disabled = true;
    protectButton.textContent = 'Declaring protection…';
    setState('sign-drops', 'A sanctuary sign has been placed.');

    later(() => {
        setState('sign-rejected', 'The animal pushes the empty promise aside.');
    }, 1100);

    later(() => {
        setState('message', 'It needs safe land, food, water, and time.');
        protectButton.textContent = 'A sign is not enough';
    }, 1900);

    later(resetMachine, 4300);
});

window.addEventListener('pagehide', () => {
    timers.forEach(window.clearTimeout);
});
