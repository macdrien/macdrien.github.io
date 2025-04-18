import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@2.5.8/dist/purify.es.min.js";

const resizeObserver = new ResizeObserver((_entries) => updateNavNameText());
resizeObserver.observe(document.body);

document.addEventListener("DOMContentLoaded", () => {
  fetch("./resources/experiences.json")
    .then((response) => response.json())
    .then((data) => {
      for (let experiences of Object.values(data)) {
        displayExperiences(experiences);
      }

      const contactLanding = document.getElementById("contact-landing");
      const contactNav = document.getElementById("contact-nav");
      contactLanding.onclick = () => goToId("contact");
      contactNav.onclick = () => goToId("contact");

      const checkoutButton = document.getElementById("checkout-work");
      checkoutButton.onclick = () => goToId(data.work.id);
      const clickableName = document.getElementById("clickable-name");
      clickableName.onclick = () => goToId("main");

      updateNavNameText();
    });
});

function displayExperiences(experiences) {
  const experiencesContainer = document.getElementById(`${experiences.id}`);
  experiencesContainer.appendChild(document.createElement("h2")).innerText =
    experiences.title;

  // Add navigation tab
  const nav = document.getElementsByTagName("nav")[0];
  const contactNav = document.getElementById("contact-nav");
  const navItem = document.createElement("div");
  navItem.className = "clickable";
  navItem.innerText = experiences.navTitle;
  navItem.onclick = () => goToId(experiences.id);
  nav.insertBefore(navItem, contactNav);

  const experiencesList = document.createElement("div");
  experiencesList.className = "experiences";

  for (let experience of experiences.experiences) {
    experiencesList.appendChild(generateCardFromExperience(experience));
  }

  experiencesContainer.appendChild(experiencesList);
}

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

function generateCardFromExperience(experience) {
  const card = document.createElement("div");
  card.className = "card";
  
  const title = document.createElement("h3");
  if (experience.link) {
    const link = document.createElement("a");
    link.href = experience.link;
    link.target = "_blank";
    link.innerText = experience.title;
    title.appendChild(link);
  } else {
    title.innerText = experience.title;
  }
  card.appendChild(title);

  const image = document.createElement("img");
  image.className = "image";
  image.src = `./resources/images/${experience.image}`;
  image.alt = experience.title;
  card.appendChild(image);

  const description = document.createElement("div");
  description.className = "text";
  description.innerHTML = DOMPurify.sanitize(marked.parse(experience.text));
  card.appendChild(description);

  return card;
}