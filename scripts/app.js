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
    // cone2,
    cube;
    var woodTable;
    var cone;

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


        // render();

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
      // var stuff = new THREE.MeshFaceMaterial( materials );


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

       var spacesphereGeo = new THREE.SphereGeometry(50,50,50);
       var spacesphereMat = new THREE.MeshPhongMaterial();
       spacesphereMat.map = spacetex;

      spacesphere = new THREE.Mesh(spacesphereGeo,spacesphereMat);

       //spacesphere needs to be double sided as the camera is within the spacesphere
       spacesphere.material.side = THREE.DoubleSide;

       spacesphere.material.map.wrapS = THREE.RepeatWrapping;
       spacesphere.material.map.wrapT = THREE.RepeatWrapping;
       spacesphere.material.map.repeat.set( 5, 5);

       scene.add(spacesphere);

       //___________________Cone_____________________________________

       var conetex = textureLoader.load( 'content/stripesforcone.jpg' );
       var geometry = new THREE.ConeGeometry( 2, 4, 32 );
       var materials = [new THREE.MeshBasicMaterial(
         {
           map: conetex,
           side: THREE.DoubleSide,
         }
       )];

       cone = new THREE.Mesh( geometry, materials );
       cone.position.set(0,0,0);


       scene.add( cone );

       //___________________Audio Setup_____________________________________



               //Create an AudioListener and add it to the camera
        var listener = new THREE.AudioListener();
        camera.add( listener );

        //Create the PositionalAudio object (passing in the listener)
        var sound = new THREE.PositionalAudio( listener );

        //Load a sound and set it as the PositionalAudio object's buffer
        var audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'content/audio/twilight-zone.mp3', function( buffer ) {
        	sound.setBuffer( buffer );
        	sound.setRefDistance( 10 );
          sound.loop = true;
        	sound.play();

        });

        //Create an object for the sound to play from
        // var sphere = new THREE.SphereGeometry( 20, 32, 16 );
        // var material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
        // var mesh = new THREE.Mesh( sphere, material );
        // scene.add( mesh );

        //Finally add the sound to the mesh
        cone.add( sound );


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

  var t = 0;
  function orbitCone(){
    t += 0.01;
    // t += 0.1;
    cone.position.x = 20*Math.cos(t) * .8;
    cone.position.z = 20*Math.sin(t) + 0;
  }
  function wabbleCone(){
    cone.rotation.z += .01;
    cone.rotation.y += .01;
    cone.rotation.z += .005;
  }

    function render() {

        renderer.render(scene, camera);
        requestAnimationFrame(render);
        controls.update();
        wabbleCone();
        orbitCone();
        // console.log(cone);
        spacesphere ? spacesphere.rotation.y +=.001: '';
        spacesphere ? spacesphere.rotation.z +=.001: '';
    };

    window.onload = initScene;
    return {
        scene: scene,
    }

})();
