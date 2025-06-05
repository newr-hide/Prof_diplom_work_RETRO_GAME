import levelThemes from "./themes.js";
import GamePlay from "./GamePlay.js";
import GameState from "./GameState.js";
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
    this.gameState = new GameState();
    this.allPositionedChars = [];
  }

  init() {
    // Генерация команд
    const playerChars = generateTeam(playerTypes, 1, 4).members; 
    const enemyChars = generateTeam(enemyTypes, 1, 4).members;

    // Инициализация игрового поля
    this.playField = new GamePlay();
    this.playField.bindToDOM(document.querySelector('#game-container'));
    this.playField.drawUi(levelThemes[this.gameState.level - 1]);

    // Позиционирование персонажей
    const playerPositionedChars = playerChars.map((char) => {
      const position = getUniqueRandomPosition(PLAYER_COLUMNS);
      return new PositionedCharacter(char, position);
    });
    const enemyPositionedChars = enemyChars.map((char) => {
      const position = getUniqueRandomPosition(ENEMY_COLUMNS);
      return new PositionedCharacter(char, position);
    });

    // Объединяем всех персонажей
    this.allPositionedChars = [...playerPositionedChars, ...enemyPositionedChars];

    // Рисуем персонажей на игровом поле
    this.playField.redrawPositions(this.allPositionedChars);

    // Подписываем на события
    this.playField.addCellEnterListener(this.onCellEnter.bind(this));
    this.playField.addCellLeaveListener(this.onCellLeave.bind(this));
  }

  // Обработчик наведения на клетку
  onCellEnter(index) {
    // console.log(index)
    const character = this.allPositionedChars.find(char => char.position === index);
    
    if (character && character.character) {
      
    const hero = character.character;
    const infoString = `\u{1F396}${hero.level}\u{2694}${hero.attack}\u{1F6E1}${hero.defence}\u{2764}${hero.health}`;
    // console.log(infoString)
    
    this.playField.showCellTooltip(infoString, index);
    
  };}

  onCellLeave(index) {
    this.playField.hideCellTooltip(index);
  }
}

