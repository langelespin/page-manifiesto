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

  siteKey = '6LfspQ8pAAAAAMn-_3hkF8rtIiiS6CDwFM3IMlka';
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
    recaptcha: ['']
  })
  constructor(
    private paisesService: PaisesService,
    private dt: FormBuilder
    ){

  }
  ngOnInit(){
    
    this.paisesService.getAllPaises().subscribe( result => {
      this.pais = result;
      this.pais = this.pais.filter((pais) => pais.value != 96);
      console.log(this.pais)
    }, error => {console.log("error", error)});
  }
  fileName = '';
  formData: any;
  file: any;
  fileExt: any;
  saveFile(event:any){
    const file:File = event.target.files[0];
    this.formFirm.controls['logo'].setValue(event.target.files[0].name);
    console.log(file);
    if (file&&file.size<3000000) {
      var fileExtension = '.' + file.name.split('.').pop();
      this.fileExt = fileExtension
      if(fileExtension=='.png' || fileExtension=='.jpg'){
          //this.fileName = this.data.cveentrev+'/licenciaMarcalyc_'+this.data.cvesolusu+'_'+this.data.cveentrev+'_'+this.data.cveusulic+fileExtension;
          
          var img = new Image();
          var bandera:boolean = false;
          img.onload = function () 
          {
            bandera = img.width<181&&img.width>174&&img.height>89&&img.height<96;
          };
          img.src = URL.createObjectURL(file);
          setTimeout(()=>{
          if(bandera != false){
            this.formData = new FormData();
            this.file = file
            this.formData.append('tipo','cumbre');
            this.formData.append('clave', 'manifiesto');
          }else{
            Swal.fire({
              icon: 'error',
              title: 'Las dimensiones del logo deben ser de largo de 175px-180px y de ancho de 90px-95px.',
              showConfirmButton: true,
            })
            this.formFirm.controls['logo'].setValue(null)

          }
          },500);
          
      }else{
          //mensaje de error formato
          console.log('error de formato');
          Swal.fire({
            icon: 'error',
            title: 'El archivo debe ser PNG o JPG con extensión <strong>.png o .jpg</strong>',
            showConfirmButton: true,
          })
          this.formFirm.controls['logo'].setValue(null)


      }
  }else{
      //mensaje de error tamaño
      console.log('error de tamaño');
      Swal.fire({
        icon: 'error',
        title: 'El tamaño del archivo no debe exceder los 3MB',
        showConfirmButton: true,
      })
      this.formFirm.controls['logo'].setValue(null)

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
        this.fileName = '/'+response.id+'_logo'+this.fileExt;
        this.formData.append("archivo", this.file,this.fileName!);
        console.log("fileName", this.fileName);
        this.paisesService.postSubirArchivo(this.formData).subscribe(a=>{
          console.log('FILE -->', a)
          if(response.status === "OK"){
            Swal.fire({
            icon: 'success',
            title: localStorage.getItem('idioma') == 'es' ? 'Su firma se registró correctamente' : localStorage.getItem('idioma') == 'en' ? 'Your signature was successfully recorded' : 'A sua assinatura foi registada corretamente',
            showConfirmButton: false,
            timer: 2500
          })
          };
    
        },
        error => {
          console.log("error", error);
          Swal.fire({
            icon: 'error',
            title: localStorage.getItem('idioma') == 'es' ? 'Sus datos se guardaron exitosamente, pero la exportación de su logo fallo, favor de enviar su logo a globaldiamantoa@gmail.com' : localStorage.getItem('idioma') == 'en' ? 'Your data was saved successfully, but the export of your logo failed, please send your logo to globaldiamantoa@gmail.com.' : 'Os seus dados foram guardados com sucesso, mas a exportação do seu logótipo falhou. Envie o seu logótipo para globaldiamantoa@gmail.com.',
            showConfirmButton: true,
          })
        });
      }else{
        if(response.status === "OK"){
          Swal.fire({
          icon: 'success',
          title: localStorage.getItem('idioma') == 'es' ? 'Su firma se registró correctamente' : localStorage.getItem('idioma') == 'en' ? 'Your signature was successfully recorded' : 'A sua assinatura foi registada corretamente',
          showConfirmButton: false,
          timer: 2500
        })
        }/*else{
          let mensaje = response.split("||")
          Swal.fire({
            icon: 'error',
            title: localStorage.getItem('idioma') == 'es' ? mensaje[0] : localStorage.getItem('idioma') == 'en' ? mensaje[1] : 'Já existe uma conta de utilizador com este e-mail, por favor verifique.',
            showConfirmButton: true,
          })
        };*/
      }
      
  }, error => {
    console.log("error", error);
    let mensaje = error.error.message.includes('||') ? error.error.message.split("||") : error.message
    Swal.fire({
      icon: 'error',
      title: error.error.message.includes('||') ? localStorage.getItem('idioma') == 'es' ? mensaje[0] : localStorage.getItem('idioma') == 'en' ? mensaje[1] : 'Já existe uma conta de utilizador com este e-mail, por favor verifique.' : mensaje,
      showConfirmButton: true,
    })
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

