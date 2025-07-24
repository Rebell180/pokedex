
import { PokeManager } from "./pokemanager.js";

/**
 * Initial function to load the page.
 */
async function init() {
    await PokeManager.render();
}

init();