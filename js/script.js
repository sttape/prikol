const audio = document.getElementById('audio');
const playBtn = document.getElementById('playBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const currentT = document.getElementById('current');
const durT = document.getElementById('duration');
const vol = document.getElementById('vol');
const volFill = document.getElementById('volFill');
const volLabel = document.getElementById('volLabel');

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
    playBtn.textContent = 'SVO';
    playBtn.setAttribute('aria-label','Пауза');
  } else {
    audio.pause();
    playBtn.textContent = 'ZV';
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
