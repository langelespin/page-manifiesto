import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {
  // private paises = 'http://148.215.24.201:4001/amelica/usuarios/catalogo/countries';
  // private guardarDatos = 'http://148.215.24.201:5000/siir/usuarios/usuario/guardarRegistroFirma'

  private paises = 'https://fiap.redalyc.org/back/siir/postulacion/catalogo/countries';
  private guardarDatos = 'https://fiap.redalyc.org/back/siir/usuarios/usuario/guardarRegistroFirma'

  constructor(private http: HttpClient) { }
  public getAllPaises(): Observable<any>{
    return this.http.get(this.paises);
  }

  public postAllGuardarRegistroFirma(form: any): Observable<any>{
    console.log(form);
    return this.http.post(this.guardarDatos, form);
  }

  public postSubirArchivo(form:any): Observable<any>{
    return this.http.post('https://fiap.redalyc.org/back/siir/generador/archivos/subir', form);
  }


}

