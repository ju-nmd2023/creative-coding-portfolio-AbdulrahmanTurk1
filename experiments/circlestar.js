let circleSize = 200;
let totalRects = 300;
let horizontalRects = [];
let verticalRects = [];

function setup() {
  createCanvas(600, 600);
  noStroke();
  
  for (let i = 0; i < totalRects / 2; i++) {
    horizontalRects.push({
      x: random(-circleSize, circleSize),
      y: random(-circleSize, circleSize),
      w: random(3, 10),
      h: random(5, 50),
      visible: true 
    });
  }
  
  for (let i = 0; i < totalRects / 2; i++) {
    verticalRects.push({
      x: random(-circleSize, circleSize),
      y: random(-circleSize, circleSize),
      w: random(5, 50),
      h: random(3, 10),
      visible: true
    });
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  fill(0);

  for (let rectObj of horizontalRects) {
    if (random() < 0.01) rectObj.visible = !rectObj.visible;

    if (rectObj.visible && dist(0, 0, rectObj.x, rectObj.y) < circleSize) {
      rect(rectObj.x, rectObj.y, rectObj.w, rectObj.h);
      rectObj.w += random(-1, 1);
      rectObj.h += random(-1, 1);
      rectObj.w = constrain(rectObj.w, 3, 10);
      rectObj.h = constrain(rectObj.h, 5, 50);
    }
  }

  for (let rectObj of verticalRects) {
    if (random() < 0.01) rectObj.visible = !rectObj.visible;

    if (rectObj.visible && dist(0, 0, rectObj.x, rectObj.y) < circleSize) {
      rect(rectObj.x, rectObj.y, rectObj.w, rectObj.h);
      rectObj.w += random(-1, 1);
      rectObj.h += random(-1, 1);
      rectObj.w = constrain(rectObj.w, 5, 50);
      rectObj.h = constrain(rectObj.h, 3, 10);
    }
  }
}
