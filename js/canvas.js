import math from "./math.js";

export default class Canvas {
  constructor (circle) {
    this.canvas = document.getElementById("canvas");
    this.context = this.canvas.getContext("2d");

    this.canvas.width = 400;
    this.canvas.height = 200;

    this.context.strokeStyle = "white";
    this.context.lineWidth = 1;
    this.gridCanvas = 50;

    this.circle = circle;
    this.drawGrid();
  }
  clearContext () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawGrid();
  }
  draw () {
    const divShot = document.getElementById("shot");
    const alert = document.getElementById("alert");
    const button = document.getElementById("calc");
    const clear = document.getElementById("clear");
    const v0 = document.getElementById("vel_inicial");
    const deg = document.getElementById("deg");

    if (v0.value < 1 || v0.value === "") {
      alert.classList.remove("d-none");
      alert.innerText = "¡La velocidad inicial no es valida!";
      return;
    } else {
      alert.classList.add("d-none");
    }

    if (deg.value > 90 || deg.value === "") {
      alert.classList.remove("d-none");
      alert.innerText = "¡El angulo no es valido!";
      return;
    } else {
      alert.classList.add("d-none");
    }

    this.clearContext();
    let intervalTime = 0.01;
    let passTime = 0;
    const time = math.maxTime(v0.value, math.toDeg(deg.value));
    const maxHeight = math.maxHeight(v0.value, math.toDeg(deg.value));

    button.setAttribute("disabled", "disabled");
    clear.setAttribute("disabled", "disabled");
    v0.setAttribute("disabled", "disabled");
    deg.setAttribute("disabled", "disabled");

    const interval = setInterval(() => {
      const { vx0, vy0 } = math.toComponents(v0.value, math.toDeg(deg.value));
      const { x, y } = math.distance(vx0, vy0, passTime);

      if (x > this.canvas.width) {
        this.canvas.width = x + 200;
      }

      if (maxHeight > this.canvas.height) {
        this.canvas.height = maxHeight + 200;
      }

      divShot.innerHTML = `
      <div class="card bg-dark text-light rounded-0">
        <div class="card-body">
          <p>Tiempo: ${time.toFixed(2)} segundos</p>
          <p>Distancia: ${x.toFixed(2)} metros</p>
          <p>Altura máxima: ${maxHeight.toFixed(2)} metros</p>
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
        clear.removeAttribute("disabled");
        v0.removeAttribute("disabled");
        v0.value = "";
        deg.removeAttribute("disabled");
        deg.value = "";
      }
    }, 1);
  }
  drawGrid () {
    for (let i = 0; i < this.canvas.height; i += this.gridCanvas) {
      this.context.beginPath();
      this.context.moveTo(0, i);
      this.context.lineTo(this.canvas.width, i);
      this.context.stroke();
    }

    for (let j = 0; j < this.canvas.width; j += this.gridCanvas) {
      this.context.beginPath();
      this.context.moveTo(j, 0);
      this.context.lineTo(j, this.canvas.height);
      this.context.stroke();
    }
  }
  drawCircle () {
    this.clearContext();
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
