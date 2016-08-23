window.onload = ->
	options = {
		width: 400
		height: 300
		viewAngle: 45
		aspect: 400 / 300
		near: 0.1
		far: 10000
	}

	console.log options.aspect

	$container = document.getElementById('container')

	renderer = new THREE.WebGLRenderer()

	camera = new THREE.PerspectiveCamera \
		options.viewAngle,
		options.aspect,
		options.near,
		options.far

	scene = new THREE.Scene()

	scene.add camera

	camera.position.z = 300

	renderer.setSize options.width, options.height

	$container.appendChild renderer.domElement

	radius = 50
	segments = 16
	rings = 16

	sphere = new THREE.Mesh \
		new THREE.SphereGeometry(
			radius,
			segments,
			rings
		),
		sphereMaterial

	scene.add sphere

	sphereMaterial =
		new THREE.MeshLambertMaterial \
			{ color: 0xCC0000 }

	pointLight = 
		new THREE.PointLight(0xFFFFFF)

	pointLight.position.x = 10
	pointLight.position.y = 50
	pointLight.position.z = 130

	scene.add pointLight

	render = ->
		renderer.render scene, camera

	requestAnimationFrame render