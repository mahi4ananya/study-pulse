// Timer Variables
let timeLeft = 1500; // 25 minutes in seconds
let timerId = null;
let isRunning = false;

const timerDisplay = document.getElementById('timer');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const seconds = (timeLeft % 60).toString().padStart(2, '0');
    timerDisplay.innerText = `${minutes}:${seconds}`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            isRunning = false;
            alert('Focus session complete! Take a break.');
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerId);
    isRunning = false;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    timeLeft = 1500;
    updateDisplay();
}

// Task Management Logic
function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.className = "bg-slate-950/60 border border-slate-800/80 p-3 rounded-xl flex justify-between items-center text-sm text-slate-200 transition hover:border-slate-700";
    
    li.innerHTML = `
        <span onclick="this.classList.toggle('line-through'); this.classList.toggle('text-slate-500');" class="cursor-pointer flex-1 mr-2">${taskText}</span>
        <button onclick="this.parentElement.remove()" class="text-rose-400 hover:text-rose-300 text-xs px-2 py-1 rounded transition cursor-pointer">Delete</button>
    `;

    taskList.appendChild(li);
    taskInput.value = '';
}

// Allow pressing 'Enter' to add tasks
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
