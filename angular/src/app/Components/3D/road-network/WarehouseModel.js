import * as THREE from "three";
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader.js';
import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';

export default class WarehouseModel extends THREE.Group {

    node;

    constructor(node) {
        super();
        const objLoader = new OBJLoader();
        const mtlLoader = new MTLLoader();

        mtlLoader.load('../../../../assets/Imports/warehouse.mtl', (mtl) => {
            mtl.preload();
            for (const material of Object.values(mtl.materials)) {
                material.side = THREE.DoubleSide;
            }
            objLoader.setMaterials(mtl);
            objLoader.load('../../../../assets/Imports/warehouse.obj', (w) => {
                if(node.width < 9){
                    w.scale.set(0.01,0.01,0.01);
                }
                else if(node.width < 12){
                    w.scale.set(0.015,0.015,0.015);
                }
                else if(node.width < 15){
                    w.scale.set(0.02,0.02,0.02);  
                }
                else if(node.width < 19){
                    w.scale.set(0.025,0.025,0.025);
                }
                else if(node.width < 25){
                    w.scale.set(0.03,0.03,0.03);
                }
                else{
                    w.scale.set(0.04,0.04,0.04);
                }
                w.position.x = node.position.x;
                w.position.y = node.position.y;
                w.position.z = node.position.z;
                w.rotation.x = Math.PI/2;
                let box3 = new THREE.Box3().setFromObject( w );
                let size = new THREE.Vector3();
                box3.getSize(size);
                //w.position.y = node.position.y - 11;
                w.position.z = node.position.z + size.z/2 + 0.1;
                w.receiveShadow = true;
                w.castShadow = true;
                w.traverse(function (child) {
                    if (child.isMesh) {
                      child.receiveShadow = true;
                      child.castShadow = true;
                    }
                 });
                this.add(w);
                this.receiveShadow = true;
                this.castShadow = true;
            });
        });
        

    }


}