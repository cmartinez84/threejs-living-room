var example = (function(){

    "use strict";
    var scene=new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
    light= new THREE.AmbientLight(0xffffff, .2),
    pointLight = new THREE.PointLight(0xffffff),
    camera,
    controls,
    spacesphere,
    directionalLight,
    cube;
    var woodTable;

    ///from audioloader.js

    function initScene(){

        renderer.setSize(window.innerWidth, window.innerHeight);

        var element = document.getElementById("webgl-container");
        element.appendChild(renderer.domElement);

        scene.add(light);
        light.position.z = 221;

        //______________Cam Position_____________________
        camera = new THREE.PerspectiveCamera(
        80,
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
        directionalLight.position.x = -3.5;
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
      var southWalltransparent = textureLoader.load( 'content/southcroppedtransparent.png' );

      var wall = textureLoader.load( 'content/livingroom.jpg' );

      var floor = textureLoader.load( 'content/woodtile.jpeg' );
      var ceiling = textureLoader.load( 'content/ceiling.jpg' );


      floor.wrapS = floor.wrapT = THREE.RepeatWrapping;
      floor.offset.set( 0, 0 );
      floor.repeat.set( 5, 5 );

      // var ceiling = textureLoader.load( 'content/livingroom.jpg' );

      var materials = [
          new THREE.MeshBasicMaterial( { map: southWalltransparent, side: THREE.DoubleSide, transparent: true } ),
          new THREE.MeshBasicMaterial( { map: northWall, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: ceiling, side: THREE.DoubleSide } ), //ceiling
          new THREE.MeshBasicMaterial( { map: floor, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: westWall, side: THREE.DoubleSide } ),
          new THREE.MeshBasicMaterial( { map: eastWall, side: THREE.DoubleSide } ),
      ];
      var stuff = new THREE.MeshFaceMaterial( materials );


      cube = new THREE.Mesh(
        new THREE.BoxGeometry(
          5, //west
          5,
          5),
          new THREE.MeshFaceMaterial( materials ),
      );

      cube.name="cube";
      scene.add(cube);

      //_______________SpaceSphere________________________

      var textureLoader = new THREE.TextureLoader();
      var spacetex = textureLoader.load( 'content/sky.jpg' );

       var spacesphereGeo = new THREE.SphereGeometry(20,20,20);
       var spacesphereMat = new THREE.MeshPhongMaterial();
       spacesphereMat.map = spacetex;

      spacesphere = new THREE.Mesh(spacesphereGeo,spacesphereMat);

       //spacesphere needs to be double sided as the camera is within the spacesphere
       spacesphere.material.side = THREE.DoubleSide;

       spacesphere.material.map.wrapS = THREE.RepeatWrapping;
       spacesphere.material.map.wrapT = THREE.RepeatWrapping;
       spacesphere.material.map.repeat.set( 5, 5);

       scene.add(spacesphere);

       //_______________Load Chair________________________
      //  var jsonLoader = new THREE.ObjectLoader();
      //  jsonLoader.setTexturePath('content/skins/');
      //  console.log(jsonLoader);
       //
      //  jsonLoader.load(
      //      "scripts/arm-chair.json",
       //
      //      function ( obj ) {
      //        woodTable = obj;
      //        woodTable.position.y = -2.3;
      //        woodTable.name = 'woodTable';
      //        scene.add( woodTable );
      //      },
       //
      //      function ( xhr ) {
      //          console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
      //      },
       //
      //      function ( xhr ) {
      //          console.error( 'An error happened' );
      //          console.log(xhr);
      //      }
      //  );

      //End Object Builds

      render();
    } // end init
//________________________________________________


    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        controls.update();
        spacesphere ? spacesphere.rotation.y +=.001: '';
        spacesphere ? spacesphere.rotation.z +=.001: '';
    };

    window.onload = initScene;
    return {
        scene: scene,
    }

})();
