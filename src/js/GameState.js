
export default class GameState {
  constructor(gControler) {
    this.gControler = gControler;
    this.turn = 'Player';
    this.level = 1;
    this.selected = null;
  }
  changeTurn() {
    try {
      if (this.turn === 'Player') {
        this.turn = 'Enemy';                       
      } else {
        this.turn = 'Player';                       
      }
    } catch (err) {
      console.error('Ошибка при смене хода:', err);
    }
  }
  static from(object) {
    
    // TODO: create object
  }
}
