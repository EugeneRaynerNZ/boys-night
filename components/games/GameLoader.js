import Game from '../../models/GameModel';

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
        const golf9 = new Game("9 Hole");
        golf9.description = "Golf scorecard";
        this.games.push(golf9);

        //new game
        const golf18 = new Game("18 Hole");
        golf18.description = "Golf scorecard";
        this.games.push(golf18);

        //new game
        const pool = new Game("Pool");
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