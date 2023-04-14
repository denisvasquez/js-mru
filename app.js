import Circle from "./js/circle.js";
import Canvas from "./js/canvas.js";

window.addEventListener("DOMContentLoaded", () => {
  const btnCalc = document.getElementById("calc");
  const btnClear = document.getElementById("clear");
  const circle = new Circle();
  const canvas = new Canvas(circle);
  btnCalc.onclick = () => canvas.draw();
  btnClear.onclick = () => canvas.clearContext();
});








