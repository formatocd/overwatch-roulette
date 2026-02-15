// src/main.js
const TANK = 1;
const DPS = 2;
const SUPPORT = 3;

const heroes = [
    // TANQUES
    { name: 'Domina', type: TANK, portrait: 'domina' },
    { name: 'D. VA', type: TANK, portrait: 'dva' },
    { name: 'Hazard', type: TANK, portrait: 'hazard' },
    { name: 'Junker Queen', type: TANK, portrait: 'junker-queen' },
    { name: 'Mauga', type: TANK, portrait: 'mauga' },
    { name: 'Orisa', type: TANK, portrait: 'orisa' },
    { name: 'Ramattra', type: TANK, portrait: 'ramattra' },
    { name: 'Reinhardt', type: TANK, portrait: 'reinhardt' },
    { name: 'Roadhog', type: TANK, portrait: 'roadhog' },
    { name: 'Sigma', type: TANK, portrait: 'sigma' },
    { name: 'Winston', type: TANK, portrait: 'winston' },
    { name: 'Wrecking Ball', type: TANK, portrait: 'wrecking-ball' },
    { name: 'Zarya', type: TANK, portrait: 'zarya' },

    // DPS
    { name: 'Anran', type: DPS, portrait: 'anran' },
    { name: 'Ashe', type: DPS, portrait: 'ashe' },
    { name: 'Bastion', type: DPS, portrait: 'bastion' },
    { name: 'Cassidy', type: DPS, portrait: 'cassidy' },
    { name: 'Doomfist', type: DPS, portrait: 'doomfist' },
    { name: 'Echo', type: DPS, portrait: 'echo' },
    { name: 'Emre', type: DPS, portrait: 'emre' },
    { name: 'Freja', type: DPS, portrait: 'freja' },
    { name: 'Genji', type: DPS, portrait: 'genji' },
    { name: 'Hanzo', type: DPS, portrait: 'hanzo' },
    { name: 'Junkrat', type: DPS, portrait: 'junkrat' },
    { name: 'Mei', type: DPS, portrait: 'mei' },
    { name: 'Pharah', type: DPS, portrait: 'pharah' },
    { name: 'Reaper', type: DPS, portrait: 'reaper' },
    { name: 'Sojourn', type: DPS, portrait: 'sojourn' },
    { name: 'Soldado: 76', type: DPS, portrait: 'soldier-76' },
    { name: 'Sombra', type: DPS, portrait: 'sombra' },
    { name: 'Symmetra', type: DPS, portrait: 'symmetra' },
    { name: 'Torbjörn', type: DPS, portrait: 'torbjorn' },
    { name: 'Tracer', type: DPS, portrait: 'tracer' },
    { name: 'Vendetta', type: DPS, portrait: 'vendetta' },
    { name: 'Venture', type: DPS, portrait: 'venture' },
    { name: 'Widowmaker', type: DPS, portrait: 'widowmaker' },

    // APOYO
    { name: 'Ana', type: SUPPORT, portrait: 'ana' },
    { name: 'Baptiste', type: SUPPORT, portrait: 'baptiste' },
    { name: 'Brigitte', type: SUPPORT, portrait: 'brigitte' },
    { name: 'Illari', type: SUPPORT, portrait: 'illari' },
    { name: 'Jetpack Cat', type: SUPPORT, portrait: 'jetpack-cat' },
    { name: 'Juno', type: SUPPORT, portrait: 'juno' },
    { name: 'Kiriko', type: SUPPORT, portrait: 'kiriko' },
    { name: 'Lifeweaver', type: SUPPORT, portrait: 'lifeweaver' },
    { name: 'Lucio', type: SUPPORT, portrait: 'lucio' },
    { name: 'Mercy', type: SUPPORT, portrait: 'mercy' },
    { name: 'Mizuki', type: SUPPORT, portrait: 'mizuki' },
    { name: 'Moira', type: SUPPORT, portrait: 'moira' },
    { name: 'Wuyang', type: SUPPORT, portrait: 'wuyang' },
    { name: 'Zenyatta', type: SUPPORT, portrait: 'zenyatta' }
];

// PRECARGA DE IMÁGENES 
const preloadedImages = {}; 
heroes.forEach(hero => {
    const img = new Image();
    img.src = `portraits/${hero.portrait}.png`;
    preloadedImages[hero.portrait] = img.src; 
});

let timeoutId;
let isSpinning = false;
let isStopping = false;
let currentDelay = 50; 

