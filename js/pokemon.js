import { PokemonType } from "./pokemontype.js";

/**
 * 
 */
export class Pokemon {

    // #region attributes

    id;
    name;
    imgSrc;
    gifSrc;
    types = [];
    stats = [];
    weight;
    height;

    // #endregion attributes

    constructor ({pId, pName, pImgSrc, pGifSrc, pTypes = {}, pStats = {}, pWeight, pHeight}={}) {
        this.id = pId;
        this.name = pName;
        this.imgSrc = pImgSrc;
        this.gifSrc = pGifSrc;
        this.types = this.formatTypes(pTypes);
        this.stats = this.formatStats(pStats);
        this.weight = this.formatUnit(pWeight);
        this.height = this.formatUnit(pHeight);

    }

    // #region methods

    /**
     * Formatts loaded type data to pokemon type array
     *   
     * @param {Array[PokemonType]} pTypes 
     * @returns pokemon type array
     */
    formatTypes(pTypes) {
        const tempTypes = [];

        for(let i = 0; i < pTypes.length; i++){
            tempTypes.push(new PokemonType(pTypes[i].type.name));
        }
        return tempTypes;
    }

    /**
     * Formatts loaded stats data to pokemon stats array
     *   
     * @param {Array[PokemonType]} pTypes 
     * @returns pokemon stats array
     */
    formatStats(pStats) {
        const tempStats = [];
        for(let i = 0; i < pStats.length; i++){
            let stat = pStats[i];
            tempStats.push({
                name: stat.stat.name,
                value: stat.base_stat
            });
        }
        return tempStats;
    }

    /**
     * Formatts units like weight to right format
     * (replacing "." with ",")
     *   
     * @param {number} unit 
     * @returns formatted unit as string
     */
    formatUnit(unit) {
        return unit.replace('.', ',');
    }

    // endregion methods
}