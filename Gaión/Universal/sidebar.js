const sidebar = document.querySelector(".sidebar");
const desktopQuery = window.matchMedia("(min-width: 1025px)");
function open(e) {
  if (!sidebar.contains(e.relatedTarget)) {
    sidebar.classList.add("collapsed");
  }
}

function close(e) {
  if (!sidebar.contains(e.relatedTarget)) {
    sidebar.classList.remove("collapsed");
  }
}

function updateSidebarBehavior() {
  if (desktopQuery.matches) {
    sidebar.addEventListener("mouseenter", open);
    sidebar.addEventListener("mouseleave", close);
  } else {
    sidebar.classList.remove("collapsed");
    sidebar.removeEventListener("mouseenter", open);
    sidebar.removeEventListener("mouseleave", close);
  }
}

desktopQuery.addEventListener("change", updateSidebarBehavior);
updateSidebarBehavior();
