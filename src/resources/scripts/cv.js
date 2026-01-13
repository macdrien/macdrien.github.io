const resizeObserver = new ResizeObserver((_entries) => updateNavNameText());
resizeObserver.observe(document.body);

document.addEventListener("DOMContentLoaded", async () => {
  document.getElementById("work-nav").onclick = () => goToId("work");
  document.getElementById("projects-nav").onclick = () => goToId("projects");
  document.getElementById("personal-nav").onclick = () => goToId("personal");
  const clickableName = document.getElementById("clickable-name");
  clickableName.onclick = () => goToId("main");

  const checkoutButton = document.getElementById("checkout-work");
  if (checkoutButton) {
    checkoutButton.onclick = () => goToId("work");
  }

  updateNavNameText();
});

function goToId(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function updateNavNameText() {
  const navName = document.getElementsByClassName("name")[0];
  navName.innerText =
    document.documentElement.clientWidth > 500 ? "Adrien BOUYSSOU" : "A.B.";
}
