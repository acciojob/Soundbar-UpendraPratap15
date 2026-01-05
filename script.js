// Store all currently playing audio instances
let currentAudios = [];

// Get all sound buttons and stop button
const soundButtons = document.querySelectorAll('.btn');
const stopButton = document.querySelector('.stop');

// Add click event to each sound button
soundButtons.forEach(button => {
    button.addEventListener('click', function() {
        const soundPath = this.getAttribute('data-sound');
        playSound(soundPath);
    });
});

// Add click event to stop button
if (stopButton) {
    stopButton.addEventListener('click', stopAllSounds);
}

// Function to play sound with error handling
function playSound(soundPath) {
    // Create audio element with multiple source fallbacks
    const audio = document.createElement('audio');
    
    // Try multiple formats for better browser compatibility
    const formats = ['.mp3', '.wav', '.ogg'];
    
    formats.forEach(format => {
        const source = document.createElement('source');
        source.src = soundPath + format;
        source.type = `audio/${format.substring(1)}`;
        audio.appendChild(source);
    });
    
    // Error handling for audio loading
    audio.addEventListener('error', function(e) {
        console.error('Error loading audio:', soundPath, e);
        // Silently fail - don't break the application
    }, true);
    
    // Store the audio instance
    currentAudios.push(audio);
    
    // Play the audio with error handling
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise
            .then(() => {
                // Audio played successfully
                console.log('Playing:', soundPath);
            })
            .catch(error => {
                console.error('Playback error:', error);
                // Remove from array if playback fails
                const index = currentAudios.indexOf(audio);
                if (index > -1) {
                    currentAudios.splice(index, 1);
                }
            });
    }
    
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
        try {
            audio.pause();
            audio.currentTime = 0;
        } catch (e) {
            console.error('Error stopping audio:', e);
        }
    });
    // Clear the array
    currentAudios = [];
}

// Optional: Add keyboard support
document.addEventListener('keydown', function(event) {
    const keyMap = {
        '1': 'sounds/sound1',
        '2': 'sounds/sound2',
        '3': 'sounds/sound3',
        '4': 'sounds/sound4',
        '5': 'sounds/sound5',
        '6': 'sounds/sound6'
    };
    
    if (keyMap[event.key]) {
        playSound(keyMap[event.key]);
    }
    
    // Press Space to stop all sounds
    if (event.key === ' ' || event.code === 'Space') {
        event.preventDefault();
        stopAllSounds();
    }
});
