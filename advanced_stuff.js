document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    const audio = new Audio("assets/insight.mp3");  
    audio.loop = true;

    const showSection = hash => {
        const targetId = hash?.length > 1 ? hash : "#start";
        sections.forEach(section => {
            const isVisible = `#${section.id}` === targetId;
            section.style.display = isVisible ? "block" : "none";
            section.style.opacity = 0;
            isVisible && setTimeout(() => section.style.opacity = "1", 10);
        });
        
        document.body.style.overflow = targetId === "#start" ? "hidden" : "auto";
        history.replaceState(null, "", targetId === "#start" ? "" : targetId);
    };

    const setupAudio = () => {
        const volumeSlider = document.getElementById("volume-slider");
        const volumeIcon = document.getElementById("volume-icon");
        const volumeButton = document.getElementById("volume-button");
        
        const toggleAudio = (play = true) => {
            play ? audio.play() : audio.pause();
            volumeIcon.src = `assets/${audio.paused ? "play" : "pause"}.svg`;
        };
        
        volumeSlider.addEventListener("input", () => {
            audio.volume = volumeSlider.value;
            if (audio.paused) toggleAudio();
        });
        
        volumeButton.addEventListener("click", () => toggleAudio(audio.paused));
        
        document.querySelector(".logo").addEventListener("click", function init() {
            toggleAudio();
            this.removeEventListener("click", init);
        });
    };

    document.addEventListener("click", e => {
        const link = e.target.closest('a[href^="#"]');
        if (link) {
            e.preventDefault();
            location.hash = link.hash;
            scrollTo(0, 0);
        }
    });

    window.addEventListener("hashchange", () => showSection(location.hash));
    
    showSection(location.hash);
    setupAudio();
});