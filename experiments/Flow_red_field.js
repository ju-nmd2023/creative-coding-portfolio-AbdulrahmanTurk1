let inc = 0.1;
let scl = 20;
let cols, rows;
let zoff = 0;
let particles = [];
let flowfield;

function setup() {
  createCanvas(600, 600);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowfield = new Array(cols * rows);

  for (let i = 0; i < 2000; i++) {
    particles[i] = new Particle();
  }

  colorMode(HSB, 255);
  background(10); 
}

function draw() {
  background(10); 
  
  stroke(255, 50); 
  
  let yoff = 0;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      flowfield[index] = v;

      push();
      translate(x * scl + scl * 0.5, y * scl + scl * 0.5);
      rotate(v.heading());
      line(0, 0, scl * 0.4, 0);
      pop();

      xoff += inc;
    }
    yoff += inc;
  }
  zoff += 0.003;

  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxspeed = 2;
    this.prevPos = this.pos.copy();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  follow(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(255, 255, 255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
    
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    if (this.pos.x > width) { this.pos.x = 0; this.updatePrev(); }
    if (this.pos.x < 0) { this.pos.x = width; this.updatePrev(); }
    if (this.pos.y > height) { this.pos.y = 0; this.updatePrev(); }
    if (this.pos.y < 0) { this.pos.y = height; this.updatePrev(); }
  }
}

function preload() { }