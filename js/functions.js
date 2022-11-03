var serpiente;
window.onload = ()=> {
  // Crear Serpiente
  serpiente = {
    avanceAutomatico: null,
    cuerpo: [
      [7,5],  // Cabeza
      [6,5],  // Cuerpo
      [5,5],  // Cuerpo
      [4,5],  // Cuerpo
      [3,5],  // Cuerpo
      [2,5],  // Cuerpo
      [1,5],  // Cuerpo
      [0,5],  // Cola
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
      this.direccion = "derecha";
      if(this.haChocadoConPared()) return;
      if(this.seHaMordido()) return;
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0],cabeza[1]+1 ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
    },
    avanzarALaIzquierda: function(){
      this.direccion = "izquierda";
      if(this.haChocadoConPared()) return;
      if(this.seHaMordido()) return;
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0],cabeza[1]-1 ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
    },
    avanzarAbajo: function(){
      this.direccion = "abajo";
      if(this.haChocadoConPared()) return;
      if(this.seHaMordido()) return;
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0]+1,cabeza[1] ] );
      this.dibujar();
      this.borrarUltima();
      this.cuerpo.pop();
    },
    avanzarArriba: function(){
      this.direccion = "arriba";
      if(this.haChocadoConPared()) return;
      if(this.seHaMordido()) return;
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
    haChocadoConPared: function(){
      const cabeza = this.cuerpo[0];
      let hasChocado =
        this.direccion == "derecha" ? cabeza[1]+1 == 10 :
        this.direccion == "izquierda" ? cabeza[1]-1 == -1 :
        this.direccion == "arriba" ? cabeza[0]-1 == -1 :
        this.direccion == "abajo" ? cabeza[0]+1 == 10 : null;

      if(hasChocado){
        this.detenerAvanzadoAutomatico();
        alert("Has Chocado");
      }
      return hasChocado;
    },
    seHaMordido: function(){
      seHaMordido = false;
      let posibleMordidaEn = JSON.parse(JSON.stringify(this.cuerpo[0]));
      if(this.direccion == "derecha")
        posibleMordidaEn[1]++
      else if(this.direccion == "izquierda")
        posibleMordidaEn[1]--;
      else if(this.direccion == "arriba")
        posibleMordidaEn[0]--;
      else if(this.direccion == "abajo")
        posibleMordidaEn[0]++;
      this.cuerpo.forEach((cuerpo, index) => {
        if(index>0 & cuerpo.join("") == posibleMordidaEn.join("")){
          seHaMordido = true;
        }
      });
      if(seHaMordido){
        this.detenerAvanzadoAutomatico();
        alert("seHaMordido");
      }
      return seHaMordido;
    }
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
