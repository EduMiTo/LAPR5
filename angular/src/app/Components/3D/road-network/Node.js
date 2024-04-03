import * as THREE from "three";

export default class Node extends THREE.Group {
    

    x;
    y;
    z;
    circle;
    position;
    wid;
    width;
    designation;
    
    addLinking(ligacao){
        
        this.circle.add(ligacao);

        
    }

    /*
    * metodo para criar o circulo na road network (recebe o width do linking, necessario para determinar o raio do circulo)
    */

    createCircle(w){

        let loader = new THREE.TextureLoader();

        let texture = loader.load('../../../../assets/images/rotunda2.png');
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;

        texture.zoom = 2;
        
        //texture.rotation = Math.PI/2;


        //let width = w;

        // formula para calcular o raio do circulo

        const K_CIRCULO= 6;
        this.width = w*K_CIRCULO;
        let geometry = new THREE.CircleGeometry(this.width/2, 64 );
        let material = new THREE.MeshPhongMaterial( {side: THREE.DoubleSide, map:texture} );
        this.circle = new THREE.Mesh( geometry, material );
        this.circle.traverse(function (child) {
            if (child.isMesh) {
              child.receiveShadow = true;
            }
         });
         if(this.designation=="Matosinhos"){
            this.circle.receiveShadow = true;
            this.receiveShadow = true;
         }
         
        this.add(this.circle);

        // add axis helper
      
       
    }


    /*
    * metodo para definir as coordenadas dos nós na cena, convertendo as coordenadas geograficas para coordenadas cartesianas
    */

    constructor(designation, x,y,z,wid,d,active) { // recebe a designação da warehouse e as coordenadas x,y,z e o id
        super();
        this.up.set(0,0,1); // definir o eixo z como correspondente ao up
        
        const MAX_X = 500;  
        const MIN_X = -500; 

        const MAX_X_G=-8.2451 ;
        const MIN_X_G=-8.7609 ;
        
        const MAX_Y = 500;
        const MIN_Y = -500;

        const MAX_Y_G= 41.3804;
        const MIN_Y_G= 40.8387;

        const MAX_Z = 20;
        const MIN_Z = 0;

        const MAX_Z_G= 800;
        const MIN_Z_G= 0;

        // conversao das coordenadas geograficas para coordenadas cartesianas

        this.x=Node.geoToCartesian(MAX_X, MIN_X, MAX_X_G, MIN_X_G, x); 
        this.y=Node.geoToCartesian(MAX_Y, MIN_Y, MAX_Y_G, MIN_Y_G, y);
        this.z=Node.geoToCartesian(MAX_Z, MIN_Z, MAX_Z_G, MIN_Z_G, z);
        //this.scale.set(0.5,0.5,0.5);


        this.position.set(this.x,this.y,this.z); // definir a posição do nó

        this.wid = wid; 


        // criar a label com o nome da warehouse para aparecer na cena

        let color;
        if(active == true){
            this.designation = designation;
            color = "white";
        }
        else{
            color = "red";
            this.designation = "!" + designation;
        }
        
        const texture = new THREE.CanvasTexture(this.createLabel(x,d,color));
        // because our canvas is likely not a power of 2
        // in both dimensions set the filtering appropriately.

        texture.minFilter = THREE.LinearFilter; 
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        
        const labelMaterial = new THREE.SpriteMaterial({
            map: texture,
            transparent: true,
        });

        const label = new THREE.Sprite(labelMaterial);
        label.scale.set(35,35,35);
        label.position.z += 3;
        this.add(label);
    }

    static geoToCartesian(MAX, MIN, MAX_G, MIN_G, x){

        return (MAX - MIN) / (MAX_G - MIN_G) * (x - MIN_G) + MIN;
    }

    // metodo para criar a label para cada warehouse que aparece por cima do circulo, na cena
    createLabel(size,d,color){
        const borderSize = 100;
        const ctx = document.createElement('canvas').getContext('2d');
        const font =  `${size}px bold sans-serif`;
        ctx.font = font;
        // measure how long the name will be
        const doubleBorderSize = borderSize * 2;
        const width = ctx.measureText(d).width + doubleBorderSize;
        const height = size + doubleBorderSize;
        ctx.canvas.width = width;
        ctx.canvas.height = height+ 30;
        
        // need to set font again after resizing canvas
        ctx.font = font;
        ctx.textBaseline = 'top';
        
        ctx.fillStyle = 'transparent';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = `${color}`;
        ctx.fillText(d, borderSize, borderSize);

        return ctx.canvas;
    }
}