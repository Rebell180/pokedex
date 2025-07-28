import { PokeManager } from "./pokemanager.js";
export class TemplateManager {

    /**
     * Returns html template for adding a card of pokemon.
     * 
     * @param {Pokemon} pokemon to display
     * @returns 
     */
    static getPokeCard(pokemon) {
        return /*html*/`
            <img src="${pokemon.imgSrc}" alt="">
            <span># ${pokemon.id}</span>
            <h3>${pokemon.name}</h3>
            <div id="type-container_${pokemon.id}" class="type-container">
                <!-- Enter types here -->
            </div>
        `;
    }

    /**
     * Returns html template for adding a detail card of pokemon.
     * 
     * @param {Pokemon} pokemon to display
     * @returns 
     */
    static getPokeDetailCard(pokemon) {
        return /*html*/`
            <h3 id="detail-headline"># name unknown</h3>
            <img id="detail-poke-gif" src="" alt="pokemon gif">

            <div id="detail-type-container">
                <!-- Enter types here! -->
            </div>

            <div class="detail-content">
                <div class="detail-info">
                    <div class="detail-info-line">
                        <span>name: </span>
                        <span id="detail-info-name" class="detail-span">name unknown</span>
                    </div>
                    <div class="detail-info-line">
                        <span>height: </span>
                        <span id="detail-info-height" class="detail-span">height unknown</span>
                    </div>
                    <div class="detail-info-line">
                        <span>weight: </span>
                        <span id="detail-info-weight" class="detail-span">weight unknown</span>
                    </div>
                </div>
                <div id="poke-stat-container" class="detail-stats">
                    <!-- Enter Stats here -->
                </div>
            </div>

            <div class="detail-btn-container">
                <button id="detail-btn-backward" type="button" class="detail-btn">
                    <img id="detail-btn-backward-img" src="./assets/icons/arrow-left.png" alt="">
                </button>

                <button id="detail-btn-forward" type="button" class="detail-btn">
                    <img id="detail-btn-forward-img" src="./assets/icons/arrow-right.png" alt="">
                    <!-- #region Spinner -->
                        <div id="loader-small-detail-container">
                            <div class="lds-dual-ring-small-detail"></div>
                        </div>
                    <!-- #endregion Spinner -->
                </button>
            </div>
            
        `;
    }

    /**
     * Returns html template for adding a type icon element to poke card.
     * 
     * @param {Pokemon.types.type} type of pokemon
     * @returns 
     */
    static getPokeTypeIcon(type) {
        return /*html*/`
            <img src="${type.imgSrc}" alt="" class="detail-type-icon">
        `;
    }

    /**
     * Returns html template for adding a type element to legend.
     * 
     * @param {Pokemon.types.type} type of pokemon
     * @returns 
     */
    static getLegendType(type) {
        return /*html*/`
            <img src="${type.imgSrc}" class="type-icon" alt="">
            <span>${type.name}</span>
        `;
    }

    /**
     * Returns html template for adding a stat element.
     * 
     * @param {Object(Pokemon.stats.stat)} stat of pokemon
     * @param {number} id of pokemon
     * @returns 
     */
    static getPokeStat(stat, id) {
        return /*html*/`
            <div class="poke-xp" role="progressbar">
                <label for="${stat.name + "_" + id + "_bar"}">${stat.name}: ${stat.value}</label>
                <div id="${stat.name + "_" + id + "_bar"}" class="progress-bar" style="width: ${stat.value}%"></div>
            </div>
        `
    }

}