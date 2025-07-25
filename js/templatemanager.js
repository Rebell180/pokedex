import { PokeManager } from "./pokemanager.js";
export class TemplateManager {

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
                <div class="detail-stats">
                    
                </div>
            </div>

            <div class="detail-btn-container">
                <button id="detail-btn-backward" type="button" class="detail-btn">
                    <img id="detail-btn-backward-img" src="./assets/icons/arrow-left.png" alt="">
                </button>
                <button id="detail-btn-forward" type="button" class="detail-btn">
                    <img src="./assets/icons/arrow-right.png" alt="">
                </button>
            </div>
            
        `;
    }

    static getPokeTypeIcon(type) {
        return /*html*/`
            <img src="${type.imgSrc}" alt="" class="detail-type-icon">
        `;
    }

    static getLegendType(type) {
        return /*html*/`
            <img src="${type.imgSrc}" class="type-icon" alt="">
            <span>${type.name}</span>
        `;
    }

}