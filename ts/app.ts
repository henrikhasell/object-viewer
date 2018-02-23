/// <reference path="../node_modules/@types/node/index.d.ts"/>
/// <reference path="../node_modules/@types/three/index.d.ts"/>


function renderDigiFobPro(canvas:HTMLCanvasElement) {
	let scene:THREE.Scene = new THREE.Scene();
	let camera:THREE.PerspectiveCamera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 100);
	let renderer:THREE.WebGLRenderer = new THREE.WebGLRenderer({canvas:canvas});
	let loader:THREE.JSONLoader = new THREE.JSONLoader();
	let digiFobPro:THREE.Object3D;
	let previousMousePosition:{x:number, y:number};
	loader.load('models/json/DigiFobPro.json',
		// onLoad:
		geomerty => {
			digiFobPro = new THREE.Mesh(geomerty, new THREE.MeshNormalMaterial());
			scene.add(digiFobPro);

			camera.position.z = 6;
			renderer.setClearColor(0xffffff, 1);

			document.onmousemove = (event:MouseEvent) => {
				if(previousMousePosition && event.buttons == 1) {
					let deltaMove:{ x:number, y:number } = {
						x: event.x-previousMousePosition.x,
						y: event.y-previousMousePosition.y
					};
					var deltaQuaternion:THREE.Quaternion = new THREE.Quaternion()
					.setFromEuler(new THREE.Euler(
						deltaMove.y * 0.02,
						deltaMove.x * 0.02,
						0, 'XYZ'
					));
					digiFobPro.quaternion.multiplyQuaternions(deltaQuaternion, digiFobPro.quaternion);
					previousMousePosition = {
						x: event.x,
						y: event.y
					};
				}
			}

			function animate():void {
				if(!previousMousePosition) {
					var deltaQuaternion:THREE.Quaternion = new THREE.Quaternion()
					.setFromEuler(
						new THREE.Euler(0, 0.01, 0, 'XYZ')
					);
					digiFobPro.quaternion.multiplyQuaternions(deltaQuaternion, digiFobPro.quaternion);
				}
				requestAnimationFrame(animate);
				renderer.render(scene, camera);
			}
			animate();
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
	document.onmouseup = () => {
		previousMousePosition = undefined;
	}
	renderer.domElement.onmousedown = event => {
		previousMousePosition = {
			x: event.x,
			y: event.y
		};
	}
	renderer.domElement.onwheel = event => {
		camera.position.z += event.deltaY / 100;
		camera.position.z = Math.min(10, Math.max(3.7, camera.position.z));
		return false;
	}
	// Alternatively, to parse a previously loaded JSON structure
	// var object = loader.parse( a_json_object );
	// scene.add( object );
};

document.body.onload = () => {
	renderDigiFobPro(<HTMLCanvasElement>document.getElementById('digiFobPro'));
}