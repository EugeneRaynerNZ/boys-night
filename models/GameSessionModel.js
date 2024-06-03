import { v4 as uuidv4 } from 'uuid';

export default class GameSession {

    constructor(game, players){
        this.id = uuidv4(); 
        this.gameId = game.id;
        this.gameName = game.name;
        this.playerScore =[];   //use to store each player's score
        this.startTime = new Date().toISOString();
        this.endTime = null;

        //initialize player's score
        players.forEach(player => {
            this.playerScore.push({
                playerId: player.id,
                playerName: player.name,
                totalScore: 0,
                score:[]});
        });
    }

    //add a player's score for a round
    addPlayerScore(playerId, score){
        let player = this.playerScore.find(player => player.playerId === playerId);
        player.score.push(score);
        player.totalScore += score;
    }

    getAllScores(){
        return this.playerScore;
    }

    //get player's score by playerId
    getPlayerScore(playerId){
        let player = this.playerScore.find(player => player.playerId === playerId);
        return player.score;
    }

    //get the sum of scores for a player
    getPlayerTotalScore(playerId){
        let total = 0;
        let player = this.playerScore.find(player => player.playerId === playerId);
        player.score.forEach(score => {
            total += score;
        });
        return total;
    }

    //get all player's total score
    getAllTotalScore(){
        let totalScores = [];
        this.playerScore.forEach(player => {
            totalScores.push({
                player: player.playerName,
                totalScores: player.totalScore});
        });
        return totalScores;
    }

    // get heightest score
    getHighestScore(){
        let highestScore = this.playerScore[0];
        this.playerScore.forEach(player => {
            if(player.totalScore > highestScore.totalScore){
                highestScore = player;
            }
        });
        return highestScore;
    }
    
    // get lowest score
    getLowestScore(){

        if(this.playerScore.length === 0){
            return null;
        }

        let lowestScore = this.playerScore[0];
        this.playerScore.forEach(player => {
            if(player.totalScore < lowestScore.totalScore){
                lowestScore = player;
            }
        });
        return lowestScore;
    }


    //end the game session
    endGameSession(){
        this.endTime = new Date().toISOString();
        console.log("Game Session Ended: ", this.endTime);
        console.log("Player Scores: ", this.playerScore);
    }
    
}
