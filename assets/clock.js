let timerInterval;
let totalSeconds = 300; //5 minutes.
let isPaused = true;

//Alows the user to input time.
document.getElementById("timerDisplay").addEventListener("input", updateTimeFromInput);

document.addEventListener("DOMContentLoaded", () => {
    updateDisplay(); // Initialize display with 5 minutes
});

//Start the timer.
function startTimer() {
    if (isPaused) {
        isPaused = false;
        timerInterval = setInterval(() => {
            if (totalSeconds > 0) {
                totalSeconds--;
                updateDisplay();
            } else {
                clearInterval(timerInterval);
                isPaused = true;
                alert("Time is up!⏰");
                document.getElementById("alarmSound").play();
            }
        }, 1000);
    }
}


//Pauses the timer.
function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
}

//Resets the timer.
function resetTimer() {
    isPaused = true;
    clearInterval(timerInterval);
    totalSeconds = 300; //return to 5 minutes.
    updateDisplay();
}

//Add addtional time.
function adjusTime(seconds) {
    if (isPaused) {
        totalSeconds += seconds;
    if (totalSeconds < 0) {
        totalSeconds = 0;
    }
    updateDisplay();
    }
}

//Update the Display/Analog Clock.
function updateDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    document.getElementById("timerDisplay").textContent =
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds);
}

function updateTimeFromInput() {
    const timeString = document.getElementById("timerDisplay").textContent;
    const timeParts = timeString.split(":");

    if (timeParts.length === 3) {
        const hours = parseInt(timeParts[0], 10);
        const minutes = parseInt(timeParts[1], 10);
        const seconds = parseInt(timeParts[2], 10);

        if (!isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
            totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
        }
    }
}

//function to change the timer based on user input.
document.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', theme);
    updateIcons(theme); // Update icons based on the current theme
});

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateIcons(newTheme);
}

function updateIcons(theme) {
    const sunIcon = document.querySelector("box-icon[name='sun']");
    const moonIcon = document.querySelector("box-icon[name='moon']");
    
    if (theme === 'dark') {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    } else {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    }
}

