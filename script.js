// Function to set background video and handle audio playback based on the time of day
function setBackgroundAndAudio() {
    const now = new Date();

    // Get the local hour of the day (Vietnam timezone is UTC+7)
    const localHour = now.getUTCHours() + 7;
    const vietnamHour = localHour >= 24 ? localHour - 24 : (localHour < 0 ? localHour + 24 : localHour);

    // Get references to the video elements and description box
    const mc1 = document.getElementById('mc1');
    const mc2 = document.getElementById('mc2');
    const descriptionBox = document.getElementById('description-box');

    // Create an audio object
    const audio = new Audio();

    // Ensure elements exist before proceeding
    if (mc1 && mc2 && descriptionBox) {
        // Check if the time is between 6 AM and 7 PM (daytime)
        if (vietnamHour >= 6 && vietnamHour < 20) {
            // Show mc1 (daytime background)
            mc1.style.display = 'block';
            mc2.style.display = 'none';

            // Handle click event on description box to play 'sang.mp3'
            descriptionBox.onclick = function () {
                audio.src = './assets/music/sang.mp3';  // Path to the mp3 file
                audio.volume = 0.2;  // Set volume to 20%
                audio.loop = true;   // Set to loop
                audio.play();
            };
        } else {
            // Show mc2 (nighttime background)
            mc1.style.display = 'none';
            mc2.style.display = 'block';

            // Handle click event on description box to play 'toi.mp3'
            descriptionBox.onclick = function () {
                audio.src = './assets/music/toi.mp3';  // Path to the mp3 file
                audio.volume = 0.2;  // Set volume to 20%
                audio.loop = true;   // Set to loop
                audio.play();
            };
        }

        // Add hover effects to description box
        descriptionBox.addEventListener('mouseover', function () {
            descriptionBox.style.transform = 'scale(1.05)';
            descriptionBox.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.8)';
        });

        descriptionBox.addEventListener('mouseout', function () {
            descriptionBox.style.transform = 'scale(1)';
            descriptionBox.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.6)';
        });
    }
}

// Prevent context menu and specific key combinations
function preventInspectTools() {
    document.addEventListener('contextmenu', function (event) {
        event.preventDefault();
    });

    document.addEventListener('keydown', function (event) {
        // Prevent F12
        if (event.key === 'F12') {
            event.preventDefault();
        }
        // Prevent Ctrl + Shift + I or Ctrl + Shift + C (DevTools)
        if (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'C')) {
            event.preventDefault();
        }
        // Prevent Ctrl + U (View Source)
        if (event.ctrlKey && event.key === 'u') {
            event.preventDefault();
        }
    });
}

// Run the functions when the page loads
window.onload = function () {
    setBackgroundAndAudio();
    preventInspectTools();
};
