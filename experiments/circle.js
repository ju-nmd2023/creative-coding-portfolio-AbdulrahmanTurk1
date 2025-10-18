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
      h: random(5, 50)
    });
  }
  
  for (let i = 0; i < totalRects / 2; i++) {
    verticalRects.push({
      x: random(-circleSize, circleSize),
      y: random(-circleSize, circleSize),
      w: random(5, 50),
      h: random(3, 10)
    });
  }
}

function draw() {
  background(255);
  translate(width / 2, height / 2);
  fill(0);

  for (let rectObj of horizontalRects) {
    if (dist(0, 0, rectObj.x, rectObj.y) < circleSize) {
      rect(rectObj.x, rectObj.y, rectObj.w, rectObj.h);
    }
  }

  for (let rectObj of verticalRects) {
    if (dist(0, 0, rectObj.x, rectObj.y) < circleSize) {
      rect(rectObj.x, rectObj.y, rectObj.w, rectObj.h);
    }
  }
}
