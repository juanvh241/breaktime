class CerebroScene extends Phaser.Scene {
  constructor() {
    super('CerebroScene');
    this.puntos = 0;
    this.multiplicador = 1;
    this.puntosParciales = 0;
    this.aburrimiento = 0;
  }

  create() {
    // Textos de UI
    this.puntosTexto = this.add.text(100, 50, `Puntos: ${this.puntos}`, {
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

    this.aburrimientoTexto = this.add.text(600, 50, `Aburrimiento: ${this.aburrimiento}%`, {
      fontSize: '24px',
      color: '#ff0000',
      fontFamily: 'Gloria Hallelujah'
    });

    // Escuchar eventos desde otras escenas
    this.events.on('actualizarPuntos', (puntos) => {
      this.puntos = puntos;
      this.puntosTexto.setText(`Puntos: ${this.puntos}`);
    });

    this.events.on('actualizarMultiplicador', ({ multiplicador, puntosParciales }) => {
      this.multiplicador = multiplicador;
      this.puntosParciales = puntosParciales;

      if (multiplicador > 1) {
        this.multiplicadorTexto.setText(`x${multiplicador}`);
        this.puntosParcialesTexto.setText(`Acumulado: ${puntosParciales}`);
      } else {
        this.multiplicadorTexto.setText('');
        this.puntosParcialesTexto.setText('');
      }
    });

    this.events.on('subirAburrimiento', (cantidad) => {
      this.aburrimiento = Phaser.Math.Clamp(this.aburrimiento + cantidad, 0, 100);
      this.aburrimientoTexto.setText(`Aburrimiento: ${this.aburrimiento}%`);
    });

    // Siempre encima de todo
    this.scene.bringToTop();
    this.scene.launch('MenuScene');
  }
}

export default CerebroScene;
