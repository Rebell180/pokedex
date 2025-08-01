import { Database } from "./database.js";
import { Pokemon } from "./pokemon.js";
import { PokemonType } from "./pokemontype.js";
import { TemplateManager } from "./templatemanager.js";

export class PokeManager {

    static searchedPokemons = [];
    static searchedIndex = 0;
    static currentIndex = 0;

    // #region methods
    // #region render functions

    /**
     * Renders pokemons and legend and load data.
     */
    static async render() {
        PokeManager.loadSpinner();
        await Database.loadLegendData();
        await Database.loadNextPokemonData();
        PokeManager.unloadSpinner();
        PokeManager.renderLegend();
        PokeManager.renderPokemon();
        PokeManager.initEventListener();
    }

    /**
     * Renders current pokemons. 
     */
    static renderPokemon() {
        const pokeContainerRef = document.getElementById('poke-card-collection-container');
        pokeContainerRef.innerHTML = "";
        for (let i = 0; i < Database.loadedPokemons.length; i++) {
            const newPokemon = Database.loadedPokemons[i];
            const pokeCard = PokeManager.createPokeCard(newPokemon);
            pokeContainerRef.appendChild(pokeCard);
        }
        PokeManager.renderPokemonTypes(Database.loadedPokemons);
    }

    /**
     * Renders pokemon detail dialog.
     * @param {Pokemon} pokemon 
     */
    static renderPokeDetail(pokemon) {
        const asidePokeDetailRef = document.getElementById('aside-poke-detail');
        const pokeDetailContentRef = document.getElementById('poke-detail-content');
        pokeDetailContentRef.innerHTML = "";
        asidePokeDetailRef.style.display = 'flex';
        const dialogElement = PokeManager.createDialog(pokemon);
        pokeDetailContentRef.appendChild(dialogElement);
        PokeManager.setDialogData(pokemon);
        PokeManager.addDialogEventListener();
    }

    /**
     * Renders all pokemons wich match search input. 
     * @param {Array[Pokemon]} pokemons 
     */
    static renderSearchedPokemon() {
        const pokeContainerRef = document.getElementById('poke-card-collection-container');
        pokeContainerRef.innerHTML = "";
        for (let i = 0; i < PokeManager.searchedPokemons.length; i++) {
            const newPokemon = PokeManager.searchedPokemons[i];
            const pokeCard = PokeManager.createPokeCard(newPokemon);
            pokeContainerRef.appendChild(pokeCard);
        }
        PokeManager.renderPokemonTypes(PokeManager.searchedPokemons);
    }

    /**
     * Renders the type icons of pokemon cards.
     */
    static renderPokemonTypes(pokemons) {
        for (let j = 0; j < pokemons.length; j++) {
            const pokemon = pokemons[j];
            const pokeTypeContainerRef = document.getElementById('type-container_' + pokemon.id);
            for (let k = 0; k < pokemon.types.length; k++) {
                const type = pokemon.types[k];
                const typeElement = PokeManager.createPokeCardTypes(type)
                pokeTypeContainerRef.appendChild(typeElement);
            }
        }
    }

    /**
     * Renders aside legend of pokemon types.
     */
    static renderLegend() {
        const legendContainerRef = document.getElementById('legend-type-container');

        for (let i = 0; i < Database.loadedTypes.length; i++) {
            const newType = Database.loadedTypes[i];
            const typeElement = PokeManager.createLegendType(newType);
            legendContainerRef.appendChild(typeElement);
        }
    }

    // #endregion render functions
    // #region spinner

    /**
     * Displays spinner as user feedback until data was loaded.
     */
    static loadSpinner() {
        document.getElementById('loader-container').style.display = 'flex';
    }

    /**
     * Removes spinner and displays poke card container.
     */
    static unloadSpinner() {
        document.getElementById('loader-container').style.display = 'none';
        document.getElementById('section-poke-container').style.display = 'block';
    }

    /**
     * Unloads the load more button and replace it with small spinner.
     */
    static loadMoreSpinner() {
        document.getElementById('load-btn-container').style.display = 'none';
    }

    /**
     * Unloads the small spinner and replace it with load more button.
     */
    static unloadMoreSpinner() {
        document.getElementById('loader-small-container').style.display = 'none';
        document.getElementById('load-btn-container').style.display = 'flex';
    }

    /**
     * Unloads the go forward button and replace it with small spinner.
     */
    static loadMoreDetailSpinner() {
        document.getElementById('loader-small-detail-container').style.display = 'flex';
        document.getElementById('detail-btn-forward-img').style.display = 'none';
    }

