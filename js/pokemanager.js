import { Database } from "./database";

export class PokeManager{

    
    static currentPokemons = [];

    



    /**
     * Renders current pokemons. 
     */
    static async renderPokemon() {

        PokeManager.loadSpinner ();
        if (Database.currentPokemons == null) {
            Database.getPokemon
        }


        PokeManager.unloadSpinner();
    }


    static loadSpinner() {

    }

    static unloadSpinner() {

    }
}

