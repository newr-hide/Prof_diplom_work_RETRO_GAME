import { characterGenerator } from "../js/generators.js";
import Bowman from "../js/characters/bowman.js";
import Swordsman from "../js/characters/swordsman.js";
import Magician from "../js/characters/magician.js";

it("Проверяет бесконечный генератор новых персонажей", () => {
    let uniqueCharacters = [];
    const maxIterations = 1000;
    const maxLevel = 4;
    const allowedTypes = [Bowman, Magician, Swordsman]; 
  
    for (let i = 0; i < maxIterations; i++) {
      const generator = characterGenerator(allowedTypes, maxLevel); 
      const nextChar = generator.next().value; 
  
      
      expect(uniqueCharacters.find((char) => char.type === nextChar.type && char.lvl === nextChar.lvl)).toBe.undefined;
      uniqueCharacters.push(nextChar);
  
      
      expect([...allowedTypes.map((cls) => cls.name)]).toContain(nextChar.constructor.name);
  
      
      expect(nextChar.lvl >= 1 && nextChar.lvl <= maxLevel).toBe.true;
    }
  
    console.log(`Успешно пройдено ${uniqueCharacters.length} итераций.`);
  });