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

    this.load.spritesheet('MONITOR', 'public/assets/monitor fondo.png', { frameWidth: 1280, frameHeight: 720 });
  }

  // ─────────────────────────────────────
  // CREATE: Inicialización de escena
  // ─────────────────────────────────────
  create() {
    // Referencia a CerebroScene
    this.cerebro = this.scene.get('CerebroScene');

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
    const startX = 400;
    const startY = 300;
    const spacing = 150;
    this.secuencia.forEach((dir, i) => {
      const img = this.add.sprite(startX + i * spacing, startY, dir).setScale(0.7);
      img.play(`${dir.toLowerCase()}_anim`);
      this.imagenesFlechas.push(img);
    });

    // Texto de feedback (¡Correcto!, ¡Error!, etc.)
    this.feedback = this.add.text(100, 350, '', {
      fontSize: '30px',
      fill: '#ffffff',
      fontFamily: 'Arial',
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

  const textoJefe = this.add.text(400, 100, '¡El jefe te está observando!', {
    fontSize: '28px',
    color: '#ffffff',
    backgroundColor: '#aa0000',
    fontFamily: 'Arial'
  }).setOrigin(0.5);

  this.time.delayedCall(3000, () => {
    textoJefe.destroy();
    this.jefePresente = false;
  });
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

      if (this.inputIndex >= this.secuencia.length) {
        const tiempoFin = this.time.now;
        const tiempoTotal = tiempoFin - this.tiempoInicio;

      if (this.multiplicador > 1 && tiempoTotal > 3000) {          
        this.aplicarMultiplicadorFinal(); // Corta el combo
        this.feedback.setText('¡Tardaste demasiado!');
        this.aceptandoInput = false;

        this.time.delayedCall(800, () => {
          this.feedback.setText('');
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
        else if (this.secuenciasCorrectas === 6) this.multiplicador = 4;
        else if (this.secuenciasCorrectas === 10) this.multiplicador = 6;
        else if (this.secuenciasCorrectas === 20) this.multiplicador = 10;

        this.cerebro.events.emit('actualizarMultiplicador', {
          multiplicador: this.multiplicador,
          puntosParciales: this.puntosParciales
        });

        this.aceptandoInput = false;
        this.feedback.setText('¡Correcto!');
        this.time.delayedCall(100, () => this.reiniciarMinijuego(true));
        this.time.delayedCall(800, () => this.feedback.setText(''));
      }
    } else {
      // Si se equivoca: aplicar castigo y esperar 800ms antes de reiniciar
      this.aplicarMultiplicadorFinal();
      this.aceptandoInput = false;
      this.feedback.setText('¡Error!');
      this.time.delayedCall(800, () => {
        this.feedback.setText('');
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
      this.feedback.setText('¡Tardaste demasiado!');
      this.aceptandoInput = false;
      this.tiempoInicio = this.time.now; // reinicia tiempo pero no secuencia
      this.time.delayedCall(800, () => {
        this.feedback.setText('');
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
