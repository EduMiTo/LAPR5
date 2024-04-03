import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import * as THREE from "three";
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Node from './Node';
import WarehouseModel from './WarehouseModel';
import TruckModel from './TruckModel';
import Arc from './Arc';
import Linking from './Linking';
import { CircleGeometry, Mesh, Object3D, Plane, PlaneGeometry, Vector3 } from 'three';
import { WarehouseServiceService } from 'src/app/services/warehouse-service.service';
import { PathServiceService } from 'src/app/services/path-service.service';
import { IWarehouse } from 'src/app/interfaces/iwarehouse';
import { IPath } from 'src/app/interfaces/ipath';
import { ResourceLoader } from '@angular/compiler';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { equal } from 'assert';
import {RoutePlanningService} from 'src/app/services/route-planning.service';
import { Iroute } from 'src/app/interfaces/iroute';
import { elementAt } from 'rxjs/operators';
import { blob } from 'd3';

@Component({
  selector: 'app-road-network',
  templateUrl: './road-network.component.html',
  styleUrls: ['./road-network.component.css']
})
export class RoadNetworkComponent implements OnInit, AfterViewInit {

  @ViewChild('canvas')
  private canvasRef: ElementRef | undefined;

  truckModel!: TruckModel;
  nodes: Node[] = [];
  warehouses: IWarehouse[] = [];
  paths: IPath[] = [];
  arcs: Arc[] = [];
  newArc!: Arc;
  whHelper: string[] = [];
  automaticMovement = false;
  routeToDo: string[] = [];
  KBERMA = 0.2;
  angle: number = 0;
  collided = false;
  lastDirection: number = 0;

  truckAudio!: HTMLAudioElement;

  truckCrashAudio!: HTMLAudioElement;

  truckHornAudio!: HTMLAudioElement;

  unevenessHelper: number = 0;

  helperLinking!: Linking;
  nextLinking!: Linking;

  vertices: THREE.Vector3[] = [];
  verticesOfNextLinking: THREE.Vector3[] = [];

  firstNode!: Node;

  nodesCircles: Node[] = [];

  keyMap: boolean[] = [];

  public size: number = 200;

  dot1: number = 0;
  dot2: number = 0;
  dot3: number = 0;
  dot4: number = 0;
  dot5: number = 0;
  dot6: number = 0;
  dot7: number = 0;
  dot8: number = 0;
  dot9: number = 0;
  dot10: number = 0;
  dot11: number = 0;
  dot12: number = 0;
  dot13: number = 0;
  dot14: number = 0;
  dot15: number = 0;
  dot16: number = 0;
  

  actualw: number = 0;
  cframes: number = 0;
  actualm: number = 0;

  vela: number = 0;
  velh: number = 0;
  velv: number = 0;
  incl: number = 0;
  //* Stage Properties

  public cameraZ: number = 5000; // posiçao da camara no eixo do z
  public cameraX: number = 1000;  // posiçao da camara no eixo do x
  public cameraY: number = -30000; // posiçao da camara no eixo do y

  public fieldOfView: number = 1; //campo de visao da camara

  public nearClippingPane: number = 1; // ler comentario abaixo

  public farClippingPane: number = 100000; //entre os 2 planos os objetos sao renderizados, fora desta area nao sao


  //? Helper Properties

  private camera!: THREE.PerspectiveCamera; // perpspective camara - view em 3d (objetos mais longe aparecem mais pequenos)

  //? Scene properties
  private controls!: OrbitControls; // controla a camara



  private get canvas(): HTMLElement {
    return this.canvasRef?.nativeElement // canvas do html
  }

  private loader = new THREE.TextureLoader(); // serve para load de textura
  // create texture object
  private texture = new THREE.TextureLoader().load('../../../assets/images/sea.png'); // textura do chao (mar)

  private renderer!: THREE.WebGLRenderer; // renderiza o que esta na camara


  private scene!: THREE.Scene; // cena onde vai ser renderizado o que esta na camara

  nextSoundSpeaker = "&#xf6a9;";

  volume= 0.05;

  /**
  * criar os controlos da camara (zoom, pan, etc)
  * @private
  * @memberof RoadNetworkComponent
  */
  private createControls = () => {
    const renderer = this.renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.top = '0px';
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableZoom = true;
    this.controls.enablePan = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild(renderer.domElement);
  }

  changeImage(){
    document.getElementById("soundSpeaker")!.innerHTML= this.nextSoundSpeaker;

    if(this.nextSoundSpeaker == "&#xf028;"){
      this.volume=0.1;
      this.truckAudio.volume=this.volume;
      this.truckCrashAudio.volume=this.volume;
      this.truckHornAudio.volume=this.volume;
      this.nextSoundSpeaker= "&#xf6a9;";
    }
    else{
      this.volume=0;
      this.truckAudio.volume= this.volume;
      this.truckCrashAudio.volume=this.volume;
      this.truckHornAudio.volume=this.volume;
      this.nextSoundSpeaker= "&#xf028;";
    }
  }



  /**
   * Criar a cena
   *
   * @private
   * @memberof RoadNetworkComponent
   */

  private createScene() {




    this.scene = new THREE.Scene(); // criar a cena
    // this.scene.add(meshFloor);  // adicionar o chao à cena


    //this.scene.background = texture;

    

    const materialArray = [];
    const texture_ft = new THREE.TextureLoader().load('../../../../assets/images/Skybox3/front.png');
    const texture_bk = new THREE.TextureLoader().load('../../../../assets/images/Skybox3/back.png');
    const texture_lf = new THREE.TextureLoader().load('../../../../assets/images/Skybox3/left.png');
    const texture_rt = new THREE.TextureLoader().load('../../../../assets/images/Skybox3/right.png');
    const texture_up = new THREE.TextureLoader().load('../../../../assets/images/Skybox3/top.png');
    const texture_dn = new THREE.TextureLoader().load('../../../../assets/images/Skybox3/bottom.png');
//
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_rt }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_lf }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_up }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_dn }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_ft }));
    materialArray.push(new THREE.MeshBasicMaterial({ map: texture_bk }));
    

    
    
    
