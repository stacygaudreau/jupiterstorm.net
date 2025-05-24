import WaveSurfer from 'wavesurfer.js';

const initialiseAllAudioPreviews = () => {
    wavesurfers = [];
    const wavesurferOptsBase = {
        waveColor: '#9A4657',
        progressColor: '#EF6D73',
        cursorColor: "#46203A",
        normalize: true,
        cursorWidth: 0,
        mediaControls: false,
        fillParent: true,
        height: 60,
    };
    const waveforms = Array.from(document.getElementsByClassName('waveform'));
    const playBtns = Array.from(document.getElementsByClassName('btn-play'));
    waveforms.forEach((w, i) => {
        // ID the instance for wavesurfer to use
        w.id = `waveform-${i+1}`;
        playBtns[i].id = `btn-play-${i+1}`;
        // initialise a new wavesurfer instance
        const opts = {
            ...wavesurferOptsBase,
            container: `#waveform-${i+1}`,
            url: w.dataset.url, // previewm URL comes from data-url attribute
        }
        wavesurfers.push(WaveSurfer.create(opts));

        // play/pause button setup
        const playPauseIcon = playBtns[i].firstElementChild;
        wavesurfers[i].on('finish', () => {
            wavesurfers[i].stop();
            playPauseIcon.className = 'icon-play';
        });
        wavesurfers[i].on('play', () => {
            playPauseIcon.className = 'icon-pause';
        });
        wavesurfers[i].on('pause', () => {
            playPauseIcon.className = 'icon-play';
        });
        playBtns[i].addEventListener("click", (e) => {
            // toggle play/pause state on player
            // -> the player's callbacks trigger the button to change
            wavesurfers[i].playPause();
        });
    })
} 

// attach captcha validation to contact form
const initCaptcha = () => {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;
        if (!hCaptcha) {
            e.preventDefault();
            alert("Please fill out the captcha!")
            return;
        }
    });
}

const closeMenu = () => {
    state.menu.classList.remove('opacity-100');
    state.menu.classList.add('opacity-0', 'pointer-events-none', 'hidden');
    setTimeout(() => state.menu.classList.add('hidden', 300));
    state.menuIsOpen = false;
}

const openMenu = () => {
    state.menu.classList.remove('opacity-0', 'pointer-events-none', 'hidden');
    state.menu.classList.add('opacity-100');
    state.menuIsOpen = true;
    state.y0 = scrollY;
}

const initMenu = () => {
    state.menuBtn = document.getElementById('menuBtn');
    state.menu = document.getElementById('menuOverlay');
    menuBtn.addEventListener('click', () => {
        if (state.menuIsOpen)
            closeMenu();
        else
        openMenu();
});
    document.addEventListener('click', (e) => {
        if (!menuBtn.contains(e.target) && !state.menu.contains(e.target))
            closeMenu();
    });
    updateMenuButtonFromScroll();
}

// DOM finished loading
window.addEventListener('DOMContentLoaded', (e) => {
    initialiseAllAudioPreviews();
    initCaptcha();
    initMenu();
    window.onscroll = scrollHandler;
});

const updateMenuButtonFromScroll= () => {
    const OPACITY_IN_HERO = 50;
    const HERO_SCROLL_THES = window.innerHeight;
    const isScrolledInHero = () => scrollY > 2 && scrollY <= HERO_SCROLL_THES;
    const isScrolledPastHero = () => scrollY > HERO_SCROLL_THES;
    if (isScrolledInHero()) {
        state.menuBtn.classList.remove('opacity-0', 'opacity-100', 'pointer-events-none', 'hidden');
        state.menuBtn.classList.add(`opacity-${OPACITY_IN_HERO}`);
    } else if (isScrolledPastHero()) {
        state.menuBtn.classList.remove(`opacity-${OPACITY_IN_HERO}`, 'opacity-100', 'hidden');
        state.menuBtn.classList.add('opacity-0', 'pointer-events-none');
    } else {
        setTimeout(() => state.menu.classList.add('hidden', 300));
        state.menuBtn.classList.remove(`opacity-${OPACITY_IN_HERO}`, 'opacity-0', 'pointer-events-none');
        state.menuBtn.classList.add('opacity-100');
    }
}


// page state
let state = {
    y0: 0,
    menu: null,
    menuIsOpen: false,
    main: null,
    menuBtn: null,
};

const scrollHandler = () => {
    // close the menu for the user if they have scrolled a bit
    if (state.menuIsOpen) {
        const dY = Math.abs(scrollY - state.y0);
        if (dY > 10) 
            closeMenu();
    }   
    updateMenuButtonFromScroll();
}
