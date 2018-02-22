/// <reference path="../node_modules/@types/node/index.d.ts"/>
/// <reference path="../node_modules/@types/three/index.d.ts"/>
document.body.onload = ():void => {
	let scene:THREE.Scene = new THREE.Scene();
	let camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
	let renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer();
	let loader:THREE.JSONLoader = new THREE.JSONLoader();
	let digiFobPro:THREE.Object3D;
	let previousMousePosition:{x:number, y:number};
	loader.load('models/json/DigiFobPro.json',
		// onLoad:
		geomerty => {
			console.log('Finished loading geomerty.');
			digiFobPro = new THREE.Mesh(geomerty, new THREE.MeshNormalMaterial());
			scene.add(digiFobPro);
		},
		// onProgress:
		xhr => {
			console.log((xhr.loaded / xhr.total * 100) + '% loaded');
		},
		// onError:
		error => {
			console.error('An error has orrured: ' + error.message);
		}
	);
	renderer.domElement.onmousemove = event => {
		if(event.buttons == 1) {
			let deltaMove:{ x:number, y:number } = {
				x: event.offsetX-previousMousePosition.x,
				y: event.offsetY-previousMousePosition.y
			};
			var deltaQuaternion:THREE.Quaternion = new THREE.Quaternion()
			.setFromEuler(new THREE.Euler(
				deltaMove.y * 0.01,
				deltaMove.x * 0.01,
				0, 'XYZ'
			));
			digiFobPro.quaternion.multiplyQuaternions(deltaQuaternion, digiFobPro.quaternion);
			previousMousePosition = {
				x: event.offsetX,
				y: event.offsetY
			};
		}
	}
	renderer.domElement.onmousedown = event => {
		previousMousePosition = {
			x: event.offsetX,
			y: event.offsetY
		};
	}
	renderer.domElement.onscroll = event => {
		console.warn('Scrolling~');
	}
	// Alternatively, to parse a previously loaded JSON structure
	// var object = loader.parse( a_json_object );
	// scene.add( object );
	let light:THREE.Light = new THREE.PointLight('#ff0000', 1.0, 10, 1);
	light.position.set( 50, 50, 50 );

	scene.add(light);

	camera.position.z = 5;
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	function animate():void {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}
	animate();
};
