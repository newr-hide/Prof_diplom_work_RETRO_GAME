
export default class GameState {
  constructor(gControler) {
    this.gControler = gControler;
    this.turn = 'Player';
    this.level = 1;
    this.selected = null;
  }
  changeTurn() {
    if (this.turn === 'Player') {
      this.turn = 'Enemy';
    } else {
      this.turn = 'Player';
    }
  }
  static from(object) {
    
    // TODO: create object
  }
}
