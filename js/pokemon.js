import { PokemonType } from "./pokemontype.js";

/**
 * 
 */
export class Pokemon {

    // #region attributes

    id;
    name;
    imgSrc;
    types = [];
    stats = [];
    weight;
    height;

    // #endregion attributes

    constructor ({pId, pName, pImgSrc, pTypes = {}, pStats = {}, pWeight, pHeight}={}) {
        this.id = pId;
        this.name = pName;
        this.imgSrc = pImgSrc;
        this.types = this.formatTypes(pTypes);
        this.stats = this.formatStats(pStats);
        this.weight = this.formatUnit(pWeight);
        this.height = this.formatUnit(pHeight);

    }

    // #region methods

    formatTypes(pTypes) {
        const tempTypes = [];

        for(let i = 0; i < pTypes.length; i++){
            tempTypes.push(new PokemonType(pTypes[i].type.name));
        }
        return tempTypes;
    }

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

    formatUnit(unit) {
        return unit.replace('.', ',');
    }

    // endregion methods
}