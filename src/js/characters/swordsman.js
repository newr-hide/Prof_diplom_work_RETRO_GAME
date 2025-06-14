import Character from '../Character.js';

export default class Swordsman extends Character {
    constructor(level) {
        if (level < 1 || level > 4) {
            throw new RangeError('Уровень должен быть между 1 и 4 включительно');
          }
        super(level);
        this.attack = 40;
        this.defence = 10;
        this.type = 'swordsman';
        this.maxSteps = 4;
        this.attackRange = 1;
    }
}

// const x = new Swordsman(4);
// console.log(x);