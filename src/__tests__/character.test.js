import Character from "../js/Character.js";
import Swordsman from "../js/characters/swordsman.js";

describe('class Character', () => {
  
    it('Throws an error when initializing the instance directly.', () => {
      const errorMessage = 'Нельзя создавать экземпляры классов напрямую';
      try {
        new Character();
      } catch(e) {
        expect(e.message).toEqual(errorMessage);
      }
    });
  
    describe('class Swordsman', () => {
      it('Создает объект класса без ошибок', () => {
        const swordsmanInstance = new Swordsman(1, 'swordsman');
        expect(swordsmanInstance instanceof Swordsman).toBe.true;
        expect(() => new Swordsman()).not.toThrow();
      });
    });
  });