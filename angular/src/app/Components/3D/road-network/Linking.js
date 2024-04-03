import * as THREE from "three";
import { AxesHelper, Texture } from "three";

export default class Linking extends THREE.Group {

    length;
    orientation;
    width;
    arcOriginX;
    arcOriginY;

    // cria o elemento de ligação entre duas warehouses, recebendo um arco que liga 2 warehouses
    createLinking(w, arco) {
        let loader = new THREE.TextureLoader();

        let texture = loader.load('../../../../assets/images/asphalt.jpg');
        texture.wrapT = THREE.RepeatWrapping;
        texture.wrapS = THREE.RepeatWrapping;
         
        texture.rotation = Math.PI/2;
        this.width = arco.children[0].geometry.parameters.width;
        let geometry = new THREE.PlaneGeometry(this.width, this.length);
        let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
        const plane = new THREE.Mesh(geometry, material);
        //let geometry = new THREE.BoxGeometry(this.width, this.length, 0.2);
        //const materials = [
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Lado esquerdo
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Lado direito
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Topo
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Base
        //    new THREE.MeshBasicMaterial({ map: texture }),     // Frente
        //    new THREE.MeshBasicMaterial({ color: 0x707070 }),  // Trás
        //  ];
        //const plane = new THREE.Mesh(geometry, materials);

        this.orientation = arco.orientation;

        //criar um cubo transparente para que seja mais facil posteriormente calcular a posicao do arco
        var geometryCube = new THREE.BoxGeometry( 1, 1, 1 );
            // add green color to cube
            var materialCube = new THREE.MeshBasicMaterial( {color: 0x00ff00,transparent: true, opacity: 0} );
            const cube = new THREE.Mesh( geometryCube, materialCube );

           

        //cube.position.set(0, 0, 0);
            cube.rotation.z=(Math.PI/4);


            //colocar o cubo na ponta do linking
            cube.position.y=-this.length/2;
            
            this.arcOriginX = cube.position.x;
            this.arcOriginY = cube.position.y;
            this.add(cube);
        //plane.rotation.z = Math.PI/2;

        

        this.add(plane);

        // create axis helper
       
        
    }

        /*
        * define o tamano do elemento de ligação, que depende do raio da warehouse e, por isso, recebe-a como parâmetro
        */
        constructor(w) {
            super();
            const K_LIGACAO = 1.1;

           // this.position.set(w.position.x, w.position.y, w.position.z);
            
           // aplica-se a formula do tutorial para calcular o tamanho do elemento de ligação
            this.length = K_LIGACAO * w.children[1].geometry.parameters.radius; // 1.1 * raio da warehouse
            




            
        }
}
