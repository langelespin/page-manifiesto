import { Component, EventEmitter, OnInit, Output,  } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  title = 'form';
  idioma: any = 'es';
  @Output() enviadoIdioma = new EventEmitter<string> ;

  constructor(
    private translateService:TranslateService) {
    this.translateService.setDefaultLang('es');
    localStorage.setItem('idioma', 'es')
    this.translateService.use(localStorage.getItem('idioma')||'es');
 }
  translate(idioma: any)
  {
    localStorage.setItem('idioma', idioma+'')
    this.idioma = idioma;
    this.enviadoIdioma.emit(idioma);
    this.translateService.use(this.idioma);
  }

  ngOnInit(): void {
  }

}
