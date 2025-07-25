import { Database } from "./database.js";
import { Pokemon } from "./pokemon.js";
import { PokemonType } from "./pokemontype.js";
import { TemplateManager } from "./templatemanager.js";

export class PokeManager{

    
    // static currentPokemons = [];
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

        await PokeManager.renderLegend();
        await PokeManager.renderPokemon();

        PokeManager.initEventListener();

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

    // #endregion render functions

    // #region spinner

    static loadSpinner() {
        document.getElementById('spinner-overlay').style.display = 'block';
    }

    static unloadSpinner() {
        document.getElementById('spinner-overlay').style.display = 'none';
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

    /**
     * Creates a html element to render single pokemon card and returns it. 
     * 
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
     * 
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
     * 
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
     * Creates a html element to render the detail dialog of a 
     * pokemon and returns it. 
     * 
     * @param {Pokemon} pokemon to create a card with data.
     * @returns a html element as dialog with pokemon data.
     */
    static createDialog(pokemon) {
        const dialogElement = document.createElement('div');
        dialogElement.id = 'poke-detail-card';
        dialogElement.style.background = pokemon.types[0].bg_color;
        dialogElement.innerHTML = TemplateManager.getPokeDetailCard(pokemon);
        //TODO denke dran, man soll die Details des Pokemons durchzappen können. (vor, zurück)

        return dialogElement;
    }

    // #endregion creates

    // #region event functions

    /**
     * Adds event listener 
     */
    static initEventListener(){

        document.getElementById('load-more-btn').addEventListener('click', () => {
            PokeManager.loadMore();
        });
        

        document.getElementById('poke-detail-content')
            .addEventListener('click', function(event) {
                event.stopPropagation();
            });
    }

    /**
     * Adds event listener to buttons of pokemon detail dialog
     */
    static addDialogEventListener() {

        document.getElementById('aside-poke-detail')
            .addEventListener('click', () => {
                PokeManager.closeDetailDialog() }
            );
        document.getElementById('detail-btn-forward')
            .addEventListener('click', () => {
                PokeManager.goForward();
            });
        document.getElementById('detail-btn-backward')
            .addEventListener('click', () => {
                PokeManager.goBackward();
            });  
    }

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
        asidePokeDetailRef.style.display = 'flex';

        const dialogElement = PokeManager.createDialog(pokemon);
        pokeDetailContentRef.appendChild(dialogElement);

        PokeManager.currentIndex = pokemon.id - 1;
        PokeManager.setDialogData(pokemon);
        PokeManager.addDialogEventListener();
    }

    /**
     * Sets data of pokemon to dialog.
     * 
     * @param {Pokemon} pokemon 
     */
    static setDialogData(pokemon) {
        



        // Set main data 
        document.getElementById('detail-headline').innerText = `# ${pokemon.id} ${pokemon.name}`;
        document.getElementById('detail-poke-gif').src = `${pokemon.gifSrc}`;
        
        // Set info
        document.getElementById('detail-info-name').innerText = pokemon.name;
        document.getElementById('detail-info-height').innerText = pokemon.height;
        document.getElementById('detail-info-weight').innerText = pokemon.weight;

        // Set stats

        // Set types
        const typeContainerRef = document.getElementById('detail-type-container');
        typeContainerRef.innerHTML = "";
        for(let i = 0; i < pokemon.types.length; i++) {
            const type = pokemon.types[i];
            typeContainerRef.innerHTML += TemplateManager.getPokeTypeIcon(type);
        }

        PokeManager.setBackwardBtnEnabled();

    } 

    /**
     * Close current detail dialog
     */
    static closeDetailDialog() {
        const asidePokeDetailRef = document.getElementById('aside-poke-detail');
        const pokeDetailContentRef = document.getElementById('poke-detail-content');
        pokeDetailContentRef.innerHTML = "";
        asidePokeDetailRef.style.display = 'none';
    }
        
    /**
    * Switch to the next pokemon of collection.
    * 
    * If there's no more next pokemon loaded it will load more.
    */
    static async goForward() {
        PokeManager.currentIndex++;

        if(PokeManager.currentIndex >= Database.loadedPokemnons.length) {
            await Database.loadNextPokemonData();
        }
        PokeManager.setDialogData(Database.loadedPokemnons[PokeManager.currentIndex]);
    }   

    /**
    * Switch to the pokemon before of the collection.
    * 
    * If there's no more image before it will disable the button.
    */
    static goBackward() {
        PokeManager.currentIndex--;
        PokeManager.setDialogData(Database.loadedPokemnons[PokeManager.currentIndex]);
    }

    /**
     * Set disabled property of back button on detail card.
     */
    static setBackwardBtnEnabled() {
        if(PokeManager.currentIndex <= 0) {
            document.getElementById('detail-btn-backward').disabled = true;
        }
        else {
            document.getElementById('detail-btn-backward').disabled = false;
        }
    }

    // #endregion event functions

    // #endregion methods

}

