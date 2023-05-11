import Circle from "./js/circle.js";
import Canvas from "./js/canvas.js";

window.addEventListener("DOMContentLoaded", () => {
  const btnCalc = document.getElementById("calc");
  const btnClear = document.getElementById("clear");

  const circle = new Circle();
  const canvas = new Canvas(circle);

  const btnCanvasGrid = document.getElementById("btn-canvas-grid");
  const inputCanvasGrid = document.getElementById("input-canvas-grid");
  inputCanvasGrid.value = canvas.gridCanvas;

  btnCalc.onclick = () => canvas.draw();
  btnClear.onclick = () => canvas.clearContext();

  const btnSidebarOpen = document.getElementById("btn-sidebar-open");
  const btnSidebarClose = document.getElementById("btn-sidebar-close");
  const sidebar = document.getElementById("sidebar"); let show = false;

  const sidebarHandleClick = () => {
    if (!show) {
      sidebar.style.left = "0px";
      show = true;
    } else {
      sidebar.style.left = "-420px";
      show = false;
    }
  }

  btnSidebarOpen.addEventListener("click", sidebarHandleClick);
  btnSidebarClose.addEventListener("click", sidebarHandleClick);
  btnCanvasGrid.addEventListener("click", () => {
    const alertSidebar = document.getElementById("alert-sidebar");
    // Canvas size squares controller
    if (inputCanvasGrid.value < 10) {
      alertSidebar.innerText = "El número debe ser mayor a 10 metros."
      alertSidebar.classList.remove("d-none");
    } else {
      canvas.gridCanvas = parseInt(inputCanvasGrid.value);
      canvas.clearContext();
      alertSidebar.classList.add("d-none");
    }
  });
});
