import Circle from "./js/circle.js";
import Canvas from "./js/canvas.js";

window.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("calc");
  const circle = new Circle();
  const canvas = new Canvas(circle);
  btn.onclick = () => canvas.draw();
});








