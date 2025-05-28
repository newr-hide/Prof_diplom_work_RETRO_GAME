/**
 * Класс, представляющий персонажей команды
 *
 * @todo Самостоятельно продумайте хранение персонажей в классе
 * Например
 * @example
 * ```js
 * const characters = [new Swordsman(2), new Bowman(1)]
 * const team = new Team(characters);
 *
 * team.characters // [swordsman, bowman]
 * ```
 * */
export default class Team {
  constructor() {
    this.members = [];
  }

  add(character) {
    this.members.push(character);
  }

  getAll() {
    return [...this.members];
  }

  size() {
    return this.members.length;
  }
}

