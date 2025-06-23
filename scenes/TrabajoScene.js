class TrabajoScene extends Phaser.Scene {
  constructor() {
    super('TrabajoScene');
  }

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

  create() {
let valorInicial = Number(this.registry.get('aburrimiento'));
this.aburrimiento = isNaN(valorInicial) ? 0 : valorInicial;
this.registry.set('aburrimiento', this.aburrimiento);

    // crear animaciones para las flechas
    this.anims.create({ key: 'up_anim', frames: this.anims.generateFrameNumbers('UP', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'down_anim', frames: this.anims.generateFrameNumbers('DOWN', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'left_anim', frames: this.anims.generateFrameNumbers('LEFT', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'right_anim', frames: this.anims.generateFrameNumbers('RIGHT', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });

    this.anims.create({ key: 'up_correcta', frames: this.anims.generateFrameNumbers('UP_VERDE', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'down_correcta', frames: this.anims.generateFrameNumbers('DOWN_VERDE', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'right_correcta', frames: this.anims.generateFrameNumbers('RIGHT_VERDE', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });
    this.anims.create({ key: 'left_correcta', frames: this.anims.generateFrameNumbers('LEFT_VERDE', { start: 0, end: 25 }), frameRate: 15, repeat: -1 });

    this.anims.create({ key: 'monitor_anim', frames: this.anims.generateFrameNumbers('MONITOR', { start: 0, end: 11 }), frameRate: 8, repeat: -1 });

const monitor = this.add.sprite(640, 360, 'MONITOR');
monitor.play('monitor_anim');


//fondo en blanco
this.cameras.main.setBackgroundColor('#ffffff');

this.aburrimientoTexto = this.add.text(600, 50, `Aburrimiento: ${this.aburrimiento}%`, {
    fontSize: '24px',
    color: '#ff0000',
    fontFamily: 'Gloria Hallelujah'
  });

// Evento que suma aburrimiento cada segundo
this.time.addEvent({
  delay: 1000,
  callback: () => {
    let valorActual = this.registry.get('aburrimiento');
    valorActual = Phaser.Math.Clamp(valorActual + 1, 0, 100); // Máximo 100
    this.registry.set('aburrimiento', valorActual);
    this.aburrimientoTexto.setText(`Aburrimiento: ${valorActual}%`);

    /* Opcional: acción cuando llega al 100%
    if (valorActual >= 100) {
      this.feedback.setText('¡Te aburriste!');
      this.aceptandoInput = false;
      // Acá podrías cambiar de escena, mostrar un jefe, etc.
    }*/
  },
  loop: true
});


    this.secuencia = this.generarSecuencia(4);
    this.inputIndex = 0;
    this.imagenesFlechas = [];

    const startX = 400;
    const startY = 300;
    const spacing = 150;

    // Mostrar la secuencia como imágenes
    this.secuencia.forEach((dir, i) => {
      const img = this.add.sprite(startX + i * spacing, startY, dir) .setScale(0.7); // Acá escalás el sprite
      img.play(`${dir.toLowerCase()}_anim`);
      this.imagenesFlechas.push(img);
    });

    this.feedback = this.add.text(100, 350, '', {
      fontSize: '30px',
      color: '#000000',
      fontFamily: 'Arial',
    });

// obtener puntos del registro o inicializar en 0
this.puntos = Number(this.registry.get('puntos')) || 0;

  // puntos texto
this.puntosTexto = this.add.text(100, 50, `Puntos: ${this.puntos}`, {
      fontSize: '24px',
      color: '#006400',
      fontFamily: 'Arial',
    });


     this.aceptandoInput = true;  // <--- Inicializar acá

     this.tiempoInicio = this.time.now; // Guardar tiempo inicial

    this.input.keyboard.on('keydown', this.handleInput, this);

    //MULTIPLICADOR variables y texto
    this.secuenciasCorrectas = 0;
this.multiplicador = 1;
this.puntosParciales = 0;

this.multiplicadorTexto = this.add.text(300, 50, '', {
  fontSize: '24px',
  color: '#00ff00',
  fontFamily: 'Arial',
});

// Texto para puntos parciales
this.puntosParcialesTexto = this.add.text(100, 80, '', {
  fontSize: '24px',
  color: '#008080', // un color distinto, azul verdoso
  fontFamily: 'Arial',
});


this.input.keyboard.on('keydown-X', () => {
   this.registry.set('puntos', this.puntos);
  this.scene.start('MenuScene');
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
      imagen.play(`${tecla.toLowerCase()}_correcta`);

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

// Calcular puntos base según tiempo
let puntosASumar = 50;
if (tiempoTotal <= 1000) {
  puntosASumar = 200;
} else if (tiempoTotal <= 2000) {
  puntosASumar = 100;
}

// Si hay multiplicador, acumula para más adelante
if (this.multiplicador > 1) {
  this.puntosParciales += puntosASumar;
} else {
  // Si no hay multiplicador, suma directo a los puntos
  this.puntos += puntosASumar;
  this.puntosTexto.setText(`Puntos: ${this.puntos}`);
}

this.secuenciasCorrectas++;

// Ajustar multiplicador
if (this.secuenciasCorrectas === 2) this.multiplicador = 2;
else if (this.secuenciasCorrectas === 6) this.multiplicador = 4;
else if (this.secuenciasCorrectas === 10) this.multiplicador = 6;

if (this.multiplicador > 1) {
  this.multiplicadorTexto.setText(`x${this.multiplicador}`);
} else {
  this.multiplicadorTexto.setText('');
}


// Mostrar multiplicador si corresponde
if (this.multiplicador > 1) {
  this.multiplicadorTexto.setText(`x${this.multiplicador}`);
}

this.feedback.setText('¡Correcto!');
this.aceptandoInput = false;

this.time.delayedCall(100, () => this.reiniciarMinijuego(true));
this.time.delayedCall(800, () => this.feedback.setText(''));
//puntos parciales
if (this.multiplicador > 1) {
  this.puntosParciales += puntosASumar;
  this.puntosParcialesTexto.setText(`Acumulado: ${this.puntosParciales}`);
} else {
  this.puntos += puntosASumar;
  this.puntosTexto.setText(`Puntos: ${this.puntos}`);

  // Si no hay multiplicador activo, vaciamos el texto de acumulados
  this.puntosParcialesTexto.setText('');
}

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

reiniciarMinijuego(gano) {
  this.inputIndex = 0;
  this.secuencia = this.generarSecuencia(4);
  this.imagenesFlechas.forEach((img, i) => {
    const nuevaDir = this.secuencia[i];
img.setTexture(nuevaDir);
img.play(`${nuevaDir.toLowerCase()}_anim`);
  });
this.imagenesFlechas.forEach((img, i) => {
  const nuevaDir = this.secuencia[i];
  img.setTexture(nuevaDir); // solo cambia la imagen, sin animar
});

  if (this.limiteTiempo) {
    this.limiteTiempo.remove(false);
  }

  this.aceptandoInput = true;
  this.tiempoInicio = this.time.now;

  if (this.multiplicador > 1) {
    this.limiteTiempo = this.time.delayedCall(3000, () => {
      if (this.inputIndex < this.secuencia.length) {
        this.aplicarMultiplicadorFinal();
        this.feedback.setText('¡Tardaste demasiado!');
        this.aceptandoInput = false;
        this.time.delayedCall(800, () => this.feedback.setText(''));
        this.time.delayedCall(100, () => this.reiniciarMinijuego(true));
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
  this.puntosParcialesTexto.setText('');

}

}
export default TrabajoScene;

