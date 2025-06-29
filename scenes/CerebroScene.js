class CerebroScene extends Phaser.Scene {
constructor() {
  super('CerebroScene');
  this.estado = {
    puntos: 0,
    multiplicador: 1,
    puntosParciales: 0,
    aburrimiento: 0,
    secuenciasCorrectas: 0
  };
    this.jefeActivo = false; // ← NUEVO: control de aparición
}

preload() {
  this.load.spritesheet('MESA_IZQ', 'public/assets/Cerebro/mesa izquierda.png', { frameWidth: 195, frameHeight: 195 });
  this.load.spritesheet('MESA_MEDIO', 'public/assets/Cerebro/mesa medio.png', { frameWidth: 218, frameHeight: 218 });  // ajustá el ancho si es distinto
  this.load.spritesheet('MESA_DER', 'public/assets/Cerebro/mesa derecha.png', { frameWidth: 194, frameHeight: 194 }); // suponiendo que es igual a izquierda

  this.load.spritesheet('MONITOR1', 'public/assets/Cerebro/monitor1.png', { frameWidth: 410, frameHeight: 410 });
  this.load.spritesheet('MONITOR2', 'public/assets/Cerebro/monitor2.png', { frameWidth: 410, frameHeight: 410 });

  this.load.spritesheet('SUELO1', 'public/assets/Cerebro/suelo1.png', { frameWidth: 640, frameHeight: 480 });
  this.load.spritesheet('SUELO2', 'public/assets/Cerebro/suelo2.png', { frameWidth: 640, frameHeight: 480 });

  this.load.spritesheet('TECHO1', 'public/assets/Cerebro/techo1.png', { frameWidth: 640, frameHeight: 480 });
  this.load.spritesheet('TECHO2', 'public/assets/Cerebro/techo2.png', { frameWidth: 640, frameHeight: 480 });
  this.load.spritesheet('TECHO3', 'public/assets/Cerebro/techo3.png', { frameWidth: 640, frameHeight: 480 });
  this.load.spritesheet('TECHO4', 'public/assets/Cerebro/techo4.png', { frameWidth: 640, frameHeight: 480 });
  this.load.spritesheet('TECHO5', 'public/assets/Cerebro/techo5.png', { frameWidth: 640, frameHeight: 480 });

  this.load.spritesheet('VENTANA1', 'public/assets/Cerebro/ventana1.png', { frameWidth: 436, frameHeight: 239 });
  this.load.spritesheet('VENTANA2', 'public/assets/Cerebro/ventana2.png', { frameWidth: 436, frameHeight: 239 });

  this.load.spritesheet('MESA_FONDO_IZQ1', 'public/assets/Cerebro/mesa fondo izq 1.png', { frameWidth: 316, frameHeight: 307 });
  this.load.spritesheet('MESA_FONDO_IZQ2', 'public/assets/Cerebro/mesa fondo izq 2.png', { frameWidth: 316, frameHeight: 307 });

  this.load.spritesheet('MESA_FONDO_DER1', 'public/assets/Cerebro/mesa fondo derecha 1.png', { frameWidth: 356, frameHeight: 329 });
  this.load.spritesheet('MESA_FONDO_DER2', 'public/assets/Cerebro/mesa fondo derecha 2.png', { frameWidth: 356, frameHeight: 329 });

  this.load.spritesheet('MARCO_PUNTOS', 'public/assets/Cerebro/marco puntos.png', { frameWidth: 444, frameHeight: 139 });

  this.load.spritesheet('SIGNO_PESOS', 'public/assets/Cerebro/signo pesos.png', { frameWidth: 112, frameHeight: 118 });

  this.load.spritesheet('MULTI_X2', 'public/assets/Cerebro/multi x2.png', { frameWidth: 201, frameHeight: 215 });
  this.load.spritesheet('MULTI_X4', 'public/assets/Cerebro/multi x4.png', { frameWidth: 188, frameHeight: 208 });
  this.load.spritesheet('MULTI_X6', 'public/assets/Cerebro/multi x6.png', { frameWidth: 189, frameHeight: 205 });

  this.load.spritesheet('MARCO_ABURRIMIENTO', 'public/assets/Cerebro/barra aburrimiento.png', { frameWidth: 319, frameHeight: 89 });
  this.load.spritesheet('EMOJI', 'public/assets/Cerebro/emoji.png', { frameWidth: 159, frameHeight: 150 });
}


// ─────────────────────────────────────
  create() {
    
        // rectangulo blanco mediano
   //this.add.rectangle(640, 400, 1280, 700, 0xffffff).setOrigin(0.5) .setDepth(-4);

    // creo todas las animaciones
  this.anims.create({ key: 'mesa_izq_anim', frames: this.anims.generateFrameNumbers('MESA_IZQ', { start: 0, end: 16 }), frameRate: 6, repeat: -1 });
  this.anims.create({ key: 'mesa_medio_anim', frames: this.anims.generateFrameNumbers('MESA_MEDIO', { start: 0, end: 5 }), frameRate: 6, repeat: -1 });
  this.anims.create({ key: 'mesa_der_anim', frames: this.anims.generateFrameNumbers('MESA_DER', { start: 0, end: 18 }), frameRate: 6, repeat: -1 });

 // const yMesa = 600;

// Izquierda
this.add.sprite(265, 630, 'MESA_IZQ')
    .play('mesa_izq_anim').setDepth(-4)
    .setScale(1.5); // Escala del 150%


// Medio
this.add.sprite(540, 612, 'MESA_MEDIO')
  .play('mesa_medio_anim')
  .setDepth(-4)
  .setScale(1.5); // Escala del 150%

this.add.sprite(730, 612, 'MESA_MEDIO')
  .play('mesa_medio_anim')
  .setDepth(-4)
  .setScale(1.5);



  // Derecha
this.add.sprite(1005, 630, 'MESA_DER')
    .play('mesa_der_anim')
    .setDepth(-4)
    .setScale(1.5) // Escala del 150%

    // ─────────────────────────────────────
    
    // ─────────────────────────────────────
  // animación del suelo
const framesSuelo1 = this.anims.generateFrameNumbers('SUELO1', { start: 0, end: 5 });
const framesSuelo2 = this.anims.generateFrameNumbers('SUELO2', { start: 0, end: 2 }); 
this.anims.create({
  key: 'suelo_anim',
  frames: [...framesSuelo1, ...framesSuelo2],
  frameRate: 15,
  repeat: -1
});
// suelo
const suelo = this.add.sprite(320, 580, 'SUELO1')
  .play('suelo_anim')
  .setDepth(-5) // Ajustá según cómo lo quieras apilar
  .setScale(1); // O el valor que veas mejor

const suelo2 = this.add.sprite(960, 580, 'SUELO1')
  .play('suelo_anim')
  .setDepth(-5) // Ajustá según cómo lo quieras apilar
  .setScale(1); // O el valor que veas mejor
    // ─────────────────────────────────────
      //PARED XD
const pared = this.add.rectangle(640, 360, 1280, 720, 0x8C999B)
  .setOrigin(0.5)
  .setDepth(-6); // Asegúrate de que esté detrás de todo lo demás

    // -- ────────────────────────────────
        //TECHO
const framesTecho1 = this.anims.generateFrameNumbers('TECHO1', { start: 0, end: 5 });
const framesTecho2 = this.anims.generateFrameNumbers('TECHO2', { start: 0, end: 5 });
const framesTecho3 = this.anims.generateFrameNumbers('TECHO3', { start: 0, end: 5 });
const framesTecho4 = this.anims.generateFrameNumbers('TECHO4', { start  : 0, end: 5 });
const framesTecho5 = this.anims.generateFrameNumbers('TECHO5', { start: 0, end: 5 });
this.anims.create({
  key: 'techo_anim',
  frames: [...framesTecho1, ...framesTecho2, ...framesTecho3, ...framesTecho4, ...framesTecho5],
  frameRate: 15,
  repeat: -1
});
// techo
const techo = this.add.sprite(640, 80, 'TECHO1')
  .play('techo_anim')
  .setDepth(-3) // Ajustá según cómo lo quieras apilar
  .setScale(2, 1); // O el valor que veas mejor


    // - ────────────────────────────────
    //ventana animacion
const framesVentana1 = this.anims.generateFrameNumbers('VENTANA1', { start: 0, end: 15 });
const framesVentana2 = this.anims.generateFrameNumbers('VENTANA2', { start: 0, end: 13 });
this.anims.create({
  key: 'ventana_anim',
  frames: [...framesVentana1, ...framesVentana2],
  frameRate: 15,
  repeat: -1
});

  //ventana
const ventana = this.add.sprite(120, 290, 'VENTANA1')
  .play('ventana_anim')
  .setDepth(-2) // Ajustá según cómo lo quieras apilar
  .setScale(1); // O el valor que veas mejor



    // ─────────────────────────────────────
    // MESA FONDO IZQUIERDA animacion
const framesMesaFondoIzq1 = this.anims.generateFrameNumbers('MESA_FONDO_IZQ1', { start: 0, end: 17 });
const framesMesaFondoIzq2 = this.anims.generateFrameNumbers('MESA_FONDO_IZQ2', { start: 0, end: 8 });
this.anims.create({
  key: 'mesa_fondo_izq_anim',
  frames: [...framesMesaFondoIzq1, ...framesMesaFondoIzq2],
  frameRate: 15,
  repeat: -1
});

// MESA FONDO IZQUIERDA
const mesaFondoIzq = this.add.sprite(120, 420, 'MESA_FONDO_IZQ1')
  .play('mesa_fondo_izq_anim')
  .setDepth(-1) // Ajustá según cómo lo quieras apilar
  .setScale(1); // O el valor que veas mejor

  // - ────────────────────────────────
// MESA FONDO DERECHA animacion
const framesMesaFondoDer1 = this.anims.generateFrameNumbers('MESA_FONDO_DER1', { start: 0, end: 14 });
const framesMesaFondoDer2 = this.anims.generateFrameNumbers('MESA_FONDO_DER2', { start: 0, end: 9 });
this.anims.create({
  key: 'mesa_fondo_der_anim',
  frames: [...framesMesaFondoDer1, ...framesMesaFondoDer2],
  frameRate: 15,
  repeat: -1
});
// MESA FONDO DERECHA
const mesaFondoDer = this.add.sprite(1180, 430, 'MESA_FONDO_DER1')
  .play('mesa_fondo_der_anim')
  .setDepth(-1) // Ajustá según cómo lo quieras apilar
  .setScale(0.9); // O el valor que veas mejor

  // - ────────────────────────────────
//creo animacion del marco de puntos
const framesMarcoPuntos = this.anims.generateFrameNumbers('MARCO_PUNTOS', { start: 0, end: 5 });
this.anims.create({
  key: 'marco_puntos_anim',
  frames: framesMarcoPuntos,
  frameRate: 10,
  repeat: -1
});
// marco de puntos
this.contenedor = this.add.sprite(30, 60, 'MARCO_PUNTOS').play('marco_puntos_anim');
this.contenedor.setOrigin(0, 0.5);
this.contenedor.setScale(0.4, 0.5); // Arranca con escala normal

  // ────────────────────────────────
// creo animación del signo pesos
const framesSignoPesos = this.anims.generateFrameNumbers('SIGNO_PESOS', { start: 0, end: 28 });
this.anims.create({
  key: 'signo_pesos_anim',
  frames: framesSignoPesos,
  frameRate: 10,
  repeat: -1
});

// signo pesos
const signoPesos = this.add.sprite(65, 60, 'SIGNO_PESOS').play('signo_pesos_anim');
signoPesos.setScale(0.65, 0.4); // Escala del 50%

// ────────────────────────────────
// creo animaciones de multiplicador
const framesMultiX2 = this.anims.generateFrameNumbers('MULTI_X2', { start: 0, end: 29 });
const framesMultiX4 = this.anims.generateFrameNumbers('MULTI_X4', { start: 0, end: 29 });
const framesMultiX6 = this.anims.generateFrameNumbers('MULTI_X6', { start: 0, end: 29 });
this.anims.create({
  key: 'multi_x2_anim',
  frames: framesMultiX2,
  frameRate: 10,
  repeat: -1
});
this.anims.create({
  key: 'multi_x4_anim',
  frames: framesMultiX4,
  frameRate: 10,
  repeat: -1
});
this.anims.create({
  key: 'multi_x6_anim',
  frames: framesMultiX6,
  frameRate: 10,
  repeat: -1
});

// creo multiplicador invisible
this.spriteMultiplicador = this.add.sprite(200, 130, 'MULT_X2')
  .setVisible(false)
  .setScale(0.3); // ajustá la escala si hace falta

// ───────────────────────────────
// creo animacion del marco de aburrimiento
const framesMarcoAburrimiento = this.anims.generateFrameNumbers('MARCO_ABURRIMIENTO', { start: 0, end: 29 });
this.anims.create({
  key: 'marco_aburrimiento_anim',
  frames: framesMarcoAburrimiento,
  frameRate: 10,
  repeat: -1
});
// marco de aburrimiento
this.marcoAburrimiento = this.add.sprite(640, 50, 'MARCO_ABURRIMIENTO')
  .play('marco_aburrimiento_anim')
  .setScale(1)
  .setDepth(5);

// La barra inicia a la derecha, y se acorta desde la izquierda
this.barraAburrimientoMax = 200; // ancho máximo de la barra
this.barraAburrimientoX = 740; // posición fija del borde derecho

this.barraAburrimiento = this.add.rectangle(
  this.barraAburrimientoX, 50,
  this.barraAburrimientoMax, 20,
  0x00ff00
).setOrigin(1, 0.5).setDepth(4);
// ────────────────────────────────

    
    this.aburrimientoTrabajo = 2;
    this.aburrimientoMenu = 1;
    this.aburrimientoNave = 2; // valor para restar (negativo)

    this.time.addEvent({
  delay: 20000,
  loop: true,
  callback: () => {
    this.aburrimientoTrabajo++;
    this.aburrimientoMenu++;
    this.aburrimientoNave++; // esto también lo usás como -x en NaveScene
    console.log(`Ahora aburrimiento: Trabajo=${this.aburrimientoTrabajo}, Menu=${this.aburrimientoMenu}, Nave=-${this.aburrimientoNave}`);
  }
});

    // Textos de UI
    this.puntosTexto = this.add.text(120, 45, `${this.estado.puntos}`, {
      fontSize: '29px',
      //color verde claro
      color: '#2bff00',
      fontStyle: 'bold',
      fontFamily: 'Comic Neue'
    });

    this.multiplicadorTexto = this.add.text(120, 60, '', {
      fontSize: '29px',
      color: '#00ff00',
      fontFamily: 'Arial'
    });

    this.puntosParcialesTexto = this.add.text(165, 130, '', {
      fontSize: '28px',
      color: '#008080',
      fontFamily: 'Comic Neue',
      fontStyle: 'bold'
    }).setOrigin(1, 0.5);  // ← anclado a la derecha;

    this.aburrimientoTexto = this.add.text(600, 50, `Aburrimiento: ${this.estado.aburrimiento}%`, {
      fontSize: '24px',
      color: '#ff0000',
      fontFamily: 'Arial'
    });

    // ────────────────────────────────
    // Escuchar eventos desde otras escenas
    // ────────────────────────────────
    
this.events.on('actualizarPuntos', (puntos) => {
  this.estado.puntos = puntos;
  this.puntosTexto.setText(`${this.estado.puntos}`);

   // Estirar el marco si supera cierto umbral
  if (puntos >= 100000) {
    this.contenedor.setScale(0.6, 0.5); // el doble de ancho
  } else if (puntos >= 10000) {
    this.contenedor.setScale(0.45, 0.5); // 50% más ancho
  } else {
    this.contenedor.setScale(0.4, 0.5); // escala normal
  }
});

this.events.on('actualizarMultiplicador', ({ multiplicador, puntosParciales, secuenciasCorrectas }) => {
  this.estado.multiplicador = multiplicador;
  this.estado.puntosParciales = puntosParciales;
  this.estado.secuenciasCorrectas = secuenciasCorrectas;

  // Mostrar sprite animado correspondiente
  if (multiplicador === 2) {
    this.spriteMultiplicador.setTexture('MULTI_X2').play('multi_x2_anim').setVisible(true);
    this.puntosParcialesTexto.setColor('#aaff66'); // Verde claro
  } else if (multiplicador === 4) {
    this.spriteMultiplicador.setTexture('MULTI_X4').play('multi_x4_anim').setVisible(true);
    this.puntosParcialesTexto.setColor('#ffff66'); // Amarillo
  } else if (multiplicador === 6) {
    this.spriteMultiplicador.setTexture('MULTI_X6').play('multi_x6_anim').setVisible(true);
    this.puntosParcialesTexto.setColor('#85fff9'); // Celeste
  } else {
    this.spriteMultiplicador.setVisible(false);
    this.puntosParcialesTexto.setColor('#008080'); // Color base (por si vuelve a 1x)
  }
  // Mostrar texto solo si el multiplicador está activo
  if (multiplicador > 1) {
    this.puntosParcialesTexto.setText(`${puntosParciales}`);
  } else {
    this.puntosParcialesTexto.setText('');
  }
});

this.events.on('subirAburrimiento', (cantidad) => {
  this.estado.aburrimiento = Phaser.Math.Clamp(this.estado.aburrimiento + cantidad, 0, 100);

  const porcentaje = 1 - (this.estado.aburrimiento / 100);
  const nuevoAncho = this.barraAburrimientoMax * porcentaje;

  this.barraAburrimiento.width = nuevoAncho;
  this.barraAburrimiento.x = this.barraAburrimientoX; // → mantenemos el borde derecho fijo

  // Color según porcentaje
  if (this.estado.aburrimiento < 40) {
    this.barraAburrimiento.fillColor = 0x00ff00; // verde
  } else if (this.estado.aburrimiento < 75) {
    this.barraAburrimiento.fillColor = 0xffff00; // amarillo
  } else {
    this.barraAburrimiento.fillColor = 0xff0000; // rojo
  }
  
   if (this.estado.aburrimiento >= 100) {
    // Mostrar mensaje y perder
    const mensaje = this.add.text(640, 360, '¡Te aburriste demasiado!\nPerdiste.', {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#000000',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5);
  }
});
    // Siempre encima de todo
    this.scene.bringToTop();
    this.scene.launch('MenuScene');

// ───────────────────────────────
// Jefe: aviso y aparición periódica
// ───────────────────────────────
this.jefeTexto = this.add.text(400, 200, '', {
  fontSize: '32px',
  color: '#ff0000',
  fontFamily: 'Arial',
  backgroundColor: '#000',
  padding: { x: 10, y: 5 }
}).setOrigin(0.5).setDepth(10);

this.time.addEvent({
  delay: Phaser.Math.Between(8000, 30000), // cada 8 a 30 segundos
 callback: () => {
    if (!this.jefeActivo) {
      this.aparecerJefe();
    }
  },
    loop: true // ← IMPORTANTE
});

// Subida dinámica de aburrimiento según escena activa
this.time.addEvent({
  delay: 1500,
  loop: true,
  callback: () => {
    const escenasActivas = this.scene.manager.getScenes(true);
    const escenaActual = escenasActivas.find(s => s.scene.settings.active && s.scene.key !== 'CerebroScene');

    if (!escenaActual) return;

    let cantidad = 0;

  if (escenaActual.scene.key === 'TrabajoScene') {
    cantidad = this.aburrimientoTrabajo;
  } else if (escenaActual.scene.key === 'MenuScene') {
    cantidad = this.aburrimientoMenu;
  }

    if (cantidad > 0) {
      this.events.emit('subirAburrimiento', cantidad);
    }
  }
});

// 1. Crear una forma que represente la pantalla del monitor
const mascaraPantalla = this.add.rectangle(640, 280, 560, 400, 0x000000)
  .setVisible(false); // No se muestra visualmente, solo sirve de máscara

// 2. Crear una máscara inversa a partir de ese rectángulo
const mascara = mascaraPantalla.createBitmapMask();
mascara.invertAlpha = true;

// 3. Aplicar la máscara a toda la escena
this.children.each(child => {
  child.setMask(mascara);
});


// ───────────────────────────────
//MONITOR SIEMPRE A LO ULTIMO
    // animacion del monitor
const framesParte1 = this.anims.generateFrameNumbers('MONITOR1', { start: 0, end: 17 }); // X = cantidad - 1
const framesParte2 = this.anims.generateFrameNumbers('MONITOR2', { start: 0, end: 11 }); // Y = cantidad - 1

this.anims.create({
  key: 'monitor_anim',
  frames: [...framesParte1, ...framesParte2],
  frameRate: 15,
  repeat: -1
});

const monitor = this.add.sprite(650, 350, 'MONITOR1') // poné la posición que quieras
  .play('monitor_anim')
  .setDepth(-2); // Ajustá según cómo lo quieras apilar
  // Podés escalarlo si queda chico
monitor.setScale(1.75, 1.75); // O el valor que veas mejor

// ───────────────────────────────
  }


aparecerJefe() {
  // Mostrar advertencia
    this.jefeActivo = true; // ← lo marcamos activo
  this.jefeTexto.setText('¡El jefe se acerca!');
  this.jefeTexto.setVisible(true);

  // Después de 3 segundos, aparece el jefe
  this.time.delayedCall(3000, () => {
    const escenaActual = this.scene.manager.getScenes(true).find(s => s.scene.settings.active && s.scene.key !== 'CerebroScene');
    const nombreEscena = escenaActual?.scene.key || 'ninguna';

    if (!nombreEscena) return;

    this.jefeTexto.setText(`El jefe llegó. Estás en: ${nombreEscena}`);

    // Enviar evento a la escena activa
if (nombreEscena === 'TrabajoScene') {
  this.scene.get('TrabajoScene').events.emit('jefeObserva');
} else if (nombreEscena === 'MenuScene') {
  // El jefe te obliga a volver al trabajo sin decir nada
  this.scene.stop('MenuScene');
  this.scene.launch('TrabajoScene');
}
else if (nombreEscena === 'NaveScene') {
  this.scene.get('NaveScene').events.emit('jefeDetecta');
}

    this.time.delayedCall(3000, () => {
      this.jefeTexto.setText('');
      this.jefeActivo = false; // ← lo marcamos inactivo
    });
  });
}
// swimnub_pk <-- fan de breaktime
}

export default CerebroScene;
