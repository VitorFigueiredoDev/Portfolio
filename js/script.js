const projects = [
  {
    title: 'AVA Uniube',
    category: 'UX/UI • JORNADA ACADÊMICA',
    year: '2026',
    description: 'Uma proposta de reestruturação estratégica para o Ambiente Virtual de Aprendizagem da Uniube, reduzindo barreiras de navegação e tornando a jornada diária do estudante mais clara e envolvente.',
    tags: ['UX Research', 'Arquitetura da Informação', 'UI Design'],
    link: 'https://www.behance.net/gallery/251936709/AVA-Uniube-UX-Case-Study-de-Jornada-Academica',
    image: 'assets/images/capa ava.png',
    bg: '#d9d6d2'
  },
  {
    title: 'Tupã',
    category: 'UX/UI • FITNESS',
    year: '2026',
    description: 'Uma plataforma para modernizar a experiência nas academias brasileiras, conectando treinos, interação entre alunos e instrutores e recursos de gamificação em uma jornada coletiva.',
    tags: ['UX/UI', 'Gamificação', 'Product Design'],
    link: 'https://www.behance.net/gallery/244185247/TUPA-UXUI-Case-Study',
    image: 'assets/images/capa tupa.png',
    bg: '#c7bdb4'
  },
  {
    title: 'Instituto Vovôs Conectados',
    category: 'UX • IMPACTO SOCIAL',
    year: '2025',
    description: 'Uma experiência digital voltada ao letramento e à inclusão tecnológica de pessoas idosas, promovendo autonomia, segurança e conexão por meio de aulas online gratuitas.',
    tags: ['UX', 'Acessibilidade', 'Impacto Social'],
    link: 'https://www.behance.net/gallery/250276157/Institunto-vovos-conectados',
    image: 'assets/images/capa instituto.png',
    bg: '#a9aca8'
  },
];

const wheel = document.querySelector('#project-wheel');
const counter = document.querySelector('#project-counter');
const title = document.querySelector('#project-title');
const category = document.querySelector('#project-category');
const year = document.querySelector('#project-year');
const description = document.querySelector('#project-description');
const link = document.querySelector('#project-link');
const tags = document.querySelector('#project-tags');
const prevBtn = document.querySelector('#prev-project');
const nextBtn = document.querySelector('#next-project');

let activeIndex = 0;

function createCards() {
  projects.forEach((project, index) => {
    const card = document.createElement('button');
    card.className = 'project-card';
    card.type = 'button';
    card.dataset.index = index;
    card.innerHTML = `
      <span class="card-inner" style="--card-bg:${project.bg}">
        <span class="card-media">
          ${project.image ? `<img src="${project.image}" alt="Capa do projeto ${project.title}" loading="lazy" draggable="false">` : ''}
          <span class="card-number">${String(index + 1).padStart(2, '0')}</span>
        </span>
      </span>
    `;

    const image = card.querySelector('img');
    if (image) {
      image.addEventListener('error', () => {
        image.remove();
        card.classList.add('image-missing');
      }, { once: true });
    }
    card.addEventListener('click', () => setActive(index));
    wheel.appendChild(card);
  });
}

function visualPosition(index) {
  const diff = (index - activeIndex + projects.length) % projects.length;
  const positions = {
    0: { x: 0, y: 0, scale: 1, opacity: 1, z: 5, active: true },
    1: { x: 300, y: -20, scale: .68, opacity: .82, z: 3, active: false },
    2: { x: -300, y: -20, scale: .68, opacity: .82, z: 3, active: false }
  };
  return positions[diff] ?? { x: 0, y: 0, scale: .4, opacity: 0, z: 0, active: false };
}

function setActive(index) {
  activeIndex = (index + projects.length) % projects.length;
  const project = projects[activeIndex];

  [...wheel.children].forEach((card, index) => {
    const pos = visualPosition(index);
    card.classList.toggle('is-active', pos.active);
    card.style.transform = `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px)) scale(${pos.scale})`;
    card.style.opacity = pos.opacity;
    card.style.zIndex = pos.z;
    card.setAttribute('aria-label', `${project.title === projects[index].title ? 'Projeto atual: ' : 'Selecionar projeto: '}${projects[index].title}`);
  });

  counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
  title.textContent = project.title;
  category.textContent = project.category;
  year.textContent = project.year;
  description.textContent = project.description;
  link.href = project.link;
  const isExternal = /^https?:\/\//i.test(project.link);
  link.target = isExternal ? '_blank' : '_self';
  link.rel = isExternal ? 'noopener noreferrer' : '';
  link.setAttribute('aria-label', `${isExternal ? 'Abrir case no Behance: ' : 'Abrir projeto: '}${project.title}`);
  link.innerHTML = `${isExternal ? 'VER NO BEHANCE' : 'ABRIR PROJETO'} <span>↗</span>`;
  tags.innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
}

prevBtn.addEventListener('click', () => setActive(activeIndex - 1));
nextBtn.addEventListener('click', () => setActive(activeIndex + 1));

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') setActive(activeIndex - 1);
  if (event.key === 'ArrowRight') setActive(activeIndex + 1);
});

let touchStartX = 0;
wheel.addEventListener('touchstart', (event) => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
wheel.addEventListener('touchend', (event) => {
  const delta = event.changedTouches[0].clientX - touchStartX;
  if (Math.abs(delta) > 45) setActive(activeIndex + (delta < 0 ? 1 : -1));
}, { passive: true });

// Mobile menu
const toggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? 'Abrir menu' : 'Fechar menu');
  mobileMenu.hidden = open;
});

document.querySelectorAll('.mobile-menu a').forEach(anchor => {
  anchor.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
    mobileMenu.hidden = true;
  });
});

// Scroll spy
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = ['inicio', 'projetos', 'sobre', 'contato'].map(id => document.getElementById(id));
const setActiveNav = (id) => {
  navLinks.forEach(linkEl => linkEl.classList.toggle('active', linkEl.getAttribute('href') === `#${id}`));
};

navLinks.forEach(linkEl => {
  linkEl.addEventListener('click', (event) => {
    const targetId = linkEl.getAttribute('href').slice(1);
    setActiveNav(targetId);
    if (targetId !== 'inicio') return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.replaceState(null, '', '#inicio');
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    setActiveNav(entry.target.id);
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(section => section && sectionObserver.observe(section));
setActiveNav(window.location.hash ? window.location.hash.slice(1) : 'inicio');

// Reveal animations
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

createCards();
setActive(0);
