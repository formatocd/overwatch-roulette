const TANK = 1;
const DPS = 2;
const SUPPORT = 3;

const iconBarajar = `
    <svg class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
    </svg>
`;

const iconParar = `
    <svg class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="6" width="12" height="12" rx="2" ry="2"></rect>
    </svg>
`;

const iconParando = `
    <svg class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
`;

const heroes = [
    { name: 'Ana', type: SUPPORT, portrait: 'ana' },
    { name: 'Anran', type: DPS, portrait: 'anran' },
    { name: 'Ashe', type: DPS, portrait: 'ashe' },
    { name: 'Baptiste', type: SUPPORT, portrait: 'baptiste' },
    { name: 'Bastion', type: DPS, portrait: 'bastion' },
    { name: 'Brigitte', type: SUPPORT, portrait: 'brigitte' },
    { name: 'Cassidy', type: DPS, portrait: 'cassidy' },
    { name: 'D.VA', type: TANK, portrait: 'dva' },
    { name: 'Domina', type: TANK, portrait: 'domina' },
    { name: 'Doomfist', type: TANK, portrait: 'doomfist' },
    { name: 'Echo', type: DPS, portrait: 'echo' },
    { name: 'Emre', type: DPS, portrait: 'emre' },
    { name: 'Freja', type: DPS, portrait: 'freja' },
    { name: 'Genji', type: DPS, portrait: 'genji' },
    { name: 'Hanzo', type: DPS, portrait: 'hanzo' },
    { name: 'Hazard', type: TANK, portrait: 'hazard' },
    { name: 'Illari', type: SUPPORT, portrait: 'illari' },
    { name: 'Jetpack Cat', type: SUPPORT, portrait: 'jetpack-cat' },
    { name: 'Junker Queen', type: TANK, portrait: 'junker-queen' },
    { name: 'Junkrat', type: DPS, portrait: 'junkrat' },
    { name: 'Juno', type: SUPPORT, portrait: 'juno' },
    { name: 'Kiriko', type: SUPPORT, portrait: 'kiriko' },
    { name: 'Lifeweaver', type: SUPPORT, portrait: 'lifeweaver' },
    { name: 'Lucio', type: SUPPORT, portrait: 'lucio' },
    { name: 'Mauga', type: TANK, portrait: 'mauga' },
    { name: 'Mei', type: DPS, portrait: 'mei' },
    { name: 'Mercy', type: SUPPORT, portrait: 'mercy' },
    { name: 'Mizuki', type: SUPPORT, portrait: 'mizuki' },
    { name: 'Moira', type: SUPPORT, portrait: 'moira' },
    { name: 'Orisa', type: TANK, portrait: 'orisa' },
    { name: 'Pharah', type: DPS, portrait: 'pharah' },
    { name: 'Ramattra', type: TANK, portrait: 'ramattra' },
    { name: 'Reaper', type: DPS, portrait: 'reaper' },
    { name: 'Reinhardt', type: TANK, portrait: 'reinhardt' },
    { name: 'Roadhog', type: TANK, portrait: 'roadhog' },
    { name: 'Sierra', type: DPS, portrait: 'sierra' },
    { name: 'Sigma', type: TANK, portrait: 'sigma' },
    { name: 'Sojourn', type: DPS, portrait: 'sojourn' },
    { name: 'Soldado: 76', type: DPS, portrait: 'soldier-76' },
    { name: 'Sombra', type: DPS, portrait: 'sombra' },
    { name: 'Symmetra', type: DPS, portrait: 'symmetra' },
    { name: 'Torbjörn', type: DPS, portrait: 'torbjorn' },
    { name: 'Tracer', type: DPS, portrait: 'tracer' },
    { name: 'Vendetta', type: DPS, portrait: 'vendetta' },
    { name: 'Venture', type: DPS, portrait: 'venture' },
    { name: 'Widowmaker', type: DPS, portrait: 'widowmaker' },
    { name: 'Winston', type: TANK, portrait: 'winston' },
    { name: 'Wrecking Ball', type: TANK, portrait: 'wrecking-ball' },
    { name: 'Wuyang', type: SUPPORT, portrait: 'wuyang' },
    { name: 'Zarya', type: TANK, portrait: 'zarya' },
    { name: 'Zenyatta', type: SUPPORT, portrait: 'zenyatta' }
];

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

