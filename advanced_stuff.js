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
  