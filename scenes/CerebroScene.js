class CerebroScene extends Phaser.Scene {
constructor() {
  super('CerebroScene');
  this.estado = {
    puntos: 0,
    multiplicador: 1,
    puntosParciales: 0,
    aburrimiento: 0,

  };
    this.jefeActivo = false; // ← NUEVO: control de aparición
}

preload() {
}
// ─────────────────────────────────────
  create() {
this.aburrimientoIntervalEvent = null;
  this.iniciarEmisionDeAburrimiento();
this.ultimoMultiplicador = 1;
   this.estado = {
    puntos: 0,
    multiplicador: 1,
    puntosParciales: 0,
    aburrimiento: 0,
    secuenciasCorrectas: 0
  };

this.add.text(20, 20, 'Prueba', { fontSize: '24px', fill: '#fff' }).setDepth(-20).fontFamily = 'Patrick Hand';
//------------------------------------------
if (this.musicaFondo) this.musicaFondo.stop();
if (this.sonidoAmbiente) this.sonidoAmbiente.stop();

    this.sonidoAmbiente = this.sound.add('GENTE', { loop: true, volume: 1.5 });
this.sonidoAmbiente.play();

// Sonidos ocasionales
this.time.addEvent({
  delay: Phaser.Math.Between(8000, 15000),
  loop: true,
  callback: () => {
    const ambiente = Phaser.Math.RND.pick(['IMPRESORA', 'TELEFONO']);
    this.sound.play(ambiente, { volume: 0.09 });
  }
});

//------------------------------------------
  // Si existe el grupo de textos de instrucciones de antes, eliminarlo
  if (this.textosInstrucciones) {
    this.textosInstrucciones.forEach(t => t.destroy());
    this.textosInstrucciones = [];
  }

  // Igual con la tabla
  if (this.TablaSprite) {
    this.TablaSprite.destroy();
    this.TablaSprite = null;
  }

  // Igual con fondo negro si quedó de antes
  if (this.fondoInstrucciones) {
    this.fondoInstrucciones.destroy();
    this.fondoInstrucciones = null;
  }
    
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
    .setScale(1.5) // Escala del 150%
    .setDepth(2);
// Medio
this.add.sprite(540, 612, 'MESA_MEDIO')
  .play('mesa_medio_anim')
  .setDepth(-4)
  .setScale(1.5) // Escala del 150%
      .setDepth(2);

this.add.sprite(730, 612, 'MESA_MEDIO')
  .play('mesa_medio_anim')
  .setDepth(-4)
  .setScale(1.5)
      .setDepth(2);

  // Derecha
this.add.sprite(1005, 630, 'MESA_DER')
    .play('mesa_der_anim')
    .setDepth(-4)
    .setScale(1.5) // Escala del 150%
        .setDepth(2);

  
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

    // -------------------------------------
  // creo animacion del cuadro
const framesCuadro1 = this.anims.generateFrameNumbers('CUADRO1', { start: 0, end: 8 });
const framesCuadro2 = this.anims.generateFrameNumbers('CUADRO2', { start: 0, end: 8 });
const framesCuadro3 = this.anims.generateFrameNumbers('CUADRO3', { start: 0, end: 8 });
this.anims.create({
  key: 'cuadro_anim',
  frames: [...framesCuadro1, ...framesCuadro2, ...framesCuadro3],
  frameRate: 10,
  repeat: -1
});
// cuadro 
const cuadro = this.add.sprite(1060, 250, 'CUADRO1')
  .play('cuadro_anim')
  .setDepth(-1) // Ajustá según cómo lo quieras apilar
  .setScale(0.3); // O el valor que veas mejor
cuadro.setAlpha(0.8); // Ajustá la opacidad si es necesario

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
this.signoPesos = this.add.sprite(65, 60, 'SIGNO_PESOS').play('signo_pesos_anim');
this.signoPesos.setScale(0.65, 0.4); // Escala del 50%

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
this.marcoAburrimiento = this.add.sprite(1090, 70, 'MARCO_ABURRIMIENTO')
  .play('marco_aburrimiento_anim')
  .setScale(0.6, 0.7)
  .setDepth(5);

// Barra alineada con el marco en (1090, 60)
this.barraAburrimientoMax = 162; // largo total de la barra
this.barraAburrimientoX = 1172;  // borde derecho fijo (igual que el marco)

this.barraAburrimiento = this.add.rectangle(
  this.barraAburrimientoX, 70,   // misma Y que el marco
  this.barraAburrimientoMax, 20, // largo inicial y alto
  0x00ff00                       // color inicial (verde)
).setOrigin(1, 0.5).setDepth(4);

// ────────────────────────────────
// creo animación del emoji
const framesEmoji = this.anims.generateFrameNumbers('EMOJI', { start: 0, end: 29 });
this.anims.create({
  key: 'emoji_anim',
  frames: framesEmoji,
  frameRate: 10,
  repeat: -1
});
// emoji
this.emoji = this.add.sprite(1230, 60, 'EMOJI')
  .play('emoji_anim')
  .setScale(0.5) // ajustá la escala si hace falta  

    // ────────────────────────────────
    


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

    /*this.aburrimientoTexto = this.add.text(600, 50, `Aburrimiento: ${this.estado.aburrimiento}%`, {
      fontSize: '24px',
      color: '#ff0000',
      fontFamily: 'Arial'
    });*/

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

this.ultimoMultiplicador = 1; // Esto va en create() o constructor

this.events.on('actualizarMultiplicador', ({ multiplicador, puntosParciales, secuenciasCorrectas }) => {
  this.estado.multiplicador = multiplicador;
  this.estado.puntosParciales = puntosParciales;
  this.estado.secuenciasCorrectas = secuenciasCorrectas;

  // 🔊 Efecto solo si cambia
  if (multiplicador !== this.ultimoMultiplicador) {
    if (multiplicador === 2) {
      this.spriteMultiplicador.setTexture('MULTI_X2').play('multi_x2_anim').setVisible(true);
      this.puntosParcialesTexto.setColor('#aaff66');
      this.sound.play('MULTI1', { volume: 0.2 });
    } else if (multiplicador === 4) {
      this.spriteMultiplicador.setTexture('MULTI_X4').play('multi_x4_anim').setVisible(true);
      this.puntosParcialesTexto.setColor('#ffff66');
      this.sound.play('MULTI2', { volume: 0.2 });
    } else if (multiplicador === 6) {
      this.spriteMultiplicador.setTexture('MULTI_X6').play('multi_x6_anim').setVisible(true);
      this.puntosParcialesTexto.setColor('#85fff9');
      this.sound.play('MULTI3', { volume: 0.2 });
    } else {
      this.spriteMultiplicador.setVisible(false);
      this.puntosParcialesTexto.setColor('#008080');
    }

    // ⚠️ Guardamos el nuevo valor
    this.ultimoMultiplicador = multiplicador;
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

this.barraAburrimiento.setSize(nuevoAncho, 20);  // ← actualizá tamaño físico
this.barraAburrimiento.displayWidth = nuevoAncho; // ← actualizá visualmente
this.barraAburrimiento.x = this.barraAburrimientoX; // ← borde derecho fijo

// Color dinámico
if (this.estado.aburrimiento < 40) {
  this.barraAburrimiento.fillColor = 0x00ff00; // verde
} else if (this.estado.aburrimiento < 75) {
  this.barraAburrimiento.fillColor = 0xffff00; // amarillo
} else {
  this.barraAburrimiento.fillColor = 0xff0000; // rojo
}


   if (this.estado.aburrimiento >= 100) {
    this.mostrarPantallaDerrota();
        console.log('se manda la derrota')

  }
});


    // Siempre encima de todo
    this.scene.bringToTop();

    // AGRUPACION DE ELEMENTOS DE LA HUD
    // HUD agrupada para poder ocultarla
  this.hudElements = this.add.group([
    this.contenedor,
    this.puntosTexto,
    this.multiplicadorTexto,
    this.puntosParcialesTexto,
    this.spriteMultiplicador,
    this.marcoAburrimiento,
    this.barraAburrimiento,
    this.emoji,
    this.signoPesos
  ]);

  // LANZO ESCENA MENUPRINCIPAL
  // LANZO EL MENÚ PRINCIPAL AL INICIO
this.scene.launch('MenuPrincipalScene'); // ← la escena del menú inicial
this.ocultarHUD(true);

this.scene.get('MenuPrincipalScene').events.on('empezarJuego', () => {
  this.mostrarInstrucciones();
});

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
  .setDepth(3); // Ajustá según cómo lo quieras apilar
  // Podés escalarlo si queda chico
monitor.setScale(1.75, 1.75); // O el valor que veas mejor

// ───────────────────────────────
              //JEFE ANIMACIONES
      this.anims.create({
    key: 'aviso_jefe_anim',
    frames: this.anims.generateFrameNumbers('JEFE_VENTANA', { start: 0, end: 36 }), // N = cantidad de cuadros - 1
    frameRate: 14,
    repeat: 0
  });

  this.avisoJefeSprite = this.add.sprite(240, 225, 'JEFE_VENTANA')
    .setOrigin(0.5)
    .setVisible(false)
    .setScale(1.7)
    .setDepth(10); // asegurate que esté encima de todo
  
  
      this.anims.create({
    key: 'jefe_mesa_anim',
    frames: this.anims.generateFrameNumbers('JEFE_MESA', { start: 0, end: 36 }), // N = cantidad de cuadros - 1
    frameRate: 14,
    repeat: 0
  });

  this.avisoJefeMesa = this.add.sprite(1085, 360, 'JEFE_MESA')
  .setOrigin(0.5)
  .setVisible(false)
  .setScale(1)
  .play('jefe_mesa_anim')

      this.anims.create({
    key: 'jefe_noti_anim',
    frames: this.anims.generateFrameNumbers('JEFE_NOTI', { start: 0, end: 28 }), // N = cantidad de cuadros - 1
    frameRate: 12,
    repeat: 0
  });

  this.avisoJefeNoti = this.add.sprite(790, 390, 'JEFE_NOTI')
  .setOrigin(0.5)
  .setVisible(false)
  .setScale(0.9)
  .play('jefe_noti_anim');

    const framesJefe1 = this.anims.generateFrameNumbers('JEFE1', { start: 0, end: 7 });
const framesJefe2 = this.anims.generateFrameNumbers('JEFE2', { start: 0, end: 7 });
const framesJefe3 = this.anims.generateFrameNumbers('JEFE3', { start: 0, end: 7 });
const framesJefe4 = this.anims.generateFrameNumbers('JEFE4', { start: 0, end: 7 });
 const framesJefe5 = this.anims.generateFrameNumbers('JEFE5', { start: 0, end: 7 });

    this.anims.create({
    key: 'jefe_anim',
    frames: [...framesJefe1, ...framesJefe2, ...framesJefe3, ...framesJefe4, ...framesJefe5],
    frameRate: 12,
    repeat: 0
     });

  this.JefeViendo = this.add.sprite(190, 400, 'JEFE')
  .setOrigin(0.5)
  .setVisible(false)
  .setScale(1.6)
  .setDepth(1);

  // ------------------------
         const framesTabla1 = this.anims.generateFrameNumbers('TABLA1', { start: 0, end: 9 });
const framesTabla2 = this.anims.generateFrameNumbers('TABLA2', { start: 0, end: 9 });
const framesTabla3 = this.anims.generateFrameNumbers('TABLA3', { start: 0, end: 9 });

    this.anims.create({
    key: 'tabla_anim',
    frames: [...framesTabla1, ...framesTabla2, ...framesTabla3],
    frameRate: 12,
    repeat: -1
     });

  this.TablaSprite = this.add.sprite(640, 360, 'TABLA1') // centro pantalla
  .setOrigin(0.5)
  .setScale(1.6)
  .setVisible(false)
  .setDepth(20) // bien arriba
  .play('tabla_anim');
//-------------------------------------------------------------
//cosas del como jugar
//creo animacion del como jugar
this.anims.create({
    key: 'como_jugar_anim',
    frames: this.anims.generateFrameNumbers('COMOJUGAR', { start: 0, end: 29 }), // N = cantidad de cuadros - 1
    frameRate: 10,
    repeat: -1
  });
//creo animacion de las flechas
this.anims.create({
    key: 'flechas_anim',
    frames: this.anims.generateFrameNumbers('FLECHAS_INDICADOR', { start: 0, end: 29 }), // N = cantidad de cuadros - 1
    frameRate: 10,
    repeat: -1
  });
//creo animacion de la tecla Z
this.anims.create({
    key: 'z_indicador_anim',
    frames: this.anims.generateFrameNumbers('Z_INDICADOR', { start: 0, end: 29 }), // N = cantidad de cuadros - 1
    frameRate: 10,
    repeat: -1
  });
//creo animacion de la tecla X
this.anims.create({
    key: 'x_indicador_anim',
    frames: this.anims.generateFrameNumbers('X_INDICADOR', { start: 0,
      end: 29 }), // N = cantidad de cuadros - 1
    frameRate: 10,
    repeat: -1
  });
//ANIMACION DEL DESPEDIDO
this.anims.create({
    key: 'despedido_anim',
    frames: this.anims.generateFrameNumbers('DESPEDIDO', { start: 0, end: 29 }), // N = cantidad de cuadros - 1
    frameRate: 10,
    repeat: -1
  });
  //animacion del dinero obtenido
this.anims.create({
    key: 'dinero_obtenido_anim',
    frames: this.anims.generateFrameNumbers('DINERO_OBTENIDO', { start: 0, end: 29 }), // N = cantidad de cuadros - 1
    frameRate: 10,
    repeat: -1
  });


// --------------------------------------------------------------------
  // Flag de estado
this.mostrandoInstrucciones = false;
  }
//-----------------------------
  iniciarEmisionDeAburrimiento() {
  if (this.aburrimientoEmitEvent) {
    this.aburrimientoEmitEvent.remove();
    this.aburrimientoEmitEvent = null;
  }

  this.aburrimientoEmitEvent = this.time.addEvent({
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
}
//-------------------------
mostrarInstrucciones() {
  // Evitar que se cree dos veces
  if (this.mostrandoInstrucciones) return;

  this.mostrandoInstrucciones = true;

  // Crear fondo oscuro
  this.fondoInstrucciones = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.6).setDepth(10);

  // Mostrar tabla
  this.TablaSprite.setVisible(true);

  // Crear sprites y textos
  this.textosInstrucciones = [];

  this.spriteTituloInstrucciones = this.add.sprite(640, 140, 'COMOJUGAR')
    .play('como_jugar_anim')
    .setOrigin(0.5)
    .setDepth(21);

  this.spriteFlechas = this.add.sprite(640, 220, 'FLECHAS_INDICADOR')
    .play('flechas_anim')
    .setOrigin(0.5)
    .setScale(0.8)
    .setDepth(21);

  this.spriteZ = this.add.sprite(550, 330, 'Z_KEY')
    .play('z_indicador_anim')
    .setOrigin(0.5)
    .setScale(0.8)
    .setDepth(21);

  this.spriteX = this.add.sprite(730, 330, 'X_KEY')
    .play('x_indicador_anim')
    .setOrigin(0.5)
    .setScale(0.8)
    .setDepth(21);

  this.textosInstrucciones.push(
    this.add.text(520, 270, 'Navegación / Ingresar flechas', {
      fontSize: '24px',
      color: '#000000',
      fontFamily: 'Patrick Hand',
    }).setOrigin(0, 0.5).setDepth(21),

    this.add.text(470, 370, 'Aceptar / Disparar', {
      fontSize: '24px',
      color: '#000000',
      fontFamily: 'Patrick Hand',
    }).setOrigin(0, 0.5).setDepth(21),

    this.add.text(710, 370, 'Salir', {
      fontSize: '24px',
      color: '#000000',
      fontFamily: 'Patrick Hand',
    }).setOrigin(0, 0.5).setDepth(21),

    this.add.text(640, 400, '-------------------------', {
      fontSize: '20px',
      color: '#888888',
      fontFamily: 'Arial',
      align: 'center'
    }).setOrigin(0.5).setDepth(21),

    this.add.text(630, 470, '- Trabajá para ganar dinero\n- Jugá para no quedarte dormido\n- ¡Que el jefe no te descubra jugando!', {
      fontSize: '26px',
      color: '#000000',
      fontFamily: 'Patrick Hand',
      align: 'center',
      lineSpacing: 10
    }).setOrigin(0.5).setDepth(21),

    this.add.text(640, 570, 'Intentá hacer la mayor cantidad de \ndinero antes de que te despidan...', {
      fontSize: '26px',
      color: '#ad0c00',
      fontFamily: 'Patrick Hand',
      align: 'center',
      lineSpacing: 6
    }).setOrigin(0.5).setDepth(21),

    this.add.text(640, 640, 'Pulsa Z para comenzar', {
      fontSize: '24px',
      color: '#3b3b3b',
      fontFamily: 'Patrick Hand',
      align: 'center',
      lineSpacing: 10
    }).setOrigin(0.5).setDepth(21)
  );
}



iniciarSubidaDeAburrimientoConElTiempo() {
   console.log(' iniciarSubidaDeAburrimientoConElTiempo fue llamada');
  if (this.aburrimientoEvent) {
    this.aburrimientoEvent.remove();
    this.aburrimientoEvent = null;
  }

  this.aburrimientoEvent = this.time.addEvent({
    delay: 20000,
    loop: true,
    callback: () => {
      this.aburrimientoTrabajo++;
      this.aburrimientoMenu++;
      this.aburrimientoNave++;
      console.log(`Aburrimiento → Trabajo: ${this.aburrimientoTrabajo}, Menu: ${this.aburrimientoMenu}, Nave: ${this.aburrimientoNave}`);
    }
  });
}
 //------------------------
iniciarTemporizadorJefe() {
  const delay = Phaser.Math.Between(9000, 30000);

  this.jefeTimer = this.time.delayedCall(delay, () => {
    if (!this.jefeActivo) {
      this.aparecerJefe();
    }
    // Programar próxima aparición
    this.iniciarTemporizadorJefe();
  });
}
  // ------------------------
  ocultarHUD(ocultar) {
  // Ocultá o mostrá elementos del HUD según corresponda
  this.puntosTexto.setVisible(!ocultar);
  this.puntosParcialesTexto.setVisible(!ocultar);
  this.spriteMultiplicador.setVisible(!ocultar);
  this.marcoAburrimiento.setVisible(!ocultar);
  this.barraAburrimiento.setVisible(!ocultar);
  this.emoji.setVisible(!ocultar);
  this.contenedor.setVisible(!ocultar);
  this.signoPesos.setVisible(!ocultar);

}
// ------------------------
aparecerJefe() {
  this.jefeActivo = true;

  // Ocultar todos por si acaso
  this.avisoJefeMesa.setVisible(false).stop();
  this.avisoJefeNoti.setVisible(false).stop();
  this.avisoJefeSprite.setVisible(false).stop();

  // Elegir uno aleatorio
  const random = Phaser.Math.Between(1, 3);
  let spriteElegido = null;

  if (random === 1) {
    spriteElegido = this.avisoJefeMesa;
    spriteElegido.play('jefe_mesa_anim');
  } else if (random === 2) {
    spriteElegido = this.avisoJefeNoti;
    spriteElegido.play('jefe_noti_anim');
    this.sound.play('NOTI', { volume: 0.5 })
  } else {
    spriteElegido = this.avisoJefeSprite;
    spriteElegido.play('aviso_jefe_anim');
  }

  spriteElegido.setVisible(true);

  // Después de 4 segundos, el jefe llega
  this.time.delayedCall(4000, () => {
    const escenaActual = this.scene.manager.getScenes(true).find(s => s.scene.settings.active && s.scene.key !== 'CerebroScene');
    const nombreEscena = escenaActual?.scene.key || 'ninguna';

    if (!nombreEscena) return;

     // Mostrar el jefe observando, siempre
  this.JefeViendo.setVisible(true).play('jefe_anim');
  const gruñidos = ['GRUÑIDO1', 'GRUÑIDO2', 'GRUÑIDO3', 'GRUÑIDO4'];
const seleccion_gruñido = Phaser.Math.RND.pick(gruñidos);
this.gruñido = this.sound.add(seleccion_gruñido, { loop: false, volume: 0.4 });
this.gruñido.play();

  

if (nombreEscena === 'TrabajoScene') {
  // No lanzar de nuevo si ya está activa
  this.scene.get('TrabajoScene').events.emit('jefeObserva');
} else if (nombreEscena === 'MenuScene') {
  this.scene.stop('MenuScene');
  this.scene.launch('TrabajoScene');
   // ⚠️ Esperar a que se cree TrabajoScene antes de emitir
  this.scene.get('TrabajoScene').events.once('create', () => {
    this.scene.get('TrabajoScene').events.emit('jefeObserva');
  });
} else if (nombreEscena === 'NaveScene') {
  this.scene.get('NaveScene').events.emit('jefeDetecta');
}

    // Ocultamos la animación del aviso
      this.jefeActivo = false;
      spriteElegido.setVisible(false);
    });


  };
// swimnub_pk <-- fan de breaktime

resetearEstadoInicial() {
  this.estado = {
    puntos: 0,
    multiplicador: 1,
    puntosParciales: 0,
    aburrimiento: 0,
    secuenciasCorrectas: 0
  };
  console.log(`Aburrimiento tras reinicio: Trabajo=${this.aburrimientoTrabajo}, Menu=${this.aburrimientoMenu}, Nave=${this.aburrimientoNave}`);

  // Reiniciar valores específicos de aburrimiento en escenas
  this.aburrimientoTrabajo = 0;
  this.aburrimientoMenu = 0;
  this.aburrimientoNave = 0;

  // Reiniciar flags de estados
  this.jefeActivo = false;
  this.derrotaMostrada = false;
  this.mostrandoInstrucciones = false;

   // Actualizas la barra de aburrimiento visualmente
  if (this.barraAburrimiento) {
    this.barraAburrimiento.setSize(this.barraAburrimientoMax, 20);
    this.barraAburrimiento.displayWidth = this.barraAburrimientoMax;
    this.barraAburrimiento.x = this.barraAburrimientoX;
    this.barraAburrimiento.fillColor = 0x00ff00;
  }
}
mostrarPantallaDerrota() {
  // 1. Frenar escenas activas
  this.scene.stop('TrabajoScene');
  this.scene.stop('NaveScene');
  this.scene.stop('MenuScene');

  // 2. Evitar múltiples pantallas de derrota
  if (this.derrotaMostrada) return;
  this.derrotaMostrada = true;

  this.sound.play('TROMPETA', { volume: 0.5 });
  // 3. Mostrar HUD de derrota
  this.fondoInstrucciones = this.add.rectangle(640, 360, 1280, 720, 0x000000, 0.6)
    .setDepth(10);

  this.TablaSprite = this.add.sprite(640, 360, 'TABLA1')
    .setDepth(20)
    .setScale(1.8);

  // Sprite de “DESPEDIDO”
  this.spriteDespedido = this.add.sprite(640, 180, 'DESPEDIDO')
    .play('despedido_anim')
    .setScale(1)
    .setOrigin(0.5)
    .setDepth(21);

  // Sprite de “Dinero obtenido”
  this.spriteDinero = this.add.sprite(640, 340, 'DINERO_TEXTO')
  .play('dinero_obtenido_anim')
    .setScale(0.9)
    .setOrigin(0.5)
    .setDepth(21);

  // Texto con el monto de dinero
  this.textosDerrota = [];

  this.textosDerrota.push(
    this.add.text(640, 400, `$${this.estado.puntos}`, {
      fontSize: '48px',
      fontStyle: 'Bold',
      color: '#398a00',
      fontFamily: 'Comic Neue'
    }).setOrigin(0.5).setDepth(21)
  );

  this.textosDerrota.push(
    this.add.text(640, 550, 'Presiona X para volver al menú', {
      fontSize: '26px',
      fontStyle: 'Bold',
      color: '#000000',
      fontFamily: 'Comic Neue'
    }).setOrigin(0.5).setDepth(21)
  );

  // ▶️ Volver al menú al apretar X
  this.input.keyboard.once('keydown-X', () => {
    this.scene.stop('TrabajoScene');
    this.scene.stop('MenuScene');
    this.scene.stop('MenuPrincipalScene');
    this.scene.stop('NaveScene');

    this.resetearEstadoInicial();

    if (this.aburrimientoEmitEvent) {
      this.aburrimientoEmitEvent.remove();
      this.aburrimientoEmitEvent = null;
    }
    this.iniciarEmisionDeAburrimiento();

    this.scene.stop('CerebroScene');
    this.scene.start('CerebroScene'); 
  });
}


ocultarInstruccionesYEmpezar() {
  this.ocultarHUD(false);
  this.mostrandoInstrucciones = false;

  this.textosInstrucciones.forEach(texto => texto.destroy());
  this.textosInstrucciones = [];
  this.fondoInstrucciones.destroy();
  this.TablaSprite.setVisible(false);

  // Reiniciar aburrimiento antes de empezar

  // Bajar volumen del ambiente
this.tweens.add({
  targets: this.sonidoAmbiente,
  volume: 0.3,
  duration: 1000
});

// Reproducir música random
const canciones = ['MUSICA1', 'MUSICA2', 'MUSICA3', 'MUSICA4'];
const seleccion = Phaser.Math.RND.pick(canciones);
this.musicaFondo = this.sound.add(seleccion, { loop: true, volume: 0.4 });
this.musicaFondo.play();

  // Lanzar escenas
  this.scene.stop('MenuPrincipalScene');
  this.scene.launch('MenuScene');
  
this.estado.aburrimiento = 0;
this.estado.puntos = 0;



//this.actualizarBarraAburrimiento(); // ← que la barra refleje 0
this.aburrimientoTrabajo = 2;
this.aburrimientoMenu = 1;
this.aburrimientoNave = 2;


//this.actualizarBarraAburrimiento(); // ← ahora sí se va a ver una barra mínima

// Recién después, el evento automático
this.spriteTituloInstrucciones.destroy();
this.spriteFlechas.destroy();
this.spriteZ.destroy();
this.spriteX.destroy();

this.iniciarSubidaDeAburrimientoConElTiempo();

  this.iniciarTemporizadorJefe();
}


update() {
  if (this.mostrandoInstrucciones && Phaser.Input.Keyboard.JustDown(this.input.keyboard.addKey('Z'))) {
    this.ocultarInstruccionesYEmpezar();
  }
}

}
export default CerebroScene;
