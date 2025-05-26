import Character from '../Character.js';

export default class Swordsman extends Character {
    constructor(level) {
        if (level < 1 || level > 4) {
            throw new RangeError('Уровень должен быть между 1 и 4 включительно');
          }
        super(level);
        this.attack = 10;
        this.defence = 40;
        this.type = 'Swordman';
    }
}

// const x = new Swordsman(4);
// console.log(x);