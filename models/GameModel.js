export default class Game{

    logo;
    description;

    constructor(id, name, defaultScore){
        this.id = id;
        this.name = name;
        this.defaultScore = defaultScore;
    }

    winGame(){
        console.log("You won the game");
        return this.defaultScore;
    }

    loseGame(){
        console.log("You lost the game");
        return 0;
    }
}