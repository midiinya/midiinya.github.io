document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    let currentSectionId = window.location.hash || "#start";

    const updateSections = () => {
        sections.forEach(section => {
            const isVisible = `#${section.id}` === currentSectionId;
            section.style.display = isVisible ? "block" : "none";
            if (isVisible) {
                setTimeout(() => {
                    section.style.opacity = "1";
                    window.scrollTo(0, 0);
                }, 10);
            } else {
                section.style.opacity = "0";
            }
        });
        document.body.style.overflow = (currentSectionId === "#start") ? 'hidden' : 'auto';
    };

    const handleNavigation = (hash) => {
        if (hash === currentSectionId) return;
        currentSectionId = hash;
        history.replaceState(null, null, currentSectionId === "#start" ? ' ' : currentSectionId);
        updateSections();
    };

    updateSections();
    window.addEventListener("hashchange", () => handleNavigation(window.location.hash || "#start"));
});

window.addEventListener("load", () => {
    const volumeSlider = document.getElementById("volume-slider");
    const playPauseButton = document.getElementById("mute-button");
    const volumeIcon = document.getElementById("volume-icon");
    const audio = new Audio("assets/insight.mp3");
    audio.loop = true;

    const updateIcons = () => {
        volumeIcon.style.fill = audio.volume === 0 ? "#FF0000" : audio.volume < 0.5 ? "#FFA500" : "#C8FF00";
        volumeIcon.src = `assets/${audio.paused ? "play" : "pause"}.svg`;
    };

    volumeSlider.addEventListener("input", () => {
        audio.volume = volumeSlider.value;
        if (audio.paused) audio.play();
        updateIcons();
    });

    playPauseButton.addEventListener("click", () => {
        audio.paused ? audio.play() : audio.pause();
        updateIcons();
    });

    let hasPlayed = false;
    document.querySelector(".logo").addEventListener("click", () => {
        if (!hasPlayed) {
            audio.play();
            hasPlayed = true;
            updateIcons();
        }
    });
});