    /**
     * Unloads the small spinner and replace it with go forward button.
     */
    static unloadMoreDetailSpinner() {
        document.getElementById('loader-small-detail-container').style.display = 'none';
        document.getElementById('detail-btn-forward-img').style.display = 'block';
    }

    // #endregion spinner
    // #region creates

    /**
     * Creates a html element to render single pokemon card and returns it. 
     * @param {Pokemon} pokemon to create a card with data.
     * @returns a html element with pokemon data.
     */
    static createPokeCard(pokemon) {
        const element = document.createElement('div');
        element.id = "pokemon-card-container_" + pokemon.id;
        element.classList.add('poke-card');
        element.style.background = pokemon.types[0].bg_color;
        element.innerHTML = TemplateManager.getPokeCard(pokemon);
        element.addEventListener('click', () => PokeManager.showDetailDialog(pokemon));
        return element;
    }

    /**
     * Creates a html element to render types of single pokemon and returns it.
     * @param {PokemonType} type to create a card with data.
     * @returns a html element with pokemon data.
     */
    static createPokeCardTypes(type) {
        const element = document.createElement('img');
        element.classList.add('type-icon');
        element.src = type.imgSrc;
        return element;
    }

    /**
     * Creates a html element to render on legend item and returns it.
     * @param {PokemonType} type to create a card with data.
     * @returns a html element with type data.
     */
    static createLegendType(type) {
        const element = document.createElement('div');
        element.classList.add('legend-type-element');
        element.innerHTML = TemplateManager.getLegendType(type);
        return element;
    }

    /**
     * Creates a html element to render the detail dialog of a pokemon and returns it. 
     * @param {Pokemon} pokemon to create a card with data.
     * @returns a html element as dialog with pokemon data.
     */
    static createDialog(pokemon) {
        const dialogElement = document.createElement('div');
        dialogElement.id = 'poke-detail-card';
        dialogElement.style.background = pokemon.types[0].bg_color;
        dialogElement.innerHTML = TemplateManager.getPokeDetailCard(pokemon);
        return dialogElement;
    }

    // #endregion creates
    // #region event functions

    /**
     * Adds event listener 
     */
    static initEventListener() {
        document.getElementById('load-more-btn').addEventListener('click', () => {PokeManager.loadMore();});
        document.getElementById('poke-detail-content').addEventListener('click', function (event) {event.stopPropagation();});
        document.getElementById('search-btn').addEventListener('click', () => {PokeManager.search();});
        document.getElementById('search-input').addEventListener('input', () => {PokeManager.search();});
    }

    /**
     * Adds event listener to buttons of pokemon detail dialog
     */
    static addDialogEventListener() {
        document.getElementById('aside-poke-detail').addEventListener('click', () => {PokeManager.closeDetailDialog()});
        document.getElementById('detail-btn-forward').addEventListener('click', () => {PokeManager.goForward();});
        document.getElementById('detail-btn-backward').addEventListener('click', () => {PokeManager.goBackward();});
    }

    /**
     * Loads the next amount of pokemons
     */
    static async loadMore() {
        PokeManager.loadMoreSpinner();
        await Database.loadNextPokemonData();
        PokeManager.renderPokemon();
        PokeManager.unloadMoreSpinner();
    }

    /**
     * Show detail dialog of a single pokemon.
     * @param {Pokemon} pokemon for displaying details 
     */
    static showDetailDialog(pokemon) {
        if(PokeManager.searchedPokemons.length > 0) {
            PokeManager.searchedIndex = PokeManager.getSearchedIndex(pokemon);
        }
        else {
            PokeManager.currentIndex = pokemon.id - 1;
        }
        PokeManager.renderPokeDetail(pokemon);
        document.querySelector('body').style.overflowY = 'hidden';
    }

    /**
     * Sets data of pokemon to dialog.
     * @param {Pokemon} pokemon 
     */
    static setDialogData(pokemon) {
        document.getElementById('detail-headline').innerText = `# ${pokemon.id} ${pokemon.name}`;
        document.getElementById('detail-poke-gif').src = `${pokemon.gifSrc}`;
        document.getElementById('detail-info-name').innerText = pokemon.name;
        document.getElementById('detail-info-height').innerText = pokemon.height;
        document.getElementById('detail-info-weight').innerText = pokemon.weight;
        PokeManager.setStatData(pokemon.stats);
        PokeManager.setDetailTypes(pokemon.types);
        PokeManager.setSwitchBtnEnabled();
    }