const renderRoster = () => {
    const container = document.getElementById('roster-container');
    container.innerHTML = '';

    const categories = [
        { type: TANK, name: 'Tank', icon: '🛡️' },
        { type: DPS, name: 'DPS', icon: '⚔️' },
        { type: SUPPORT, name: 'Support', icon: '✚' }
    ];

    categories.forEach(cat => {
        const catHeroes = heroes.filter(h => h.type === cat.type);

        const col = document.createElement('div');
        col.className = 'role-column flex flex-col items-start px-2 sm:px-0 mb-6 lg:mb-0 transition-all duration-500 opacity-100';
        col.dataset.roleType = cat.type;

        const title = document.createElement('h2');
        title.className = 'text-gray-200 text-sm md:text-base mb-2 pb-1 border-b-[3px] border-orange-600 uppercase tracking-widest flex items-center gap-2 w-full';
        title.innerHTML = `<span>${cat.icon}</span> ${cat.name}`;
        col.appendChild(title);

        const grid = document.createElement('div');
        if (cat.type === DPS) {
            grid.className = 'flex flex-wrap justify-center gap-1 w-full sm:max-w-[340px] md:max-w-[400px] xl:max-w-[450px]';
        } else {
            grid.className = 'flex flex-wrap justify-center gap-1 w-full sm:max-w-[230px] md:max-w-[280px] xl:max-w-[340px]';
        }

        catHeroes.forEach(hero => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'relative w-[45px] h-[55px] sm:w-[50px] sm:h-[60px] transition-all duration-75 ease-in-out bg-gray-600 rounded cursor-pointer overflow-hidden border border-transparent';
            imgContainer.id = `hero-${hero.portrait}`;

            const img = document.createElement('img');
            img.src = preloadedImages[hero.portrait];
            img.className = 'w-full h-full object-cover opacity-60 transition-opacity';
            img.id = `img-${hero.portrait}`;

            imgContainer.appendChild(img);
            grid.appendChild(imgContainer);
        });

        col.appendChild(grid);
        container.appendChild(col);
    });
};

const selectHero = () => {
    const selectedTypeLink = document.querySelector('.type-link.bg-orange-600');
    const typeId = parseInt(selectedTypeLink.dataset.typeid, 10);

    const validHeroes = typeId === 0
        ? heroes
        : heroes.filter(h => h.type === typeId);

    const randomIndex = Math.floor(Math.random() * validHeroes.length);
    const hero = validHeroes[randomIndex];

    heroes.forEach(h => {
        const imgEl = document.getElementById(`img-${h.portrait}`);
        const containerEl = document.getElementById(`hero-${h.portrait}`);
        if (imgEl && containerEl) {
            imgEl.classList.remove('opacity-100');
            imgEl.classList.add('opacity-60');
            containerEl.classList.remove('border-orange-500', 'scale-[1.15]', 'z-10', 'shadow-lg');
            containerEl.classList.add('border-transparent');
        }
    });

    const activeImg = document.getElementById(`img-${hero.portrait}`);
    const activeContainer = document.getElementById(`hero-${hero.portrait}`);

    if (activeImg && activeContainer) {
        activeImg.classList.remove('opacity-60');
        activeImg.classList.add('opacity-100');
        activeContainer.classList.remove('border-transparent');
        activeContainer.classList.add('border-2', 'border-orange-500', 'scale-[1.15]', 'z-10', 'shadow-lg');
    }

    const heroName = document.getElementById('hero-name');
    heroName.innerHTML = hero.name;

    const heroPortrait = document.getElementById('hero-portrait');
    heroPortrait.src = preloadedImages[hero.portrait];

    document.getElementById('portrait-border').classList.add('border-orange-600/50');
};

