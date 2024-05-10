import { v4 as uuidv4 } from 'uuid';

export default class Game{

    logo;
    description;

    constructor(name){
        this.id = uuidv4();
        this.name = name;
    }
}