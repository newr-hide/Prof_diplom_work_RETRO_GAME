import GameController from '../js/GameController.js';

test('should find no targets when there are none in range', () => {
    let controller = new GameController();
    // Персонаж
    const character = {
      character: {
        attack: 40,
        attackRange: 1,
        defence: 10,
        health: 50,
        level: 1,
        maxSteps: 4,
        type: 'swordsman'
      },
      position: 25
    };
    // Противники
    const enemies = [
      {
        character: {
          attack: 40,
          attackRange: 1,
          defence: 10,
          health: 50,
          level: 1,
          maxSteps: 4,
          type: 'daemon'
        },
        position: 45
      },
      {
        character: {
          attack: 40,
          attackRange: 1,
          defence: 10,
          health: 50,
          level: 1,
          maxSteps: 4,
          type: 'vampire'
        },
        position: 55
      }
    ];
  
    const result = controller.getAttackableTargets(character, enemies);
    expect(result.length).toBe(0);
  });