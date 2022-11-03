var serpiente;
window.onload = ()=> {
  // Crear Serpiente
  serpiente = {
    avanceAutomatico: null,
    cuerpo: [
      [3,5],  // Cabeza
      [2,5],  // medio
      [1,5], // medio
      [0,5]  // Cola
    ],
    direccion: "abajo", // abajo - arriba- izquierda - derecha
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
      const hasChocado = cabeza[1]+1 == 10;
      if(hasChocado){
        this.hasChocadoConPared();
        return;
      }
      this.cuerpo.unshift([ cabeza[0],cabeza[1]+1 ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
      this.direccion = "derecha";
    },
    avanzarALaIzquierda: function(){
      const cabeza = this.cuerpo[0];
      const hasChocado = cabeza[1]-1 == -1;
      if(hasChocado){
        this.hasChocadoConPared();
        return;
      }
      this.cuerpo.unshift([ cabeza[0],cabeza[1]-1 ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
      this.direccion = "izquierda";
    },
    avanzarAbajo: function(){
      const cabeza = this.cuerpo[0];
      const hasChocado = cabeza[0]+1 == 10;
      if(hasChocado){
        this.hasChocadoConPared();
        return;
      }
      this.cuerpo.unshift([ cabeza[0]+1,cabeza[1] ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
      this.direccion = "abajo";
    },
    avanzarArriba: function(){
      const cabeza = this.cuerpo[0];
      const hasChocado = cabeza[0]-1 == -1;
      if(hasChocado){
        this.hasChocadoConPared();
        return;
      }
      this.cuerpo.unshift([ cabeza[0]-1,cabeza[1] ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
      this.direccion = "arriba";
    },
    borrarUltima: function(){
      const ultima = this.cuerpo[this.cuerpo.length-1];
      const str = "[data-row='"+ultima[0]+"'][data-column='"+ultima[1]+"']";
      const cell = document.querySelector(str);
      cell.style.backgroundColor = "lightgray";
    },
    avanzarAutomaticamente: function(){
      this.avanceAutomatico = setInterval( ()=>{
        switch (this.direccion) {
          case "abajo":
            this.avanzarAbajo();
            break;
          case "arriba":
            this.avanzarArriba();
            break;
          case "derecha":
            this.avanzarALaDerecha();
            break;
          case "izquierda":
            this.avanzarALaIzquierda();
            break;
          default:
            console.log("error");
        }
      }, 1000);
    },
    detenerAvanzadoAutomatico: function(){
      clearInterval(this.avanceAutomatico);
    },
    hasChocadoConPared: function(){
      this.detenerAvanzadoAutomatico();
      alert("Has perdido");
    },
  }
  // Inicializa El juego
  serpiente.dibujar();
  crearControles();
  serpiente.avanzarAutomaticamente();
};
// Agrega Controles de movimiento con las flechas del teclado
function crearControles(){
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
