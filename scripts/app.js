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

        camera.position.z= 1;
        camera.position.y= 1;
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

      var eastWall = textureLoader.load( 'content/eastcropped.png' );
      var westWall = textureLoader.load( 'content/westcropped.png' );
      var northWall = textureLoader.load( 'content/northcropped.png' );
      var southWall = textureLoader.load( 'content/southcropped.png' );

      var wall = textureLoader.load( 'content/livingroom.jpg' );

      var floor = textureLoader.load( 'content/woodtile.jpeg' );
      var ceiling = textureLoader.load( 'content/ceiling.jpg' );


      floor.wrapS = floor.wrapT = THREE.RepeatWrapping;
      floor.offset.set( 0, 0 );
      floor.repeat.set( 10, 10 );

      // var ceiling = textureLoader.load( 'content/livingroom.jpg' );

      var materials = [
          new THREE.MeshBasicMaterial( { map: southWall, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: northWall, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: ceiling, side: THREE.DoubleSide } ), //ceiling
          new THREE.MeshBasicMaterial( { map: floor, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: westWall, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: eastWall, side: THREE.DoubleSide } ),
      ];
      var stuff = new THREE.MeshFaceMaterial( materials );


      cube = new THREE.Mesh(
        new THREE.BoxGeometry(
          15, //west
          10,
          10),
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
