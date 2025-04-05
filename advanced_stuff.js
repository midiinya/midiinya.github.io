document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const audio = new Audio("assets/insight.mp3");  
  audio.loop = true;

  const hideName = hash => {
    const targetId = hash?.length > 1 ? hash : "#start";
    document.body.style.overflow = targetId === "#start" ? "hidden" : "auto";
    targetId === "#start" && history.replaceState(null, "", location.pathname);
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
          scrollTo({top:0});
      }
  });

  window.addEventListener("hashchange", () => hideName(location.hash));
  
  hideName(location.hash);
  setupAudio();
});