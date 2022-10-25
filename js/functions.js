var serpiente;
window.onload = ()=> {
  // Crear Serpiente
  serpiente = {
    dibujar: function(){
      this.cuerpo.forEach((cuadro, indexCuadro) => {
        const renglon = cuadro[0];
        const columna = cuadro[1];
        const str = "[data-row='"+renglon+"'][data-column='"+columna+"']";
        const cell = document.querySelector(str);
        cell.style.backgroundColor = "green";
      });
    },
    avanzarALaDerecha: function(){
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0],cabeza[1]+1 ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
    },
    avanzarALaIzquierda: function(){
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0],cabeza[1]-1 ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
    },
    avanzarAbajo: function(){
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0]+1,cabeza[1] ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
    },
    avanzarArriba: function(){
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0]-1,cabeza[1] ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
    },
    borrarUltima: function(){
      const ultima = this.cuerpo[this.cuerpo.length-1];
      const str = "[data-row='"+ultima[0]+"'][data-column='"+ultima[1]+"']";
      const cell = document.querySelector(str);
      cell.style.backgroundColor = "lightgray";
    },
    cuerpo : [
      [3,1],  // Cabeza
      [2,1],  // medio
      [1,1], // medio
      [0,1]  // Cola
    ]
  }
  // Inicializa El juego
  serpiente.dibujar();
  crearControles();
};
// Agrega Controles de movimiento con las flechas del teclado
function crearControles(){
  console.log(serpiente);
  document.addEventListener( 'keydown', (e)=>{

     if(e.code == "ArrowRight"){
       serpiente.avanzarALaDerecha();
     }
     if(e.code == "ArrowLeft"){
       serpiente.avanzarALaIzquierda();
     }
     if(e.code == "ArrowUp"){
       serpiente.avanzarArriba();
     }
     if(e.code == "ArrowDown"){
       serpiente.avanzarAbajo();
     }
  });
}
