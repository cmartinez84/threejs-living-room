var example = (function(){

    "use strict";
    var scene=new THREE.Scene(),
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer(),
    light= new THREE.AmbientLight(0xffffff, .2),
    pointLight = new THREE.PointLight(0xffffff),
    camera,
    controls,
    spacesphere,
    effect,
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
        // camera = new THREE.PerspectiveCamera(
        // 80,
        // element.offsetWidth  / element.offsetHeight,
        // 1,
        // 1000
        // );
        renderer.setSize(window.innerWidth, window.innerHeight);

        camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);
        // camera.zoom =   100;


        camera.position.z= 1;
        camera.position.y= 1;
        camera.rotation.z= 0;
        camera.rotation.y= 0;
        camera.rotation.x= 0;
        // camera.zoom = 20
        //_____________Orbit Controls______________________

        controls = new THREE.OrbitControls( camera);
				// controls.enableZoom = true;
        controls.keyPanSpeed = 30;
        // controls.enableKeys = falfse;

        //___________________Stereo_____________________________________
        effect = new THREE.StereoEffect(renderer);
        effect.setSize( window.innerWidth, window.innerHeight );

        //___________________Device Orientation Check_____________________________________

        function setOrientationControls(e) {
          if (!e.alpha) {
            return;
          }

          controls = new THREE.DeviceOrientationControls(camera, true);
          controls.connect();
          controls.update();

          element.addEventListener('click', fullscreen, false);
          window.removeEventListener('deviceorientation', setOrientationControls, true);
          window.addEventListener('orientationchange', ()=>{
            // camera = new THREE.Perspect/iveCamera(90, window.innerWidth / window.innerHeight, 0.001, 700);

          })
          }

          function fullscreen() {
             if (element.requestFullscreen) {
               element.requestFullscreen();
             } else if (element.msRequestFullscreen) {
               element.msRequestFullscreen();
             } else if (element.mozRequestFullScreen) {
               element.mozRequestFullScreen();
             } else if (element.webkitRequestFullscreen) {
               element.webkitRequestFullscreen();
             }
          }
          // setOrientationControls()
          window.addEventListener('deviceorientation', setOrientationControls, true);





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
        var twiglightZoneGuitar = new THREE.PositionalAudio( listener );
        var ticktock = new THREE.PositionalAudio( listener );

        //Load a twiglightZoneGuitar and set it as the PositionalAudio object's buffer
        var audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'content/audio/twilight-zone.mp3', function( buffer ) {
        	twiglightZoneGuitar.setBuffer( buffer );
        	twiglightZoneGuitar.setRefDistance( 10 );
          twiglightZoneGuitar.loop = true;
        	// twiglightZoneGuitar.play();
        });


        var audioLoader = new THREE.AudioLoader();
        audioLoader.load( 'content/audio/ticktock.mp3', function( buffer ) {
        	ticktock.setBuffer( buffer );
        	ticktock.setRefDistance( 10 );
          ticktock.loop = true;
          ticktock.playbackRate = 2;
        	// ticktock.play();you
        });

        //Create an object for the sound to play from
        // var sphere = new THREE.SphereGeometry( 20, 32, 16 );
        // var material = new THREE.MeshPhongMaterial( { color: 0xff2200 } );
        // var mesh = new THREE.Mesh( sphere, material );
        // scene.add( mesh );

        //Finally add the sound to the mesh
        cone.add( twiglightZoneGuitar );


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
      document.addEventListener('keydown', moveCamera, false);

      render();
    } // end init
//________________________________________________


  function moveCamera(e){
    //  38, 40, 37 L , 39 R
    // camera.position.x += .01;
    if(e.keyCode === 65){
      camera.position.z += .1;
    }
    if(e.keyCode === 90){
      camera.position.z -= .1;
    }
    console.log(e.keyCode);
  }

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

        // renderer.render(scene, camera);
        effect.render(scene,camera);
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
