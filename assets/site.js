(() => {
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const close = () => { nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); };
  menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(open)); });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click',close));
  document.addEventListener('keydown', e => { if(e.key==='Escape' && nav.classList.contains('open')) {close();menu.focus();} });
  const progress = document.querySelector('.reading-progress');
  let pending = false;
  function updateProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0})`;
    pending = false;
  }
  function scheduleProgress() { if (!pending) { pending = true; requestAnimationFrame(updateProgress); } }
  window.addEventListener('scroll', scheduleProgress, {passive:true});
  window.addEventListener('resize', scheduleProgress);
  updateProgress();
  const grid = document.querySelector('#work-grid');
  if(!grid) return;
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const cards = [...grid.querySelectorAll('.work-card')];
  const search = document.querySelector('#search');
  const results = document.querySelector('#results');
  const empty = document.querySelector('#empty');
  const normalize = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  const requested = new URLSearchParams(location.search).get('categoria');
  let category = buttons.some(b => b.dataset.filter===requested) ? requested : 'all';
  const preview = document.querySelector('.catalog-preview');
  const previewLink = document.querySelector('#preview-link');
  const previewImg = document.querySelector('#preview-img');
  function showPreview(card) {
    if (!preview || !card || card.hidden) return;
    cards.forEach(c => c.classList.toggle('is-focused', c === card));
    const title = card.querySelector('h3').textContent;
    preview.dataset.category = card.dataset.category;
    previewLink.href = card.querySelector('.card-link').getAttribute('href');
    previewImg.src = card.querySelector('img').getAttribute('src');
    previewImg.alt = `Prévia do material de ${title}`;
    document.querySelector('#preview-name').textContent = title;
    document.querySelector('#preview-desc').textContent = card.querySelector('.card-desc').textContent;
  }
  cards.forEach(card => {
    card.addEventListener('pointerenter', () => showPreview(card));
    card.addEventListener('focusin', () => showPreview(card));
  });
  function render() {
    const query = normalize(search.value.trim());
    let count=0;
    buttons.forEach(b => {const selected=b.dataset.filter===category;b.classList.toggle('active',selected);b.setAttribute('aria-pressed',String(selected));});
    cards.forEach(card => {const visible=(category==='all'||card.dataset.category===category)&&normalize(card.dataset.search).includes(query);card.hidden=!visible;if(visible) count++;});
    results.textContent=`${count} ${count===1?'trabalho':'trabalhos'}`;
    empty.hidden=count!==0;
    if (preview) preview.hidden = count === 0;
    const first = cards.find(c => !c.hidden);
    if (first) showPreview(first);
    scheduleProgress();
  }
  buttons.forEach(b=>b.addEventListener('click',()=>{category=b.dataset.filter;render();}));
  search.addEventListener('input',render);
  document.querySelector('#reset').addEventListener('click',()=>{category='all';search.value='';render();search.focus();});
  render();
})();
