//sliders variables
let controller_1;
let slider_1;
let slider_sx;
let slider_dx;
let slider_2;

//face variables
let cerchio = {
  x: 300,
  y: 300,
  sz: 500,

  rEyeX: 5,
  rEyeY: 10,
  rEyeSize: 10,

  lEyeX: 5,
  lEyeY: 10,
  lEyeSize: 10,

  eyeRotation: 0,

  mouthX: 10,
  mouthY: 10,
  mouthSize: 12,
};

function setup() {
  pixelDensity(1);
  createCanvas(window.innerWidth, window.innerHeight);

  //Setup controllers
  controller_1 = new ControllerQuad(
    width / 2,
    height - 120,
    width / 2,
    height - 120,
    40,
    90,
    "HEAD"
  );

  slider_1 = new ControllerSlider(
    width / 2,
    60,
    width / 2,
    60,
    30,
    90,
    "MOUTH"
  );
  slider_sx = new ControllerSlider(
    width / 2 - 75,
    height - 120,
    width / 2 - 120,
    height - 120,
    30,
    90,
    "LEFT EYE"
  );
  slider_dx = new ControllerSlider(
    width / 2 + 75,
    height - 120,
    width / 2 + 120,
    height - 120,
    30,
    90,
    "RIGHT EYE"
  );

  slider_2 = new ControllerSlider(
    width / 2,
    height - 210,
    width / 2,
    height - 210,
    30,
    90,
    "EYE ROTATION"
  );
}

function draw() {
  background(255);

  //controller mapping

  cerchio.x = controllerMap(
    cerchio.x,
    controller_1,
    "x",
    0 + cerchio.sz / 2,
    width - cerchio.sz / 2
  );

  cerchio.y = controllerMap(
    cerchio.y,
    controller_1,
    "y",
    0 + cerchio.sz / 2,
    height - cerchio.sz / 2
  );

  cerchio.rEyeX = controllerMap(cerchio.rEyeX, controller_1, "x", 40, 150);

  cerchio.rEyeY = controllerMap(cerchio.rEyeY, controller_1, "y", -100, 60);

  cerchio.rEyeSize = controllerMap(cerchio.rEyeSize, slider_dx, "x", 12, 200);

  cerchio.lEyeX = controllerMap(cerchio.lEyeX, controller_1, "x", -150, -40);

  cerchio.lEyeY = controllerMap(cerchio.rEyeY, controller_1, "y", -100, 60);

  cerchio.lEyeSize = controllerMap(cerchio.lEyeSize, slider_sx, "x", 200, 12);

  cerchio.mouthX = controllerMap(cerchio.mouthX, controller_1, "x", -60, 60);

  cerchio.mouthY = controllerMap(cerchio.mouthY, controller_1, "y", -30, 90);

  cerchio.mouthSize = controllerMap(cerchio.mouthSize, slider_1, "x", 100, 6);

  cerchio.eyeRotation = controllerMap(
    cerchio.eyeRotation,
    slider_2,
    "x",
    -PI/2,
    PI / 2
  );

  //DRAWING
  push();

  //body
  fill(0, 0, 255);
  circle(cerchio.x, cerchio.y, cerchio.sz);
  
  
  //mouth
  fill(0);

  ellipse(
    cerchio.x + cerchio.mouthX,
    cerchio.y + cerchio.mouthY,
    cerchio.sz / 6,
    cerchio.sz / cerchio.mouthSize
  );

  //eyes
  fill(255);
  stroke(0);
  strokeWeight(4);
  translate(cerchio.x + cerchio.lEyeX, cerchio.y + cerchio.lEyeY);
  rotate(cerchio.eyeRotation);
  ellipse(0, 0, cerchio.sz / 3.5, cerchio.sz / cerchio.lEyeSize);
  resetMatrix();

  translate(cerchio.x + cerchio.rEyeX, cerchio.y + cerchio.rEyeY);
  rotate(-cerchio.eyeRotation);
  ellipse(0, 0, cerchio.sz / 3.5, cerchio.sz / cerchio.rEyeSize);
  resetMatrix();

  //pupils
  fill(0);

  translate(cerchio.x + cerchio.lEyeX, cerchio.y + cerchio.lEyeY);
  rotate(cerchio.eyeRotation);
  ellipse(0, 0, cerchio.sz / 10, cerchio.sz / cerchio.lEyeSize);
  resetMatrix();

  translate(cerchio.x + cerchio.rEyeX, cerchio.y + cerchio.rEyeY);
  rotate(-cerchio.eyeRotation);
  ellipse(0, 0, cerchio.sz / 10, cerchio.sz / cerchio.rEyeSize);
  resetMatrix();


  pop();

  //DISPLAY CONTROLLERS
  controller_1.display();
  controller_1.grab();

  slider_1.display();
  slider_1.grab();
  slider_2.display();
  slider_2.grab();

  slider_sx.display();
  slider_sx.grab();
  slider_dx.display();
  slider_dx.grab();
}

//controller mapping function

//value is the target variable
//controller is the controller object
//direction accepts "x" and "y" (it's a string) as the value for horizontal and vertical movement
//min and max are the min and max values of the target variable

//when using slider controller, input "x" as the direction
function controllerMap(value, controller, direction, min, max) {
  let controllerDirection = controller[direction];

  if (direction === "x") {
    value = map(
      controllerDirection,
      controller.boxX - controller.boxSize / 2,
      controller.boxX + controller.boxSize / 2,
      min,
      max,
      true
    );
  } else if (direction === "y") {
    value = map(
      controllerDirection,
      controller.boxY - controller.boxSize / 2,
      controller.boxY + controller.boxSize / 2,
      min,
      max,
      true
    );
  }
  return value;
}

function mousePressed(){
  return false;
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight)
}
