import { Database } from "./database.js";
import { Pokemon } from "./pokemon.js";
import { TemplateManager } from "./templatemanager.js";

export class PokeManager{

    
    static currentPokemons = [];


    // #region methods

    // #region render functions

    /**
     * Renders pokemons and legend and load data.
     */
    static async render() {
        PokeManager.loadSpinner();

        await Database.loadLegendData();
        await Database.loadNextPokemonData();

        await PokeManager.renderLegend();
        await PokeManager.renderPokemon();

        document.getElementById('load-more-btn').addEventListener('click', () => {
            PokeManager.loadMore();
        });

        PokeManager.unloadSpinner();
    }

    /**
     * Renders current pokemons. 
     */
    static async renderPokemon() {

        const pokeContainerRef = document.getElementById('poke-card-collection-container');
        pokeContainerRef.innerHTML = "";

        for(let i = 0; i < Database.loadedPokemnons.length; i++) {
            const newPokemon = Database.loadedPokemnons[i];
            const pokeCard = PokeManager.createPokeCard(newPokemon);
            pokeContainerRef.appendChild(pokeCard);
        }

        PokeManager.renderPokemonTypes();
    }

    /**
     * Renders the type icons of pokemon cards.
     */
    static renderPokemonTypes() {
        for(let j = 0; j < Database.loadedPokemnons.length; j++) {
            const pokemon = Database.loadedPokemnons[j];
            const pokeTypeContainerRef = document.getElementById('type-container_' + pokemon.id);
            
            for(let k = 0; k < pokemon.types.length; k++) {
                const type = pokemon.types[k];
                const typeElement = PokeManager.createPokeCardTypes(type)
                pokeTypeContainerRef.appendChild(typeElement);
            }
        }
    }

    /**
     * Renders aside legend of pokemon types.
     */
    static async renderLegend() {
        const legendContainerRef = document.getElementById('legend-type-container');

        for(let i = 0; i < Database.loadedTypes.length; i++) {
            const newType = Database.loadedTypes[i];
            const typeElement = PokeManager.createLegendType(newType);
            legendContainerRef.appendChild(typeElement);
        }
    }

    static renderDialog(pokemnon){

        // const dialogElement = PokeManager.createDialogElement();

    }

    // #endregion render functions

    // #region spinner

    static loadSpinner() {

    }

    static unloadSpinner() {

    }

    /**
     * Unloads the load more button and replace it with small spinner.
     */    
    static loadSubSpinner(){
        // TODO toggle load more button with spinner
    }

    /**
     * Unloads the small spinner and replace it with load more button.
     */
    static unloadSubSpinner() {
        //TODO toggle spinner with load more button
    }

    // #endregion spinner

    // #region creates

    static createPokeCard(pokemon) {
        const element = document.createElement('div');
        element.id = "pokemon-card-container_" + pokemon.id;
        element.classList.add('poke-card');
        
        element.style.background = pokemon.types[0].bg_color;
        element.innerHTML = TemplateManager.getPokeCard(pokemon);
        element.addEventListener('click', () => PokeManager.showDetailDialog(pokemon));
    
        return element;
    }

    static createPokeCardTypes(type) {
        const element = document.createElement('img');
        element.classList.add('type-icon');
        element.src = type.imgSrc;

        return element;
    }

    static createLegendType(type) {
        const element = document.createElement('div');
        element.classList.add('legend-type-element');
        element.innerHTML = TemplateManager.getLegendType(type);
        return element;
    }

    static createDialog(pokemon) {
        const dialogElement = document.createElement('div');
        //TODO denke dran, man soll die Details des Pokemons durchzappen können. (vor, zurück)


        return dialogElement;
    }

    // #endregion creates

    // #region event functions

    /**
     * Loads the next amount of pokemons
     */
    static async loadMore() {
        PokeManager.loadSubSpinner();
        await Database.loadNextPokemonData();
        await PokeManager.renderPokemon();
        PokeManager.unloadSubSpinner();
    }

    /**
     * Show detail dialog of a single pokemon.
     * 
     * @param {Pokemon} pokemon for displaying details 
     */
    static showDetailDialog(pokemon) {
        const asidePokeDetailRef = document.getElementById('aside-poke-detail');
        const pokeDetailContentRef = document.getElementById('poke-detail-content');
        
        pokeDetailContentRef.innerHTML = "";
        asidePokeDetailRef.classList.remove('d-none');

        const dialogElement = PokeManager.createDialog(pokemon);
        pokeDetailContentRef.appendChild(dialogElement);
    }

    /**
     * Close current detail dialog
     */
    static closeDetailDialog() {
        const asidePokeDetailRef = document.getElementById('aside-poke-detail');
        // const pokeDetailContentRef = document.getElementById('poke-detail-content');
        // pokeDetailContentRef.innerHTML = "";
        asidePokeDetailRef.classList.add('d-none');
    }

    // #endregion event functions

    // #endregion methods
}

