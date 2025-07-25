import { Pokemon } from "./pokemon.js";
import { PokemonType } from "./pokemontype.js";

export class Database {

    // #region attributes

    static startCount = 1;
    static endCount = 20; 
    static amountPerLoad = 20;

    static loadedPokemnons = [];
    static loadedTypes = [];

    // #endregion attributes


    // #region methods

    static async loadLegendData() {
        try {
            const response = await fetch('https://pokeapi.co/api/v2/type');
            const result = await response.json();

            for(let i = 0; i < result.results.length; i++) {
                const tempType= result.results[i];

                const newType = new PokemonType(tempType.name);
                this.loadedTypes.push(newType);
            }
        }
        catch (error) {
            console.log('Types nicht geladen' + error);
        }
    }

    static async loadNextPokemonData() {

        for(let i = Database.startCount; i <= Database.endCount; i++) {

            let result;

            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon/'+ i);
                result = await response.json();
            }
            catch (error) {
                console.log('Das Pokemon konnte leider nicht geladen werden.' + error)
            }

            const pokemon = new Pokemon({
                pId : result.id,
                pName : result.name,
                pImgSrc : result.sprites.front_default,
                pGifSrc: result.sprites.other.showdown.front_default,
                pTypes : result.types,
                pStats : result.stats,
                pWeight : result.weight / 10 + ' kg',
                pHeight : result.height / 10 + " m"
            });

            Database.loadedPokemnons.push(pokemon);
        }

        Database.startCount = Database.startCount + Database.amountPerLoad;
        Database.endCount = Database.endCount + Database.amountPerLoad;
    }

    // #endregion methods





}