let dots = [];
let num = 500;
let chords = [];
let synth;
let chordIndex = 0;
let mouseDown = false;

function setup() {
  createCanvas(600, 600);
  colorMode(HSB, 255);
  background(10);

  for (let i = 0; i < num; i++) {
    dots.push(new Dot());
  }

  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: "sine" },
    envelope: { attack: 1, decay: 0.5, sustain: 0.6, release: 3 }
  }).toDestination();

  Tone.Transport.start();

  makeChords();
  playChord(chords[chordIndex]);
}

function draw() {
  background(10, 10);

  for (let d of dots) {
    d.move(mouseX, mouseY);
    d.update();
    d.wrap();
    d.show();
  }
}

class Dot {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.max = 3;
    this.prev = this.pos.copy();
  }

  apply(f) {
    this.acc.add(f);
  }

  move(x, y) {
    let target = createVector(x, y);
    let f = p5.Vector.sub(target, this.pos);
    f.setMag(0.5);
    this.apply(f);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.max);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show() {
    stroke(255, 255, 255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
    this.prev.x = this.pos.x;
    this.prev.y = this.pos.y;
  }

  wrap() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }
}

function makeChords() {
  let notes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
  chords = [];
  for (let i = 0; i < 4; i++) {
    let r = random(notes);
    chords.push([r, Tone.Frequency(r).transpose(4).toNote(), Tone.Frequency(r).transpose(7).toNote()]);
  }
}

function playChord(chord) {
  synth.triggerAttackRelease(chord, "3s");
}

function mousePressed() {
  mouseDown = true;
  chordIndex = (chordIndex + 1) % chords.length;
  playChord(chords[chordIndex]);
}

function mouseReleased() {
  mouseDown = false;
}
