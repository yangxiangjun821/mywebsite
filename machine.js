// Find the visual machine, its single control, and its live message.
const machine = document.getElementById('machine');
const shutter = document.getElementById('shutter');
const statusText = document.getElementById('machine-status');

// A state guard prevents rapid clicks from creating overlapping cycles.
let state = 'ready';

// Keep appearance, accessibility, and the internal state in sync.
function showState(nextState, message) {
    state = nextState;
    machine.dataset.state = state;
    shutter.setAttribute('aria-disabled', String(state !== 'ready'));
    statusText.textContent = message;
}

// A native button supports mouse, touch, Enter, and Space.
shutter.addEventListener('click', () => {
    if (state !== 'ready') {
        return;
    }

    showState('captured', 'Captured. This one is yours.');

    // The surprise: the photograph disappears instead of being saved.
    setTimeout(() => {
        showState('forgetting', 'Or perhaps it belongs to the moment.');

        // Return to precisely the original state after the fade.
        setTimeout(() => {
            showState('ready', 'Ready when you are.');
        }, 1200);
    }, 1400);
});
