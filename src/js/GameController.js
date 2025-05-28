import themes from "./themes.js";
import GamePlay from "./GamePlay.js";
import Character from "./Character.js";
import Bowman from "./characters/bowman.js";
import Swordsman from "./characters/swordsman.js";
import Magician from "./characters/magician.js";
import Team from "./Team.js";
import Daemon from "./characters/daemon.js";
import Undead from "./characters/undead.js";
import Vampire from "./characters/vampire.js";
import { generateTeam } from "./generators.js";
import PositionedCharacter from "./PositionedCharacter.js";
const PLAYER_COLUMNS = [0, 1];
const ENEMY_COLUMNS = [6, 7];
const playerTypes = [Bowman, Swordsman, Magician];
const enemyTypes = [Daemon, Undead, Vampire];
const usedPositions = new Set();
// Функция для расчета уникального места для персонажа
function getUniqueRandomPosition(columns) {
  let position;
  do {
    const row = Math.floor(Math.random() * 8);
    
    const column = columns[Math.floor(Math.random() * columns.length)];
    
    position = row * 8 + column;
  } while (usedPositions.has(position));

  
  usedPositions.add(position);
  return position;
}

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
  }

  init() {
    // Генерация команд
    const playerChars = generateTeam(playerTypes, 1, 4).members; 
    const enemyChars = generateTeam(enemyTypes, 1, 4).members;
    // Выбор пока что случайной темы
    const keys = Object.keys(themes);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];

    // Инициализация игрового поля
    this.playField = new GamePlay();
    this.playField.bindToDOM(document.querySelector('#game-container'));
    this.playField.drawUi(randomKey);
    usedPositions.clear();

    // Расчет для персонажей 
    const playerPositionedChars = playerChars.map((char) => {
      const position = getUniqueRandomPosition(PLAYER_COLUMNS);
      return new PositionedCharacter(char, position);
    });
    const enemyPositionedChars = enemyChars.map((char) => {
      const position = getUniqueRandomPosition(ENEMY_COLUMNS);
      return new PositionedCharacter(char, position);
    });

    // Объединяем всех персонажей
    const allPositionedChars = [...playerPositionedChars, ...enemyPositionedChars];

    // Перерисовываем персонажей на игровом поле
    this.playField.redrawPositions(allPositionedChars);
  }


  onCellClick(index) {
    // TODO: react to click
  }

  onCellEnter(index) {
    // TODO: react to mouse enter
  }

  onCellLeave(index) {
    // TODO: react to mouse leave
  }
}



