import math from "./math.js";

export default class Canvas {
  constructor (circle) {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = 800;
    this.canvas.height = 450;

    this.context.strokeStyle = "white";
    this.context.lineWidth = 1;
    this.countShots = 1;

    this.circle = circle;
    this.drawCircle();
    this.drawGrid();
  }
  draw () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const showInformation = document.getElementById("show-information");
    const button = document.getElementById("calc");
    const div = document.createElement("div");
    const v0 = document.getElementById("vel_inicial");
    const deg = document.getElementById("deg");

    let intervalTime = 0.01;
    let passTime = 0;
    const time = math.maxTime(v0.value, math.toDeg(deg.value));
    const maxHeight = math.maxHeight(v0.value, math.toDeg(deg.value));

    button.setAttribute("disabled", "disabled");
    v0.setAttribute("disabled", "disabled");
    deg.setAttribute("disabled", "disabled");

    const interval = setInterval(() => {
      const { vx0, vy0 } = math.toComponents(v0.value, math.toDeg(deg.value));
      const { x, y } = math.distance(vx0, vy0, passTime);

      div.innerHTML = `
      <div class="card bg-dark text-light rounded-0 m-0">
        <div class="card-header">
          <h3>${this.countShots-1}</h3>
        </div>
        <div class="card-body">
          <p>Tiempo: ${time.toFixed(2)} segundos</p>
          <p>Distancia: ${x.toFixed(2)} metros</p>
          <p>Altura maxima: ${maxHeight.toFixed(2)} metros</p>
        </div>
      </div>
      `;

      passTime += intervalTime;
      this.drawCircle();
      this.drawGrid();
      this.circle.x = x;
      this.circle.y = -y;

      this.circle.positions.push({
        x: this.circle.x+this.circle.size,
        y: this.circle.y+this.canvas.height-this.circle.size
      });

      this.drawPosition();

      if (passTime >= time) {
        clearInterval(interval);
        button.removeAttribute("disabled");
        v0.removeAttribute("disabled");
        v0.value = "";
        deg.removeAttribute("disabled");
        deg.value = "";
      }
    }, 0.01);
    showInformation.appendChild(div);
    this.countShots++;
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
    this.context.strokeStyle = "white";
    this.context.stroke();
  }
}
