class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
  }

  preload() {
    this.load.image('monitorFondo', 'public/assets/MenuIntermedio/MonitorFondo.png');
    this.load.image('iconoTrabajo', 'public/assets/MenuIntermedio/IconoTrabajo.png');
    this.load.image('iconoNave', 'public/assets/MenuIntermedio/IconoNave.png');
  
    this.load.image('BarraDeTareas' , 'public/assets/Escritorio/barra de tareas.png');
  
    this.load.spritesheet('ICONO_TRABAJO', 'public/assets/Escritorio/icono trabajo.png', { frameWidth: 185, frameHeight: 185 });
    this.load.spritesheet('ICONO_NAVE', 'public/assets/Escritorio/icono nave.png', { frameWidth: 180, frameHeight: 180 });
  }

  create() {
this.add.rectangle(640, 360, 1280, 720, 0x008080).setAlpha(1);

this.add.image(640, 468, 'BarraDeTareas').setOrigin(0.5).setScale(0.88, 1);

    //crear animaciones de los iconos
    this.anims.create({
      key: 'icono_trabajo_anim',
      frames: this.anims.generateFrameNumbers('ICONO_TRABAJO', { start: 0, end: 14 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'icono_nave_anim',
      frames: this.anims.generateFrameNumbers('ICONO_NAVE', { start: 0, end: 14 }),
      frameRate: 10,
      repeat: -1
    });

// Iconos de minijuegos
    this.iconos = [
      {
        key: 'ICONO_TRABAJO',
        x: 530,
        y: 280,
        escena: 'TrabajoScene',
        anim: 'icono_trabajo_anim',
        offsetIndicador: 90
      },
      {
        key: 'ICONO_NAVE',
        x: 750,
        y: 275,
        escena: 'NaveScene',
        anim: 'icono_nave_anim',
        offsetIndicador: 95
      }
    ];

// Crear sprites con animaciones
this.iconosSprites = this.iconos.map(icono => {
  return this.add.sprite(icono.x, icono.y, icono.key)
             .play(icono.anim);
});
    // Indicador de selección
    this.indicador = this.add.rectangle(this.iconos[0].x, this.iconos[0].y + 80, 100, 10, 0x000080);
    this.seleccionActual = 0;

    // Input de flechas y selección
    this.cursors = this.input.keyboard.createCursorKeys();
    this.teclaZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);

    this.inputCooldown = 0; // evitar repetir input por frame

this.events.on('jefeObserva', () => {
  const textoJefe = this.add.text(400, 100, '', {
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
  this.sound.play('CLICK', { volume: 0.5 })
  this.scene.stop();
  this.scene.launch(seleccion.escena);
}

  }

actualizarIndicador() {
  const icono = this.iconos[this.seleccionActual];
  this.indicador.setPosition(icono.x, icono.y + icono.offsetIndicador);
}
}

export default MenuScene;
