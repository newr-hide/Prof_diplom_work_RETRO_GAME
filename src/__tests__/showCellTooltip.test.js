import GamePlay from "../js/GamePlay.js";

describe('Test suite for the method showCellTooltip in GamePlay', () => {
    let gamePlayInstance;
  
    beforeEach(() => {
      
      gamePlayInstance = new GamePlay();
  
      gamePlayInstance.cells = [
        { title: '', position: 0 },
        { title: '', position: 1 },
        { title: '', position: 2 },
      ];
    });
  
    it('should set tooltip text correctly', () => {
      const hero = { level: 10, attack: 20, defense: 30, health: 100 };
      const infoString = `🏖️${hero.level}🗡${hero.attack}⚒${hero.defense}❤️${hero.health}`;

      gamePlayInstance.showCellTooltip(infoString, 0);
      expect(gamePlayInstance.cells[0].title).toBe(infoString);
    });
  
    it('should overwrite existing tooltip', () => {
      const firstHero = { level: 10, attack: 20, defense: 30, health: 100 };
      const secondHero = { level: 5, attack: 15, defense: 25, health: 80 };
  
      const firstInfoString = `🏖️${firstHero.level}🗡${firstHero.attack}⚒${firstHero.defense}❤️${firstHero.health}`;
      const secondInfoString = `🏖️${secondHero.level}🗡${secondHero.attack}⚒${secondHero.defense}❤️${secondHero.health}`;
  
      gamePlayInstance.showCellTooltip(firstInfoString, 0);
      gamePlayInstance.showCellTooltip(secondInfoString, 0);
  
      expect(gamePlayInstance.cells[0].title).toBe(secondInfoString);
    });
  
  });