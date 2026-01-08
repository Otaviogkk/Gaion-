const sidebar = document.querySelector(".sidebar");
const desktopQuery = window.matchMedia("(min-width: 1025px)");

function open() {
  sidebar.classList.add("collapsed");
}

function close() {
  sidebar.classList.remove("collapsed");
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
