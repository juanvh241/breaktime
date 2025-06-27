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
}


// ─────────────────────────────────────
  create() {
        // rectangulo blanco mediano
    this.add.rectangle(640, 600, 1280, 300, 0xffffff).setOrigin(0.5) .setDepth(-5);

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
    .setScale(1.5) // Escala del 150%

// ─────────────────────────────────────    
    
    // animacion del monitor
const framesParte1 = this.anims.generateFrameNumbers('MONITOR1', { start: 0, end: 17 }); // X = cantidad - 1
const framesParte2 = this.anims.generateFrameNumbers('MONITOR2', { start: 0, end: 11 }); // Y = cantidad - 1

this.anims.create({
  key: 'monitor_anim',
  frames: [...framesParte1, ...framesParte2],
  frameRate: 15,
  repeat: -1
});

const monitor = this.add.sprite(640, 400, 'MONITOR1') // poné la posición que quieras
  .play('monitor_anim')
  .setDepth(-3); // Ajustá según cómo lo quieras apilar

// Podés escalarlo si queda chico
monitor.setScale(1.5); // O el valor que veas mejor
    // ─────────────────────────────────────
  

        
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
    this.puntosTexto = this.add.text(100, 50, `Puntos: ${this.estado.puntos}`, {
      fontSize: '24px',
      color: '#006400',
      fontFamily: 'Arial'
    });

    this.multiplicadorTexto = this.add.text(300, 50, '', {
      fontSize: '24px',
      color: '#00ff00',
      fontFamily: 'Arial'
    });

    this.puntosParcialesTexto = this.add.text(100, 80, '', {
      fontSize: '24px',
      color: '#008080',
      fontFamily: 'Arial'
    });

    this.aburrimientoTexto = this.add.text(600, 50, `Aburrimiento: ${this.estado.aburrimiento}%`, {
      fontSize: '24px',
      color: '#ff0000',
      fontFamily: 'Gloria Hallelujah'
    });

    // Escuchar eventos desde otras escenas
this.events.on('actualizarPuntos', (puntos) => {
  this.estado.puntos = puntos;
  this.puntosTexto.setText(`Puntos: ${this.estado.puntos}`);
});

this.events.on('actualizarMultiplicador', ({ multiplicador, puntosParciales, secuenciasCorrectas }) => {
  this.estado.multiplicador = multiplicador;
  this.estado.puntosParciales = puntosParciales;
  this.estado.secuenciasCorrectas = secuenciasCorrectas;

  if (multiplicador > 1) {
    this.multiplicadorTexto.setText(`x${multiplicador}`);
    this.puntosParcialesTexto.setText(`Acumulado: ${puntosParciales}`);
  } else {
    this.multiplicadorTexto.setText('');
    this.puntosParcialesTexto.setText('');
  }
});

this.events.on('subirAburrimiento', (cantidad) => {
  this.estado.aburrimiento = Phaser.Math.Clamp(this.estado.aburrimiento + cantidad, 0, 100);
  this.aburrimientoTexto.setText(`Aburrimiento: ${this.estado.aburrimiento}%`);

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
  delay: Phaser.Math.Between(8000, 30000), // cada 5 a 30 segundos
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
