import * as THREE from "three";

export default class Arc extends THREE.Group {

    width;
    orientation;
    inclination;
    origin;
    destination;
    length;
    s1;
    s2;
    projection;
    uneveness;

    // cria o arco entre duas warehouses, recebendo como parâmetros as duas warehouses e os elementos de ligação entre elas
    createArc(w1, w2, ligacao1, ligacao2, difference){

        // formulas do tutorial para definir as características do arco
        let lengthOfProjection = Math.sqrt(Math.pow(w2.position.x - w1.position.x, 2) + Math.pow(w2.position.y - w1.position.y, 2)) - ligacao1.length - ligacao2.length;

        

        let uneveness = w2.position.z - w1.position.z;
        let length = Math.sqrt(Math.pow(lengthOfProjection, 2) + Math.pow(uneveness, 2));
        this.orientation = Math.atan2((w2.position.y - w1.position.y), (w2.position.x-w1.position.x));
        this.inclination = Math.atan2(uneveness,lengthOfProjection);

        //adicionado para teste
        this.length = length;
        this.s1 = ligacao1;
        this.s2 = ligacao2;
        this.projection = lengthOfProjection;
        this.uneveness = uneveness;
        

        //


        let loader = new THREE.TextureLoader();

        let texture = loader.load('../../../../assets/images/asphalt.jpg');
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
        
        texture.rotation = Math.PI/2;

        let geometry = new THREE.PlaneGeometry( this.width, length, 30, 30 );
        let material = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, map: texture} );
        const plane = new THREE.Mesh( geometry, material );
        //let geometry = new THREE.BoxGeometry( this.width, length, 0.2, 30, 30, 30 );
        //const materials = [
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Lado esquerdo
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Lado direito
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Topo
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Base
        //    new THREE.MeshBasicMaterial({ map: texture }),     // Frente
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Trás
        //  ];
        //const plane = new THREE.Mesh( geometry, materials );


        let geometrySides = new THREE.PlaneGeometry( 0.5, length, 30, 30 );
        let materialSides = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, color: 0x565656} );
        const sides = new THREE.Mesh( geometrySides, materialSides );
        const sides1 = new THREE.Mesh( geometrySides, materialSides );


        plane.geometry.computeBoundingBox();

        var max = plane.geometry.boundingBox.max;
        var min = plane.geometry.boundingBox.min;
        var height = max.y - min.y;
        var width = max.x - min.x;
    
        texture.repeat.set(width / 512 , 1);
        texture.needsUpdate = true;


        //Fazer a rotacao primeiramente por Z de maneira a estrada ficar a apontar para o outro circulo
        //Depois de estar a apontar para o outro circulo, o eixo X nao vai "estar torto", entao a rotacao
        //nao fica bugada


        let euler = new THREE.Euler(-this.inclination, 0, Math.PI/2 + this.orientation, 'ZXY' );
        let eulersides = new THREE.Euler(-this.inclination, Math.PI/2, Math.PI/2 + this.orientation, 'ZXY' );


        plane.rotation.copy(euler);
        sides.rotation.copy(eulersides);
        sides1.rotation.copy(eulersides);

        this.add(plane);
        sides.translateZ(width/2);
        sides1.translateZ(-width/2);
        sides.translateX(-0.5/2);
        sides1.translateX(-0.5/2);
        this.add(sides);
        this.add(sides1);
       

    }


    definePos(ligacao1 , ligacao2){

        var target = new THREE.Vector3();

        var target2 = new THREE.Vector3();
        //como os dois cubos estao dentro do linking, precisamos da WorldPosition para saber a posição do cubo no mundo
        //e calcular a posicao do arco

        ligacao1.getWorldPosition(target);
        ligacao2.getWorldPosition(target2);


        this.position.set((target.x + target2.x)/2, (target.y + target2.y)/2, (target.z + target2.z)/2);
    }

    
    /*
    * metodo para definir a largura do arco que vai ligar 2 warehouses
    */
    constructor(w1, w2) { // recebe 2 warehouses como parâmetros
        super();


        

        this.origin = w1.wid;
        this.destination = w2.wid;
       
        this.position.set(0,0,0);

       // this.scale.set(0.5,1,0.5);

       // definimos a largura do arco como random (entre 1 a 8, tal como pedido pelo cliente) 

        this.width= 6;

       

        //this.width = 4;
    
        
    }
}