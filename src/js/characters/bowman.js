import Character from "../Character.js";

export default class Bowman extends Character {
    constructor(level) {
        if (level < 1 || level > 4) {
            throw new RangeError('Уровень должен быть между 1 и 4 включительно');
          }
        super(level);
        this.attack = 25;
        this.defence = 25;
        this.type = 'bowman';
        this.maxSteps = 2;
        this.attackRange = 2;
    }
}

// const x = new Bowman(3);
// console.log(x);