import Character from '../Character.js';

export default class Daemon extends Character {
    constructor(level) {
        if (level < 1 || level > 4) {
            throw new RangeError('Уровень должен быть между 1 и 4 включительно');
          }
        super(level);
        this.attack = 10;
        this.defence = 10;
        this.type = 'daemon';
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

// const x = new Daemon(1);
// console.log(x);