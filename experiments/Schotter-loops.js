function setup() {
  createCanvas(600, 900);
//  noLoop();
}

function draw() {
  background(245, 235, 220);

  noFill();
  strokeWeight(2);

  let rows = 20;
  let vert = 12;

  let safeMargin = 80;
  let availableWidth = width - safeMargin * 2;
  let availableHeight = height - safeMargin * 2;

  let squareSize = min(availableWidth / vert, availableHeight / rows) * 0.9;
  let gapX = (availableWidth - vert * squareSize) / (vert - 1 || 1);
  let gapY = (availableHeight - rows * squareSize) / (rows - 1 || 1);

  let startX = (width - (vert * squareSize + (vert - 1) * gapX)) / 2;
  let startY = (height - (rows * squareSize + (rows - 1) * gapY)) / 2;

  for (let r = 0; r < rows; r++) {
    let progress = r / (rows - 1);

    let maxDisp = 14 * pow(progress, 1.4);
    let maxAngle = radians(24) * pow(progress, 1.2);

    for (let c = 0; c < vert; c++) {
      let x = startX + c * (squareSize + gapX) + squareSize / 2;
      let y = startY + r * (squareSize + gapY) + squareSize / 2;

      let dx = random(-maxDisp, maxDisp);
      let dy = random(-maxDisp, maxDisp);
      let angle = random(-maxAngle, maxAngle);

      stroke(random(50, 255), random(50, 255), random(50, 255));

      push();
      translate(x + dx, y + dy);
      rotate(angle);
      rectMode(CENTER);
      rect(0, 0, squareSize, squareSize);
      pop();
    }
  }
}
