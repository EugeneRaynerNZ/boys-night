export default class Player {

    constructor(name) {
        this.name = name;
        this.gameSessions = new Map(); //key is the game name and value is the game session
    }
    
    //add a game session to the player
    addGameSession(gameSession){
        const gameName = gameSession.gameName;
        if(!this.gameSessions.has(gameName)){
            this.gameSessions.set(gameName, []);
        }
        this.gameSessions.get(gameName).push(gameSession);
    }

    //get all game sessions of a specific game for the player
    getGameSessions(gameName){
        return this.gameSessions.get(gameName);
    }

}