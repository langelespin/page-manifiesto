import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
