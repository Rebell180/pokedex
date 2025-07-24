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
        
        `;
    }

    static getLegendType(type) {
        return /*html*/`
            <img src="${type.imgSrc}" class="type-icon" alt="">
            <span>${type.name}</span>
        `;
    }

}