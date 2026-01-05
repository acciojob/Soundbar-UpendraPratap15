//your JS code here. If required.
// Store all currently playing audio instances
let currentAudios = [];

// Get all sound buttons
const soundButtons = document.querySelectorAll('.btn');
const stopButton = document.querySelector('.stop');

// Add click event to each sound button
soundButtons.forEach(button => {
    button.addEventListener('click', function() {
        const soundName = this.getAttribute('data-sound');
        playSound(soundName);
    });
});

// Add click event to stop button
stopButton.addEventListener('click', stopAllSounds);

// Function to play sound
function playSound(soundName) {
    const audio = new Audio(`sounds/${soundName}.mp3`);
    
    // Store the audio instance
    currentAudios.push(audio);
    
    // Play the audio
    audio.play();
    
    // Remove from array when audio ends
    audio.addEventListener('ended', function() {
        const index = currentAudios.indexOf(audio);
        if (index > -1) {
            currentAudios.splice(index, 1);
        }
    });
}

// Function to stop all sounds
function stopAllSounds() {
    currentAudios.forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });
    // Clear the array
    currentAudios = [];
}

// Optional: Add keyboard support
document.addEventListener('keydown', function(event) {
    const keyMap = {
        '1': 'kick',
        '2': 'snare',
        '3': 'hihat',
        '4': 'tom',
        '5': 'clap',
        '6': 'crash'
    };
    
    if (keyMap[event.key]) {
        playSound(keyMap[event.key]);
    }
    
    // Press Space to stop all sounds
    if (event.key === ' ') {
        event.preventDefault();
        stopAllSounds();
    }
});
