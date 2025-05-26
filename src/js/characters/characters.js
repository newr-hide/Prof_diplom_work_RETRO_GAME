export default class Character {
    constructor (name, type, attack, defence) {
        if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
            throw new Error('invalid name lenght');
        }
        const typeValid = ['Bowman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
        if (!typeValid.includes(type)) {
            throw new Error('Invalid type');
        }

        this.name = name;
        this.type = type;
        this.health = 100;
        this.level = 1;
        this.attack = attack;
        this.defence = defence;
        this.stoned = false;
    }
    levelUp () {
        if (this.health <= 0) {
            throw new Error("Нельзя повысить уровень мёртвого персонажа.");
        }
        this.level ++;
        this.attack *= 1.2;
        this.defence *= 1.2;
        this.health = 100;

        return this;
    }
    damage(points) {
        if (this.health >= 0) {
            this.health -= points * (1 - this.defence / 100);
        } 
    }
}