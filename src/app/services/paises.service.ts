import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  private paises = 'http://148.215.24.201:4001/amelica/usuarios/catalogo/countries';
  constructor(private http: HttpClient) { }
  public getAllPaises(): Observable<any>{
    return this.http.get(this.paises);
  }


}

