function App() {
  this.scene = new THREE.Scene();
  this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  this.renderer = new THREE.WebGLRenderer();
}

App.prototype.setSize = function () {
  this.renderer.setSize(window.innerWidth, window.innerHeight);
}

App.prototype.setCamera = function () {
  this.camera.position.z = 5;
}

App.prototype.setLights = function () {
  var ambientLight = new THREE.AmbientLight( 0xffffff );
  this.scene.add(ambientLight);
}

App.prototype.init = function () {
  this._render = this.render.bind(this);

  this.setSize();
  this.createScene();
  this.setCamera();
  this.setLights();
  this.render();

  document.body.appendChild(this.renderer.domElement);

  this.bindListeners();
}

App.prototype.bindListeners = function () {
  document.addEventListener('mousemove',
    this.mouseMoveListener.bind(this))
}

App.prototype.x =
App.prototype.y = 0;

App.prototype.mouseMoveListener = function (event) {
  var pageX = event.pageX,
      pageY = event.pageY;

  var width = window.innerWidth,
      height = window.innerHeight;

  var x = pageX / width - .5,
      y = pageY / height - .5;

  this.x = x;
  this.y = y;
}

App.prototype.createScene = function () {
  // create the particle variables
  this.particleCount = 1800;
  this.particles = new THREE.Geometry();

  // create the particle variables
  var pMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 1
  });

  // now create the individual particles
  for (var p = 0; p < this.particleCount; p++) {

    // create a particle with random
    // position values, -250 -> 250
    var pX = Math.random() * 500 - 250,
        pY = Math.random() * 500 - 250,
        pZ = Math.random() * 500 - 250,
        particle = 
          new THREE.Vector3(pX, pY, pZ)

    // add it to the geometry
    this.particles.vertices.push(particle);
  }

  // create the particle system
  this.particleSystem = new THREE.Points(this.particles, pMaterial);


  // add it to the scene
  this.scene.add(this.particleSystem);

}

App.prototype.render = function () {
  requestAnimationFrame(this._render);

  this.camera.rotation.x = -10 * this.y;
  this.camera.rotation.y = -10 * this.x;

  this.camera.translateZ(-.5);

  this.particles.verticesNeedUpdate = true;

  this.renderer.render(this.scene, this.camera);
}