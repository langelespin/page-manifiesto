import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geofata_wordLow from "@amcharts/amcharts4-geodata/worldLow";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
//import { ArticleService } from 'src/app/services/article.service';
import { Country } from '../models/Country.model';
import { PaisesService } from '../services/paises.service';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormControl} from '@angular/forms';

import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5 from "@amcharts/amcharts5";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { PageEvent } from '@angular/material/paginator';


export interface PeriodicElement {
  name: string;
  institution: any;
  country: any;
  type: any;
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})

export class MapComponent implements OnInit {

  //Tabla
  @ViewChild(MatTable) table?: MatTable<any>;

  displayedColumns: any[] = ['name', 'institution', 'country', 'type'];
  ELEMENT_DATA: any[] = []
  dataSource = new MatTableDataSource<any>(this.ELEMENT_DATA);


  serachFormControl = new FormControl('', []);
  
  //private urlProject: string = environment.urlProject;
  countrys!: Country[];
  //private chart!: am4maps.MapChart;}

  firmantes: any[] = []
  idioma = localStorage.getItem('idioma')
  root: any;
  chart: any;
  pais: any = null;

  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  totalPersonas: number = 10;
  totalPaises: number = 20;
  totalPersonasIn: number = 0;
  totalInstOrg: number = 0;
  totalPerOrg: any[] =[];
  paisSelect: string = "";
  bandera: boolean = false;
  busquedaPalabra: string = "";
  palabra: any;

  rutaBandera: string = 'assets/img/banderas/';
  banderaSelect: string = "";




  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    //this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.updateData();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  constructor(
    private paisesService: PaisesService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.translateService.onLangChange.subscribe(resp=>{
      this.idioma = resp.lang
      this.mapaSettings(this.firmantes, this.root, this.chart)
      //this.ngAfterViewInit()
    })
    this.updateData()