    /**
     * Finds the index of a pokemon in array.
     * @param {Pokemon} pokemon 
     * @returns the index in searched pokemon array.
     */
    static getSearchedIndex(pokemon) {
        for(let i = 0; i < PokeManager.searchedPokemons.length; i++) {
            if(PokeManager.searchedPokemons[i].name == pokemon.name) {
                return i;
            }
        }
    }

    /**
     * Sets the stats of a pokemon to detail dialog.
     * @param {Pokemon.stats} stats to fill dialog.
     */
    static setStatData(stats) {
        const statsContainerRef = document.getElementById('poke-stat-container');
        statsContainerRef.innerHTML = "";
        for (let i = 0; i < stats.length; i++) {
            const stat = stats[i];
            statsContainerRef.innerHTML += TemplateManager.getPokeStat(stat, i);
        }
    }

    /**
     * Sets the types of a pokemon to detail dialog.
     * @param {Pokemon.types} types 
     */
    static setDetailTypes(types) {
        const typeContainerRef = document.getElementById('detail-type-container');
        typeContainerRef.innerHTML = "";
        for (let i = 0; i < types.length; i++) {
            const type = types[i];
            typeContainerRef.innerHTML += TemplateManager.getPokeTypeIcon(type);
        }
    }

    /**
     * Close current detail dialog
     */
    static closeDetailDialog() {
        const asidePokeDetailRef = document.getElementById('aside-poke-detail');
        const pokeDetailContentRef = document.getElementById('poke-detail-content');
        pokeDetailContentRef.innerHTML = "";
        asidePokeDetailRef.style.display = 'none';
        document.querySelector('body').style.overflowY = 'auto';
    }

    /**
    * Switch to the next pokemon of collection.
    * 
    * If there's no more next pokemon loaded it will load more.
    */
    static async goForward() {
        if(PokeManager.searchedPokemons.length > 0) {
            PokeManager.searchedIndex++;
            PokeManager.setDialogData(PokeManager.searchedPokemons[PokeManager.searchedIndex]);
        }
        else {
            PokeManager.currentIndex++;
            if (PokeManager.currentIndex >= Database.loadedPokemons.length) {
                PokeManager.loadMoreDetailSpinner();
                await PokeManager.loadMore();
            PokeManager.unloadMoreDetailSpinner();
            }
            PokeManager.setDialogData(Database.loadedPokemons[PokeManager.currentIndex]);
        }
    }

    /**
    * Switch to the pokemon before of the collection.
    * If there's no more image before it will disable the button.
    */
    static goBackward() {
        if (PokeManager.searchedPokemons.length > 0) {
            PokeManager.searchedIndex--;
            PokeManager.setDialogData(PokeManager.searchedPokemons[PokeManager.searchedIndex]);
        }
        else {
            PokeManager.currentIndex--;
            PokeManager.setDialogData(Database.loadedPokemons[PokeManager.currentIndex]);
        }
    }

    /**
     * Set disabled property of back button on detail card.
     */
    static setSwitchBtnEnabled() {
        if (PokeManager.currentIndex <= 0 && PokeManager.searchedIndex <= 0) {
            document.getElementById('detail-btn-backward').style.visibility = "hidden";
        }
        else {
            document.getElementById('detail-btn-backward').style.visibility = "visible";
        }

        if(PokeManager.searchedIndex >= (PokeManager.searchedPokemons.length - 1)) {
            document.getElementById('detail-btn-forward').style.visibility = 'hidden';
        }
        else {
            document.getElementById('detail-btn-forward').style.visibility = 'visible';
        }

        if(PokeManager.currentIndex >= 0 && PokeManager.searchedIndex == 0) {
            document.getElementById('detail-btn-forward').style.visibility = 'visible';
        }
    }

    /**
     * Search pokemons which name contains input and render them.
     */
    static search() {
        const searchInputRef = document.getElementById('search-input');
        const input = searchInputRef.value.toLowerCase();
        if (input.length >= 3) {
            PokeManager.searchedPokemons = Database.loadedPokemons.filter((pokemon) => pokemon.name.includes(input));
            PokeManager.currentIndex = 0;
            PokeManager.renderSearchedPokemon();
            document.getElementById('load-more-btn').style.visibility = 'hidden';
        }
        else if (input.length == 0) {
            PokeManager.searchedPokemons = [];
            PokeManager.searchedIndex = 0;
            PokeManager.renderPokemon();
            document.getElementById('load-more-btn').style.visibility = 'visible';
        }
    }

    // #endregion event functions
    // #endregion methods
}