//
    for (let i = 0; i < 6; i++) materialArray[i].side = THREE.BackSide;
    let skyboxGeo = new THREE.BoxGeometry(2000, 2000, 2000);
    let skybox = new THREE.Mesh(skyboxGeo, materialArray);
    skybox.rotateX(Math.PI/2);
    this.scene.add(skybox);


    THREE.Object3D.DefaultUp.set(0, 0, 1); // eixo z para cima, por default estava o y para cima


    var light = new THREE.AmbientLight(0xffffff,0.5); // soft white light (ambiente)
    this.scene.add(light); // adicionar a luz à cena
    var light2 = new THREE.DirectionalLight(0xffffff, 2.0); //adicionar luz direcional
    light2.position.set(-364.7576580069817, 138.17611223923666, 13);
    light2.target.position.set( -374.7576580069817, 138.17611223923666, 10 );
    light2.shadow.camera.position.copy(light2.position);
    light2.castShadow = true;
    light2.shadow.radius = 2;
    light2.shadow.camera.top = light2.shadow.camera.right = 1000;
    light2.shadow.camera.bottom = light2.shadow.camera.left = -1000;
    light2.target.updateMatrixWorld();
    light2.shadow.mapSize.width = 8192;
    light2.shadow.mapSize.height = 8192;
    light2.shadow.camera.near = 1;
    light2.shadow.camera.far = 100;
    light2.shadow.camera.visible = true;
    light2.shadow.camera.updateProjectionMatrix();
    light2.shadow.camera.updateMatrixWorld();

  
    this.scene.add(light2);

    const color = 0xffffff; // white
    const near = 10;
    const far = 100;
    this.scene.fog = new THREE.Fog(color, near, far);
    const density = 0.000025;
    this.scene.fog = new THREE.FogExp2(color, density);
    //const accessHelper = new THREE.AxesHelper(50);
    // this.scene.add(accessHelper);
    let aspectRatio = this.getAspectRatio(); // obter a proporçao do canvas
    this.camera = new THREE.PerspectiveCamera(this.fieldOfView, aspectRatio, this.nearClippingPane, this.farClippingPane); // criar a camara (simula o olho humano, objetos ao longe aparentam ser mais pequenos)
    this.camera.position.set(this.cameraX, this.cameraY, this.cameraZ); // posicionar a camara

    this.scene.add(this.camera);  // adicionar a camara à cena

    this.scene.add(this.truckModel);

        
    //create axis helper
    const axesHelper = new THREE.AxesHelper(0);
    this.truckModel.add(axesHelper);



   
    let truck = this.truckModel;
    let nodeList = this.nodes;

  



    var map = this.keyMap;
    let truckX = truck.speed * Math.cos(this.direction);
    let truckY = truck.speed * Math.sin(this.direction);



    window.addEventListener("keyup", onDocumentKeyUp, false);

    function onDocumentKeyUp(event: any) {

      var keyCode = event.which;
      map[keyCode] = false;

    }


    let nodesHelper = this.nodes;
    let newNode = new Node();



    window.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event: any) {

      var keyCode = event.which;
      map[keyCode] = true;


    }






  }

  playAudio(src: string): any{
    let audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
    audio.volume=this.volume;
    return audio;
  }

  

  /*
  * criar a ligaçao entre 2 nodes
  */


  private createConnection(node1: Node, node2: Node) {


    let roundaboutWidth1 = 0;
    let roundaboutWidth2 = 0;

    /*
    * Percorrer todos os arcos e definir o width do nó, que vai ser igual ao maior width dos arcos que convergem/divergem
    * nesse/desse nó (tal como referido no tutorial) - para o NODE1
    */

    for (let i = 0; i < this.arcs.length; i++) {
      if (this.arcs[i].origin == node1.wid || this.arcs[i].destination == node1.wid) {

        if (this.arcs[i].width > roundaboutWidth1) {
          roundaboutWidth1 = this.arcs[i].width;
        }
      }
    }


    /*
   * Percorrer todos os arcos e definir o width do nó, que vai ser igual ao maior width dos arcos que convergem/divergem
   * nesse/desse nó (tal como referido no tutorial) - para o NODE2
   */

    for (let i = 0; i < this.arcs.length; i++) {
      if (this.arcs[i].origin == node2.wid || this.arcs[i].destination == node2.wid) {

        if (this.arcs[i].width > roundaboutWidth2) {
          roundaboutWidth2 = this.arcs[i].width;
        }
      }
    }


    /*
    * encontrar o arco que liga os 2 nodes enviados por parametro
    */

    for (let i = 0; i < this.arcs.length; i++) {
      if (this.arcs[i].origin == node1.wid && this.arcs[i].destination == node2.wid) {
        this.newArc = this.arcs[i];
      }
    }


    /*
    * para o node1, se ele nao existir na lista de nodesCircles, criar um novo circle e adiciona à lista
    * (envia o width do linking por parametro, necessario para definir o raio do circle)
    */

    if (!this.nodesCircles.find(node => node.wid == node1.wid)) {
      node1.createCircle(roundaboutWidth1);
      this.nodesCircles.push(node1);

    }


    /*
    * para o node2, se ele nao existir na lista de nodesCircles, criar um novo circle e adiciona à lista
    * (envia o width do linking por parametro, necessario para definir o raio do circle)
    */

    if (!this.nodesCircles.find(node => node.wid == node2.wid)) {
      node2.createCircle(roundaboutWidth2);
      this.nodesCircles.push(node2);
    }



    // cria o elemento de ligação, quer para o node1, quer para o node2 (define apenas o length)
    let connectStart = new Linking(node1);
    let connectEnd = new Linking(node2);


    let difference = connectEnd.length - connectStart.length;

    /* criar o arco entre os 2 nodes, ligando os elementos de ligação de cada um
    * é necessário o tamanho do linking ser usado na formula que calcula o comprimento da projecão no plano do arco
    * e daí enviarmos o linking (connectStart e connectEnd) para a função que cria o arco
    */

    this.newArc.createArc(node1, node2, connectStart, connectEnd, difference);

    // agora criamos o linking entre o node e o arco, com a mesma largura do arco e, por isso, enviamos o arco como parametro
    connectStart.createLinking(node1, this.newArc);
    connectEnd.createLinking(node2, this.newArc);

    // adicionar os elementos de ligação ao node
    node1.add(connectStart);
    node2.add(connectEnd);




    //tratar da rotação e da posição dos elementos de ligação
    this.changeRotationAndTranslate(node1.children[node1.children.length - 1], node2.children[node2.children.length - 1], this.newArc.orientation, connectStart.length / 2, connectEnd.length / 2, connectStart.children[0], connectEnd.children[0]);



    // definir a posição do arco
    this.newArc.definePos(connectStart.children[0], connectEnd.children[0]);

    // adicionar o arco à cena
    this.scene.add(this.newArc);
    node1.children[1].position.z += 0.1;

    // adicionar os nodes à cena
    this.scene.add(node1);
    this.scene.add(node2);
  }


  private changeRotationAndTranslate(origin: Object3D, destination: Object3D, orientation: number, translateSize1: number, translateSize2: number, cube: Object3D, cube2: Object3D) {
    // mudar a rotação dos elementos de ligação para ficar a apontar um para o outro
    origin.rotation.z = Math.PI / 2 + orientation;
    destination.rotation.z = Math.PI / 2 + orientation;

    // verificar qual dos elementos de ligacao precisa de "chegar-se para o meio" de maneira ao arco conseguir fazer a ligacao 

    //Apos isso, fazer o translate para o meio com o tamanha do Linking/2, para ficar uma ponta no meio do circulo e a outra ponta "de fora"
    if (origin.position.y > destination.position.y) {
      origin.translateY(translateSize1);
      destination.translateY(-translateSize2);

      //Definir a posicao do cubo na ponta do linking que fica mais para o centro de maneira a ser mais facil calcular a posicao do arco
      cube.position.y -= (translateSize1 * 2);

    }
    else {
      origin.translateY(-translateSize1);
      destination.translateY(translateSize2);



      cube2.position.y += (translateSize2 * 2);


    }
  }

  /*
  * obter a proporçao do canvas
  */

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
* Start the rendering loop
*
* @private
* @memberof RoadNetworkComponent
*/

  private startRenderingLoop() {
    //* Renderer

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    let component: RoadNetworkComponent = this;

    (function render() {
      requestAnimationFrame(render);
      component.renderer.render(component.scene, component.camera);

      if (!component.automaticMovement){
        component.actualw = 0;
        component.cframes = 0;
        component.actualm = 0;
        component.executeMovement(component.keyMap, component.truckModel);
      }
      else{
        component.autoMovement(component.truckModel);
      }
    }());



  }

  constructor(private warehouseService: WarehouseServiceService, private pathService: PathServiceService, private router: Router, private planningService: RoutePlanningService) { }

  /*
  * inicializa a cena, a camera e o renderer
  */

  ngAfterViewInit(): void {
    this.createScene();
    this.startRenderingLoop();
    this.createControls();
  }


  /*
  * metodo para inicializar as warehouses e os paths 
  */


  async ngOnInit(): Promise<void> {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload')
      location.reload()
    } else {
      localStorage.removeItem('foo')
    } // este reload foi utilizado porque o canvas não estava a ser renderizado corretamente, e apenas o chao carregava
    // this.getPaths(); 
    this.getWarehouses();
    this.truckModel = new TruckModel();
    this.truckAudio = this.playAudio("../../../../assets/audio/truck.mp3");
  }

  /*private getPaths() {
    (this.warehouseService.getWarehouses()).subscribe(
      (warehouses) => {
        this.paths = this.pathService.getPathsForRouteNetwork(warehouses);
      });

  }*/


  /*
  * vai buscar todos os armazens existentes na base de dados e os respetivos caminhos para os armazens mais proximos
  */

  private getWarehouses() {
    (this.warehouseService.getWarehouses()).subscribe(
      (warehouses) => {
        this.pathService.getAllPaths().subscribe(
          async (response) => {

            let minDistance = Number.POSITIVE_INFINITY;
            let wh = warehouses[0];
            for (let i = 0; i < warehouses.length; i++) {

              let wSx = Node.geoToCartesian(500, -500, -8.2451, -8.7609, warehouses[i].longitude);
              let wSy = Node.geoToCartesian(500, -500, 41.3804, 40.8387, warehouses[i].latitude);
              let wSz = Node.geoToCartesian(20, 0, 800, 0, warehouses[i].altitude);
              for (let j = 0; j < 2; j++) {
                for (let k = 0; k < warehouses.length; k++) {
                  if (i != k) {
                    if (!this.whHelper.find(wh => wh == warehouses[k].id)) {
                      if (!this.paths.find(path => path.idWarehouseStart == warehouses[k].id && path.idWarehouseEnd == warehouses[i].id)) {


                        let wEx = Node.geoToCartesian(500, -500, -8.2451, -8.7609, warehouses[k].longitude);
                        let wEy = Node.geoToCartesian(500, -500, 41.3804, 40.8387, warehouses[k].latitude);
                        let wEz = Node.geoToCartesian(20, 0, 800, 0, warehouses[k].altitude);

                        const distance = Math.sqrt(Math.pow(wEx - wSx, 2) + Math.pow(wEy - wSy, 2) + Math.pow(wEz - wSz, 2));




                        if (distance < minDistance) {
                          minDistance = distance;
                          wh = warehouses[k];
                        }

                      }
                    }

                  }

                }

                this.whHelper.push(wh.id);
                minDistance = Number.POSITIVE_INFINITY;





              }
              for (let j = 0; j < 2; j++) {
                for (let k = 0; k < response.length; k++) {
                  if (response[k].idWarehouseEnd == this.whHelper[j] && response[k].idWarehouseStart == warehouses[i].id) {
                    this.paths.push(response[k]);
                  }
                }
              }
              this.whHelper = [];
              minDistance = Number.POSITIVE_INFINITY;

            }



            let node: Node
            let warehouseModel: WarehouseModel
            for (let i = 0; i < warehouses.length; i++) {

              node = new Node(warehouses[i].designation, warehouses[i].longitude, warehouses[i].latitude, warehouses[i].altitude, warehouses[i].id, warehouses[i].designation, warehouses[i].active);
              //node.castShadow = true;
              node.receiveShadow = true;
              this.nodes.push(node); // adiciona cada armazem ao array de armazens (node)
            }

            

            for (let j = 0; j < this.nodes.length; j++) { // cria um modelo 3D para cada armazem
              warehouseModel = new WarehouseModel(this.nodes[j]);
              warehouseModel.receiveShadow = true;
              warehouseModel.castShadow = true;
              this.scene.add(warehouseModel);
            }

            for (let i = 0; i < this.paths.length; i++) {
              let node1 = this.nodes.find(node => node.wid == this.paths[i].idWarehouseStart)!;
              let node2 = this.nodes.find(node => node.wid == this.paths[i].idWarehouseEnd)!;
              this.link2Warehouses(node1, node2); // cria uma ligação entre os armazens que tem um path entre eles (apenas a largura do arc)
              // e definimos as posiçoes de origem e destino do arc
            }


            for (let i = 0; i < this.paths.length; i++) {
              let node1 = this.nodes.find(node => node.wid == this.paths[i].idWarehouseStart)!;
              let node2 = this.nodes.find(node => node.wid == this.paths[i].idWarehouseEnd)!;
              this.createConnection(node1, node2); // serve para criar a conexão entre os armazens
            }

            this.firstNode = this.nodes[4];

            this.helperLinking = (this.firstNode.children[2] as Linking);
            this.nextLinking = this.helperLinking;



            this.getPath(warehouses);
          });
      });


  }

  /*
  * cria uma ligação entre dois armazens (arc)
  * define apenas a largura do arc numa primeira fase
  */

  private link2Warehouses(node1: Node, node2: Node) {
    let arc = new Arc(node1, node2);
    this.arcs.push(arc);
  }


  /*
  * metodo para vista area da warehouse selecionada no botao da road network
  */

  viewWarehouse(warehouse: Node) {

    this.camera.position.set(warehouse.position.x, warehouse.position.y, warehouse.position.z + 8000);

    this.controls.target.set(warehouse.position.x, warehouse.position.y, warehouse.position.z);

    this.controls.update();
  }

  /*
  * metodo para retornar à vista inicial, definida no inicio na posiçao da camara
  */

  defaultView() {

    this.camera.position.set(1000, -30000, 5000);
    this.controls.target.set(0, 0, 0);

    this.controls.update();

  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /*
  * metodo para limpar a cena e voltar para a pagina anterior quando se clica no botao back da road network
  */

  clear() {
    this.scene.clear();


    this.router.navigate(['../']);

    //reload component

  }
  direction = Math.PI / 2;
  executeMovement(map: any, truck: any) {

    let truckY;
    let truckX;
    let truck2X = 0;
    let truck2Y = 0;

    if(map[72]==true){
     
      this.truckHornAudio=this.playAudio("../../../../assets/audio/horn.mp3");
    }


    if (map[87] == true && map[65] == true) {

      if (!this.collided){
        this.direction += Math.PI / 180;
      }
     


      this.checkCollision(truck,true);

     
      

    } else if (map[87] == true && map[68] == true) {

      if (!this.collided){
        this.direction -= Math.PI / 180;
      }
     

      this.checkCollision(truck,true);

      
    } else if (map[87] == true) {

    

      this.checkCollision(truck, true);

      


    } else if (map[83] == true && map[65] == true) {

      if (!this.collided){
        this.direction -= Math.PI / 180;
      }
      

      this.checkCollision(truck, false);




    } else if (map[83] == true && map[68] == true) {

      if (!this.collided){
        this.direction += Math.PI / 180;

      }

      
      this.checkCollision(truck,false);


    }
    else if (map[83] == true) {
      this.checkCollision(truck,false);

      

    }
  }

  defineVertexOrderForDotProduct(truck: any) {


    let a = new THREE.Vector3();
    let b = new THREE.Vector3();
    let c = new THREE.Vector3();
    let d = new THREE.Vector3();

    let nextLinkingVertexA = new THREE.Vector3();
    let nextLinkingVertexB = new THREE.Vector3();
    let nextLinkingVertexC = new THREE.Vector3();
    let nextLinkingVertexD = new THREE.Vector3();


    if ((this.vertices[0].x < this.vertices[1].x && this.vertices[0].x < this.vertices[2].x && this.vertices[0].x < this.vertices[3].x)) {
      if (this.vertices[1].x < this.vertices[2].x && this.vertices[1].x < this.vertices[3].x) {
        if (this.vertices[0].y > this.vertices[1].y) {
          a = this.vertices[0];
          b = this.vertices[1];

          if (this.vertices[2].y < this.vertices[3].y) {
            c = this.vertices[2];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[2];
          }
        } else {
          a = this.vertices[1];
          b = this.vertices[0];

          if (this.vertices[2].y < this.vertices[3].y) {
            c = this.vertices[2];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[2];
          }
        }
      } else if (this.vertices[2].x < this.vertices[1].x && this.vertices[2].x < this.vertices[3].x) {
        if (this.vertices[0].y > this.vertices[2].y) {
          a = this.vertices[0];
          b = this.vertices[2];

          if (this.vertices[1].y < this.vertices[3].y) {
            c = this.vertices[1];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[1];
          }
        } else {
          a = this.vertices[2];
          b = this.vertices[0];

          if (this.vertices[1].y < this.vertices[3].y) {
            c = this.vertices[1];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[1];
          }
        }
      } else if (this.vertices[3].x < this.vertices[1].x && this.vertices[3].x < this.vertices[2].x) {
        if (this.vertices[0].y > this.vertices[3].y) {
          a = this.vertices[0];
          b = this.vertices[3];

          if (this.vertices[1].y < this.vertices[2].y) {
            c = this.vertices[1];
            d = this.vertices[2];
          } else {
            c = this.vertices[2];
            d = this.vertices[1];
          }
        } else {
          a = this.vertices[3];
          b = this.vertices[0];

          if (this.vertices[1].y < this.vertices[2].y) {
            c = this.vertices[1];
            d = this.vertices[2];
          } else {
            c = this.vertices[2];
            d = this.vertices[1];
          }
        }
      }
    } else if ((this.vertices[1].x < this.vertices[0].x && this.vertices[1].x < this.vertices[2].x && this.vertices[1].x < this.vertices[3].x)) {

      if (this.vertices[0].x < this.vertices[2].x && this.vertices[0].x < this.vertices[3].x) {
        if (this.vertices[1].y > this.vertices[0].y) {
          a = this.vertices[1];
          b = this.vertices[0];

          if (this.vertices[2].y < this.vertices[3].y) {
            c = this.vertices[2];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[2];
          }
        } else {
          a = this.vertices[0];
          b = this.vertices[1];

          if (this.vertices[2].y < this.vertices[3].y) {
            c = this.vertices[2];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[2];
          }
        }
      } else if (this.vertices[2].x < this.vertices[0].x && this.vertices[2].x < this.vertices[3].x) {
        if (this.vertices[1].y > this.vertices[2].y) {
          a = this.vertices[1];
          b = this.vertices[2];

          if (this.vertices[0].y < this.vertices[3].y) {
            c = this.vertices[0];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[0];
          }
        } else {
          a = this.vertices[2];
          b = this.vertices[1];

          if (this.vertices[0].y < this.vertices[3].y) {
            c = this.vertices[0];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[0];
          }
        }
      } else if (this.vertices[3].x < this.vertices[0].x && this.vertices[3].x < this.vertices[2].x) {
        if (this.vertices[1].y > this.vertices[3].y) {
          a = this.vertices[1];
          b = this.vertices[3];

          if (this.vertices[0].y < this.vertices[2].y) {
            c = this.vertices[0];
            d = this.vertices[2];
          } else {
            c = this.vertices[2];
            d = this.vertices[0];
          }
        } else {
          a = this.vertices[3];
          b = this.vertices[1];

          if (this.vertices[0].y < this.vertices[2].y) {
            c = this.vertices[0];
            d = this.vertices[2];
          } else {
            c = this.vertices[2];
            d = this.vertices[0];
          }

        }
      }
    } else if ((this.vertices[2].x < this.vertices[0].x && this.vertices[2].x < this.vertices[1].x && this.vertices[2].x < this.vertices[3].x)) {

      if (this.vertices[0].x < this.vertices[1].x && this.vertices[0].x < this.vertices[3].x) {
        if (this.vertices[2].y > this.vertices[0].y) {
          a = this.vertices[2];
          b = this.vertices[0];

          if (this.vertices[1].y < this.vertices[3].y) {
            c = this.vertices[1];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[1];
          }
        } else {
          a = this.vertices[0];
          b = this.vertices[2];

          if (this.vertices[1].y < this.vertices[3].y) {
            c = this.vertices[1];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[1];
          }
        }
      } else if (this.vertices[1].x < this.vertices[0].x && this.vertices[1].x < this.vertices[3].x) {
        if (this.vertices[2].y > this.vertices[1].y) {
          a = this.vertices[2];
          b = this.vertices[1];

          if (this.vertices[0].y < this.vertices[3].y) {
            c = this.vertices[0];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[0];
          }

        } else {
          a = this.vertices[1];
          b = this.vertices[2];

          if (this.vertices[0].y < this.vertices[3].y) {
            c = this.vertices[0];
            d = this.vertices[3];
          } else {
            c = this.vertices[3];
            d = this.vertices[0];
          }
        }
      } else if (this.vertices[3].x < this.vertices[0].x && this.vertices[3].x < this.vertices[1].x) {
        if (this.vertices[2].y > this.vertices[3].y) {
          a = this.vertices[2];
          b = this.vertices[3];

          if (this.vertices[0].y < this.vertices[1].y) {
            c = this.vertices[0];
            d = this.vertices[1];
          } else {
            c = this.vertices[1];
            d = this.vertices[0];
          }

        } else {
          a = this.vertices[3];
          b = this.vertices[2];

          if (this.vertices[0].y < this.vertices[1].y) {
            c = this.vertices[0];
            d = this.vertices[1];
          } else {

            c = this.vertices[1];
            d = this.vertices[0];
          }
        }
      }
    } else if ((this.vertices[3].x < this.vertices[0].x && this.vertices[3].x < this.vertices[1].x && this.vertices[3].x < this.vertices[2].x)) {

      if (this.vertices[0].x < this.vertices[1].x && this.vertices[0].x < this.vertices[2].x) {
        if (this.vertices[3].y > this.vertices[0].y) {
          a = this.vertices[3];
          b = this.vertices[0];

          if (this.vertices[1].y < this.vertices[2].y) {
            c = this.vertices[1];
            d = this.vertices[2];
          } else {
            c = this.vertices[2];
            d = this.vertices[1];
          }

        } else {
          a = this.vertices[0];
          b = this.vertices[3];

          if (this.vertices[1].y < this.vertices[2].y) {
            c = this.vertices[1];
            d = this.vertices[2];
          } else {
            c = this.vertices[2];
            d = this.vertices[1];
          }
        }
      } else if (this.vertices[1].x < this.vertices[0].x && this.vertices[1].x < this.vertices[2].x) {
        if (this.vertices[3].y > this.vertices[1].y) {
          a = this.vertices[3];
          b = this.vertices[1];

          if (this.vertices[0].y < this.vertices[2].y) {
            c = this.vertices[0];
            d = this.vertices[2];
          } else {
            c = this.vertices[2];
            d = this.vertices[0];
          }
        } else {
          a = this.vertices[1];
          b = this.vertices[3];

          if (this.vertices[0].y < this.vertices[2].y) {
            c = this.vertices[0];
            d = this.vertices[2];
          } else {
            c = this.vertices[2];
            d = this.vertices[0];
          }
        }
      } else if (this.vertices[2].x < this.vertices[0].x && this.vertices[2].x < this.vertices[1].x) {
        if (this.vertices[3].y > this.vertices[2].y) {
          a = this.vertices[3];
          b = this.vertices[2];

          if (this.vertices[0].y < this.vertices[1].y) {
            c = this.vertices[0];
            d = this.vertices[1];
          } else {
            c = this.vertices[1];
            d = this.vertices[0];
          }

        } else {
          a = this.vertices[2];
          b = this.vertices[3];

          if (this.vertices[0].y < this.vertices[1].y) {
            c = this.vertices[0];
            d = this.vertices[1];
          } else {
            c = this.vertices[1];
            d = this.vertices[0];
          }
        }
      }
    }



    let positionOfNextLinking = (this.nextLinking.children[1] as Mesh).geometry.attributes['position'];

    for (let i = 0; i < 4; i++) {
      let vertex = new THREE.Vector3();
      vertex.fromBufferAttribute(positionOfNextLinking, i);
      this.nextLinking.localToWorld(vertex);

      this.verticesOfNextLinking.push(vertex);
    }

    
    if ((this.verticesOfNextLinking[0].x < this.verticesOfNextLinking[1].x && this.verticesOfNextLinking[0].x < this.verticesOfNextLinking[2].x && this.verticesOfNextLinking[0].x < this.verticesOfNextLinking[3].x)) {
      if (this.verticesOfNextLinking[1].x < this.verticesOfNextLinking[2].x && this.verticesOfNextLinking[1].x < this.verticesOfNextLinking[3].x) {
        if (this.verticesOfNextLinking[0].y > this.verticesOfNextLinking[1].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[0];
          nextLinkingVertexB = this.verticesOfNextLinking[1];

          if (this.verticesOfNextLinking[2].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          }
        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[1];
          nextLinkingVertexB = this.verticesOfNextLinking[0];

          if (this.verticesOfNextLinking[2].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          }
        }
      } else if (this.verticesOfNextLinking[2].x < this.verticesOfNextLinking[1].x && this.verticesOfNextLinking[2].x < this.verticesOfNextLinking[3].x) {
        if (this.verticesOfNextLinking[0].y > this.verticesOfNextLinking[2].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[0];
          nextLinkingVertexB = this.verticesOfNextLinking[2];

          if (this.verticesOfNextLinking[1].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          }
        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[2];
          nextLinkingVertexB = this.verticesOfNextLinking[0];

          if (this.verticesOfNextLinking[1].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          }
        }
      } else if (this.verticesOfNextLinking[3].x < this.verticesOfNextLinking[1].x && this.verticesOfNextLinking[3].x < this.verticesOfNextLinking[2].x) {
        if (this.verticesOfNextLinking[0].y > this.verticesOfNextLinking[3].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[0];
          nextLinkingVertexB = this.verticesOfNextLinking[3];

          if (this.verticesOfNextLinking[1].y < this.verticesOfNextLinking[2].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          }
        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[3];
          nextLinkingVertexB = this.verticesOfNextLinking[0];

          if (this.verticesOfNextLinking[1].y < this.verticesOfNextLinking[2].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          }
        }
      }
    } else if ((this.verticesOfNextLinking[1].x < this.verticesOfNextLinking[0].x && this.verticesOfNextLinking[1].x < this.verticesOfNextLinking[2].x && this.verticesOfNextLinking[1].x < this.verticesOfNextLinking[3].x)) {

      if (this.verticesOfNextLinking[0].x < this.verticesOfNextLinking[2].x && this.verticesOfNextLinking[0].x < this.verticesOfNextLinking[3].x) {
        if (this.verticesOfNextLinking[1].y > this.verticesOfNextLinking[0].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[1];
          nextLinkingVertexB = this.verticesOfNextLinking[0];

          if (this.verticesOfNextLinking[2].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          }
        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[0];
          nextLinkingVertexB = this.verticesOfNextLinking[1];

          if (this.verticesOfNextLinking[2].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          }
        }
      } else if (this.verticesOfNextLinking[2].x < this.verticesOfNextLinking[0].x && this.verticesOfNextLinking[2].x < this.verticesOfNextLinking[3].x) {
        if (this.verticesOfNextLinking[1].y > this.verticesOfNextLinking[2].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[1];
          nextLinkingVertexB = this.verticesOfNextLinking[2];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }
        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[2];
          nextLinkingVertexB = this.verticesOfNextLinking[1];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }
        }
      } else if (this.verticesOfNextLinking[3].x < this.verticesOfNextLinking[0].x && this.verticesOfNextLinking[3].x < this.verticesOfNextLinking[2].x) {
        if (this.verticesOfNextLinking[1].y > this.verticesOfNextLinking[3].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[1];
          nextLinkingVertexB = this.verticesOfNextLinking[3];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[2].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }
        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[3];
          nextLinkingVertexB = this.verticesOfNextLinking[1];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[2].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }

        }
      }
    } else if ((this.verticesOfNextLinking[2].x < this.verticesOfNextLinking[0].x && this.verticesOfNextLinking[2].x < this.verticesOfNextLinking[1].x && this.verticesOfNextLinking[2].x < this.verticesOfNextLinking[3].x)) {

      if (this.verticesOfNextLinking[0].x < this.verticesOfNextLinking[1].x && this.verticesOfNextLinking[0].x < this.verticesOfNextLinking[3].x) {
        if (this.verticesOfNextLinking[2].y > this.verticesOfNextLinking[0].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[2];
          nextLinkingVertexB = this.verticesOfNextLinking[0];

          if (this.verticesOfNextLinking[1].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          }
        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[0];
          nextLinkingVertexB = this.verticesOfNextLinking[2];

          if (this.verticesOfNextLinking[1].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          }
        }
      } else if (this.verticesOfNextLinking[1].x < this.verticesOfNextLinking[0].x && this.verticesOfNextLinking[1].x < this.verticesOfNextLinking[3].x) {
        if (this.verticesOfNextLinking[2].y > this.verticesOfNextLinking[1].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[2];
          nextLinkingVertexB = this.verticesOfNextLinking[1];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }

        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[1];
          nextLinkingVertexB = this.verticesOfNextLinking[2];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[3].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[3];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[3];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }
        }
      } else if (this.verticesOfNextLinking[3].x < this.verticesOfNextLinking[0].x && this.verticesOfNextLinking[3].x < this.verticesOfNextLinking[1].x) {
        if (this.verticesOfNextLinking[2].y > this.verticesOfNextLinking[3].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[2];
          nextLinkingVertexB = this.verticesOfNextLinking[3];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[1].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }

        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[3];
          nextLinkingVertexB = this.verticesOfNextLinking[2];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[1].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          } else {

            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }
        }
      }
    } else if ((this.verticesOfNextLinking[3].x < this.verticesOfNextLinking[0].x && this.verticesOfNextLinking[3].x < this.verticesOfNextLinking[1].x && this.verticesOfNextLinking[3].x < this.verticesOfNextLinking[2].x)) {

      if (this.verticesOfNextLinking[0].x < this.verticesOfNextLinking[1].x && this.verticesOfNextLinking[0].x < this.verticesOfNextLinking[2].x) {
        if (this.verticesOfNextLinking[3].y > this.verticesOfNextLinking[0].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[3];
          nextLinkingVertexB = this.verticesOfNextLinking[0];

          if (this.verticesOfNextLinking[1].y < this.verticesOfNextLinking[2].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          }

        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[0];
          nextLinkingVertexB = this.verticesOfNextLinking[3];

          if (this.verticesOfNextLinking[1].y < this.verticesOfNextLinking[2].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          }
        }
      } else if (this.verticesOfNextLinking[1].x < this.verticesOfNextLinking[0].x && this.verticesOfNextLinking[1].x < this.verticesOfNextLinking[2].x) {
        if (this.verticesOfNextLinking[3].y > this.verticesOfNextLinking[1].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[3];
          nextLinkingVertexB = this.verticesOfNextLinking[1];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[2].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }
        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[1];
          nextLinkingVertexB = this.verticesOfNextLinking[3];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[2].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[2];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[2];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }
        }
      } else if (this.verticesOfNextLinking[2].x < this.verticesOfNextLinking[0].x && this.verticesOfNextLinking[2].x < this.verticesOfNextLinking[1].x) {
        if (this.verticesOfNextLinking[3].y > this.verticesOfNextLinking[2].y) {
          nextLinkingVertexA = this.verticesOfNextLinking[3];
          nextLinkingVertexB = this.verticesOfNextLinking[2];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[1].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }

        } else {
          nextLinkingVertexA = this.verticesOfNextLinking[2];
          nextLinkingVertexB = this.verticesOfNextLinking[3];

          if (this.verticesOfNextLinking[0].y < this.verticesOfNextLinking[1].y) {
            nextLinkingVertexC = this.verticesOfNextLinking[0];
            nextLinkingVertexD = this.verticesOfNextLinking[1];
          } else {
            nextLinkingVertexC = this.verticesOfNextLinking[1];
            nextLinkingVertexD = this.verticesOfNextLinking[0];
          }
        }
      }
    }

    // get vector between two points
    let vector1 = new THREE.Vector3();
    let vector2 = new THREE.Vector3();
    let vector3 = new THREE.Vector3();
    let vector4 = new THREE.Vector3();
    let vector5 = new THREE.Vector3();
    let vector6 = new THREE.Vector3();
    let vector7 = new THREE.Vector3();
    let vector8 = new THREE.Vector3();
    let vector9 = new THREE.Vector3();
    let vector10 = new THREE.Vector3();
    let vector11 = new THREE.Vector3();
    let vector12 = new THREE.Vector3();
    let vector13 = new THREE.Vector3();
    let vector14 = new THREE.Vector3();
    let vector15 = new THREE.Vector3();
    let vector16 = new THREE.Vector3();
    let vector17 = new THREE.Vector3();
    let vector18 = new THREE.Vector3();
    let vector19 = new THREE.Vector3();
    let vector20 = new THREE.Vector3();
    let vector21 = new THREE.Vector3();
    let vector22 = new THREE.Vector3();
    let vector23 = new THREE.Vector3();
    let vector24 = new THREE.Vector3();
    



    
  
    var frontOfTheTruck = new THREE.Vector3();
    var backOfTheTruck = new THREE.Vector3();

    let ft = truck.children[6].getWorldPosition(frontOfTheTruck);
    let bt = truck.children[7].getWorldPosition(backOfTheTruck);

  

    vector1.subVectors(b, a); //AB = B-A
    vector2.subVectors(c, b); //BC = C-B
    vector3.subVectors(d, c); //CD = D-C
    vector4.subVectors(a, d); //DA = A-D
    vector5.subVectors(ft, a); //AP1 = P1-A
    vector6.subVectors(ft, b); //BP1 = P1-B
    vector7.subVectors(ft, c); //CP1 = P1-C
    vector8.subVectors(ft, d); //DP1 = P1-D
    vector9.subVectors(bt, a); //AP2 = P1-A
    vector10.subVectors(bt, b); //BP2 = P2-B
    vector11.subVectors(bt, c); //CP2 = P2-C
    vector12.subVectors(bt, d); //DP2 = P2-D
    


    //substract vectors from next linking
    vector13.subVectors(nextLinkingVertexB, nextLinkingVertexA); //AB = B-A
    vector14.subVectors(nextLinkingVertexC, nextLinkingVertexB); //BC = C-B
    vector15.subVectors(nextLinkingVertexD, nextLinkingVertexC); //CD = D-C
    vector16.subVectors(nextLinkingVertexA, nextLinkingVertexD); //DA = A-D
    vector17.subVectors(truck.position, nextLinkingVertexA); //AP1 = P1-A
    vector18.subVectors(truck.position, nextLinkingVertexB); //BP1 = P1-B
    vector19.subVectors(truck.position, nextLinkingVertexC); //CP1 = P1-C
    vector20.subVectors(truck.position, nextLinkingVertexD); //DP1 = P1-D
    vector21.subVectors(backOfTheTruck, nextLinkingVertexA); //AP2 = P1-A
    vector22.subVectors(backOfTheTruck, nextLinkingVertexB); //BP2 = P2-B
    vector23.subVectors(backOfTheTruck, nextLinkingVertexC); //CP2 = P2-C
    vector24.subVectors(backOfTheTruck, nextLinkingVertexD); //DP2 = P2-D


 

    // dot product for current linking
    this.dot1 = vector1.dot(vector6); //AB.BP1
    this.dot2 = vector2.dot(vector7); //BC.CP1
    this.dot3 = vector3.dot(vector8); //CD.DP1
    this.dot4 = vector4.dot(vector5); //DA.AP1
    this.dot5 = vector1.dot(vector10); //AB.BP2
    this.dot6 = vector2.dot(vector11); //BC.CP2
    this.dot7 = vector3.dot(vector12); //CD.DP2
    this.dot8 = vector4.dot(vector9); //DA.AP2

    // dot product for next linking
    this.dot9 = vector13.dot(vector18); //AB.BP1
    this.dot10 = vector14.dot(vector19); //BC.CP1
    this.dot11 = vector15.dot(vector20); //CD.DP1
    this.dot12 = vector16.dot(vector17); //DA.AP1
    this.dot13 = vector13.dot(vector22); //AB.BP2
    this.dot14 = vector14.dot(vector23); //BC.CP2
    this.dot15 = vector15.dot(vector24); //CD.DP2
    this.dot16 = vector16.dot(vector21); //DA.AP2
    

    //dot product for next linking




    

  }

  checkCollision(truck: any, boolean: boolean) {


   
    let truckY;
    let truckX;
    let truck2X = 0;
    let truck2Y = 0;
    let truck2X_F = 0;
    let truck2Y_F = 0;
    let truck2X_B = 0;
    let truck2Y_B = 0;

    
    truckX = truck.speed * Math.cos(this.direction);
    truckY = truck.speed * Math.sin(this.direction);

    var frontOfTheTruck = new THREE.Vector3(); 
    var backOfTheTruck = new THREE.Vector3(); 

    let k = 0;

    let founded = false;
    while (k < this.nodes.length && !founded) {
     
  
   truck.children[6].getWorldPosition( frontOfTheTruck );
   truck.children[7].getWorldPosition( backOfTheTruck );

   


      if ((Math.pow(frontOfTheTruck.x - this.nodes[k].x, 2) + Math.pow(frontOfTheTruck.y - this.nodes[k].y, 2)) <= Math.pow(this.nodes[k].circle.geometry.parameters.radius, 2) && (Math.pow(backOfTheTruck.x - this.nodes[k].x, 2) + Math.pow(backOfTheTruck.y - this.nodes[k].y, 2)) <= Math.pow(this.nodes[k].circle.geometry.parameters.radius, 2) && (truck.position.z - this.nodes[k].z <= 2 && truck.position.z - this.nodes[k].z >= -1)) {
        this.firstNode = this.nodes[k];
        founded = true;
      }
      k++;
    }

    let i = 0;
    let found = false;
    let j = 2;
    let linking!: Linking;
    let checkLinking!: Linking;
    let currentArc!: Arc;
    let helperArc!: Arc;

    j = 2;
    while (j < this.firstNode.children.length && !found) {

     
      var target = new THREE.Vector3();
      this.firstNode.children[j].getWorldPosition(target);

      checkLinking = (this.firstNode.children[j] as Linking);
      
      let l = (checkLinking.children[1] as Mesh).geometry.attributes['position'];

      for (let i = 0; i < 4; i++) {
        let vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(l, i);
        checkLinking.localToWorld(vertex);

        this.vertices.push(vertex);
      }

 

      // check which vertex is in the top lerft corner



     

      this.defineVertexOrderForDotProduct(truck);




      this.vertices = [];
      this.verticesOfNextLinking = [];

      

      if ((this.dot1 < 0 && this.dot2 < 0 && this.dot3 < 0 && this.dot4 < 0 && this.dot5 < 0 && this.dot6 < 0 && this.dot7 < 0 && this.dot8 < 0) && (truck.position.z - this.firstNode.z <= 2 && truck.position.z - this.firstNode.z >= -1)){
        this.collided = false;
        found = true;
        linking = (this.firstNode.children[j] as Linking);

        this.helperLinking = linking;

      }
      j++;

    }


    i = 0;
    j = 0;
    found = false;
    let back = false;
    while (i < this.arcs.length && found == false) {
      if ((this.arcs[i].s1 as Linking).position.equals(this.helperLinking.position)) {


        found = true;
        helperArc = this.arcs[i];
        currentArc = helperArc;
        

       

        
        this.nextLinking = this.arcs[i].s2;
      



      } else if ((this.arcs[i].s2 as Linking).position.equals(this.helperLinking.position)) {
        found = true;
        //helperArc = this.arcs[i].clone();
        helperArc = Object.assign({}, this.arcs[i]);

        // Object.assign(currentArc, this.arcs[i]);

        currentArc = helperArc;

        currentArc.uneveness = -currentArc.uneveness;

        currentArc.inclination = -currentArc.inclination;

      

        
        


        
         
      
        

       
        this.nextLinking = this.arcs[i].s1;
      }
      i++;
    }



    if (this.helperLinking != null) {

      // truck2X = (truck.position.x + truckX - this.lastNode.position.x) * Math.cos(this.currentArc.orientation) + (truck.position.y + truckY - this.lastNode.position.y) * Math.sin(this.currentArc.orientation);

      let a = this.firstNode.position;

      // get world position of linking children
      var target = new THREE.Vector3();
      this.helperLinking.getWorldPosition(target);

      //calculate angle between linking and x axis
      this.angle = Math.atan2(target.y - a.y, target.x - a.x);

      // convert to degrees
      let angleInDegrees = this.angle * 180 / Math.PI;


        
     
          truck2X = (truck.position.x + truckX - this.firstNode.position.x) * Math.cos(this.angle) + (truck.position.y + truckY - this.firstNode.position.y) * Math.sin(this.angle);
          truck2Y = (truck.position.y + truckY - this.firstNode.position.y) * Math.cos(this.angle) - (truck.position.x + truckX - this.firstNode.position.x) * Math.sin(this.angle);
        
       


          if (boolean){
            truck2X_F = (frontOfTheTruck.x + truckX - this.firstNode.position.x) * Math.cos(this.angle) + (frontOfTheTruck.y + truckY - this.firstNode.position.y) * Math.sin(this.angle);
            truck2Y_F = (frontOfTheTruck.y + truckY - this.firstNode.position.y) * Math.cos(this.angle) - (frontOfTheTruck.x + truckX - this.firstNode.position.x) * Math.sin(this.angle);
          }else if (!boolean){
            truck2X_F = (backOfTheTruck.x + truckX - this.firstNode.position.x) * Math.cos(this.angle) + (backOfTheTruck.y + truckY - this.firstNode.position.y) * Math.sin(this.angle);
            truck2Y_F = (backOfTheTruck.y + truckY - this.firstNode.position.y) * Math.cos(this.angle) - (backOfTheTruck.x + truckX - this.firstNode.position.x) * Math.sin(this.angle);
          }
          
  

    }
    if (this.helperLinking != null) {

     
      if ((truck2X_F >= 0 && truck2X_F <= this.helperLinking.length && (truck2Y_F >= -this.helperLinking.width / 2 && truck2Y_F <= this.helperLinking.width / 2) && (truck.position.z - this.firstNode.z <=2 && truck.position.z - this.firstNode.z >= -1)) || (this.dot9 < 0 && this.dot10 < 0 && this.dot11 < 0 && this.dot12 < 0) ) {
        //truck.rotation.y = this.direction + Math.PI / 2;
        /* let quaternion = new THREE.Quaternion();
         quaternion.setFromAxisAngle(new Vector3(0, 1, 0), this.direction);
         truck.rotation.copy(quaternion);*/
        //  truck.rotation.x=Math.PI / 2;
        this.collided = false;
        let euler = new THREE.Euler(Math.PI / 2, Math.PI / 2 + this.direction, 0, 'XYZ');
        truck.rotation.copy(euler);
       


        if(boolean){
        truck.position.x += truckX;
       
        truck.position.y += truckY;
      
      
        }
        else if(!boolean){
          truck.position.x -= truckX;
      
        truck.position.y -= truckY;
      
      
        }

      } else if ((truck2X_F > 0 && truck2X_F < currentArc.s1.length + currentArc.projection + currentArc.s2.length) && (truck2Y_F > -currentArc.width / 2 && truck2Y_F < currentArc.width / 2)) {
        //truck.rotation.y = this.direction + Math.PI / 2;
        /*   if(currentArc.uneveness < 0){
             currentArc.uneveness = -currentArc.uneveness;
             currentArc.inclination= -currentArc.inclination;
           }*/
        this.collided = false;
          
        let euler = new THREE.Euler(Math.PI / 2 - currentArc.inclination, 0, Math.PI / 2 + this.direction, 'ZYX');
        truck.rotation.copy(euler);
       

        if(boolean){
          truck.position.x += truckX;
      
        truck.position.y += truckY;
    
        }
        else if(!boolean){
          truck.position.x -= truckX;
        
          truck.position.y -= truckY;
       
       
        }

          
          
          
          truck.position.z = this.firstNode.position.z + (truck2X - this.helperLinking.length) / currentArc.projection * currentArc.uneveness + 1;
          
       
      }
      else if (boolean) {


        if ((Math.pow(frontOfTheTruck.x + truckX - this.firstNode.position.x, 2) + Math.pow(frontOfTheTruck.y + truckY - this.firstNode.position.y, 2))  <= Math.pow(this.firstNode.circle.geometry.parameters.radius, 2) && (Math.pow(backOfTheTruck.x + truckX - this.firstNode.position.x, 2) + Math.pow(backOfTheTruck.y + truckY - this.firstNode.position.y, 2))  <= Math.pow(this.firstNode.circle.geometry.parameters.radius, 2) && (truck.position.z - this.firstNode.z  <= 2 && truck.position.z - this.firstNode.z >= -1)) {
          this.collided = false;
          let euler = new THREE.Euler(Math.PI / 2, Math.PI / 2 + this.direction, 0, 'XYZ');

          truck.rotation.copy(euler);
       

          truck.position.x += truckX;
        
          truck.position.y += truckY;
        
        
        }else{
          if(!this.collided){
            this.truckCrashAudio = this.playAudio("../../../../assets/audio/crash.mp3");
          }

          this.collided = true;
          

        }
      } else if (!boolean) {
        if (Math.pow(frontOfTheTruck.x - truckX - this.firstNode.position.x, 2) + Math.pow(frontOfTheTruck.y - truckY - this.firstNode.position.y, 2) <= Math.pow(this.firstNode.circle.geometry.parameters.radius, 2) && (Math.pow(backOfTheTruck.x - truckX - this.firstNode.position.x, 2) + Math.pow(backOfTheTruck.y - truckY - this.firstNode.position.y, 2))  <= Math.pow(this.firstNode.circle.geometry.parameters.radius, 2) && (truck.position.z - this.firstNode.z <= 2 && truck.position.z - this.firstNode.z >= -1)) {
          this.collided = false;

          let euler = new THREE.Euler(Math.PI / 2, Math.PI / 2 + this.direction, 0, 'XYZ');


          truck.rotation.copy(euler);
         
          truck.position.x -= truckX;
        
          truck.position.y -= truckY;
        
        }else{
          if(!this.collided){
            this.truckCrashAudio = this.playAudio("../../../../assets/audio/crash.mp3");

          }
          this.collided = true;
         

        }
      }
    } else if (boolean) {
      if ((Math.pow(frontOfTheTruck.x + truckX - this.firstNode.position.x, 2) + Math.pow(frontOfTheTruck.y + truckY - this.firstNode.position.y, 2))  <= Math.pow(this.firstNode.circle.geometry.parameters.radius, 2) && (Math.pow(backOfTheTruck.x + truckX - this.firstNode.position.x, 2) + Math.pow(backOfTheTruck.y + truckY - this.firstNode.position.y, 2))  <= Math.pow(this.firstNode.circle.geometry.parameters.radius, 2) && (truck.position.z - this.firstNode.z <= 2 && truck.position.z - this.firstNode.z >= -1)) {
        // truck.rotation.y = this.direction + Math.PI / 2;
        /* let quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(new Vector3(0, 1, 0), this.direction);
            truck.applyQuaternion(quaternion);*/
            this.collided = false;

        let euler = new THREE.Euler(Math.PI / 2, Math.PI / 2 + this.direction, 0, 'XYZ');

        truck.rotation.copy(euler);
        truck.position.x += truckX;
        truck.position.y += truckY;
      }else{
        if(!this.collided){
          this.truckCrashAudio = this.playAudio("../../../../assets/audio/crash.mp3");

        }
        this.collided = true;
      

      }
    } else if (!boolean) {
      if (Math.pow(frontOfTheTruck.x - truckX - this.firstNode.position.x, 2) + Math.pow(frontOfTheTruck.y - truckY - this.firstNode.position.y, 2) <= Math.pow(this.firstNode.circle.geometry.parameters.radius, 2) && (Math.pow(backOfTheTruck.x - truckX - this.firstNode.position.x, 2) + Math.pow(backOfTheTruck.y - truckY - this.firstNode.position.y, 2))  <= Math.pow(this.firstNode.circle.geometry.parameters.radius, 2) && ( truck.position.z - this.firstNode.z <= 2 && truck.position.z - this.firstNode.z >= -1)) {
        // truck.rotation.y = this.direction + Math.PI / 2;
        /* let quaternion = new THREE.Quaternion();
            quaternion.setFromAxisAngle(new Vector3(0, 1, 0), this.direction);
            truck.applyQuaternion(quaternion);*/
            this.collided = false;

        let euler = new THREE.Euler(Math.PI / 2, Math.PI / 2 + this.direction, 0, 'XYZ');

        truck.rotation.copy(euler);
        truck.position.x -= truckX;
        truck.position.y -= truckY;
      }else {
        if(!this.collided){
          this.truckCrashAudio = this.playAudio("../../../../assets/audio/crash.mp3");
          this.truckCrashAudio.volume=0.1;

        }
        this.collided = true;
      
      }
 
    }
    

  }

  // MOVIMENTO AUTOMÁTICO DO CAMIÃO

  onChange() {
    if (this.automaticMovement) this.automaticMovement = false;
    else{
      this.automaticMovement = true;
    } 
  }

  getPath(warehouses: IWarehouse[]){
    this.routeToDo.push("M02");
    let j = 1;
    let c = 0;
    let encontrou = false;
    while (!encontrou){
      let available: string[] = [];
      for (let i of this.arcs) {
        if (i.origin == this.routeToDo[j-1]){
          for (let l = 0; l < warehouses.length; l++){
            if (warehouses[l].id == i.destination && warehouses[l].active == true){
              available.push(i.destination);
            }
          }
        } else if (i.destination == this.routeToDo[j-1]){
          for (let l = 0; l < warehouses.length; l++){
            if (warehouses[l].id == i.origin && warehouses[l].active == true){
              available.push(i.origin);
            }
          }
        }
      }
      
      let num = Math.floor(Math.random() * (available.length + 1));
      
      if (!this.routeToDo.includes(available[num])){
        this.routeToDo.push(available[num]);
        j++;
      } else if (available[num] == "M02"){
        if (this.routeToDo.length <= 3){
          j = 1;
          this.routeToDo.length = 0;
          this.routeToDo.push("M02");
          c = 0;
        } else{
          this.routeToDo.push(available[num]);
          encontrou = true;
          for (let a = 0; a < this.routeToDo.length-1; a++){
            if ((this.routeToDo[a] == 'P02' && this.routeToDo[a+1] == 'V04') || (this.routeToDo[a] == 'V04' && this.routeToDo[a+1] == 'P02') ){
              encontrou = false;
              j = 1;
              this.routeToDo.length = 0;
              this.routeToDo.push("M02");
              c = 0;
            }
          }
          if (this.routeToDo[1] == "V04"){
            encontrou = false;
            j = 1;
            this.routeToDo.length = 0;
            this.routeToDo.push("M02");
            c = 0;
          }
        }
      }
      
      c++;
      if (c == 20){
        j = 1;
        this.routeToDo.length = 0;
        this.routeToDo.push("M02");
        c = 0;
      }
      
    }
  }
  
  autoMovement(truck: TruckModel){
    if (this.actualw <= this.routeToDo.length - 2){
      if (this.actualw == 0) this.definicaoPosicaoInicial("V04", this.routeToDo[this.actualw], truck);
      else this.definicaoPosicaoInicial(this.routeToDo[this.actualw-1], this.routeToDo[this.actualw], truck);
      if (this.actualw == 0) this.movimentoA("V04", this.routeToDo[this.actualw], this.routeToDo[this.actualw+1]);
      else this.movimentoA(this.routeToDo[this.actualw-1], this.routeToDo[this.actualw], this.routeToDo[this.actualw+1]);
      this.movimentoB(this.routeToDo[this.actualw]);
      this.movimentoC(this.routeToDo[this.actualw]);
      this.movimentoD(this.routeToDo[this.actualw], this.routeToDo[this.actualw+1]);
      this.movimentoE(this.routeToDo[this.actualw+1]);
      this.movimentoF(this.routeToDo[this.actualw+1]);
      truck.position.x += this.velh * Math.cos(this.direction);
      truck.position.y += this.velh * Math.sin(this.direction);
      truck.position.z += this.velv;
      this.direction += this.vela;
      if((this.actualm == 0 || this.actualm == 1 || this.actualm == 5) && this.cframes == 1){
        this.direction -= this.vela/2.0;
      }
      let euler = new THREE.Euler(Math.PI / 2 + this.incl, Math.PI / 2 + this.direction, 0, 'XYZ');
      truck.rotation.copy(euler);
    }
    
  }

  definicaoPosicaoInicial(anterior: string, atual: string, truck: TruckModel){
    if (this.actualm == 0 && this.cframes == 0){
      let rj!: number;
      let bj!: number;
      let raiof = 1.5;
      let no;
      for (let i of this.nodes) {
        if (i.wid == atual){
          let a = i.children[1] as Mesh;
          let b = a.geometry as CircleGeometry;
          rj = b.parameters.radius;
          bj = this.KBERMA * i.width;
          no = i;
        }
      }
      let hip = rj - bj + raiof;
      let cattrans = this.arcs[0].width/2.0 - this.arcs[0].width*this.KBERMA + raiof;
      let anguloij = Math.acos(cattrans / hip);
      for (let i of this.arcs) {
        if ((i.origin == anterior && i.destination == atual)){
          this.direction = i.orientation - anguloij;
        } else if (i.origin == atual && i.destination == anterior){
          this.direction = i.orientation - anguloij + Math.PI;
        }
      }
      if (anterior == "") this.direction = 0;
      truck.position.x = no?.position.x + (rj - bj) * Math.sin(this.direction);
      truck.position.y = no?.position.y - (rj - bj) * Math.cos(this.direction);
      truck.position.z = no?.position.z + 1;
    }
    
  }

  movimentoA(antes: string, inicio: string, fim: string){
    if (this.actualm == 0){
      let rj1!: number;
      let bj1!: number;
      let sj1!: number;
      let rj2!: number;
      let bj2!: number;
      let sj2!: number;
      let raiof = 1.5;
      for (let i of this.nodes) {
        if (i.wid == inicio){
          let a = i.children[1] as Mesh;
          let b = a.geometry as CircleGeometry;
          rj1 = b.parameters.radius;
          bj1 = this.KBERMA * i.width;
          sj1 = 1.1 * i.width/2;
        } else if (i.wid == fim){
          let a = i.children[1] as Mesh;
          let b = a.geometry as CircleGeometry;
          rj2 = b.parameters.radius;
          bj2 = this.KBERMA * i.width;
          sj2 = 1.1 * i.width/2;
        }
      }

      let hip1 = rj1 - bj1 + raiof;
      let hip2 = rj2 - bj2 + raiof;
      let cattrans = this.arcs[0].width/2.0 - this.arcs[0].width*this.KBERMA + raiof;
      let anguloij = Math.acos(cattrans/hip1);
      let angulojk = Math.acos(cattrans/hip2);

      let or1!: number;
      let or2!: number;
      let or3!: number;
      for (let i of this.arcs) {
        if (i.origin == inicio && i.destination == fim){
          or2 = i.orientation;
        } else if (i.origin == fim && i.destination == inicio){
          or2 = i.orientation - Math.PI;
        }else if (i.origin == antes && i.destination == inicio){
          or3 = i.orientation;
        }
        else if ((i.origin == inicio && i.destination == antes)){
          or1 = i.orientation;
        }
      }
      if (antes == "") or1 = this.direction;
      let anguloijk!: number;
      if (or3 == null){
        anguloijk = or2 - or1 - (Math.PI / 2.0 - anguloij) - (Math.PI / 2.0 - angulojk);
      }
      else{
        anguloijk = or2 - or3 + anguloij + angulojk;
      }
      if (anguloijk <= 0) anguloijk += 2.0*Math.PI;
      else if (anguloijk > 2.0*Math.PI) anguloijk -= 2.0*Math.PI;
      
      let dijk = (rj1 - bj1) * anguloijk;
      let n = Math.ceil(dijk/0.1);
      
      if (this.cframes > n){
        this.direction += this.vela / 2.0;
        this.actualm++;
        this.cframes = 0;
      }
      else{
        this.vela = anguloijk / n;
        this.velh = 2.0 * (rj1 - bj1) * Math.sin(anguloijk / n / 2.0);
        this.velv = 0;
        this.cframes++;
      }
    }
      
  }

  movimentoD(inicio: string, fim: string){
    if (this.actualm == 3){
      let sij!: number;
      let veld: number = 0.3;
      let pij!: number;
      let hij!: number;
      for (let i of this.arcs) {
        if ((i.origin == inicio && i.destination == fim)){
          sij = i.length;
          pij = i.projection;
          hij = i.uneveness;
          this.incl = i.inclination;
        }
        else if ((i.origin == fim && i.destination == inicio)){
          sij = i.length;
          pij = i.projection;
          hij = -i.uneveness;
          this.incl = -i.inclination;
        }
      }
      let n = Math.ceil(sij/veld);
      
      if (this.cframes > n){
        this.actualm++;
        this.cframes = 0;
        this.incl = -this.incl;
      }
      else{
        this.vela = 0;
        this.velh = pij / n;
        this.velv = hij / n;
        this.cframes++;
      }
    }
    
  }

  movimentoE(node: string){
    if (this.actualm == 4){
      let rj!: number;
      let bj!: number;
      let sj!: number;
      let raiof = 1.5;
      for (let i of this.nodes) {
        if (i.wid == node){
          let a = i.children[1] as Mesh;
          let b = a.geometry as CircleGeometry;
          rj = b.parameters.radius;
          bj = this.KBERMA * i.width;
          sj = 1.1 * rj;
        }
      }
      let hip = rj - bj + raiof;
      let cattrans = this.arcs[0].width/2.0 - this.arcs[0].width*this.KBERMA + raiof;
      let catlong = Math.sqrt(Math.pow(hip,2) - Math.pow(cattrans,2));
      let lij = sj - catlong;

      let n = Math.ceil(lij / 0.1);

      if (this.cframes > n) {
        this.actualm++;
        this.cframes = 0;
      } else {
        this.vela = 0;
        this.velh = lij / n;
        this.velv = 0;
        this.cframes++;
      }

      if (this.cframes > 0){
        this.incl = 0;
      }
    }
  }

  movimentoC(node: string){
    if (this.actualm == 2){
      let rj!: number;
      let bj!: number;
      let sj!: number;
      let raiof = 1.5;
      for (let i of this.nodes) {
        if (i.wid == node){
          let a = i.children[1] as Mesh;
          let b = a.geometry as CircleGeometry;
          rj = b.parameters.radius;
          bj = this.KBERMA * i.width;
          sj = 1.1 * rj;
        }
      }
      let hip = rj - bj + raiof;
      let cattrans = this.arcs[0].width/2.0 - this.arcs[0].width*this.KBERMA + raiof;
      let catlong = Math.sqrt(Math.pow(hip,2) - Math.pow(cattrans,2));
      let ljk = sj - catlong;
      let n = Math.ceil(ljk / 0.1);
      
      if (this.cframes > n) {
        this.actualm++;
        this.cframes = 0;
      } else {
        this.vela = 0;
        this.velh = ljk / n;
        this.velv = 0;
        this.cframes++;
      }
    }
  }

  movimentoF(node: string){
    if (this.actualm == 5){
      let rj!: number;
      let bj!: number;
      let sj!: number;
      let raiof = 1.5;
      for (let i of this.nodes) {
        if (i.wid == node){
          let a = i.children[1] as Mesh;
          let b = a.geometry as CircleGeometry;
          rj = b.parameters.radius;
          bj = this.KBERMA * i.width;
          sj = 1.1 * i.width/2;
        }
      }
      let hip = rj - bj + raiof;
      let cattrans = this.arcs[0].width/2.0 - this.arcs[0].width*this.KBERMA + raiof;
      let anguloij = Math.acos(cattrans/hip);
      let cij = raiof *anguloij;

      let n = Math.ceil(cij / 0.05);

      if (this.cframes > n) {
        this.direction += this.vela / 2.0;
        this.actualm = 0;
        this.actualw++;
        this.cframes = 0;
        if (this.actualw >= this.routeToDo.length) this.automaticMovement = false;
      } else {
        this.vela = -anguloij / n;
        this.velh = 2.0 * raiof * Math.sin(anguloij/n/2.0);
        this.velv = 0.0;
        this.cframes++;
      }
    }
  }

  movimentoB(node: string){
    if (this.actualm == 1){
      let rj!: number;
      let bj!: number;
      let sj!: number;
      let raiof = 1.5;
      for (let i of this.nodes) {
        if (i.wid == node){
          let a = i.children[1] as Mesh;
          let b = a.geometry as CircleGeometry;
          rj = b.parameters.radius;
          bj = this.KBERMA * i.width;
          sj = 1.1 * i.width/2;
        }
      }
      let hip = rj - bj + raiof;
      let cattrans = this.arcs[0].width/2.0 - this.arcs[0].width*this.KBERMA + raiof;
      let anguloij = Math.acos(cattrans/hip);
      let cij = raiof *anguloij;
      anguloij -= 0.025;

      let n = Math.ceil(cij / 0.05);

      if (this.cframes > n) {
        this.direction += this.vela / 2.0;
        this.actualm++;
        this.cframes = 0;
      } else {
        this.vela = -anguloij / n;
        this.velh = 2.0 * raiof * Math.sin(anguloij/n/2.0);
        this.velv = 0.0;
        this.cframes++;
      }
    }
  }
}





