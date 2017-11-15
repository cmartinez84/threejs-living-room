var example = (function(){

    "use strict";
    var scene=new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
    light= new THREE.AmbientLight(0xffffff, .2),
    pointLight = new THREE.PointLight(0xffffff),
    camera,
    controls,
    directionalLight,
    cube;

    ///from audioloader.js

    function initScene(){

        renderer.setSize(window.innerWidth, window.innerHeight);

        var element = document.getElementById("webgl-container");
        element.appendChild(renderer.domElement);

        scene.add(light);
        light.position.z = 221;

        //______________Cam Position_____________________
        camera = new THREE.PerspectiveCamera(
        35,
        element.offsetWidth  / element.offsetHeight,
        1,
        1000
        );

        camera.position.z= 100;
        camera.position.y= 100;
        //_____________Orbit Controls______________________

        controls = new THREE.OrbitControls( camera);
				controls.enableZoom = true;
        //_____________Directional light______________________

        directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
        directionalLight.position.z = 2;
        directionalLight.position.x = 2;
        directionalLight.position.y = 2;
        ///

        scene.add( camera );
        scene.add( directionalLight );


        render();

//______________________Cube__________________________
      var textureLoader = new THREE.TextureLoader();

      var wall = textureLoader.load( 'content/livingroom.jpg' );
      var floor = textureLoader.load( 'content/tile.jpeg' );
      var sky = textureLoader.load( 'content/sky.jpg' );


      floor.wrapS = floor.wrapT = THREE.RepeatWrapping;
      floor.offset.set( 0, 0 );
      floor.repeat.set( 10, 10 );

      // var ceiling = textureLoader.load( 'content/livingroom.jpg' );

      var materials = [
          new THREE.MeshBasicMaterial( { map: wall, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: wall, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: sky, side: THREE.DoubleSide } ), //ceiling
          new THREE.MeshBasicMaterial( { map: floor, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: wall, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: wall, side: THREE.DoubleSide } ),
      ];
      var stuff = new THREE.MeshFaceMaterial( materials );


      cube = new THREE.Mesh(
        new THREE.BoxGeometry(
          1000,
          1000,
          1000),
          new THREE.MeshFaceMaterial( materials ),
      );

      cube.name="cube";
      scene.add(cube);
      render();
    } // end init
//________________________________________________


    function render() {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
        controls.update();
    };

    window.onload = initScene;

    return {
        scene: scene
    }

})();
