const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentT = document.getElementById('current');
const durT = document.getElementById('duration');
const vol = document.getElementById('vol');
const volFill = document.getElementById('volFill');
const volLabel = document.getElementById('volLabel');
const themeToggle = document.getElementById('themeToggle');

// Переключатель темы
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Загрузка сохраненной темы
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  themeToggle.checked = true;
}

themeToggle.onchange = toggleTheme;

function updateVolume(){
  const percent = Math.round(vol.value * 100);
  volFill.style.width = percent + '%';
  volLabel.textContent = percent + '%';
  audio.volume = vol.value;
}

function formatTime(t){
  if(isNaN(t)) return '0:00';
  const m = Math.floor(t/60);
  const s = Math.floor(t%60).toString().padStart(2,'0');
  return `${m}:${s}`;
}

updateVolume();

playBtn.onclick = () => {
  if(audio.paused){
    audio.play();
    playBtn.textContent = '||';
    playBtn.setAttribute('aria-label','Пауза');
  } else {
    audio.pause();
    playBtn.textContent = '▶';
    playBtn.setAttribute('aria-label','Воспроизвести');
  }
};

audio.onloadedmetadata = () => durT.textContent = formatTime(audio.duration);

audio.ontimeupdate = () => {
  progressFill.style.width = (audio.currentTime / (audio.duration || 1)) * 100 + '%';
  currentT.textContent = formatTime(audio.currentTime);
};

progressBar.onclick = (e) => {
  const rect = progressBar.getBoundingClientRect();
  audio.currentTime = ((e.clientX - rect.left) / rect.width) * audio.duration;
};

vol.oninput = updateVolume;

window.onkeydown = (e) => {
  if(e.code === 'Space' && document.activeElement.tagName !== 'INPUT'){
    e.preventDefault();
    playBtn.click();
  }
};

audio.onerror = () => console.warn('Не удалось загрузить аудио файл.');

document.addEventListener("click", function(e) {
  const drops = 14; // количество капель

  for (let i = 0; i < drops; i++) {
    const drop = document.createElement("div");
    drop.classList.add("milk-splash");

    const angle = Math.random() * Math.PI * 2;
    const speed = 50 + Math.random() * 50; // скорость разлёта

    const x = Math.cos(angle) * speed;
    const y = Math.sin(angle) * speed;

    drop.style.left = e.clientX + "px";
    drop.style.top = e.clientY + "px";

    drop.style.setProperty("--move", `translate(${x}px, ${y}px)`);

    // случайный размер капель
    const size = 4 + Math.random() * 6;
    drop.style.width = size + "px";
    drop.style.height = size + "px";

    document.body.appendChild(drop);

    setTimeout(() => drop.remove(), 350);
  }
});

