const FRAMES = 12;
const FRAME_WIDTH = 15;
const FRAME_INTERVAL = 66;

const onInterval = state => {
    const offset = state.counter * -FRAME_WIDTH;
    const position = `${offset}px 0px`;
    const spinners = Array.from(document.getElementsByClassName('spinner'));
    spinners.forEach(spinner => spinner.style.backgroundPosition = position);
    state.counter = (state.counter + 1) % FRAMES;
};

setInterval(onInterval, FRAME_INTERVAL, { counter: 0 });
