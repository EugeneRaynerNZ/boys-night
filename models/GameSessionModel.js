export default class GameSession {


    constructor(id, gameName, roundsScores){
        this.id = id;   
        this.gameName = gameName;
        this.roundsScores = roundsScores;
        this.startTime = new Date();
        this.endTime = null;
    }


    //calculate the total score of the game session
    getTotalScore(){
        return this.roundsScores.reduce((total, score) => total + score, 0);
    }

    //set the end time of the game session
    setGameOver(){
        this.endTime = new Date();
    }

    //set the score of a specific round
    setRoundScore(round, score){
        if(round >= 0 && round < this.roundsScores.length){
            this.roundsScores[roundIndex] = score;
        }
    }
    
}
