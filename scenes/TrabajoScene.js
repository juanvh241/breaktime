class TrabajoScene extends Phaser.Scene {
  constructor() {
    super('TrabajoScene');
  }

  // ─────────────────────────────────────
  // PRELOAD: Cargar assets
  // ─────────────────────────────────────
  preload() {
    this.load.spritesheet('UP', 'public/assets/Trabajo/Flechas/sprite arriba/sprite arriba.png', { frameWidth: 172, frameHeight: 172 });
    this.load.spritesheet('DOWN', 'public/assets/Trabajo/Flechas/sprite abajo/sprite abajo.png', { frameWidth: 172, frameHeight: 172 });
    this.load.spritesheet('LEFT', 'public/assets/Trabajo/Flechas/sprite izq/sprite izq.png', { frameWidth: 172, frameHeight: 172 });
    this.load.spritesheet('RIGHT', 'public/assets/Trabajo/Flechas/sprite derecha/sprite derecha.png', { frameWidth: 172, frameHeight: 172 });

    this.load.spritesheet('UP_VERDE', 'public/assets/Trabajo/Flechas/arriba verde/arriba verde.png', { frameWidth: 172, frameHeight: 172 });
    this.load.spritesheet('DOWN_VERDE', 'public/assets/Trabajo/Flechas/abajo verde/abajo verde.png', { frameWidth: 172, frameHeight: 172 });
    this.load.spritesheet('RIGHT_VERDE', 'public/assets/Trabajo/Flechas/derecha verde/derecha verde.png', { frameWidth: 172, frameHeight: 172 });
    this.load.spritesheet('LEFT_VERDE', 'public/assets/Trabajo/Flechas/izquierda verde/izquierda verde.png', { frameWidth: 172, frameHeight: 172 });

      
    this.load.image('BarraDeTareas', 'public/assets/Escritorio/barra de tareas.png');
  
    this.load.spritesheet('BORDE_TRABAJO', 'public/assets/Escritorio/borde ventana trabajo.png', { frameWidth: 541, frameHeight: 72 });
  
    this.load.spritesheet('VENTANA_ERROR', 'public/assets/Trabajo/ventana error.png', { frameWidth: 354, frameHeight: 129 });
  }

  // ─────────────────────────────────────
  // CREATE: Inicialización de escena
  // ─────────────────────────────────────
  create() {
    // Referencia a CerebroScene
    this.cerebro = this.scene.get('CerebroScene');
    //escritorio
    this.add.rectangle(640, 360, 1280, 720, 0x008080).setAlpha(1);

const graphics = this.add.graphics();

    // borde de la ventana animacion
    this.anims.create({
      key: 'borde_trabajo_anim',
      frames: this.anims.generateFrameNumbers('BORDE_TRABAJO', { start: 0, end: 29 }),
      frameRate: 10,
      repeat: -1
    });

    // borde de la ventana
    const bordeTrabajo = this.add.sprite(640, 120, 'BORDE_TRABAJO').setScale(0.92, 0.98);
    bordeTrabajo.play('borde_trabajo_anim');
    bordeTrabajo.setOrigin(0.5, 0.5);

// ── Contorno gris claro (fondo más grande)
graphics.fillStyle(0xC0C0C0, 1); // Gris claro típico de Win98
graphics.fillRoundedRect(400, 110, 480, 325, 10); // Un poco más grande que el rectángulo blanco

// ── Rectángulo blanco encima
graphics.fillStyle(0xffffff, 1);
graphics.fillRoundedRect(405, 115, 470, 315, 8); // El rectángulo original, levemente más chico

this.add.image(640, 468, 'BarraDeTareas').setOrigin(0.5).setScale(0.88, 1);



    // Animaciones de flechas y monitor
    this.anims.create({ key: 'up_anim', frames: this.anims.generateFrameNumbers('UP', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'down_anim', frames: this.anims.generateFrameNumbers('DOWN', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'left_anim', frames: this.anims.generateFrameNumbers('LEFT', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'right_anim', frames: this.anims.generateFrameNumbers('RIGHT', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });

    this.anims.create({ key: 'up_correcta', frames: this.anims.generateFrameNumbers('UP_VERDE', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'down_correcta', frames: this.anims.generateFrameNumbers('DOWN_VERDE', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'right_correcta', frames: this.anims.generateFrameNumbers('RIGHT_VERDE', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'left_correcta', frames: this.anims.generateFrameNumbers('LEFT_VERDE', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });

    // Recuperar estado actual del cerebro
    this.puntos = this.cerebro.estado.puntos || 0;
    this.puntosParciales = this.cerebro.estado.puntosParciales || 0;
    this.secuenciasCorrectas = this.cerebro.estado.secuenciasCorrectas || 0;
    this.multiplicador = this.cerebro.estado.multiplicador || 1;


    // Generar secuencia inicial de flechas
    this.secuencia = this.generarSecuencia(4);
    this.inputIndex = 0;
    this.imagenesFlechas = [];

    // Mostrar secuencia de flechas en pantalla
    const startX = 500;
    const startY = 280;
    const spacing = 90;
    this.secuencia.forEach((dir, i) => {
      const img = this.add.sprite(startX + i * spacing, startY, dir).setScale(0.5);
      img.play(`${dir.toLowerCase()}_anim`);
      this.imagenesFlechas.push(img);
    });

    


    // Configurar inputs
    this.aceptandoInput = true;
    this.tiempoInicio = this.time.now;

    this.input.keyboard.on('keydown', this.handleInput, this);

    this.input.keyboard.on('keydown-X', () => {
        if (this.jefePresente) return;
         this.registry.set('ultimoMinijuego', 'TrabajoScene');
      this.cerebro.events.emit('actualizarPuntos', this.puntos);
      this.scene.stop();
      this.scene.launch('MenuScene');
    });

this.jefePresente = false;

this.events.on('jefeObserva', () => {
  this.jefePresente = true;
  this.time.delayedCall(3000, () => {
    this.jefePresente = false;
  });
});

// ─────────────────────────────────────
//feedback sprite de ventana error
this.feedbackSprite = this.add.sprite(640, 280, 'VENTANA_ERROR');
this.feedbackSprite.setVisible(false);
this.feedbackSprite.setScale(1);
this.feedbackSprite.setDepth(10); // por si querés que esté arriba de todo

//animacion del feedback sprite
this.anims.create({
  key: 'error_anim',
  frames: this.anims.generateFrameNumbers('VENTANA_ERROR', { start: 0, end: 29 }),
  frameRate: 10,
  repeat: -1
});


  }

  // ─────────────────────────────────────
  // Generador de secuencia de flechas
  // ─────────────────────────────────────
  generarSecuencia(largo) {
    const opciones = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    return Array.from({ length: largo }, () => Phaser.Math.RND.pick(opciones));
  }

  // ─────────────────────────────────────
  // INPUT DEL JUGADOR
  // ─────────────────────────────────────
  handleInput(event) {
    if (!this.aceptandoInput) return;

    const tecla = event.code.replace('Arrow', '').toUpperCase();

    if (tecla === this.secuencia[this.inputIndex]) {
      const imagen = this.imagenesFlechas[this.inputIndex];
      imagen.play(`${tecla.toLowerCase()}_correcta`);
      this.inputIndex++;

      this.sound.play('TECLA1',  { volume: 0.2 })
        

      if (this.inputIndex >= this.secuencia.length) {
        const tiempoFin = this.time.now;
        const tiempoTotal = tiempoFin - this.tiempoInicio;

      if (this.multiplicador > 1 && tiempoTotal > 3000) {          
        this.aplicarMultiplicadorFinal(); // Corta el combo
        this.aceptandoInput = false;

        this.time.delayedCall(800, () => {
          this.aceptandoInput = true; // Reactivamos el input sin reiniciar la secuencia
          this.tiempoInicio = this.time.now; // Reinicia el tiempo para la misma secuencia
        });

        return;
      }

        // Calcular puntos según tiempo
        let puntosASumar = 50;
        if (tiempoTotal <= 1000) puntosASumar = 200;
        else if (tiempoTotal <= 2000) puntosASumar = 100;

        // Sumar puntos o acumular
        if (this.multiplicador > 1) {
          this.puntosParciales += puntosASumar;
        } else {
          this.puntos += puntosASumar;
          this.cerebro.events.emit('actualizarPuntos', this.puntos);
        }

        // Ajustar multiplicador
        this.secuenciasCorrectas++;
        if (this.secuenciasCorrectas === 2) this.multiplicador = 2;
        else if (this.secuenciasCorrectas === 4) this.multiplicador = 4;
        else if (this.secuenciasCorrectas === 8) this.multiplicador = 6;

        this.cerebro.events.emit('actualizarMultiplicador', {
          multiplicador: this.multiplicador,
          puntosParciales: this.puntosParciales
        });

        this.aceptandoInput = false;
        this.time.delayedCall(100, () => this.reiniciarMinijuego(true));
      }
    } else {
    // Si se equivoca: aplicar castigo y esperar 800ms antes de reiniciar
    this.aplicarMultiplicadorFinal();
    this.aceptandoInput = false;

      this.sound.play('ERROR', { volume: 0.2 } )

    // Mostrar sprite animado de error
    this.feedbackSprite.setVisible(true);
    this.feedbackSprite.play('error_anim');

    // Esperar y reiniciar
    this.time.delayedCall(800, () => {
      this.feedbackSprite.setVisible(false);
      this.reiniciarMinijuego(false);      
    });
    }
  }

  // ─────────────────────────────────────
  // Reiniciar minijuego con nueva secuencia
  // ─────────────────────────────────────
  reiniciarMinijuego(gano) {
    this.inputIndex = 0;
    this.secuencia = this.generarSecuencia(4);
    this.imagenesFlechas.forEach((img, i) => {
      const nuevaDir = this.secuencia[i];
      img.setTexture(nuevaDir);
      img.play(`${nuevaDir.toLowerCase()}_anim`);
    });

    if (this.limiteTiempo) this.limiteTiempo.remove(false);
    this.aceptandoInput = true;
    this.tiempoInicio = this.time.now;

if (this.multiplicador > 1) {
  this.limiteTiempo = this.time.delayedCall(3000, () => {
    if (this.inputIndex < this.secuencia.length) {
      this.aplicarMultiplicadorFinal();
      this.aceptandoInput = false;
      this.tiempoInicio = this.time.now; // reinicia tiempo pero no secuencia
      this.time.delayedCall(800, () => {
        this.aceptandoInput = true;
      });
    }
  });
}}


  // ─────────────────────────────────────
  // Aplicar multiplicador final y reiniciar combo
  // ─────────────────────────────────────
  aplicarMultiplicadorFinal() {
    const puntosFinales = this.puntosParciales * this.multiplicador;
    this.puntos += puntosFinales;
    this.cerebro.events.emit('actualizarPuntos', this.puntos);

    this.secuenciasCorrectas = 0;
    this.puntosParciales = 0;
    this.multiplicador = 1;

    this.cerebro.events.emit('actualizarMultiplicador', {
      multiplicador: 1,
      puntosParciales: 0
    });
  }
}

export default TrabajoScene;
