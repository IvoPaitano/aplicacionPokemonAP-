const search = document.getElementById('search');
const valueOne = document.getElementById('valueOneI');
const valueTwo = document.getElementById('valueTwo');
const direccionURL = 'https://pokeapi.co/api/v2/';
const tablePokemons = document.getElementById('listPokemons');
const labelOne = document.getElementById('labelOne');
const labelTwo = document.getElementById('labelTwo');
const listTitel = document.getElementById('listTitle');
const form = document.getElementById('form');
const pokemonModal = document.getElementById('pokemonModal');

const pjName = document.getElementById('pName');
const pjId = document.getElementById('pId');
const pjImg = document.getElementById('pImg');
const pjHeight = document.getElementById('pHeight');
const pjWeight = document.getElementById('pWeight');
const pjType = document.getElementById('pType');
const pjAbilities = document.getElementById('pAbilities');

const toKgs = (weight) => {
    const weightKgs = weight.toString().slice(0,-1)+','+weight.toString().slice(-1)+' KG.';
    return weightKgs;
}

const toMs = (height) => {
    const heightMts = height.toString().slice(0,-1)+','+height.toString().slice(-1)+' M.';
    return heightMts;
}

const button = document.getElementById('menuButton');
button.addEventListener('click', (e)=>{
    button.classList.toggle('is-active')
    pokemonModal.classList.toggle('hidden');
})

const borrarTrs = () =>{
    const trs = document.querySelectorAll('TR');
    for (let i = 1; i < trs.length; i++) {
        trs[i].remove();
    }
}

const agregarTabla = (table,fragment) =>{
    const trs = document.querySelectorAll('TR');
    if (trs[0]) {
        borrarTrs();
        table.append(fragment);
    }
}

const infoPokemon = (paramUrl) =>{
    fetch(paramUrl)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
        .then(res => res.json())
        .then(infoPokemon => {
            const pName = infoPokemon.name;
            const pId = infoPokemon.id;
            const pImg = infoPokemon.sprites.other.dream_world.front_default;
            const pHeight = infoPokemon.height;
            const pWeight = infoPokemon.weight;
            const pType = infoPokemon.types.map(eType => {
                return eType.type.name;
            })
            const pAbilities = infoPokemon.abilities.map(eAbility => {
                return eAbility.ability.name;
            });
                pjName.textContent = pName;
                pjId.textContent = pId;
                pjImg.setAttribute('src',pImg);
                pjHeight.textContent = toMs(pHeight);
                pjWeight.textContent = toKgs(pWeight);
                pjType.textContent = pType;
                pjAbilities.textContent = pAbilities;
        })
}

const infoPokemonsType = (paramUrl,classification) =>{
    fetch(paramUrl)
    .then(res => res.ok ? Promise.resolve(res) : Promise.reject(res))
        .then(res => res.json())
        .then(listPokemonsType => {
            const fragment = document.createDocumentFragment();
            listPokemonsType.pokemon.map(element =>{
                const trPokemon = document.createElement('tr');
                const tdName = document.createElement('td');
                trPokemon.setAttribute('class','table-info');
                tdName.textContent = element.pokemon.name;
                trPokemon.appendChild(tdName);
                fragment.appendChild(trPokemon);
            })
            agregarTabla(tablePokemons,fragment);
            listTitel.textContent = `${classification} ${listPokemonsType.name}`;
        })
}

const infoPokemonsLimit = (paramUrl) =>{
    fetch(paramUrl)
    .then(res => res.ok? Promise.resolve(res) : Promise.reject(res))
        .then(res => res.json())
        .then(listPokemonsLimit => {
            const fragment2 = document.createDocumentFragment();
            listPokemonsLimit.results.map(element => {
                const trPokemonL = document.createElement('tr');
                const tdNameL = document.createElement('td');
                tdNameL.textContent = element.name
                trPokemonL.appendChild(tdNameL);
                trPokemonL.setAttribute('class','table-info');
                fragment2.appendChild(trPokemonL);
            })
            agregarTabla(tablePokemons,fragment2);

        })
}


search.addEventListener('change',(e)=>{
    if (search.value != 'limitPokemon') {
        document.getElementById('valueTwo').classList.add('hidden');
        labelTwo.textContent = '';
        switch (search.value) {
            case 'name':
                labelOne.textContent = 'Pokemon: ';
                valueOne.setAttribute('type','text');
                break;
            case 'idPokemon':
                labelOne.textContent = 'ID Pokemon: ';
                valueOne.setAttribute('type','number');
                break;
            case 'typePokemon':
                labelOne.textContent = 'Pokemons Tipo';
                valueOne.setAttribute('type','text');
                break;
            case 'abilityPokemon':
                labelOne.textContent = 'Pokemons con Habilidad';
                valueOne.setAttribute('type','text');

                break;
            default:
                break;
        }
    }else{
        document.getElementById('valueTwo').classList.remove('hidden');
        labelOne.textContent = 'N° Pokémones';
        labelTwo.textContent = 'Desde el Pokemon N°';
    }
})

form.addEventListener('submit',(e) => {
    const search = document.getElementById('search').value;
    const param = valueOne.value.toLowerCase();
    switch (search) {
        case 'idPokemon':
        case 'name':
                const nameUrl = direccionURL+`pokemon/${param}`;
                infoPokemon(nameUrl);
            break;
        case 'typePokemon':
                borrarTrs();
                const typeUrl = direccionURL+`type/${param}`;
                infoPokemonsType(typeUrl,'Tipo : ');
                listTitel.textContent = `Pokémones Tipo : ${param}`;
            break;
        case 'abilityPokemon':
                borrarTrs();
                const abilityUrl = direccionURL+`ability/${param}`;
                infoPokemonsType(abilityUrl,'Habilidad : ');
                listTitel.textContent = `Pokemones con Habilidad : ${param}`;
            break;
        case 'limitPokemon':
                borrarTrs();
                const param2 = valueTwo.value;
                const limitUrl = direccionURL+`pokemon?limit=${param}&offset=${param2}`;
                infoPokemonsLimit(limitUrl);
                listTitel.textContent = `Primeros : ${param} pokémones a partir del pokémon : ${param2}`;
            break;
        default:
           console.log('Valor invalido.');
            break;
    }
    e.preventDefault();
})

