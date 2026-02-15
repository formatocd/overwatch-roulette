// src/main.js
const TANK = 1;
const DPS = 2;
const SUPPORT = 3;
const heroes = [
    { name: 'Unknown', type: 0, portrait: 'unknown' },
    { name: 'Ana', type: SUPPORT, portrait: 'ana' },
    { name: 'Anran', type: DPS, portrait: 'anran' },
    { name: 'Ashe', type: DPS, portrait: 'ashe' },
    { name: 'Baptiste', type: SUPPORT, portrait: 'baptiste' },
    { name: 'Bastion', type: DPS, portrait: 'bastion' },
    { name: 'Brigitte', type: SUPPORT, portrait: 'brigitte' },
    { name: 'Cassidy', type: DPS, portrait: 'cassidy' },
    { name: 'Domina', type: TANK, portrait: 'domina' },
    { name: 'D. VA', type: TANK, portrait: 'dva' },
    { name: 'Doomfist', type: DPS, portrait: 'doomfist' },
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

// PRECARGA DE IMÁGENES usando el nuevo atributo "portrait"
const preloadedImages = {}; // Ahora usamos un objeto (diccionario) en lugar de un array
heroes.forEach(hero => {
    const img = new Image();
    img.src = `portraits/${hero.portrait}.png`;
    preloadedImages[hero.portrait] = img.src; // Lo guardamos asociado a su nombre
});

let timeoutId;
let isSpinning = false;
let isStopping = false;
let currentDelay = 50; 

const selectHero = () => {
    const selectedTypeLink = document.querySelector('.type-link.bg-yellow-500');
    const typeId = parseInt(selectedTypeLink.dataset.typeid, 10);

    // Filtramos la lista para que "Todos" (0) no incluya la imagen de "Unknown"
    const validHeroes = typeId === 0 
        ? heroes.filter(h => h.portrait !== 'unknown') 
        : heroes.filter(h => h.type === typeId);

    const randomIndex = Math.floor(Math.random() * validHeroes.length);
    const hero = validHeroes[randomIndex];

    // Actualizamos el DOM tirando de la caché con la clave hero.portrait
    const heroPortrait = document.getElementById('hero-portrait');
    heroPortrait.src = preloadedImages[hero.portrait];
    
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