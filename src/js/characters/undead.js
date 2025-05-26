import Character from '../Character.js';

export default class Undead extends Character {
    constructor(level) {
        if (level < 1 || level > 4) {
            throw new RangeError('Уровень должен быть между 1 и 4 включительно');
          }
        super(level);
        this.attack = 40;
        this.defence = 10;
        this.type = 'Undead';
    }
}

const x = new Undead(2);
console.log(x);