import Character from '../Character.js';

export default class Magician extends Character {
    constructor(level) {
        if (level < 1 || level > 4) {
            throw new RangeError('Уровень должен быть между 1 и 4 включительно');
          }
        super(level);
        this.attack = 10;
        this.defence = 40;
        this.type = 'magician';
        this.maxSteps = 1;
        this.attackRange = 4;
        
    }

    setAttack(attackValue) {
        this.attack = attackValue;
    }

    getAttack(distance) {
        let attack = this.attack;
        if(distance > 0 && distance <= 5) {
            attack *= (1 - (distance - 1) * 0.1);
            if (this.stoned) {
                attack -= Math.log2(distance) * 5;
            }
        } 
        return Math.max(attack, 0);
    }
}

// const x = new Magician(4);
// console.log(x);