import Character from "./Character.js";
import Bowman from "./characters/bowman.js";
import Swordsman from "./characters/swordsman.js";
import Magician from "./characters/magician.js";
import Team from "./Team.js";
/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  while(true) {
    const randomCharacters = Math.floor(Math.random() * allowedTypes.length);
    const CharClasses = allowedTypes[randomCharacters];

    const randomLvl = Math.floor(Math.random() * maxLevel) + 1;

    yield new CharClasses(randomLvl);
  }
}

// const playerTypes = [Bowman, Swordsman, Magician]; 
// const playerGenerator = characterGenerator(playerTypes, 2); 

// const character1 = playerGenerator.next().value; 
// character1.type; 
// character1.attack; 
// character1.level; 

// console.log(character1)
/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  
  const generator = characterGenerator(allowedTypes, maxLevel);
  const team = new Team();
  for (let i = 0; i < characterCount; i++) {
    const character = generator.next().value;
    team.add(character);
  }

  return team;
}
// const party = [Bowman, Swordsman, Magician]
// const x = generateTeam(party, 1 , 5)
// console.log(x)