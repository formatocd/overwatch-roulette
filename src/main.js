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

// Iconos para el botón
const iconShuffle = `<svg class="w-8 h-8 md:w-12 md:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>`;
const iconStop = `<svg class="w-8 h-8 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="6" width="12" height="12" rx="2"></rect></svg>`;
const iconLoader = `<svg class="animate-spin w-8 h-8 md:w-12 md:h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`;

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

// Dibuja la cuadrícula separando por roles (ajustado para dos filas)
const renderRoster = () => {
    const container = document.getElementById('roster-container');
    container.innerHTML = ''; 

    const categories = [
        { type: TANK, name: 'Tanque', icon: '🛡️' }, // Puedes cambiar los emojis por SVGs después si quieres
        { type: DPS, name: 'Daño', icon: '⚔️' },
        { type: SUPPORT, name: 'Apoyo', icon: '✚' }
    ];

    categories.forEach(cat => {
        const catHeroes = heroes.filter(h => h.type === cat.type);
        
        const col = document.createElement('div');
        // Usamos flex-1 para que se distribuyan equitativamente, o anchos fijos según prefieras
        col.className = 'flex flex-col bg-gray-800/40 p-4 rounded-xl shadow-lg border border-gray-700/50';
        
        const title = document.createElement('h2');
        title.className = 'text-gray-200 font-bold text-sm md:text-md mb-3 uppercase tracking-widest flex items-center gap-2';
        title.innerHTML = `<span>${cat.icon}</span> ${cat.name}`;
        col.appendChild(title);

        const grid = document.createElement('div');
        // Cambiamos el ancho fijo a algo más fluido. 
        // max-w-[400px] o similar obligará a que salten a la segunda fila de forma natural
        grid.className = 'flex flex-wrap gap-1 w-full sm:max-w-[280px] md:max-w-[340px] xl:max-w-[420px]'; 

        catHeroes.forEach(hero => {
            const imgContainer = document.createElement('div');
            // Miniaturas un poco más apaisadas o cuadradas según el diseño de OW
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

    // 1. Limpiamos estado visual del Roster
    heroes.forEach(h => {
        const imgEl = document.getElementById(`img-${h.portrait}`);
        const containerEl = document.getElementById(`hero-${h.portrait}`);
        if(imgEl && containerEl) {
            imgEl.classList.remove('opacity-100');
            imgEl.classList.add('opacity-60');
            containerEl.classList.remove('border-orange-500', 'scale-[1.15]', 'z-10', 'shadow-lg');
            // Opcional: añadimos un pequeño fondo blanco para simular el borde original
            containerEl.classList.add('border-transparent');
        }
    });

    // 2. Resaltamos al héroe elegido en el Roster
    const activeImg = document.getElementById(`img-${hero.portrait}`);
    const activeContainer = document.getElementById(`hero-${hero.portrait}`);
    
    if(activeImg && activeContainer) {
        activeImg.classList.remove('opacity-60');
        activeImg.classList.add('opacity-100');
        activeContainer.classList.remove('border-transparent');
        // Efecto visual más sutil para que no rompa la cuadrícula
        activeContainer.classList.add('border-2', 'border-orange-500', 'scale-[1.15]', 'z-10', 'shadow-lg');
    }
    
    // 3. Actualizamos el nombre y el retrato grande
    const heroName = document.getElementById('hero-name');
    heroName.innerHTML = hero.name;
    
    const heroPortrait = document.getElementById('hero-portrait');
    heroPortrait.src = preloadedImages[hero.portrait];
    
    // Le damos un poco de borde al retrato grande durante el giro
    document.getElementById('portrait-border').classList.add('border-orange-600/50');
};

const setFinalStyles = () => {
    // Aplicamos los estilos finales al texto y retrato cuando la ruleta se para
    const nameContainer = document.getElementById('hero-name-container');
    const nameSpan = document.getElementById('hero-name');
    const portraitBorder = document.getElementById('portrait-border');
    
    // Estilos del contenedor: recuadro naranja
    nameContainer.classList.add('bg-orange-600', 'rounded-xl', 'shadow-lg', 'transform', 'scale-110');
    
    // MUY IMPORTANTE: Quitamos TODOS los colores anteriores antes de poner el blanco
    nameSpan.classList.remove('text-orange-500', 'text-orange-600', 'text-gray-400'); 
    nameSpan.classList.add('text-white');
    
    // Estilos retrato: borde naranja fuerte
    portraitBorder.classList.remove('border-transparent', 'border-orange-600/50');
    portraitBorder.classList.add('border-orange-600', 'ring-4', 'ring-orange-600/30');
};

const clearFinalStyles = () => {
    // Quitamos los estilos finales cuando empieza a girar
    const nameContainer = document.getElementById('hero-name-container');
    const nameSpan = document.getElementById('hero-name');
    const portraitBorder = document.getElementById('portrait-border');
    
    // Devolvemos el contenedor a su estado normal (sin fondo naranja)
    nameContainer.classList.remove('bg-orange-600', 'rounded-xl', 'shadow-lg', 'transform', 'scale-110');
    
    // MUY IMPORTANTE: Quitamos el blanco y volvemos a poner el naranja
    nameSpan.classList.remove('text-white', 'text-gray-400');
    nameSpan.classList.add('text-orange-500'); 
    
    // Devolvemos el retrato a su estado normal
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
            
            // Llamamos a la función que aplica los estilos finales
            setFinalStyles();
            
            const launchBtn = document.getElementById('launch-btn');
            launchBtn.innerHTML = 'Barajar';
            launchBtn.classList.add('stopped');
            launchBtn.disabled = false;
            return; 
        }
    }

    timeoutId = setTimeout(spin, currentDelay);
};

document.addEventListener('DOMContentLoaded', () => {
    renderRoster();

    // Estado inicial visual
    document.getElementById('hero-name').classList.add('text-gray-400');

    const launchBtn = document.getElementById('launch-btn');

    launchBtn.addEventListener('click', () => {
        if (!isSpinning) {
            isSpinning = true;
            isStopping = false;
            currentDelay = 50;
            
            clearFinalStyles(); // Limpiamos estilos antes de girar
            
            launchBtn.classList.remove('stopped');
            launchBtn.innerHTML = 'Parar';
            spin();
        } else if (!isStopping) {
            isStopping = true;
            launchBtn.innerHTML = 'Parando...';
            launchBtn.disabled = true; 
        }
    });

    const typeLinks = document.querySelectorAll('.type-link');
    typeLinks.forEach(typeLink => 
        typeLink.addEventListener('click', (ev) => {
            ev.preventDefault();
            if (isSpinning) return; 

            // Corregido el bug del bg-yellow-500
            document.querySelectorAll('.type-link').forEach(link => {
                link.classList.remove('bg-orange-600');
                link.classList.add('bg-white/10'); 
            });
            ev.target.classList.remove('bg-white/10');
            ev.target.classList.add('bg-orange-600');
        }, false)
    );
});