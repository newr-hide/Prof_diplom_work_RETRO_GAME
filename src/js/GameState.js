export default class GameState {
  constructor() {
    this.turn = 'Player';
    this.level = 1;
    this.selected = null;
  }
  changeTurn() {
    this.turn = this.turn === 'Player' ? 'Enemy' : 'Player';
  }
  static from(object) {
    
    // TODO: create object
  }
}
