import CerebroScene from "./scenes/CerebroScene.js";
import MenuScene from "./scenes/MenuScene.js";
import NaveScene from "./scenes/NaveScene.js";
import TrabajoScene from "./scenes/TrabajoScene.js";
import MenuPrincipalScene from './scenes/MenuPrincipalScene.js';
import PreloadScene from "./scenes/PreloadScene.js";

// Create a new Phaser config object
const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 800,
      height: 600,
    },
    max: {
      width: 1600,
      height: 1200,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  // List of scenes to load
  // Only the first scene will be shown
  // Remember to import the scene before adding it to the list
  scene: [PreloadScene, CerebroScene, MenuPrincipalScene, MenuScene, TrabajoScene, NaveScene],
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);
