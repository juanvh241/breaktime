class TrabajoScene extends Phaser.Scene {
  constructor() {
    super('TrabajoScene');
  }

  preload() {
    this.load.spritesheet('UP', 'public/assets/Trabajo/Flechas/sprite arriba/sprite arriba.png', { frameWidth: 110, frameHeight: 110 });
    this.load.spritesheet('DOWN', 'public/assets/Trabajo/Flechas/sprite abajo/sprite abajo.png', { frameWidth: 110, frameHeight: 110 });
    this.load.spritesheet('LEFT', 'public/assets/Trabajo/Flechas/sprite izq/sprite izq.png', { frameWidth: 110, frameHeight: 110 });
    this.load.spritesheet('RIGHT', 'public/assets/Trabajo/Flechas/sprite derecha/sprite derecha.png', { frameWidth: 110, frameHeight: 110 });
  }

  create() {
this.secuencia = this.generarSecuencia(4);
    this.inputIndex = 0;
    this.imagenesFlechas = [];

    const startX = 400;
    const startY = 300;
    const spacing = 150;

    // Mostrar la secuencia como imágenes
    this.secuencia.forEach((dir, i) => {
      const img = this.add.sprite(startX + i * spacing, startY, dir);
img.play(`${dir.toLowerCase()}_anim`);
      this.imagenesFlechas.push(img);
    });

    this.feedback = this.add.text(100, 350, '', {
      fontSize: '30px',
      color: '#ffffff',
      fontFamily: 'Arial',
    });

    this.puntos = 0; // Inicializo puntos
  this.puntosTexto = this.add.text(100, 50, 'Puntos: 0', {
    fontSize: '24px',
    color: '#ffff00',
    fontFamily: 'Arial',
  });

     this.aceptandoInput = true;  // <--- Inicializar acá

     this.tiempoInicio = this.time.now; // Guardar tiempo inicial

    this.input.keyboard.on('keydown', this.handleInput, this);

    // crear animaciones para las flechas
    this.anims.create({ key: 'up_anim', frames: this.anims.generateFrameNumbers('UP', { start: 0, end: 13 }), frameRate: 10, repeat: 1 });
    this.anims.create({ key: 'down_anim', frames: this.anims.generateFrameNumbers('DOWN', { start: 0, end: 13 }), frameRate: 10, repeat: 1 });
    this.anims.create({ key: 'left_anim', frames: this.anims.generateFrameNumbers('LEFT', { start: 0, end: 13 }), frameRate: 10, repeat: 1 });
    this.anims.create({ key: 'right_anim', frames: this.anims.generateFrameNumbers('RIGHT', { start: 0, end: 13 }), frameRate: 10, repeat: 1 });

    //MULTIPLICADOR variables y texto
    this.secuenciasCorrectas = 0;
this.multiplicador = 1;
this.puntosParciales = 0;

this.multiplicadorTexto = this.add.text(300, 50, '', {
  fontSize: '24px',
  color: '#00ff00',
  fontFamily: 'Arial',
});

  }

  generarSecuencia(largo) {
const opciones = ['UP', 'DOWN', 'LEFT', 'RIGHT'];
    const secuencia = [];
    for (let i = 0; i < largo; i++) {
      const rand = Phaser.Math.RND.pick(opciones);
      secuencia.push(rand);
    }
    return secuencia;
   }

  handleInput(event) {
    if (!this.aceptandoInput) return; // Ignorar inputs mientras no se acepte

    const tecla = event.code.replace('Arrow', '').toUpperCase();

    if (tecla === this.secuencia[this.inputIndex]) {
      // Cambiar sprite a su versión verde
      const imagen = this.imagenesFlechas[this.inputIndex];
      imagen.play(`${tecla.toLowerCase()}_anim`);

      this.inputIndex++;
//tiempo
if (this.inputIndex >= this.secuencia.length) {
  const tiempoFin = this.time.now;
  const tiempoTotal = (tiempoFin - this.tiempoInicio); // en milisegundos
  console.log('Tiempo total:', tiempoTotal);

  // Si tardó más de 3 segundos, se termina el combo
if (tiempoTotal > 3000) {
  this.aplicarMultiplicadorFinal();
  this.feedback.setText('¡Tardaste demasiado!');
  this.aceptandoInput = false;
  this.time.delayedCall(100, () => this.reiniciarMinijuego(true, 0));
  this.time.delayedCall(800, () => this.feedback.setText(''));
  return;
}

// Sumar puntos parciales según tiempo
let puntosASumar = 50;
if (tiempoTotal <= 1000) {
  puntosASumar = 200;
} else if (tiempoTotal <= 2000) {
  puntosASumar = 100;
}
this.puntosParciales += puntosASumar;

this.secuenciasCorrectas++;

// Ajustar multiplicador según secuencias correctas
if (this.secuenciasCorrectas === 2) this.multiplicador = 2;
else if (this.secuenciasCorrectas === 4) this.multiplicador = 4;
else if (this.secuenciasCorrectas === 6) this.multiplicador = 8;

// Mostrar multiplicador si corresponde
if (this.multiplicador > 1) {
  this.multiplicadorTexto.setText(`x${this.multiplicador}`);
}

this.feedback.setText('¡Correcto!');
this.aceptandoInput = false;

this.time.delayedCall(100, () => this.reiniciarMinijuego(true, 0)); // ahora pasás 0 porque los puntos reales se acumulan y se aplican al final
this.time.delayedCall(800, () => this.feedback.setText(''));
}
      

    } else {
      this.aplicarMultiplicadorFinal();
      this.feedback.setText('¡Error!');
       this.aceptandoInput = false; // Bloquear input mientras se reinicia
      this.time.delayedCall(900, () => this.reiniciarMinijuego(false));
       // Borrar texto después de 800 ms para que se lea bien
    this.time.delayedCall(900, () => this.feedback.setText(''));
    }
  }

reiniciarMinijuego(gano, puntosASumar = 0) {
  if (gano) {
    this.puntos += puntosASumar;
    this.puntosTexto.setText(`Puntos: ${this.puntos}`);
  }

  this.inputIndex = 0;
  this.secuencia = this.generarSecuencia(4);
  this.imagenesFlechas.forEach((img, i) => {
    const nuevaDir = this.secuencia[i];
img.setTexture(nuevaDir);
img.play(`${nuevaDir.toLowerCase()}_anim`);
  });

  if (this.limiteTiempo) {
  this.limiteTiempo.remove(false);
}


    this.aceptandoInput = true; // Volver a aceptar input cuando esté listo
    this.tiempoInicio = this.time.now; // Reiniciar tiempo para la nueva secuencia

    // Cortar combo automáticamente si no termina en 3 segundos
if (this.multiplicador > 1) {
  this.limiteTiempo = this.time.delayedCall(3000, () => {
    if (this.inputIndex < this.secuencia.length) {
      this.aplicarMultiplicadorFinal();
      this.feedback.setText('¡Tardaste demasiado!');
      this.aceptandoInput = false;
      this.time.delayedCall(800, () => this.feedback.setText(''));
      this.time.delayedCall(100, () => this.reiniciarMinijuego(true, 0));
    }
  });
}
  }  

  aplicarMultiplicadorFinal() {
  const puntosFinales = this.puntosParciales * this.multiplicador;
  this.puntos += puntosFinales;
  this.puntosTexto.setText(`Puntos: ${this.puntos}`);

  // Reiniciar combo
  this.secuenciasCorrectas = 0;
  this.puntosParciales = 0;
  this.multiplicador = 1;
  this.multiplicadorTexto.setText('');
}

}
export default TrabajoScene;

