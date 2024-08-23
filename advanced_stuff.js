document.addEventListener("DOMContentLoaded", () => {
    const hash = window.location.hash || "#start";
    window.location.hash = hash;

    const defaultSection = document.querySelector(hash);
    defaultSection?.scrollIntoView();
});

