import math from "./math.js";

export default class Canvas {
  constructor (circle) {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 800;
    this.canvas.height = 500;

    this.context.strokeStyle = "black";
    this.context.lineWidth = 1;

    this.circle = circle;
    this.drawCircle();
    this.drawGrid();
  }
  draw () {
    let intervalTime = 0.01;
    let passTime = 0;
    const v0 = document.getElementById("vel_inicial").value;
    const deg = document.getElementById("deg").value;
    const showInformation = document.getElementById("show-information");
    const time = math.maxTime(v0, math.toDeg(deg));

    const interval = setInterval(() => {
      const { vx0, vy0 } = math.toComponents(v0, math.toDeg(deg));
      const { x, y } = math.distance(vx0,vy0, passTime);
      console.log(toString(time));

      showInformation.innerHTML = `
      <div>
        <h3>Tiempo: ${toString(time).slice(0, 3)}</h3>
      </div>
      <div>
        <h3>Distancia: ${Math.floor(x)}</h3>
      </div>
      `;
      passTime += intervalTime;
      this.drawCircle();
      this.drawGrid();
      this.circle.x = x;
      this.circle.y=-(y);

      this.circle.positions.push({
        x: this.circle.x+this.circle.size,
        y: this.circle.y+this.canvas.height-this.circle.size
      });

      this.drawPosition();

      if (passTime >= time) {
        clearInterval(interval);
      }
    }, 10);
  }
  drawGrid () {
    for (let i = 0; i < this.canvas.height; i += 50) {
      this.context.beginPath();
      this.context.moveTo(0, i);
      this.context.lineTo(this.canvas.width, i);
      this.context.stroke();
    }

    for (let j = 0; j < this.canvas.width; j += 50) {
      this.context.beginPath();
      this.context.moveTo(j, 0);
      this.context.lineTo(j, this.canvas.height);
      this.context.stroke();
    }
  }
  drawCircle () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.beginPath();
    this.context.arc(this.circle.x+this.circle.size, this.circle.y+this.canvas.height-this.circle.size, this.circle.size, 0, 2 * Math.PI);
    this.context.fillStyle = this.circle.color;
    this.context.fill();
  }
  drawPosition () {
    this.context.beginPath();
    this.context.moveTo(this.circle.positions[0].x, this.circle.positions[0].y);
    this.circle.positions.forEach(position => {
      this.context.lineTo(position.x, position.y);
    });
    this.context.strokeStyle = "black";
    this.context.stroke();
  }
}
