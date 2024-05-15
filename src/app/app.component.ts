import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'form';
  idioma: any = 'es';
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
    this.translateService.use(idioma);
  }

}