    this.paisesService.getTotalesFirmas().subscribe((total: any) => {
      this.totalPersonas = total.totalRegistros;
      this.totalPaises = total.totalPaises;
    })
  }

  ngAfterViewInit(): void {
    /**this.chart = am4core.create('chartdiv', am4maps.MapChart); // Create map instance
    this.chart.geodata = am4geofata_wordLow; // Set map definition
    this.chart.projection = new am4maps.projections.Miller(); // Set projection
    this.chart.maxZoomLevel = 1;
    this.chart.seriesContainer.draggable = false;
    this.chart.seriesContainer.resizable = false;

    
    // Creating polygon series and loadin data
    let polygonSeries = this.chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ['AQ'];
    polygonSeries.useGeodata = true;

    let polygonTemplate = polygonSeries.mapPolygons.template;
    // polygonTemplate.tooltipText = '{name}';
    polygonTemplate.polygon.fillOpacity = 0.6;
    polygonTemplate.fill = am4core.color('#9B9B9B');
    // let hs = polygonTemplate.states.create('hover');
    // hs.properties.fill = am4core.color('#74X999');

    let imageSeries = this.chart.series.push(new am4maps.MapImageSeries());
    imageSeries.dataFields.value = 'value';
    imageSeries.fill = am4core.color('#e5243b');

    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.latitude = 'latitude';
    imageTemplate.propertyFields.longitude = 'longitude';
    imageTemplate.nonScaling = true;
    imageTemplate.fill = am4core.color('white');

    imageSeries.tooltip!.label.interactionsEnabled = true;
    imageSeries.tooltip!.keepTargetHover = true;

    let circle = imageTemplate.createChild(am4core.Circle);
    circle.fillOpacity = 0.7;
    circle.propertyFields.fill = 'color';
    circle.tooltipText = '{name}';
    circle.events.on("hit", function(ev) {
      // zoom to an object
    
      // get object info
      console.log("hit", ev.target.dataItem?.dataContext);
    });
    //circle.urlTarget = '_self';
    //circle.url = this.urlProject + '#/mapa/{clave}';**/
    /*let datos: any = []

      function addCity(longitude: any, latitude: any, title: any, dato: any) {
        datos.push({
          "clave": dato.idPais,
          "color": "#FF4C00",
          "latitude": Number(latitude),
          "name": title,
          "title": title,
          "id": dato.siglas,
          "value": dato.total,
          "longitude": Number(longitude)
        });
      }*/
    this.root = am5.Root.new("chartdiv2");
    this.chart = this.root.container.children.push(
      am5map.MapChart.new(this.root, {
        panX: "rotateX",
        panY: "none",
        projection: am5map.geoMercator(),    
      })
    );

   
    this.paisesService.getDatosMapa().subscribe((countrys: any) => {
      this.firmantes = countrys
      /*for (var i = 0; i < this.firmantes.length; i++) {
        var city = this.firmantes[i];
        if(Number(city.idPais) != 96)
        {
          addCity(city.longitud, city.latitud, (this.idioma == 'en'?  city.paisE : city.pais )+'\n'+city.total, city);
        }
      }*/

      
      this.mapaSettings(countrys, this.root, this.chart)

      
      /**imageSeries.data = datos
      imageSeries.dataSource.parser = new am4core.JSONParser();
      imageSeries.heatRules.push({
        "target": circle,
        'property': 'radius',
        'min': 5,
        'max': 15,
        'dataField': 'value'
      });*/

   });


   
  }

  updateData(tipo?: any)
  {
    this.busquedaPalabra = tipo;
    console.log('33', this.busquedaPalabra);
    this.ELEMENT_DATA = []
    if(tipo == 'busqueda')
    {
      this.pais = null;
    }
    const busqueda = {
      "datos": {
              "paises": tipo == 'busqueda' ? null : (this.pais != null ? Number(this.pais) : this.pais),
              "pageNo": Number(this.pageIndex),
              "paginado": Number(this.pageSize),
              "palabraBusqueda": this.serachFormControl.value
          }
    } 
    this.palabra = busqueda.datos.palabraBusqueda;
    console.log("grr", this.palabra);
    this.totalPerOrg = []
    this.paisesService.getRegistrosFirma(busqueda).subscribe((data: any) =>{
      let posicion = data.content.length - 1;
      console.log("posicion", posicion);
      this.totalPersonasIn = data.content[posicion].tipo2;
      this.totalInstOrg = data.content[posicion].tipo1;
      console.log("total de personas:",  this.totalPersonasIn);
      this.busquedaFirmantes(data);

      this.length = data.totalElements;
    
    })
    
  }


  ngOnDestroy(): void {
    /*if (this.chart) {
      this.chart.dispose();
    }*/
  }

  mapaSettings(firmantes: any, root: any, chart: any)
  {
    console.log("firmedws", firmantes)
    /* Chart code */
    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    root.setThemes([
      am5themes_Animated.new(root),
    ]);

    
    // Create the map chart
    // https://www.amcharts.com/docs/v5/charts/map-chart/
   
    
    let cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40
      })
    );
    
    // Add labels and controls
    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Map"
      })
    );
    
    let switchButton = cont.children.push(
      am5.Button.new(root, {
        themeTags: ["switch"],
        centerY: am5.p50,
        icon: am5.Circle.new(root, {
          themeTags: ["icon"]
        })
      })
    );
    
    switchButton.on("active", function () {
      if (!switchButton.get("active")) {
        chart.set("projection", am5map.geoMercator());
        chart.set("panY", "translateY");
        chart.set("rotationY", 0);
        backgroundSeries.mapPolygons.template.set("fillOpacity", 0);
      } else {
        chart.set("projection", am5map.geoOrthographic());
        chart.set("panY", "rotateY");
        backgroundSeries.mapPolygons.template.set("fillOpacity", 0.1);
      }
    });
    
    cont.children.push(
      am5.Label.new(root, {
        centerY: am5.p50,
        text: "Globe"
      })
    );
    
    // Create series for background fill
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    let backgroundSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {}));
    backgroundSeries.mapPolygons.template.setAll({
      fill: root.interfaceColors.get("alternativeBackground"),
      fillOpacity: 0,
      strokeOpacity: 0
    });


    // Add background polygon
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/#Background_polygon
    backgroundSeries.data.push({
      geometry: am5map.getGeoRectangle(90, 180, -1800, -180),
    });

    // Create main polygon series for countries
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        fill: am5.color(0x9B9B9B),
        opacity: 0.5,
        exclude: ['AQ']
      })
    );
    
    // Create line series for trajectory lines
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-line-series/
    let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0.3
    });
    
    // Create point series for markers
    // https://www.amcharts.com/docs/v5/charts/map-chart/map-point-series/
    let pointSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));
    pointSeries.data.clear()
    
    pointSeries.bullets.push(() => {
      let circle = am5.Circle.new(root, {
        radius: 4,
        tooltipY: 0,
        fill: am5.color(0xFF4C00),
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 2,
        tooltipText: "{title}"
      });


      circle.events.on("click", (ev: any) => {
        // zoom to an object
      
        // get object info
        console.log("hit", ev.target.dataItem?.dataContext.value);
        this.pais = ev.target.dataItem?.dataContext.id
        this.pageIndex = 0 
        this.updateData()
      });
    
      return am5.Bullet.new(root, {
        sprite: circle
      });
    });
    
    
     /*let firmantes = {
      {
        title: "Lilongwe",
        latitude: -13.9899,
        longitude: 33.7703
      }
    };
    */
    for (var i = 0; i < firmantes.length; i++) {
      let city = firmantes[i];
      if(Number(city.idPais) != 96)
      {
        addCity(city.longitud, city.latitud, (this.idioma == 'en'?  city.paisE : city.pais )+'\n'+city.total, city.idPais);
      }
    }
    
    function addCity(longitude: any, latitude: any, title: any, idPais: any) {
      pointSeries.data.push({
        geometry: { type: "Point", coordinates: [longitude, latitude] },
        title: title,
        id: idPais
      });
    }
    
    // Make stuff animate on load
    chart.appear(1000, 100);
  }

  busquedaFirmantes(firmantes: any){
    // this.serachFormControl.setValue('');

    console.log(firmantes);

    firmantes.content.pop();
    //this.ELEMENT_DATA = [
    firmantes.content.forEach((element: any, index: any) => {
      //if(element.pais != 96)
      
        this.ELEMENT_DATA.push({name: element.nombre+' '+element.apellidos, institution: element.institucion, country: element.paisN, srcImg: `${this.rutaBandera}${element.paisN.replace(/ /g, '-')}.png`, type: element.tipo})
    });

    this.table?.renderRows();
    this.dataSource.data = this.ELEMENT_DATA;
    console.log("1.", this.dataSource.data)
    console.log("2", this.ELEMENT_DATA)
    console.log("PAISSS", this.pais);
    
    // if (this.pais != null) {
    //   this.bandera = true;
      this.paisSelect = this.ELEMENT_DATA[0].country;
      this.banderaSelect = `${this.rutaBandera}${this.paisSelect.replace(/ /g, '-')}.png`;
      
    // }


    console.log("pais", this.paisSelect);

  }
}
