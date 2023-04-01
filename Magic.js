let canvas = document.getElementById("magic_");

let ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 620;

var arrowSize = 20;

var intervalId_0, intervalId_1, intervalId_2, intervalId_3;

function Draw(
  radius,
  arrowX,
  circleX,
  yDistance,
  arrowDx,
  arrowDy,
  color,
  clickedCircle
) {
  this.radius = radius;
  this.arrowX = arrowX;
  this.circleX = circleX;
  this.yDistance = yDistance;
  this.arrowDx = arrowDx;
  this.arrowDy = arrowDy;
  this.color = color;
  this.animationId = clickedCircle;

  this.draw = function () {
    ctx.beginPath(); // this clear the entire canvas! event listener
    ctx.arc(this.circleX, this.yDistance, this.radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 5;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    // arrow

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(this.arrowX - arrowSize, this.yDistance);
    ctx.lineTo(this.arrowX, this.yDistance);

    ctx.fill();
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.closePath();

    // Draw the arrowhead
    ctx.beginPath();
    ctx.moveTo(this.arrowX - arrowSize, this.yDistance - arrowSize / 2);
    ctx.lineTo(this.arrowX - arrowSize, this.yDistance + arrowSize / 2);
    ctx.lineTo(this.arrowX - arrowSize * 2, this.yDistance);
    ctx.fillStyle = this.colors;
    ctx.fill();
    ctx.closePath();
  };

  this.update = function (circleNumber) {
    //arrow
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.moveTo(this.arrowX - arrowSize, this.yDistance);
    ctx.lineTo(this.arrowX, this.yDistance);

    ctx.fill();
    ctx.stroke();
    ctx.lineCap = "round";

    ctx.closePath();

    // Draw the arrowhead

    ctx.beginPath();

    ctx.moveTo(this.arrowX - arrowSize, this.yDistance - arrowSize / 2);
    ctx.lineTo(this.arrowX - arrowSize, this.yDistance + arrowSize / 2);
    ctx.lineTo(this.arrowX - arrowSize * 2, this.yDistance);
    ctx.fillStyle = this.colors;
    ctx.fill();
    ctx.closePath();

    if (this.arrowX < circleX + 2 * this.radius) {
      if (circleNumber === 0) {
        clearInterval(intervalId_0);
      }
      if (circleNumber === 1) {
        clearInterval(intervalId_1);
      }
      if (circleNumber === 2) {
        clearInterval(intervalId_2);
      }
      if (circleNumber === 3) {
        clearInterval(intervalId_3);
      }

      this.color = "aqua";
    }
    this.arrowX -= this.arrowDx; // increment the x distance !
    this.draw();
  };
}

const colors = ["red", "green", "blue", "yellow"];

var clickedCircle = {
  clicked_1: false,
  clicked_2: false,
  clicked_3: false,
  clicked_4: false,
};

var CanvasArray = [];
var radius = 42;
var arrowX = canvas.width - 10;

var circleX = 100;
var xDistance = 100;

var dx = 3;
var dy = 3;

const yDistance = [100, 250, 400, 550];

for (var i = 0; i <= 3; i++) {
  CanvasArray.push(
    new Draw(
      radius,
      arrowX,
      circleX,
      yDistance[i],
      dx,
      dy,
      colors[i],
      clickedCircle
    )
  );
}

let click = {
  x: "",
  y: "",
};

// respond to click event!

window.addEventListener("click", function (event) {
  click.x = event.offsetX;
  click.y = event.offsetY;
  if (
    click.x >= circleX - radius &&
    click.x <= circleX + radius - 5 &&
    click.y >= yDistance[0] + 5 - radius &&
    click.y <= yDistance[0] - 5 + radius &&
    !clickedCircle.clicked_1
    // clickedCircle != 0 && arrowX >= canvas.width - 10
  ) {
    console.log("1st circle clicked");
    if (arrowX >= canvas.width - 10) {
      clickedCircle.clicked_1 = true;
      console.log("--->", clickedCircle);
      intervalId_0 = setInterval(() => {
        animate(0);
      }, 30);
    }
  } else if (
    click.x >= circleX - radius &&
    click.x <= circleX + radius - 5 &&
    click.y >= yDistance[1] + 5 - radius &&
    click.y <= yDistance[1] - 5 + radius &&
    !clickedCircle.clicked_2
  ) {
    console.log("2nd circle clicked");
    if (arrowX >= canvas.width - 10) {
      clickedCircle.clicked_2 = true;
      console.log("--->", clickedCircle);
      intervalId_1 = setInterval(() => {
        animate(1);
      }, 30);
    }
  } else if (
    click.x >= circleX - radius &&
    click.x <= circleX + radius - 5 &&
    click.y >= yDistance[2] + 5 - radius &&
    click.y <= yDistance[2] - 5 + radius &&
    !clickedCircle.clicked_3
  ) {
    console.log("3rd circle clicked");
    if (arrowX >= canvas.width - 10) {
      clickedCircle.clicked_3 = true;
      console.log("--->", clickedCircle);
      intervalId_2 = setInterval(() => {
        animate(2);
      }, 30);
    }
  }

  if (
    click.x >= circleX - radius &&
    click.x <= circleX + radius - 5 &&
    click.y >= yDistance[3] + 5 - radius &&
    click.y <= yDistance[3] - 5 + radius &&
    !clickedCircle.clicked_4
  ) {
    console.log("4th circle clicked");
    if (arrowX >= canvas.width - 10) {
      clickedCircle.clicked_4 = true;
      console.log("--->", clickedCircle);
      intervalId_3 = setInterval(() => {
        animate(3);
      }, 30);
    }
  }
});

// animate the arrow
function animate(clickedCircle) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  CanvasArray[clickedCircle].update(clickedCircle);
  for (var i = 0; i < CanvasArray.length; i++) {
    CanvasArray[i].draw();
  }
}

for (var i = 0; i < CanvasArray.length; i++) {
  CanvasArray[i].update();
}

// reset

function reset() {
  window.location.reload();
  clickedCircle.clicked_1 = false;
  clickedCircle.clicked_2 = false;
  clickedCircle.clicked_3 = false;
  clickedCircle.clicked_4 = false;
}
