import { v4 as uuidv4 } from 'uuid';
import Storage, {GAME_SESSIONS} from '../utils/Storage';

export default class GameSession {

    constructor(game, players){
        this.id = uuidv4(); 
        this.gameId = game.id;
        this.gameName = game.name;
        this.playerScore = new Map();   //use to store each player's score
        this.startTime = new Date();
        this.endTime = null;

        //initialize player's score
        players.forEach(player => {
            this.playerScore.set(player.id, {
                playerName: player.name,
                score:[]});
        });
    }

    //add a player's score for a round
    addPlayerScore(playerId, score){
        if(!this.playerScore.has(playerId)){
            this.playerScore.set(playerId, {
                playerName: player.name,
                score:[]
            });
        }
        this.playerScore.get(playerId).score.push(score);
    }

    getAllScores(){
        return this.playerScore;
    }

    //get the sum of all scores for a player
    getPlayerTotalScore(playerId){
        let total = 0;
        this.playerScore.get(playerId).score.forEach(score => {
            total += score;
        });
        return total;
    }

    //end the game session
    endGameSession(){
        this.endTime = new Date();
        //save this game session id to the players
        // this.players.forEach(player => {
            // player.addGameSession(this.id);
        // });

        //save this game session to AsyncStorage
        // Storage.addData(GAME_SESSIONS, this);
    }
    
}
