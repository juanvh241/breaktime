class NaveScene extends Phaser.Scene {
  constructor() {
    super('NaveScene');
  }

  preload() {
    this.load.image('bala', 'public/assets/balita.png'); // asegurate que existe
  }

  create() {
    // Obtener aburrimiento global
    this.aburrimiento = this.registry.get('aburrimiento') ?? 0;

    // Texto del aburrimiento
    this.aburrimientoTexto = this.add.text(20, 20, `Aburrimiento: ${this.aburrimiento}`, {
      fontSize: '20px',
      fill: '#ffffff',
    });

    // Nave (triángulo)
    this.nave = this.add.triangle(400, 550, 0, 40, 20, 0, 40, 40, 0x00ffff);
    this.physics.add.existing(this.nave);
    this.nave.body.setCollideWorldBounds(true);
    this.nave.body.setImmovable(true);
    this.nave.body.allowGravity = false;

    // Grupo de proyectiles
    this.proyectiles = this.physics.add.group();

    // Grupo de enemigos (3 filas × 6 enemigos)
    this.enemigos = this.physics.add.group();
    for (let fila = 0; fila < 3; fila++) {
      for (let i = 0; i < 6; i++) {
        const x = 100 + i * 100;
        const y = 100 + fila * 60;
        const enemigo = this.add.rectangle(x, y, 40, 40, 0xff0000);
        this.physics.add.existing(enemigo);
        enemigo.body.setImmovable(true);
        enemigo.body.allowGravity = false;
        this.enemigos.add(enemigo);
      }
    }

    // Colisión bala-enemigo
    this.physics.add.overlap(this.proyectiles, this.enemigos, this.destruirEnemigo, null, this);

    // Controles
    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.teclaT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
  }

  shootBullet() {
    const bullet = this.proyectiles.create(this.nave.x, this.nave.y - 20, 'bala');
    bullet.setVelocityY(-500);
    bullet.setCollideWorldBounds(true);
    bullet.outOfBoundsKill = true;
    bullet.body.allowGravity = false;
  }

  destruirEnemigo(bala, enemigo) {
    bala.destroy();
    enemigo.destroy();

    // Reducir aburrimiento
    this.aburrimiento = Math.max(0, this.aburrimiento - 10);
    this.registry.set('aburrimiento', this.aburrimiento);
    this.aburrimientoTexto.setText(`Aburrimiento: ${this.aburrimiento}`);
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
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      this.shootBullet();
    }

    // Volver a la escena de trabajo con T
    if (Phaser.Input.Keyboard.JustDown(this.teclaT)) {
      this.registry.set('aburrimiento', this.aburrimiento);
      this.scene.start('TrabajoScene');
    }
  }
}

export default NaveScene;
