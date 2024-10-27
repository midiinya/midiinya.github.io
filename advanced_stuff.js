document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash || "#start";
    window.location.hash = hash;

    const defaultSection = document.querySelector(hash);
    defaultSection?.scrollIntoView();

    function handleScroll() {
        document.body.style.overflow = 
            (window.location.hash === "#start" || !window.location.hash) 
                ? 'hidden' 
                : 'auto';
    }
    window.addEventListener('hashchange', handleScroll);
    
    handleScroll();
});
    
function hideStartHash() {
    if (window.location.hash === "#start") {
      history.replaceState(null, null, window.location.href.split('#')[0]);
    }
  }
  
  window.addEventListener("load", hideStartHash);
  
  window.addEventListener("hashchange", hideStartHash);

  document.addEventListener("DOMContentLoaded", function() {
    const volumeSlider = document.getElementById("volume-slider");
    const playPauseButton = document.getElementById("mute-button");
    const volumeIcon = document.getElementById("volume-icon");
    const audio = new Audio('assets/insight.mp3');
    audio.loop = true;

    const updateVolumeIcon = () => {
        volumeIcon.style.fill = audio.volume === 0 ? '#FF0000' : audio.volume < 0.5 ? '#FFA500' : '#C8FF00';
    };

    const updatePlayPauseIcon = (isPaused) => {
        volumeIcon.src = `assets/${isPaused ? 'play' : 'pause'}.svg`;
    };

    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value;
        if (audio.paused) {
            audio.play();
            updatePlayPauseIcon(false);
        }
        updateVolumeIcon();
    });

    playPauseButton.addEventListener("click", () => {
        audio.paused ? audio.play() : audio.pause();
        updatePlayPauseIcon(audio.paused);
    });

    let hasPlayed = false;
    document.querySelector(".logo").addEventListener("click", () => {
        if (!hasPlayed) {
            audio.play();
            hasPlayed = true;
            updatePlayPauseIcon(false);
        }
    });
});