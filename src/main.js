import { lessons } from './lessons.js';

const grid = document.querySelector('#lesson-grid');
const search = document.querySelector('#search-input');
const count = document.querySelector('#result-count');
const empty = document.querySelector('#empty-state');
const dialog = document.querySelector('#lesson-dialog');
let activeFilter = 'すべて';

function cardMarkup(lesson) {
  const media = lesson.video
    ? `<video src="${lesson.video}" preload="metadata" muted></video>`
    : `<span class="thumbnail-kanji">${lesson.symbol}</span><span class="play-icon" aria-hidden="true">▶</span>`;
  return `<button class="lesson-card" data-id="${lesson.id}" aria-label="${lesson.title} のレッスンを開く">
    <span class="thumbnail" style="--accent:${lesson.accent}">${media}<span class="lesson-no">${lesson.id}</span>${lesson.duration ? `<span class="duration">${lesson.duration}</span>` : ''}</span>
    <span class="card-title">${lesson.title}</span>${lesson.subtitle ? `<span class="card-subtitle">${lesson.subtitle}</span>` : ''}
  </button>`;
}

function render() {
  const query = search.value.trim().toLowerCase();
  const filtered = lessons.filter((lesson) => {
    const matchesCategory = activeFilter === 'すべて' || lesson.category === activeFilter;
    const matchesQuery = `${lesson.title} ${lesson.subtitle} ${lesson.description} ${lesson.category}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });
  grid.innerHTML = filtered.map(cardMarkup).join('');
  count.textContent = String(filtered.length).padStart(2, '0');
  empty.hidden = filtered.length > 0;
  grid.querySelectorAll('.lesson-card').forEach((card) => card.addEventListener('click', () => openLesson(card.dataset.id)));
}

function openLesson(id) {
  const lesson = lessons.find((item) => item.id === id);
  document.querySelector('#dialog-title').textContent = lesson.title;
  document.querySelector('#dialog-description').textContent = lesson.description;
  document.querySelector('#dialog-meta').textContent = `${lesson.category}  /  ${lesson.level}  /  ${lesson.duration}`;
  const player = document.querySelector('#dialog-player');
  const external = document.querySelector('#dialog-external');
  if (lesson.video) {
    const isEmbed = /youtube\.com\/embed|player\.vimeo\.com/.test(lesson.video);
    player.innerHTML = isEmbed
      ? `<iframe src="${lesson.video}" title="${lesson.title}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`
      : `<video src="${lesson.video}" controls playsinline autoplay></video>`;
    external.href = lesson.video;
    external.hidden = false;
  } else {
    player.innerHTML = `<div class="video-placeholder" style="--accent:${lesson.accent}"><span>${lesson.symbol}</span><p>動画URLを設定すると、ここで再生できます。</p></div>`;
    external.hidden = true;
  }
  dialog.showModal();
}

document.querySelectorAll('.filter').forEach((button) => button.addEventListener('click', () => {
  activeFilter = button.dataset.filter;
  document.querySelectorAll('.filter').forEach((item) => item.classList.toggle('active', item === button));
  render();
}));
search.addEventListener('input', render);
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { document.querySelector('#dialog-player').innerHTML = ''; });
render();
