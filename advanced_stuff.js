 // Check if the hash is empty or just "#"
 window.addEventListener('load', function() {
    if (window.location.hash === "") {
        // If no hash, show default section
        document.getElementById('default-section').style.visibility = "visible";
        document.getElementById('default-section').style.opacity = 1;
    }
});