const setFinalStyles = () => {
    const nameContainer = document.getElementById('hero-name-container');
    const nameSpan = document.getElementById('hero-name');
    const portraitBorder = document.getElementById('portrait-border');

    nameContainer.classList.add('bg-orange-600', 'rounded-xl', 'shadow-lg', 'transform', 'scale-110');

    nameSpan.classList.remove('text-orange-500', 'text-orange-600', 'text-gray-400');
    nameSpan.classList.add('text-white');

    portraitBorder.classList.remove('border-transparent', 'border-orange-600/50');
    portraitBorder.classList.add('border-orange-600', 'ring-4', 'ring-orange-600/30');
};

const clearFinalStyles = () => {
    const nameContainer = document.getElementById('hero-name-container');
    const nameSpan = document.getElementById('hero-name');
    const portraitBorder = document.getElementById('portrait-border');

    nameContainer.classList.remove('bg-orange-600', 'rounded-xl', 'shadow-lg', 'transform', 'scale-110');

    nameSpan.classList.remove('text-white', 'text-gray-400');
    nameSpan.classList.add('text-orange-500');

    portraitBorder.classList.remove('border-orange-600', 'ring-4', 'ring-orange-600/30');
    portraitBorder.classList.add('border-transparent');
};

const spin = () => {
    selectHero();

    if (isStopping) {
        currentDelay *= 1.15;

        if (currentDelay > 600) {
            isSpinning = false;
            isStopping = false;

            setFinalStyles();

            const launchBtn = document.getElementById('launch-btn');
            launchBtn.innerHTML = iconBarajar;
            launchBtn.title = 'Barajar';
            launchBtn.classList.add('stopped');
            launchBtn.disabled = false;
            return;
        }
    }

    timeoutId = setTimeout(spin, currentDelay);
};

document.addEventListener('DOMContentLoaded', () => {
    renderRoster();

    const launchBtn = document.getElementById('launch-btn');

    launchBtn.innerHTML = iconBarajar;

    launchBtn.addEventListener('click', () => {
        if (!isSpinning) {
            isSpinning = true;
            isStopping = false;
            currentDelay = 50;

            clearFinalStyles();

            launchBtn.classList.remove('stopped');
            launchBtn.innerHTML = iconParar;
            launchBtn.title = 'Parar';
            spin();
        } else if (!isStopping) {
            isStopping = true;
            launchBtn.innerHTML = iconParando;
            launchBtn.title = 'Parando...';
            launchBtn.disabled = true;
        }
    });

    const typeLinks = document.querySelectorAll('.type-link');
    typeLinks.forEach(typeLink =>
        typeLink.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (isSpinning) return;

            document.querySelectorAll('.type-link').forEach(link => {
                link.classList.remove('bg-orange-600');
                link.classList.add('bg-white/10', 'hover:bg-white/20');
            });

            ev.currentTarget.classList.remove('bg-white/10', 'hover:bg-white/20');
            ev.currentTarget.classList.add('bg-orange-600');

            const selectedType = parseInt(ev.currentTarget.dataset.typeid, 10);

            document.querySelectorAll('.role-column').forEach(col => {
                const colType = parseInt(col.dataset.roleType, 10);

                if (selectedType === 0 || selectedType === colType) {
                    col.classList.remove('opacity-30', 'grayscale', 'blur-[1px]', 'pointer-events-none');
                    col.classList.add('opacity-100');
                } else {
                    col.classList.remove('opacity-100');
                    col.classList.add('opacity-30', 'grayscale', 'blur-[1px]', 'pointer-events-none');
                }
            });
        }, false)
    );
});