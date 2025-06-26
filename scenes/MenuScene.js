class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.image('monitorFondo', 'public/assets/MenuIntermedio/MonitorFondo.png');
    this.load.image('iconoTrabajo', 'public/assets/MenuIntermedio/IconoTrabajo.png');
    this.load.image('iconoNave', 'public/assets/MenuIntermedio/IconoNave.png');
  }

  create() {
    //this.add.image(640, 350, 'monitorFondo');

    /* Mostrar puntos y aburrimiento actuales
    const puntos = this.registry.get('puntos') ?? 0;
    const aburrimiento = this.registry.get('aburrimiento') ?? 0;

    this.add.text(20, 20, `Puntos: ${puntos}`, {
      fontSize: '24px',
      fill: '#006400',
      fontFamily: 'Arial',
    });

    this.add.text(20, 50, `Aburrimiento: ${aburrimiento}%`, {
      fontSize: '24px',
      fill: '#ff0000',
        fontFamily: 'Arial',
    });*/

    // Iconos de minijuegos
    this.iconos = [
      {
        key: 'iconoTrabajo',
        x: 450,
        y: 300,
        escena: 'TrabajoScene'
      },
      {
        key: 'iconoNave',
        x: 750,
        y: 300,
        escena: 'NaveScene'
      }
    ];

    this.iconosSprites = this.iconos.map(icono => this.add.image(icono.x, icono.y, icono.key));

    // Indicador de selección
    this.indicador = this.add.rectangle(this.iconos[0].x, this.iconos[0].y + 80, 100, 10, 0x00ff00);
    this.seleccionActual = 0;

    // Input de flechas y selección
    this.cursors = this.input.keyboard.createCursorKeys();
    this.teclaZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    this.inputCooldown = 0; // evitar repetir input por frame

this.events.on('jefeObserva', () => {
  const textoJefe = this.add.text(400, 100, '¡El jefe te está observando!', {
    fontSize: '28px',
    color: '#ffffff',
    backgroundColor: '#aa0000',
    fontFamily: 'Arial'
  }).setOrigin(0.5);

  this.input.keyboard.enabled = false;

  this.time.delayedCall(3000, () => {
    textoJefe.destroy();
    this.input.keyboard.enabled = true;
  });
});

const ultima = this.registry.get('ultimoMinijuego');
if (ultima === 'NaveScene') {
  this.seleccionActual = 1;
  this.actualizarIndicador();
} else {
  this.seleccionActual = 0;
  this.actualizarIndicador();
}

  }

  update(time, delta) {
    this.inputCooldown -= delta;

if (this.cursors.left.isDown && this.seleccionActual > 0) {
  this.seleccionActual--;
  this.actualizarIndicador();
  this.inputCooldown = 200;
}

if (this.cursors.right.isDown && this.seleccionActual < this.iconos.length - 1) {
  this.seleccionActual++;
  this.actualizarIndicador();
  this.inputCooldown = 200;
}

if (Phaser.Input.Keyboard.JustDown(this.teclaZ)) {
  const seleccion = this.iconos[this.seleccionActual];
  this.registry.set('ultimoMinijuego', seleccion.escena); // ← muy importante para que recuerde la selección
  this.scene.stop();
  this.scene.launch(seleccion.escena);
}

  }

  actualizarIndicador() {
    this.indicador.x = this.iconos[this.seleccionActual].x;
    this.indicador.y = this.iconos[this.seleccionActual].y + 80;
  }
}

export default MenuScene;
