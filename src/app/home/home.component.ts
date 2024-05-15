import { Component, Input, OnInit,  } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'form';
  
  idioma = 'es';
  recibidoIdioma: string | undefined ;
  constructor() {
   
 }
  

  ngOnInit(): void {
  }

  recibirMensaje(mensaje: string){
    this.recibidoIdioma=mensaje;
    console.log("3", this.recibidoIdioma);
    
    let logotipo = document.getElementById("logotipo");
    let archivoPdf = document.getElementById("archivoPdf");
    if(this.recibidoIdioma == 'es'){
      logotipo?.setAttribute("src", "./assets/img/logo_Manifiesto_sobre_la_ciencia_como_bien_público_global_Acceso_Abierto_No_Comercial_esp.png");
      archivoPdf?.setAttribute("href", "https://globaldiamantoa.org/wp-content/uploads/2023/10/manifiestoCienciaBien-Publico.pdf");
    }
    if(this.recibidoIdioma == 'en'){
      logotipo?.setAttribute("src", "./assets/img/logo_Manifiesto_sobre_la_ciencia_como_bien_público_global_Acceso_Abierto_No_Comercial_eng.png");
      archivoPdf?.setAttribute("href", "http://globaldiamantoa.org/wp-content/uploads/2023/11/Manifesto-SciencePublicGood.pdf");
    }
    if(this.recibidoIdioma == 'pt'){
      logotipo?.setAttribute("src", "./assets/img/logo_Manifesto_sobre_a_ciência_como_um_bem_público_global.png");
      archivoPdf?.setAttribute("href", "https://globaldiamantoa.org/wp-content/uploads/2023/10/Manifesto_sobre_a_ciência_como_um-bem-público_global.pdf");
    }
  }

}
