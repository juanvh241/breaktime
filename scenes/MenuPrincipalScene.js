class MenuPrincipalScene extends Phaser.Scene {
  constructor() {
    super('MenuPrincipalScene');
  }


   preload() {

    this.load.spritesheet('LOGO', 'public/assets/Cerebro/logo.png', { frameWidth: 502, frameHeight: 127 });
    this.load.spritesheet('BOTON_PLAY', 'public/assets/Cerebro/boton play.png', { frameWidth: 122, frameHeight: 117 });


    }

  create() {
  // creo animacion del logo
    const framesLogo = this.anims.generateFrameNumbers('LOGO', { start: 0, end: 23 });
  this.anims.create({
  key: 'logo_anim',
  frames: framesLogo,
  frameRate: 10,
  repeat: -1
  });

  this.logo = this.add.sprite(640, 180, 'LOGO')
  .play('logo_anim')
  .setScale(1) // ajustá la escala si hace falta  
  
  
  // crear animacion del boton play
    const framesBotonPlay = this.anims.generateFrameNumbers('BOTON_PLAY', { start: 0, end: 29 });
  this.anims.create({
  key: 'boton_play_anim',
  frames: framesBotonPlay,
  frameRate: 10,
  repeat: -1
  });

      // Botón de jugar (si no tenés imagen, usá un rectángulo)
    const boton = this.add.sprite(640, 320, 'BOTON_PLAY')
      .play('boton_play_anim')
      .setInteractive()
      .setScale(1)
      .setOrigin(0.5);

    // Alternativa: si no tenés imagen del botón todavía
    // const boton = this.add.rectangle(640, 320, 200, 80, 0x00aa00).setInteractive();
    // this.add.text(640, 320, 'JUGAR', { fontSize: '32px', color: '#ffffff' }).setOrigin(0.5);

    boton.on('pointerover', () => {
      boton.setTint(0xffbf00);
    });

    boton.on('pointerout', () => {
      boton.clearTint();
    });

    boton.on('pointerdown', () => {
      //this.sound.play('click', { volume: 0.5 }); // opcional si tenés un sonido
      this.events.emit('empezarJuego'); // avisás a CerebroScene
    });
  
  }

}

export default MenuPrincipalScene;