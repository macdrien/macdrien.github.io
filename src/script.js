import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";
import DOMPurify from "https://cdn.jsdelivr.net/npm/dompurify@2.5.8/dist/purify.es.min.js";

document.addEventListener('DOMContentLoaded', () => {
  fetch('./resources/experiences.json').then(response => response.json()).then(data => {
    displayExperiences(data.work);
    displayExperiences(data.personal);

    const contactLanding = document.getElementById('contact-landing');
    const contactNav = document.getElementById('contact-nav');
    contactLanding.onclick = () => goToId('contact');
    contactNav.onclick = () => goToId('contact');

    const checkoutButton = document.getElementById('checkout-work');
    checkoutButton.onclick = () => goToId(data.work.id);
    const clickableName = document.getElementById('clickable-name');
    clickableName.onclick = () => goToId('main');
  });
});

function displayExperiences(experiences) {
  const experiencesContainer = document.getElementById(`${experiences.id}`);
  experiencesContainer.appendChild(document.createElement('h2')).innerText = experiences.title;

  // Add navigation tab
  const nav = document.getElementsByTagName('nav')[0];
  const contactNav = document.getElementById('contact-nav');
  const navItem = document.createElement('div');
  navItem.className = 'clickable';
  navItem.innerText = experiences.navTitle;
  navItem.onclick = () => goToId(experiences.id);
  nav.insertBefore(navItem, contactNav);

  const experiencesList = document.createElement('div');
  experiencesList.className = 'experiences';

  // Load experience items
  for(let experience of experiences.experiences) {
    const experienceItem = document.createElement('div');
    experienceItem.className = 'experience';

    const experienceImage = document.createElement('img');
    experienceImage.className = 'illustration';
    experienceImage.src = `./resources/images/${experience.image}`;
    experienceItem.appendChild(experienceImage);

    const experienceDetails = document.createElement('div');
    experienceDetails.className = 'markdown';
    experienceDetails.innerHTML = DOMPurify.sanitize(marked.parse(experience.text));
    experienceItem.appendChild(experienceDetails);

    experiencesList.appendChild(experienceItem);
  }

  experiencesContainer.appendChild(experiencesList);
}

function goToId(id) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}