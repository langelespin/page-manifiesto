import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageServiceService {

  private idioma = '';


  constructor() { }


  setArray(idioma: any) {
    this.idioma = idioma;
  }
  
  getArray() {
    return this.idioma;
  }


}
