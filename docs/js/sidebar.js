// 切换目录显隐
document.getElementById("toggleSidebar").addEventListener("click", function () {
  document.getElementById("sidebar").classList.toggle("hidden");
});

// 拖拽调整宽度
const sidebar = document.getElementById("sidebar");
const resizer = document.getElementById("resizer");

let isResizing = false;

resizer.addEventListener("mousedown", function (e) {
  isResizing = true;
  document.body.style.cursor = "col-resize";
});

document.addEventListener("mousemove", function (e) {
  if (!isResizing) return;
  const newWidth = e.clientX;
  if (newWidth > 150 && newWidth < window.innerWidth * 0.5) {
    sidebar.style.width = newWidth + "px";
  }
});

document.addEventListener("mouseup", function () {
  isResizing = false;
  document.body.style.cursor = "default";
});
