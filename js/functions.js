var serpiente;
window.onload = ()=> {
  // Crear Serpiente y Manzana
  serpiente = {
    avanceAutomatico: null,
    cuerpo: [
      [1,5],  // Cabeza
      [0,5],  // Cola
    ],
    direccion: "abajo", // abajo - arriba- izquierda - derecha
    velocidad: 1000,
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
      if(!this.comerManzana()){
        this.borrarUltima();
        this.cuerpo.pop();
      }
    },
    avanzarALaIzquierda: function(){
      this.direccion = "izquierda";
      if(this.haChocadoConPared()) return;
      if(this.seHaMordido()) return;
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0],cabeza[1]-1 ] );
      this.dibujar();
      if(!this.comerManzana()){
        this.borrarUltima();
        this.cuerpo.pop();
      }
    },
    avanzarAbajo: function(){
      this.direccion = "abajo";
      if(this.haChocadoConPared()) return;
      if(this.seHaMordido()) return;
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0]+1,cabeza[1] ] );
      this.dibujar();
      if(!this.comerManzana()){
        this.borrarUltima();
        this.cuerpo.pop();
      }
    },
    avanzarArriba: function(){
      this.direccion = "arriba";
      if(this.haChocadoConPared()) return;
      if(this.seHaMordido()) return;
      const cabeza = this.cuerpo[0];
      this.cuerpo.unshift([ cabeza[0]-1,cabeza[1] ] );
      this.dibujar();
      if(!this.comerManzana()){
        this.borrarUltima();
        this.cuerpo.pop();
      }
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
      }, this.velocidad);
    },
    detenerAvanzadoAutomatico: function(){
      clearInterval(this.avanceAutomatico);
    },
    aumentarVelocidad: function(){
      this.detenerAvanzadoAutomatico();
      this.velocidad-=10;
      console.log(this.velocidad);
      this.avanzarAutomaticamente();
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
    },
    comerManzana: ()=>{
      let comioManzana = false;
      if(this.manzana.ubicacion.join("") == this.serpiente.cuerpo[0].join("")){
        comioManzana = true;
        this.manzana.ubicacionAleatoria();
        this.serpiente.aumentarVelocidad();
      }
      return comioManzana;
    }
  };
  manzana = {
    ubicacion: [],
    ubicacionAleatoria: function(){
      let row = Math.floor(Math.random()*9) + 0;
      let column = Math.floor(Math.random()*9) + 0;
      this.ubicacion = [row,column];
      this.interfiereConSerpiente() ? this.ubicacionAleatoria() : this.dibujar();
    },
    interfiereConSerpiente: ()=>{
      interfiere = false;
      this.serpiente.cuerpo.forEach((cuerpo, i) => {
        if(cuerpo.join("") == manzana.ubicacion.join("")){
          interfiere = true;
        }
      });
      return interfiere;
    },
    dibujar: function(){
      const renglon = this.ubicacion[0];
      const columna = this.ubicacion[1];
      const str = "[data-row='"+renglon+"'][data-column='"+columna+"']";
      const cell = document.querySelector(str);
      cell.style.backgroundColor = "orange";
    },
    borrar: function(){
      if(!this.ubicacion.length) return;
      const str = "[data-row='"+this.ubicacion[0]+"'][data-column='"+this.ubicacion[1]+"']";
      const cell = document.querySelector(str);
      cell.style.backgroundColor = "lightgray";
    },
  };
  // Inicializa El juego
  crearControles();
  serpiente.dibujar();
  serpiente.avanzarAutomaticamente();
  manzana.ubicacionAleatoria();
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
