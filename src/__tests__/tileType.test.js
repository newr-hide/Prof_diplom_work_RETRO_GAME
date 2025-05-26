import calcTileType  from "../js/utils.js";

describe('calcTileType', () => {
    test('Клетка верхнего левого "top-left"', () => {
      expect(calcTileType(0, 8)).toBe('top-left');
    });
    test('Клетка верхнего правого угла "top-right"', () => {
      expect(calcTileType(7, 8)).toBe('top-right');
    });
    test('Клетка нижнего левого угла "bottom-left"', () => {
      expect(calcTileType(56, 8)).toBe('bottom-left');
    });
    test('Клетка нижнего правого угла "bottom-right"', () => {
      expect(calcTileType(63, 8)).toBe('bottom-right');
    });
    test('Клетка верхней стороны"top"', () => {
      expect(calcTileType(3, 8)).toBe('top'); 
    });
    test('Клетка нижней стороны"bottom"', () => {
      expect(calcTileType(60, 8)).toBe('bottom'); 
    });
    test('Клетка левой стороны"left"', () => {
      expect(calcTileType(8, 8)).toBe('left'); 
    });
    test('Клетка правой стороны"right"', () => {
      expect(calcTileType(15, 8)).toBe('right'); 
    });
    test('Центральная клетка"center"', () => {
      expect(calcTileType(35, 8)).toBe('center'); 
    });
  });