import Character from './Character.js';
import Bowman from './characters/bowman.js';
export default class PositionedCharacter {
  constructor(character, position) {
    if (!(character instanceof Character)) {
      throw new Error('character must be instance of Character or its children');
    }

    if (typeof position !== 'number') {
      throw new Error('position must be a number');
    }

    this.character = character;
    this.position = position;
  }
}


// const character = new Bowman(2);
// const position = 8; 
// const positionedCharacter = new PositionedCharacter(character, position); 