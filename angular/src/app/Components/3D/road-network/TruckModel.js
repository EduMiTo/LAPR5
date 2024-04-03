import * as THREE from "three";
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class TruckModel extends THREE.Group {

    node;
    speed=0.5;
   
    constructor(node) {
        super();
        this.up.set(0,0,1);
        const objLoader = new GLTFLoader();
        const mtlLoader = new MTLLoader();
        this.position.x = -374.7576580069817;
        this.position.y = 138.17611223923666;
        this.position.z = 9.9;
       


        objLoader.load('../../../../assets/Imports/scene.gltf', (w) => {
            w.scene.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
             });
            this.scale.set(0.4,0.4,0.4);
            let euler = new THREE.Euler(Math.PI/2, Math.PI, 0, 'ZXY' );
            this.rotation.copy(euler);
            const obj = w.scene.getObjectByName('Sketchfab_model');
            obj.castShadow = true;
            obj.receiveShadow = true;
            obj.traverse(function (child) {
                if (child.isMesh) {
                  child.castShadow = true;
                  child.receiveShadow = true;
                }
             });

           

        // create a cube in the front of the truck
        var geometry = new THREE.BoxGeometry( 0.1, 0.1, 0.1 );

    

        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
        var cube = new THREE.Mesh( geometry, material );
        var cube2 = new THREE.Mesh( geometry, material );
        

            this.add(obj);

            cube.position.z += this.children.length/2+5;
            cube2.position.z -= this.children.length + 1.5;
            this.add(cube);
            this.add(cube2);

            //cube.position.z += this.children.length/2+3; 


            //create axis helper
            this.castShadow = true;
            this.receiveShadow = true;
            
          
        });
        
        //add axis helper

        //var axesHelper = new THREE.AxesHelper( 100 );
        //this.add( axesHelper );


        

        // Create a PointLight
        const lightt = new THREE.PointLight(0xffffff, 0.1, 100);

        // Set the position of the light
        lightt.position.set(0.9, -1.5, 15.2);
        let euler = new THREE.Euler(Math.PI/2, 0, Math.PI, 'XYZ');
        lightt.rotation.copy(euler);
        // Add the light to the scene
        this.add(lightt);
        const geometry = new THREE.CylinderGeometry(0.1, 0.7, 15, 60);

        // Create a transparent material for the cone
        const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.5
        });

        // Create the cone-shaped mesh
        const cone1 = new THREE.Mesh(geometry, material);

        // Set the position and rotation of the cone to match the position and direction of the light
        cone1.position.copy(lightt.position);
        cone1.rotation.copy(lightt.rotation);

        // Add the cone to the scene
        this.add(cone1);


        // Create a PointLight
        const lightt2 = new THREE.PointLight(0xffffff, 0.1, 100);

        // Set the position of the light
        lightt2.position.set(-0.9, -1.5, 15.2);
        lightt2.rotation.copy(euler);
        // Add the light to the scene
        this.add(lightt2);
        const geometry2 = new THREE.CylinderGeometry(0.1, 0.7, 15, 60);

        // Create a transparent material for the cone
        const material2 = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0.5
        });

        // Create the cone-shaped mesh
        const cone2 = new THREE.Mesh(geometry2, material2);

        // Set the position and rotation of the cone to match the position and direction of the light
        cone2.position.copy(lightt2.position);
        cone2.rotation.copy(lightt2.rotation);

        // Add the cone to the scene
        this.add(cone2);

 
    }


}