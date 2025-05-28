
import Swordsman from "../js/characters/swordsman.js";
import Bowman from "../js/characters/bowman.js";
import Magician from "../js/characters/magician.js";
import Daemon from "../js/characters/daemon.js";
import Undead from "../js/characters/undead.js";
import Vampire from "../js/characters/vampire.js";

test('Bowman has correct initial characteristics', () => {
    const bowman = new Bowman();
    expect(bowman.attack).toBe(25);  
    expect(bowman.defence).toBe(25); 
  });
  test('Swordsman has correct initial characteristics', () => {
    const swordsman = new Swordsman();
    expect(swordsman.attack).toBe(40);  
    expect(swordsman.defence).toBe(10); 
  });

  test('Magician has correct initial characteristics', () => {
    const magician = new Magician();
    expect(magician.attack).toBe(10);  
    expect(magician.defence).toBe(40); 
  });

  test('Vampire has correct initial characteristics', () => {
    const vampire = new Vampire();
    expect(vampire.attack).toBe(25);  
    expect(vampire.defence).toBe(25); 
  });

  test('Undead has correct initial characteristics', () => {
    const undead = new Undead();
    expect(undead.attack).toBe(40);  
    expect(undead.defence).toBe(10); 
  });

  test('Daemon has correct initial characteristics', () => {
    const daemon = new Daemon();
    expect(daemon.attack).toBe(10);  
    expect(daemon.defence).toBe(10); 
  });