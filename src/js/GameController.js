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
// Генерация команд вынес сюда
const playerChars = generateTeam(playerTypes, 1, 4).members; 
const enemyChars = generateTeam(enemyTypes, 1, 4).members;


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
    this.gameState = new GameState(this);
    this.allPositionedChars = [];
    this.highlightedCells = [];
  }

  init() {
    
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
    this.playField.addCellClickListener(this.onCellClick.bind(this));
  }


// Меняем положение персонажа
  moveCharacter(char, newPosition) {
    this.playField.deselectCell(char.position);
    char.position = newPosition;
    this.playField.redrawPositions(this.allPositionedChars);
  }

  // Обработчик наведения на клетку
  onCellEnter(index) {
    // console.log(index)
    const character = this.allPositionedChars.find(char => char.position === index);
    if(character){this.playField.setCursor('pointer');}
    if (this.gameState.selected !== null) {
      const selectedChar = this.allPositionedChars.find(char => char.position === this.gameState.selected);
      const availableMoves = this.getAvailableMoves(selectedChar, this.allPositionedChars);
      const attackableTargets = this.getAttackableTargets(selectedChar, this.allPositionedChars);
      // console.log(this.allPositionedChars)
      if (availableMoves.includes(index)) {
        this.playField.setCursor('pointer');
        this.playField.selectCell(index, 'green');
      } else if (attackableTargets.includes(index)) {
        this.playField.setCursor('crosshair');
        this.playField.selectCell(index, 'red');
      } else {
        this.playField.setCursor('not-allowed');
      }
    }
    if (character && character.character) {
      const hero = character.character;
      const infoString = `\u{1F396}${hero.level}\u{2694}${hero.attack}\u{1F6E1}${hero.defence}\u{2764}${hero.health}`;
      this.playField.showCellTooltip(infoString, index);
    };
    }

  onCellLeave(index) {
    this.playField.hideCellTooltip(index);
  
    // Если выбран персонаж, сохраняем его выделение
    if (this.gameState.selected !== null && index === this.gameState.selected ) {

    } else {

      this.playField.deselectCell(index);
    }
  }

  async onAttack(targetIndex) {
    const attacker = this.allPositionedChars.find(char => char.position === this.gameState.selected);
    const target = this.allPositionedChars.find(char => char.position === targetIndex);
    
    if (!target || !attacker) {
      throw new Error('Ошибка: Персонаж или цель не найдены!');
    }

    let damage = Math.max(
      attacker.character.attack - target.character.defence,
      attacker.character.attack * 0.1
    );

    await this.playField.showDamage(targetIndex, damage.toFixed(0));

    target.character.health -= damage;
    this.playField.redrawPositions(this.allPositionedChars);

    
    this.playField.deselectCell(this.gameState.selected);
    
    this.gameState.selected = null;
    
    this.nextTurn();
    // console.log(this.gameState.turn)
  }
    //Атака врага
    async attackComputerTarget() {
      const computerChars = this.allPositionedChars.filter(char =>
        ['daemon', 'undead', 'vampire'].includes(char.character.type)
      );
  
      const playerChars = this.allPositionedChars.filter(char =>
        ['bowman', 'swordsman', 'magician'].includes(char.character.type)
      );
      const randomCompChar = computerChars[Math.floor(Math.random() * computerChars.length)];
      const attackableTargets = this.getEnemyAttackableTargets(randomCompChar, playerChars);

      if (attackableTargets.length > 0) {
        const targetIndex = attackableTargets[0];
        const target = playerChars.find(char => char.position === targetIndex);
  
        let damage = Math.max(
          randomCompChar.character.attack - target.character.defence,
          randomCompChar.character.attack * 0.1
        );
  
      await this.playField.showDamage(targetIndex, damage.toFixed(0));
      target.character.health -= damage;
      this.playField.redrawPositions(this.allPositionedChars);
    } else {
      const closestTarget = this.findClosestTarget(randomCompChar, playerChars);
      if (closestTarget) {
        const bestMove = this.findBestMoveTowardsTarget(randomCompChar, closestTarget);
        if (bestMove) {
          this.moveCharacter(randomCompChar, bestMove);
        }
      }
    }
  
    this.gameState.changeTurn();
  }
    
    findClosestTarget(char, potentialTargets) {
      let minDist = Infinity;
      let closestTarget = null;
  
      for (const target of potentialTargets) {
        const dist = this.calculateDistance(char.position, target.position);
        if (dist < minDist) {
          minDist = dist;
          closestTarget = target;
        }
      }
  
      return closestTarget;
    }
    
    
  // Нахождение лучшего пути к цели
  findBestMoveTowardsTarget(char, target) {
    const possibleMoves = this.getAvailableMoves(char, this.allPositionedChars);
  
    let bestMove = null;
    let minDist = Infinity;
  
    for (const move of possibleMoves) {
      const dist = this.calculateDistance(move, target.position);
      if (dist < minDist) {
        minDist = dist;
        bestMove = move;
      }
    }
  
    return bestMove;
  }
    
  
  onCellClick(cellIndex) {
    const character = this.allPositionedChars.find(char => char.position === cellIndex);
    const playerTypes = ["bowman", "swordsman", "magician"];
    if (!character) {
      if (this.gameState.selected !== null) {
        const selectedChar = this.allPositionedChars.find(char => char.position === this.gameState.selected);
        const availableMoves = this.getAvailableMoves(selectedChar, this.allPositionedChars);
        
        if (availableMoves.includes(cellIndex)) {
          this.moveCharacter(selectedChar, cellIndex);
          
          this.playField.deselectCell(this.gameState.selected);
          this.gameState.selected = null;
          this.nextTurn();
          
          
        } else {
          GamePlay.showError('Невозможно пойти сюда.');
        }
      }
    } else {
      
      if (!playerTypes.includes(character.character.type)&& this.gameState.selected == null) {
        return GamePlay.showError("Нельзя выбрать вражеского персонажа!");
      }

      if (this.gameState.selected !== null) {
        const selectedChar = this.allPositionedChars.find(char => char.position === this.gameState.selected);
        const attackableTargets = this.getAttackableTargets(selectedChar, this.allPositionedChars);
       
        if (attackableTargets.includes(cellIndex)) {
          
          if (this.gameState.turn === 'Player'){
            this.onAttack(cellIndex).then(() => {
              // console.log('Атака прошла успешно');
              this.nextTurn(); 
            }).catch(error => console.error(error.message));
        }} 
          
         else {
          // выбор нового персонажа
          if (playerTypes.includes(character.character.type)){
            this.playField.deselectCell(this.gameState.selected);
          
            this.playField.selectCell(cellIndex);
            this.gameState.selected = cellIndex;}
        }
      } else {
        // Выбор персонажа впервые
        this.playField.selectCell(cellIndex);
        this.gameState.selected = cellIndex;
      }
    }
  }


  getAvailableMoves(char, allCharacters) {
    const moves = [];
    const currentPos = char.position;
    const maxSteps = char.character.maxSteps || 1;
    const boardSize = 8;
  
    // Рассчитываем возможное направление
    function tryAddMove(rowOffset, colOffset) {
      for (let step = 1; step <= maxSteps; step++) {
        const nextRow = Math.floor(currentPos / boardSize) + rowOffset * step;
        const nextCol = currentPos % boardSize + colOffset * step;
        const nextPos = nextRow * boardSize + nextCol;
  
        if (
          nextRow >= 0 &&
          nextRow < boardSize &&
          nextCol >= 0 &&
          nextCol < boardSize &&
          !allCharacters.some(c => c.position === nextPos)
        ) {
          moves.push(nextPos);
        }
      }
    }
  
    // Горизонтально-вверх и вниз
    tryAddMove(-1, 0); // вверх
    tryAddMove(1, 0);  // вниз
  
    // По вертикали влево и вправо
    tryAddMove(0, -1); // влево
    tryAddMove(0, 1);  // вправо
  
    // Диагональные направления
    tryAddMove(-1, -1); // верхний левый угол
    tryAddMove(-1, 1);  // верхний правый угол
    tryAddMove(1, -1);  // нижний левый угол
    tryAddMove(1, 1);   // нижний правый угол
  
    return moves;
  }

  
  // Вычисляет расстояние между двумя позициями
  calculateDistance(pos1, pos2) {
    const xDiff = Math.abs((pos1 % 8) - (pos2 % 8));   // Разница по оси X
    const yDiff = Math.abs(Math.floor(pos1 / 8) - Math.floor(pos2 / 8));  // Разница по оси Y

    // Шахматное расстояние — максимум из разницы координат
    return Math.max(xDiff, yDiff);  
}

  getEnemyAttackableTargets(char, allCharacters) {
    const playerTypes = ["bowman", "swordsman", "magician"];
    const targets = [];          
    const currentPos = char.position;      
    const attackRange = char.character.attackRange || 1;
    // console.log(allCharacters)     

    for (const otherChar of allCharacters) {   
        // Проверка типа врага
        const isEnemy = playerTypes.includes(otherChar.character.type);
        if (isEnemy) {
            // Вычисляем расстояние от текущего персонажа до другого
            const distance = this.calculateDistance(currentPos, otherChar.position);
            
            // Добавляем цель, если находится в радиусе атаки
            if (distance <= attackRange) {
                targets.push(otherChar.position);
            }
        }
    }
    return targets;
  }

  getAttackableTargets(char, allCharacters) {
      const enemyTypes = ['daemon', 'undead', 'vampire'];  // Типы врагов
      const targets = [];          
      const currentPos = char.position;      
      const attackRange = char.character.attackRange || 1;
      // console.log(allCharacters)     

      for (const otherChar of allCharacters) {   
          // Проверка типа врага
          const isEnemy = enemyTypes.includes(otherChar.character.type);
          if (isEnemy) {
              // Вычисляем расстояние от текущего персонажа до другого
              const distance = this.calculateDistance(currentPos, otherChar.position);
              
              // Добавляем цель, если находится в радиусе атаки
              if (distance <= attackRange) {
                  targets.push(otherChar.position);
              }
          }
      }
      return targets;
  }

  nextTurn() {
    if (this.gameState.turn === 'Player') {
      
      this.gameState.changeTurn(); 
      this.attackComputerTarget(); 
    } else if (this.gameState.turn === 'Enemy') {
      this.gameState.changeTurn(); 
      
    }
  }


  
}

