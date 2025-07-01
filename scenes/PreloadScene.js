class PreloadScene extends Phaser.Scene {
  constructor() {
    super('PreloadScene');
  }

  preload() {
    // Fondo negro
    this.cameras.main.setBackgroundColor('#000000');

    // Texto "Cargando..."
    this.add.text(640, 300, 'Cargando...', {
      fontSize: '32px',
      fill: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Barra de progreso
    const barraFondo = this.add.graphics();
    const barraProgreso = this.add.graphics();

    // Fondo de la barra (gris)
    barraFondo.fillStyle(0x222222, 1);
    barraFondo.fillRect(390, 340, 500, 30);

    // Texto de porcentaje
    const textoPorcentaje = this.add.text(640, 380, '0%', {
      fontSize: '20px',
      fill: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5);

    // Evento de progreso de carga
    this.load.on('progress', (value) => {
      barraProgreso.clear();
      barraProgreso.fillStyle(0xffffff, 1);
      barraProgreso.fillRect(390, 340, 500 * value, 30);
      textoPorcentaje.setText(`${Math.floor(value * 100)}%`);
    });

    // Al finalizar, limpiamos
    this.load.on('complete', () => {
      barraProgreso.destroy();
      barraFondo.destroy();
      textoPorcentaje.destroy();
    });

    // --- Cargá todos tus assets acá ---
    //cerebroscene
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

  this.load.spritesheet('JEFE_VENTANA', 'public/assets/Cerebro/jefe ventana.png', { frameWidth: 132, frameHeight: 135 });
  this.load.spritesheet('JEFE_MESA', 'public/assets/Cerebro/jefe mesa.png', { frameWidth: 200, frameHeight: 191 })
  this.load.spritesheet('JEFE_NOTI', 'public/assets/Cerebro/jefe noti.png', { frameWidth: 274, frameHeight: 120 })

  this.load.spritesheet('JEFE1', 'public/assets/Cerebro/jefe 1.png', { frameWidth: 403, frameHeight: 438 })
    this.load.spritesheet('JEFE2', 'public/assets/Cerebro/jefe 2.png', { frameWidth: 403, frameHeight: 438 })
      this.load.spritesheet('JEFE3', 'public/assets/Cerebro/jefe 3.png', { frameWidth: 403, frameHeight: 438 })
        this.load.spritesheet('JEFE4', 'public/assets/Cerebro/jefe 4.png', { frameWidth: 403, frameHeight: 438 })
          this.load.spritesheet('JEFE5', 'public/assets/Cerebro/jefe 5.png', { frameWidth: 403, frameHeight: 438 })
 
  this.load.spritesheet('TABLA1', 'public/assets/Cerebro/tabla 1.png', { frameWidth: 371, frameHeight: 480 })
   this.load.spritesheet('TABLA2', 'public/assets/Cerebro/tabla 2.png', { frameWidth: 371, frameHeight: 480 })
  this.load.spritesheet('TABLA3', 'public/assets/Cerebro/tabla 3.png', { frameWidth: 371, frameHeight: 480 })
 
  this.load.spritesheet('CUADRO1', 'public/assets/Cerebro/cuadro 1.png', { frameWidth: 482, frameHeight: 343 });
  this.load.spritesheet('CUADRO2', 'public/assets/Cerebro/cuadro 2.png', { frameWidth: 482, frameHeight: 343 });
  this.load.spritesheet('CUADRO3', 'public/assets/Cerebro/cuadro 3.png', { frameWidth: 482, frameHeight: 343 });

  this.load.audio('MUSICA1', 'public/assets/Sonidos/Amazing Plan crushed.wav');
  this.load.audio('MUSICA2', 'public/assets/Sonidos/Hidden Agenda crushed.wav');
  this.load.audio('MUSICA3', 'public/assets/Sonidos/Marty Gots a Plan crushed.wav');
  this.load.audio('MUSICA4', 'public/assets/Sonidos/Scheming Weasel crushed.wav');
  this.load.audio('BOSTEZO', 'public/assets/Sonidos/bostezo crushed.wav');
  this.load.audio('DISPARO', 'public/assets/Sonidos/disparo crushed.wav');
  this.load.audio('ERROR', 'public/assets/Sonidos/error crushed.wav');
  this.load.audio('EXPLOSION', 'public/assets/Sonidos/explosion crushed.wav');
  this.load.audio('GENTE', 'public/assets/Sonidos/gente hablando crushed.wav');
  this.load.audio('GRUÑIDO1', 'public/assets/Sonidos/gruñido 1.wav');
  this.load.audio('GRUÑIDO2', 'public/assets/Sonidos/gruñido 2.wav');
  this.load.audio('GRUÑIDO3', 'public/assets/Sonidos/gruñido 3.wav');
  this.load.audio('GRUÑIDO4', 'public/assets/Sonidos/gruñido 4.wav');
  this.load.audio('IMPRESORA', 'public/assets/Sonidos/impresora crushed.wav');
  this.load.audio('CLICK', 'public/assets/Sonidos/mouse click crushed.wav');
  this.load.audio('MULTI1', 'public/assets/Sonidos/multiplicador x2.wav');
  this.load.audio('MULTI2', 'public/assets/Sonidos/multiplicador x4.wav');
  this.load.audio('MULTI3', 'public/assets/Sonidos/multiplicador x6.wav');
  this.load.audio('NOTI', 'public/assets/Sonidos/notificacion crushed.wav');
  this.load.audio('TECLA1', 'public/assets/Sonidos/teclado 1.wav');
  this.load.audio('TECLA2', 'public/assets/Sonidos/teclado 2.wav');
  this.load.audio('TECLA3', 'public/assets/Sonidos/teclado 3.wav');
  this.load.audio('TECLA4', 'public/assets/Sonidos/teclado 4.wav');
  this.load.audio('TELEFONO', 'public/assets/Sonidos/telefono crushed.wav');
  this.load.audio('HOJAS', 'public/assets/Sonidos/hojas.wav');

  this.load.spritesheet('COMOJUGAR', 'public/assets/Cerebro/como jugar.png', { frameWidth: 401, frameHeight: 109 });
  this.load.spritesheet('Z_INDICADOR', 'public/assets/Cerebro/z indicador.png', { frameWidth: 76, frameHeight: 62 });
  this.load.spritesheet('X_INDICADOR', 'public/assets/Cerebro/x indicador.png', { frameWidth: 63, frameHeight: 60 });
  this.load.spritesheet('FLECHAS_INDICADOR', 'public/assets/Cerebro/flechas indicador.png', { frameWidth: 148, frameHeight: 99 });

  this.load.spritesheet('DESPEDIDO', 'public/assets/Cerebro/despedido.png', { frameWidth: 474, frameHeight: 129 });
  this.load.spritesheet('DINERO_OBTENIDO', 'public/assets/Cerebro/dinero obtenido.png', { frameWidth: 455, frameHeight: 92 });
   
  this.load.audio('TROMPETA', 'public/assets/Sonidos/trompeta sad crushed.wav');
  //navescene
    this.load.spritesheet('balita', 'public/assets/Nave/balita.png', { frameWidth: 27, frameHeight: 27 })
    this.load.spritesheet('cuadradito', 'public/assets/Nave/cuadradito.png', { frameWidth: 64, frameHeight: 64 })
    this.load.spritesheet('nave', 'public/assets/Nave/nave.png', { frameWidth: 93, frameHeight: 93 })

   this.load.image('BarraDeTareas', 'public/assets/Escritorio/barra de tareas.png');
    this.load.spritesheet('BORDE_NAVE', 'public/assets/Escritorio/borde ventana nave.png', { frameWidth: 562, frameHeight: 54 });

    // trabajoscene
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

    //menuscene
    this.load.image('monitorFondo', 'public/assets/MenuIntermedio/MonitorFondo.png');
    this.load.image('iconoTrabajo', 'public/assets/MenuIntermedio/IconoTrabajo.png');
    this.load.image('iconoNave', 'public/assets/MenuIntermedio/IconoNave.png');
  
    this.load.image('BarraDeTareas' , 'public/assets/Escritorio/barra de tareas.png');
  
    this.load.spritesheet('ICONO_TRABAJO', 'public/assets/Escritorio/icono trabajo.png', { frameWidth: 185, frameHeight: 185 });
    this.load.spritesheet('ICONO_NAVE', 'public/assets/Escritorio/icono nave.png', { frameWidth: 180, frameHeight: 180 });

    // ... y todos los demás (sprites, sonidos, etc.)

    // fuente
    
  }

  create() {
document.fonts.ready.then(() => {
  this.scene.start('CerebroScene');
});
  }
}
export default PreloadScene;