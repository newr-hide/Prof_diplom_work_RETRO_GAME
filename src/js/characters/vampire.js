import Character from '../Character.js';

export default class Vampire extends Character {
    constructor(level) {
        if (level < 1 || level > 4) {
            throw new RangeError('Уровень должен быть между 1 и 4 включительно');
          }
        super(level);
        this.attack = 25;
        this.defence = 25;
        this.type = 'vampire';
        this.maxSteps = 2;
        this.attackRange = 2;
    }
}

// const x = new Vampire(4);
// console.log(x);
