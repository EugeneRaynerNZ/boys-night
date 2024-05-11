import Storage, {GAMES} from '../../utils/Storage';
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
    }

    async loadGames() {
        //load games from AsyncStorage
        const savedGames = await Storage.getData(GAMES);
        if (savedGames == null) {
            //if no games are saved, create default games
            this.createDefaultGames();
            //save the default games
            await Storage.setData(GAMES, this.games);
        }else{
            this.games = savedGames;
        }
    }

    async reloadGames() {
        //clear all games
        this.games = [];
        //load games from AsyncStorage
        await this.loadGames();
    }

    addGame(game) {
        this.games.push(game);
        Storage.setData(GAMES, this.games);
    }

    getGameByName(name) {
        return this.games.find(g => g.name === name);
    }

    getGameById(id) {
        return this.games.find(g => g.id === id);
    }
}