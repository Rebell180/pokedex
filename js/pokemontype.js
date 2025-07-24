/**
 * A PokemonType represent the type of pokemons with colors and logos.
 */
export class PokemonType {

    // #region attributes

    name;
    color;
    bg_color;
    imgSrc;

    // #endregion attributes

    constructor (pName) {

        this.name = pName;
        
        this.setStyles();
    }

    // #region methods

    /**
     * Sets the style rules for pokemon type.
     */
    setStyles() {
        switch(this.name) {
            case 'normal': 
                this.color = '#A8A77A';
                this.bg_color = '#A8A77A';
                this.imgSrc = './assets/icons/types/types_normal.png';
                break;
            case 'fire': 
                this.color = '#EE8130';
                this.bg_color = '#EE8130';
                this.imgSrc = './assets/icons/types/types_fire.png';
                break;
            case 'water': 
                this.color = '#6390F0';
                this.bg_color = '#6390F0';
                this.imgSrc = './assets/icons/types/types_water.png';
                break;
            case 'electric': 
                this.color = '#F7D02C';
                this.bg_color = '#F7D02C';
                this.imgSrc = './assets/icons/types/types_electric.png';
                break;
            case 'grass': 
                this.color = '#7AC74C';
                this.bg_color = '#7AC74C';
                this.imgSrc = './assets/icons/types/types_grass.png';
                break;
            case 'ice': 
                this.color = '#96D9D6';
                this.bg_color = '#96D9D6';
                this.imgSrc = './assets/icons/types/types_ice.png';
                break;
            case 'fighting': 
                this.color = '#C22E28';
                this.bg_color = '#C22E28';
                this.imgSrc = './assets/icons/types/types_fighting.png';
                break;
            case 'poison': 
                this.color = '#A33EA1';
                this.bg_color = '#A33EA1';
                this.imgSrc = './assets/icons/types/types_poison.png';
                break;
            case 'ground': 
                this.color = '#E2BF65';
                this.bg_color = '#E2BF65';
                this.imgSrc = './assets/icons/types/types_ground.png';
                break;
            case 'flying': 
                this.color = '#A98FF3';
                this.bg_color = '#A98FF3';
                this.imgSrc = './assets/icons/types/types_flying.png';
                break;
            case 'psychic': 
                this.color = '#F95587';
                this.bg_color = '#F95587';
                this.imgSrc = './assets/icons/types/types_psychic.png';
                break;
            case 'bug': 
                this.color = '#A6B91A';
                this.bg_color = '#A6B91A';
                this.imgSrc = './assets/icons/types/types_bug.png';
                break;
            case 'rock': 
                this.color = '#B6A136';
                this.bg_color = '#B6A136';
                this.imgSrc = './assets/icons/types/types_rock.png';
                break;
            case 'ghost': 
                this.color = '#735797';
                this.bg_color = '#735797';
                this.imgSrc = './assets/icons/types/types_ghost.png';
                break;
            case 'dragon': 
                this.color = '#6F35FC';
                this.bg_color = '#6F35FC';
                this.imgSrc = './assets/icons/types/types_dragon.png';
                break;
            case 'dark': 
                this.color = '#705746';
                this.bg_color = '#705746';
                this.imgSrc = './assets/icons/types/types_dark.png';
                break;
            case 'steel': 
                this.color = '#B7B7CE';
                this.bg_color = '#B7B7CE';
                this.imgSrc = './assets/icons/types/types_steel.png';
                break;
            case 'fairy': 
                this.color = '#D685AD';
                this.bg_color = '#D685AD';
                this.imgSrc = './assets/icons/types/types_fairy.png';
                break;
            case 'stellar': 
                this.color = '#2e375eff';
                this.bg_color = '#2e375eff';
                this.imgSrc = './assets/icons/types/types_stellar.png';
                break;
            case 'unknown': 
                this.color = '#646464ff';
                this.bg_color = '#646464ff';
                this.imgSrc = './assets/icons/types/types_normal.png';
                break;
            default: 
                this.color = '#646464ff';
                this.bg_color = '#646464ff';
                this.imgSrc = './assets/icons/types/types_normal.png';
        }
    }

    // #endregion methods
}