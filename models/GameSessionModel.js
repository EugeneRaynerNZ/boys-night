import { v4 as uuidv4 } from 'uuid';
import Storage, {GAME_SESSIONS} from '../utils/Storage';

export default class GameSession {

    constructor(game, players){
        this.id = uuidv4(); 
        this.gameId = game.id;
        this.gameName = game.name;
        this.playerScore = new Map();   //use to store each player's score
        this.rounds = new Map();    //use to store all players' score for each round
        this.startTime = new Date();
        this.endTime = null;

        //initialize player's score
        players.forEach(player => {
            this.playerScore.set(player.id, {
                player: player,
                score:[]});
        });
    }

    //add a player's score for a round
    addPlayerScore(playerId, score){
        if(!this.playerScore.has(playerId)){
            this.playerScore.set(playerId, []);
        }
        this.playerScore.get(playerId).score.push(score);
    }

    //get a player's score in a specific round
    getPlayerScore(playerId, round){
        return this.playerScore.get(playerId)[round];
    }

    //get a player's score in all rounds
    getPlayerScores(playerId){
        return this.playerScore.get(playerId);
    }

    //get a player's total score in all rounds
    getPlayerTotalScore(playerId){
        return this.playerScore.get(playerId).reduce((a, b) => a + b, 0);
    }

    //get all players' score in a specific round
    getRoundScores(round){
        const roundScores = new Map();
        this.playerScore.forEach((scores, playerId) => {
            roundScores.set(playerId, scores[round]);
        });
        return roundScores;
    }

    //get all scores of all players in all rounds
    getAllScores(){
        const allScores = new Map();
        this.playerScore.forEach((scores, playerId) => {
            allScores.set(playerId, scores);
        });
        return allScores;
    }

    //end the game session
    endGameSession(){
        this.endTime = new Date();
        //save this game session id to the players
        // this.players.forEach(player => {
        //     player.addGameSession(this);
        // });

        //save this game session to AsyncStorage
        // Storage.setData(GAME_SESSIONS, this);

    }

    
}
