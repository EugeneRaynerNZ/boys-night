import Game from '../../models/GameModel';
import GolfIcon from '../../assets/golf.png';
import PoolIcon from '../../assets/pool.png';

export default class GameLoader {

    //a list of games that are loaded
    games = [];

    // use singleton pattern to ensure only one instance of the class is created
    static instance = null;
    static getInstance() {
        if (GameLoader.instance === null) {
            GameLoader.instance = new GameLoader();
        }
        return GameLoader.instance;
    }

    createDefaultGames() {
        this.games = [];
        //new game
        const golf = new Game("Golf");
        golf.logo = GolfIcon;
        golf.description = "Golf scorecard";
        this.games.push(golf);

        //new game
        const pool = new Game("Pool");
        pool.logo = PoolIcon;
        pool.description = "Pool scorecard";
        this.games.push(pool);

        /**
        *   add new games here
        **/
    }

    getAllGames() {
        return this.games;
    }   

    addGame(game) {
        this.games.push(game);
    }

    getGameByName(name) {
        return this.games.find(g => g.name === name);
    }

    getGameById(id) {
        return this.games.find(g => g.id === id);
    }
}