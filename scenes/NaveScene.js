class NaveScene extends Phaser.Scene {
  constructor() {
    super('NaveScene');
  }

  preload() {
    this.load.spritesheet('balita', 'public/assets/Nave/balita.png', { frameWidth: 27, frameHeight: 27 })
    this.load.spritesheet('cuadradito', 'public/assets/Nave/cuadradito.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('nave', 'public/assets/Nave/nave.png', { frameWidth: 93, frameHeight: 93 })

   this.load.image('BarraDeTareas', 'public/assets/Escritorio/barra de tareas.png');
    this.load.spritesheet('BORDE_NAVE', 'public/assets/Escritorio/borde ventana nave.png', { frameWidth: 562, frameHeight: 54 });

  }

create() {
  this.cerebro = this.scene.get('CerebroScene');
// ─────────────────────────────────────
// creo animaciones
  this.anims.create({
    key: 'bala_anim',
    frames: this.anims.generateFrameNumbers('balita', { start: 0, end: 12 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cuadradito_anim',
    frames: this.anims.generateFrameNumbers('cuadradito', { start: 0, end: 14 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'nave_anim',
    frames: this.anims.generateFrameNumbers('nave', { start: 0, end: 20 }),
    frameRate: 10,
    repeat: -1
  });
  
  // ─────────────────────────────────────
  // fondo
      //escritorio
    this.add.rectangle(640, 360, 1280, 720, 0x008080).setAlpha(1);

const graphics = this.add.graphics();

    // borde de la ventana animacion
    this.anims.create({
      key: 'borde_nave_anim',
      frames: this.anims.generateFrameNumbers('BORDE_NAVE', { start: 0, end: 27 }),
      frameRate: 10,
      repeat: -1
    });

    // borde de la ventana
    const bordeTrabajo = this.add.sprite(640, 105, 'BORDE_NAVE').setScale(0.92, 0.98);
    bordeTrabajo.play('borde_nave_anim');
    bordeTrabajo.setOrigin(0.5, 0.5);

// ── Contorno gris claro (fondo más grande)
graphics.fillStyle(0xC0C0C0, 1); // Gris claro típico de Win98
graphics.fillRoundedRect(400, 95, 480, 340, 10); // Un poco más grande que el rectángulo blanco

// ── Rectángulo blanco encima
graphics.fillStyle(0x000000, 1);
graphics.fillRoundedRect(405, 100, 470, 330, 8); // El rectángulo original, levemente más chico

this.add.image(640, 468, 'BarraDeTareas').setOrigin(0.5).setScale(0.88, 1);



  // -------------------------------------

  // variables del cooldown del disparo
  this.ultimoDisparo = 0;
  this.cooldownDisparo = 600; // milisegundos


  // Obtener aburrimiento y puntos
  this.aburrimiento = this.cerebro.estado.aburrimiento || 0;
  this.puntos = this.cerebro.estado.puntos || 0;


  // Nave
  this.nave = this.add.sprite(640, 405, 'nave');
  this.nave.play('nave_anim');
  this.nave.setOrigin(0.5, 0.5);
  this.nave.setScale(0.35); // Ajusta el tamaño de la nave
  this.physics.add.existing(this.nave);
  this.nave.body.setCollideWorldBounds(true);
  this.nave.body.setImmovable(true);
  this.nave.body.allowGravity = false;

  // Grupo de proyectiles
  this.proyectiles = this.physics.add.group();

  // Limpiar enemigos anteriores si existen


  //Crear container y grupo nuevos
  this.enemigosContainer = this.add.container(0, 0);
  this.enemigos = this.physics.add.group();


  //Crear enemigos y agregarlos al grupo y al container
  for (let fila = 0; fila < 3; fila++) {
    for (let i = 0; i < 4; i++) {
      const x = 450 + i * 60;
      const y = 145 + fila * 50;
      const enemigo = this.add.sprite(x, y, 'cuadradito');
      enemigo.play('cuadradito_anim');
      enemigo.setScale(0.6); // Ajusta el tamaño del enemigo
      enemigo.setOrigin(0.5, 0.5);
      this.physics.add.existing(enemigo);
      enemigo.body.setImmovable(true);
      enemigo.body.allowGravity = false;
      enemigo.body.setSize(enemigo.displayWidth, enemigo.displayHeight);


      this.enemigosContainer.add(enemigo); // para mover todos juntos
      this.enemigos.add(enemigo); // para colisiones
    }
  }

  // Tween para movimiento
  this.tweens.add({
    targets: this.enemigosContainer,
    x: 200,
    duration: 2000,
    ease: 'Linear',
    yoyo: true,
    repeat: -1,
  });

  // Colisiones
  this.physics.add.overlap(this.proyectiles, this.enemigos, this.destruirEnemigo, null, this);
    

  // Controles
  this.cursors = this.input.keyboard.createCursorKeys();
  this.teclaZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
  this.teclaX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

  this.events.on('jefeDetecta', () => {
 this.scene.get('CerebroScene').mostrarPantallaDerrota(this.scene.get('CerebroScene').puntos);
});

}


 
// Tween para mover el container de enemigos de izquierda a derecha y volver
moverEnemigos() {
  this.tweens.add({
    targets: this.enemigosContainer,
    x: 200,
    duration: 2000,
    ease: 'Linear',
    yoyo: true,
    repeat: -1
  });
}

  shootBullet() {
    const bullet = this.proyectiles.create(this.nave.x, this.nave.y - 20, 'bala');
    bullet.play('bala_anim');
    bullet.setOrigin(0.5, 0.5);
    bullet.setScale(0.5); // Ajusta el tamaño de la bala
    bullet.setVelocityY(-400);
    bullet.setCollideWorldBounds(false);
    bullet.outOfBoundsKill = true;
    bullet.body.allowGravity = false;
    this.sound.play('DISPARO', { volume: 0.3 })
    
  }

  destruirEnemigo(bala, enemigo) {
    bala.destroy();
    enemigo.destroy();

    this.sound.play('EXPLOSION', { volume: 0.2 })

    const cerebro = this.scene.get('CerebroScene');
    cerebro.events.emit('subirAburrimiento', -cerebro.aburrimientoNave);

     if (this.enemigos.countActive(true) === 0) {
    // Reiniciar la escena para resetear todo
    this.scene.restart();
   } 
  }


  update() {
    // Movimiento
    if (this.cursors.left.isDown) {
      this.nave.body.setVelocityX(-300);
    } else if (this.cursors.right.isDown) {
      this.nave.body.setVelocityX(300);
    } else {
      this.nave.body.setVelocityX(0);
    }

    // Limitar movimiento horizontal manualmente
  const limiteIzquierdo = 430;
  const limiteDerecho = 850;

  if (this.nave.x < limiteIzquierdo) {
    this.nave.x = limiteIzquierdo;
  }
  if (this.nave.x > limiteDerecho) {
    this.nave.x = limiteDerecho;
  }


    // Disparo
    if (Phaser.Input.Keyboard.JustDown(this.teclaZ)) {
    const ahora = this.time.now;
    if (ahora - this.ultimoDisparo >= this.cooldownDisparo) {
    this.shootBullet();
    this.ultimoDisparo = ahora;
  }
}

    // ir a menu con X
    if (Phaser.Input.Keyboard.JustDown(this.teclaX)) {
       this.registry.set('ultimoMinijuego', 'NaveScene');
      this.cerebro.estado.puntos = this.puntos;
      this.scene.stop();
      this.scene.launch('MenuScene');
    }

this.proyectiles.getChildren().forEach((bala) => {
  if (bala.y <= 140) {
    bala.destroy();
  }
});


  }
}

export default NaveScene;
