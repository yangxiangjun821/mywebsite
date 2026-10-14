const machine = document.getElementById('machine');
const shutter = document.getElementById('shutter');
const statusText = document.getElementById('machine-status');
let state = 'ready';

function showState(nextState, message) {
    state = nextState;
    machine.dataset.state = state;
    shutter.setAttribute('aria-disabled', String(state !== 'ready'));
    statusText.textContent = message;
}

shutter.addEventListener('click', () => {
    if (state !== 'ready') return;

    showState('vanishing', 'The forest begins to disappear.');

    setTimeout(() => {
        showState('returning', 'The machine refuses. Life returns.');

        setTimeout(() => {
            showState('ready', 'The forest is still here.');
        }, 1300);
    }, 1300);
});
