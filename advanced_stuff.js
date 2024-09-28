document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash || "#start";
    window.location.hash = hash;

    const defaultSection = document.querySelector(hash);
    defaultSection?.scrollIntoView();
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
    let audio = new Audio('assets/insight.mp3');
    audio.loop = true;

    volumeSlider.addEventListener("input", function() {
        audio.volume = this.value;
        if (audio.paused) {
            audio.play();
            updatePlayPauseIcon(false);
        }
        updateVolumeIcon();
    });

    playPauseButton.addEventListener("click", function() {
        if (audio.paused) {
            audio.play();
            updatePlayPauseIcon(false);
        } else {
            audio.pause();
            updatePlayPauseIcon(true);
        }
    });

    function updateVolumeIcon() {
        if (audio.volume === 0) {
            volumeIcon.style.fill = '#FF0000';
        } else if (audio.volume < 0.5) {
            volumeIcon.style.fill = '#FFA500';
        } else {
            volumeIcon.style.fill = '#C8FF00';
        }
    }

    function updatePlayPauseIcon(isPaused) {
        if (isPaused) {
            volumeIcon.src = "assets/play.svg";
        } else {
            volumeIcon.src = "assets/pause.svg";
        }
    }

    // Update logo click event
    var logo = document.querySelector(".logo");
    var hasPlayed = false;

    logo.addEventListener("click", function() {
        if (!hasPlayed) {
            audio.play();
            hasPlayed = true;
            updatePlayPauseIcon(false);
        }
    });
});