import { v4 as uuidv4 } from 'uuid';

export default class Game{

    logo;
    description;
    rounds;

    constructor(name){
        this.id = uuidv4();
        this.name = name;
        this.rounds = 1;
    }
}