// Dibuja la cuadrícula separando por roles
const renderRoster = () => {
    const container = document.getElementById('roster-container');
    container.innerHTML = ''; // Limpiamos antes de dibujar

    const categories = [
        { type: TANK, name: 'Tanque' },
        { type: DPS, name: 'Daño' },
        { type: SUPPORT, name: 'Apoyo' }
    ];

    categories.forEach(cat => {
        const catHeroes = heroes.filter(h => h.type === cat.type);
        
        const col = document.createElement('div');
        col.className = 'flex flex-col items-center bg-gray-800/50 p-4 rounded-xl shadow-inner';
        
        const title = document.createElement('h2');
        title.className = 'text-gray-300 font-bold text-lg mb-3 uppercase tracking-widest';
        title.innerHTML = cat.name;
        col.appendChild(title);

        const grid = document.createElement('div');
        grid.className = 'flex flex-wrap justify-center gap-1 w-[260px]'; 

        catHeroes.forEach(hero => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'relative w-[50px] h-[60px] transition-all duration-75 ease-in-out bg-gray-600 rounded-sm cursor-pointer';
            imgContainer.id = `hero-${hero.portrait}`;

            const img = document.createElement('img');
            img.src = preloadedImages[hero.portrait];
            img.className = 'w-full h-full object-cover rounded-sm border border-transparent opacity-70 transition-opacity';
            img.id = `img-${hero.portrait}`;

            imgContainer.appendChild(img);
            grid.appendChild(imgContainer);
        });

        col.appendChild(grid);
        container.appendChild(col);
    });
};

const selectHero = () => {
    const selectedTypeLink = document.querySelector('.type-link.bg-yellow-500');
    const typeId = parseInt(selectedTypeLink.dataset.typeid, 10);

    // Filtramos usando las constantes (0 es 'Todos')
    const validHeroes = typeId === 0 
        ? heroes 
        : heroes.filter(h => h.type === typeId);

    const randomIndex = Math.floor(Math.random() * validHeroes.length);
    const hero = validHeroes[randomIndex];

    // 1. Limpiamos el estado visual de todos los héroes
    heroes.forEach(h => {
        const imgEl = document.getElementById(`img-${h.portrait}`);
        const containerEl = document.getElementById(`hero-${h.portrait}`);
        if(imgEl && containerEl) {
            imgEl.classList.remove('opacity-100');
            imgEl.classList.add('opacity-70');
            containerEl.classList.remove('ring-4', 'ring-yellow-400', 'scale-[1.3]', 'z-10', 'shadow-2xl');
        }
    });

    // 2. Resaltamos al héroe elegido
    const activeImg = document.getElementById(`img-${hero.portrait}`);
    const activeContainer = document.getElementById(`hero-${hero.portrait}`);
    
    if(activeImg && activeContainer) {
        activeImg.classList.remove('opacity-70');
        activeImg.classList.add('opacity-100');
        activeContainer.classList.add('ring-4', 'ring-yellow-400', 'scale-[1.3]', 'z-10', 'shadow-2xl');
    }
    
    const heroName = document.getElementById('hero-name');
    heroName.innerHTML = hero.name;
};

const spin = () => {
    selectHero();

    if (isStopping) {
        currentDelay *= 1.15; 
        
        if (currentDelay > 600) {
            isSpinning = false;
            isStopping = false;
            const launchBtn = document.getElementById('launch-btn');
            launchBtn.textContent = 'Barajar';
            launchBtn.classList.add('stopped');
            launchBtn.disabled = false;
            return; 
        }
    }

    timeoutId = setTimeout(spin, currentDelay);
};

document.addEventListener('DOMContentLoaded', () => {
    // Pintamos el Roster nada más cargar la página
    renderRoster();

    const launchBtn = document.getElementById('launch-btn');

    launchBtn.addEventListener('click', () => {
        if (!isSpinning) {
            isSpinning = true;
            isStopping = false;
            currentDelay = 50;
            launchBtn.classList.remove('stopped');
            launchBtn.textContent = 'Parar';
            spin();
        } else if (!isStopping) {
            isStopping = true;
            launchBtn.textContent = 'Parando...';
            launchBtn.disabled = true; 
        }
    });

    const typeLinks = document.querySelectorAll('.type-link');
    typeLinks.forEach(typeLink => 
        typeLink.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (isSpinning) return; 

            document.querySelectorAll('.type-link').forEach(link => {
                link.classList.remove('bg-yellow-500');
                link.classList.add('bg-white/10'); 
            });
            ev.target.classList.remove('bg-white/10');
            ev.target.classList.add('bg-yellow-500');
        }, false)
    );
});