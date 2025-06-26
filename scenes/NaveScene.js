class NaveScene extends Phaser.Scene {
  constructor() {
    super('NaveScene');
  }

  preload() {
    this.load.image('bala', 'public/assets/balita.png'); // asegurate que existe
  }

create() {
  this.cerebro = this.scene.get('CerebroScene');

  
  // variables del cooldown del disparo
  this.ultimoDisparo = 0;
  this.cooldownDisparo = 600; // milisegundos


  // Obtener aburrimiento y puntos
  this.aburrimiento = this.cerebro.estado.aburrimiento || 0;
  this.puntos = this.cerebro.estado.puntos || 0;


  // Nave
  this.nave = this.add.triangle(400, 550, 0, 40, 20, 0, 40, 40, 0x00ffff);
  this.physics.add.existing(this.nave);
  this.nave.body.setCollideWorldBounds(true);
  this.nave.body.setImmovable(true);
  this.nave.body.allowGravity = false;

  // Grupo de proyectiles
  this.proyectiles = this.physics.add.group();

  // Limpiar enemigos anteriores si existen


  // Crear container y grupo nuevos
  this.enemigosContainer = this.add.container(0, 0);
  this.enemigos = this.physics.add.group();

  // Crear enemigos y agregarlos al grupo y al container
  for (let fila = 0; fila < 3; fila++) {
    for (let i = 0; i < 6; i++) {
      const x = 100 + i * 100;
      const y = 100 + fila * 60;
      const enemigo = this.add.rectangle(x, y, 40, 40, 0xff0000);
      this.physics.add.existing(enemigo);
      enemigo.body.setImmovable(true);
      enemigo.body.allowGravity = false;

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
  const textoGameOver = this.add.text(400, 300, '¡El jefe te encontró jugando!\nPerdiste.', {
    fontSize: '32px',
    color: '#ffffff',
    backgroundColor: '#000000',
    align: 'center',
    fontFamily: 'Arial'
  }).setOrigin(0.5);

  this.physics.pause();
  this.input.keyboard.enabled = false;

  this.time.delayedCall(3000, () => {
    this.scene.start('TrabajoScene'); // o podés crear una escena "GameOver"
  });
});

}


 
// Tween para mover el container de enemigos de izquierda a derecha y volver
/*moverEnemigos() {
  this.tweens.add({
    targets: this.enemigosContainer,
    x: 200,
    duration: 2000,
    ease: 'Linear',
    yoyo: true,
    repeat: -1
  });
}*/

  shootBullet() {
    const bullet = this.proyectiles.create(this.nave.x, this.nave.y - 20, 'bala');
    bullet.setVelocityY(-500);
    bullet.setCollideWorldBounds(false);
    bullet.outOfBoundsKill = true;
    bullet.body.allowGravity = false;
    
  }

  destruirEnemigo(bala, enemigo) {
    bala.destroy();
    enemigo.destroy();

    const cerebro = this.scene.get('CerebroScene');
    cerebro.events.emit('subirAburrimiento', -cerebro.aburrimientoNave);
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

    this.enemigos.getChildren().forEach(enemigo => {
    enemigo.body.x = enemigo.x + this.enemigosContainer.x - enemigo.width / 2;
    enemigo.body.y = enemigo.y + this.enemigosContainer.y - enemigo.height / 2;
  });
this.proyectiles.getChildren().forEach((bala) => {
  if (bala.y <= 1) {
    bala.destroy();
  }
});


  }
}

export default NaveScene;
