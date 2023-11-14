import {Component} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {PaisesService} from 'src/app/services/paises.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent  {

  siteKey = '6Ld9GAopAAAAAC4MrBt5DL-tM_Be8a3lmaGhJP0f';
  showUploadFile: boolean = false;

  pais: any[] = [];
  formFirm = this.dt.group({
    nombre: ['', [Validators.required]],
    apellidos: ['', [Validators.required]],
    correo: ['', [Validators.required, Validators.email]],
    tipo: ['', [Validators.required]],
    institucion: ['', [Validators.required]],
    cargo: ['', [Validators.required]],
    pais: ['', [Validators.required]],
    logo: [''],
    recaptcha: ['', Validators.required]
  })
  constructor(
    private paisesService: PaisesService,
    private dt: FormBuilder
    ){

  }
  ngOnInit(){
    
    this.paisesService.getAllPaises().subscribe( result => {
      this.pais = result;
      console.log(this.pais)
    }, error => {console.log("error", error)});
  }
  fileName = '';
  formData: any;
  file: any;
  saveFile(event:any){
    const file:File = event.target.files[0];
    this.formFirm.controls['logo'].setValue(event.target.files[0].name);
    console.log(file);
    if (file&&file.size<3000000) {
      var fileExtension = '.' + file.name.split('.').pop();
      if(fileExtension=='.png' || fileExtension=='.jpg'){
          //this.fileName = this.data.cveentrev+'/licenciaMarcalyc_'+this.data.cvesolusu+'_'+this.data.cveentrev+'_'+this.data.cveusulic+fileExtension;
          this.formData = new FormData();
          this.file = file
          this.formData.append('tipo','cumbre');
          //this.formData.append('clave',this.data.cveentrev!);  
          this.formData.append('clave', 'manifiesto');
      }else{
          //mensaje de error formato
          console.log('error de formato');
          Swal.fire({
            icon: 'error',
            title: 'El archivo debe ser PNG o JPG con extensión <strong>.png o .jpg</strong>',
            showConfirmButton: true,
          })

      }
  }else{
      //mensaje de error tamaño
      console.log('error de tamaño');
      Swal.fire({
        icon: 'error',
        title: 'El tamaño del archivo no debe exceder los 3MB',
        showConfirmButton: true,
      })
  }   

}
    
  guardarDatos(){
    this.fileName = '/logo';
          this.formData.append("archivo", this.file,this.fileName!);
          this.paisesService.postSubirArchivo(this.formData).subscribe(a=>{
            console.log('FILE -->', a)
            Swal.fire({
              icon: 'success',
              title: 'Se han guardado los datos exitosamente.',
              color: '#336b75',
              backdrop: '#336b756C'
            }).then(() => {
              this.ngOnInit()
              
            });
      
          });
  }
  saveDate(){
   const data={
    "datos":{
      "id": 0,
      "nombre": this.formFirm.get('nombre')?.value,
      "apellidos": this.formFirm.get('apellidos')?.value,
      "correo": this.formFirm.get('correo')?.value,
      "cargo": this.formFirm.get('cargo')?.value,
      "institucion": this.formFirm.get('institucion')?.value,
      "pais": this.formFirm.get('pais')?.value,
      "logo": this.formFirm.get('logo')?.value,
      "tipo": Number(this.formFirm.get('tipo')?.value)
    }
   }
   console.log(data.datos.cargo); 
   if(this.formFirm.valid){
    this.paisesService.postAllGuardarRegistroFirma(data).subscribe( response => {
      console.log(response);
      if(this.formData != undefined && this.formData != null){
        this.fileName = '/'+response.id+'_logo';
        this.formData.append("archivo", this.file,this.fileName!);
        this.paisesService.postSubirArchivo(this.formData).subscribe(a=>{
          console.log('FILE -->', a)
          if(response.status === "OK"){
            Swal.fire({
            icon: 'success',
            title: 'Su firma se registro correctamente',
            showConfirmButton: false,
            timer: 2500
          })
          };
    
        });
      }else{
        if(response.status === "OK"){
          Swal.fire({
          icon: 'success',
          title: 'Su firma se registro correctamente',
          showConfirmButton: false,
          timer: 2500
        })
        };
      }
      
  });
  
  }else {
    this.formFirm.markAllAsTouched();
  }
  console.log('archivo', this.formData);
  }

  handleReset(){
    console.log('handleReset');
  }

  handleExpire(){
    console.log('handleExpire');

  }

  handleSuccess(event:any){
    console.log(event);
  }

  handleLoad(){
    console.log('handleLoad');

  }

  radioChange(event:any){
    if(event.value==='2'){
      this.showUploadFile = true;
    }else if(event.value==='1'){
      this.showUploadFile = false;
    }
  }

  
}

