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

// DOM finished loading
window.addEventListener('DOMContentLoaded', (e) => {
    initialiseAllAudioPreviews();
    initCaptcha();
    // navBar = document.getElementById('navbar');
    // window.onscroll = scrollHandler;
    // HugoContentHelpers.replaceBlockquoteTitles();
    // HugoContentHelpers.wrapTablesInContainer();
    // if (scrollY > 0) {
    //   setScrollTrue();
    // }
    // Lightbox.initAll();
    // toc.init();
});


// page state
let state = {
    isScrolled: false,
};
let navBar;

// scroll handling
function setScrollTrue() {
    if (!state.isScrolled) navBar.classList.add('navbar--opaque');
    state.isScrolled = true;
  }
  function scrollHandler() {
    if (scrollY > 0) {
      setScrollTrue();
    } else {
      navBar.classList.remove('navbar--opaque');
      state.isScrolled = false;
    }
}
