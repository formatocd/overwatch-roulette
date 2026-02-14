let heroesInterval

const heroes = [
    {name: 'Unknown', type: 0},
    {name: 'Ana', type: 3},
    {name: 'Ashe', type: 2},
    {name: 'Baptiste', type: 3},
    {name: 'Bastion', type: 2},
    {name: 'Brigitte', type: 3},
    {name: 'Cassidy', type: 2},
    {name: 'D. VA', type: 1},
    {name: 'Doomfist', type: 2},
    {name: 'Echo', type: 2},
    {name: 'Genji', type: 2},
    {name: 'Hanzo', type: 2},
    {name: 'Junkrat', type: 2},
    {name: 'Lucio', type: 3},
    {name: 'Mei', type: 2},
    {name: 'Mercy', type: 3},
    {name: 'Moira', type: 3},
    {name: 'Orisa', type: 1},
    {name: 'Pharah', type: 2},
    {name: 'Reaper', type: 2},
    {name: 'Reinhardt', type: 1},
    {name: 'Roadhog', type: 1},
    {name: 'Sigma', type: 1},
    {name: 'Soldado: 76', type: 2},
    {name: 'Sombra', type: 2},
    {name: 'Symmetra', type: 2},
    {name: 'Torbjörn', type: 2},
    {name: 'Tracer', type: 2},
    {name: 'Widowmaker', type: 2},
    {name: 'Winston', type: 1},
    {name: 'Wrecking Ball', type: 1},
    {name: 'Zarya', type: 1},
    {name: 'Zenyatta', type: 3}

]

const selectHero = () => {
    let heroId = Math.trunc(Math.random()*32) + 1;
        let hero = heroes[heroId]
        const selectedTypeLink = document.querySelector('.type-link.bg-yellow-500')
        const typeId = parseInt(selectedTypeLink.dataset.typeid, 10)

        if(typeId !== 0) {
            while(hero.type !== typeId){
                heroId = Math.trunc(Math.random()*32) + 1;
                hero = heroes[heroId]
            }
        }

        const heroPortrait = document.getElementById('hero-portrait')
        heroPortrait.src = `portraits/${heroId < 10 ? '0' : ''}${heroId}.png`
        const heroName = document.getElementById('hero-name')
        heroName.innerHTML = hero.name
    
}

document.addEventListener('DOMContentLoaded', () => {

    
    const launchBtn = document.getElementById('launch-btn')

    launchBtn.addEventListener('click', () => {
        launchBtn.classList.toggle('stopped')

        if(launchBtn.classList.contains('stopped')){
            clearInterval(heroesInterval)
            launchBtn.textContent = 'Barajar'
        } else {
            heroesInterval = setInterval(selectHero, 100)
            launchBtn.textContent = 'Parar'
        }

    })

    const typeLinks = document.querySelectorAll('.type-link')
    console.log(typeLinks)
    typeLinks.forEach(typeLink => 
        typeLink.addEventListener('click', (ev) => {
            ev.preventDefault()
            document.querySelectorAll('.type-link').forEach(typeLink => typeLink.classList.remove('bg-yellow-500'))
            ev.target.classList.add('bg-yellow-500')
        }, false)
    )

    
})