import { v4 as uuidv4 } from 'uuid';
import Storage, {GAME_SESSIONS} from '../utils/Storage';

export default class GameSession {

    constructor(game, players){
        this.id = uuidv4(); 
        this.gameId = game.id;
        this.gameName = game.name;
        // this.playerScore = new Map();   //use to store each player's score
        this.playerScore =[];   //use to store each player's score
        this.startTime = new Date();
        this.endTime = null;

        //initialize player's score
        // players.forEach(player => {
        //     this.playerScore.set(player.id, {
        //         playerName: player.name,
        //         score:[]});
        // });

        //initialize player's score
        players.forEach(player => {
            this.playerScore.push({
                playerId: player.id,
                playerName: player.name,
                score:[]});
        });
    }

    //add a player's score for a round
    addPlayerScore(playerId, score){
        let player = this.playerScore.find(player => player.playerId === playerId);
        player.score.push(score);
    }

    getAllScores(){
        return this.playerScore;
    }

    //get player's score by playerId
    getPlayerScore(playerId){
        let player = this.playerScore.find(player => player.playerId === playerId);
        return player.score;
    }

    //get the sum of all scores for a player
    // getPlayerTotalScore(playerId){
    //     let total = 0;
    //     this.playerScore.get(playerId).score.forEach(score => {
    //         total += score;
    //     });
    //     return total;
    // }

    //get the sum of scores for a player
    getPlayerTotalScore(playerId){
        let total = 0;
        let player = this.playerScore.find(player => player.playerId === playerId);
        player.score.forEach(score => {
            total += score;
        });
        return total;
    }

    //end the game session
    endGameSession(){
        this.endTime = new Date();
        console.log("Game Session Ended: ", this.endTime);
        console.log("Player Scores: ", this.playerScore);
        //save this game session id to the players
        // this.players.forEach(player => {
            // player.addGameSession(this.id);
        // });

        //save this game session to AsyncStorage
        // Storage.addData(GAME_SESSIONS, this);
    }
    
}
