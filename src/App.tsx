import './App.css'
import landingLogo from '/occimore_logo.png';
import experiences from './experiences.json';
import Markdown from "react-markdown";

const goToId = (event: React.MouseEvent, id: string) => {
  event.preventDefault();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
  }
}

const goToTop = (e: React.MouseEvent) => {
  e.preventDefault();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function App() {
  return (
    <>
      <div className="main">
        <section className="welcomeSection">
          <div className="presentation">
            <div className="presentationText">
              <h1>Salut,<span>je suis <span className="highlight">Adrien BOUYSSOU</span></span></h1>
              <p className="welcomeSubtitle">Full-stack web developpeur chez Viveris Technologies</p>
              <p className="welcomeDescription">Ingénieur logiciel depuis 3 ans, je travaille principalement avec Java
                et
                ReactJS. J’ai rejoint Viveris Technologies (Toulouse, France) après mon diplôme en 2021.
                J'y travaille comme ingénieur full-stack.
                Je travaille également sur des side-projects sur mon temps libre.</p>
              <button className="contactMe" onClick={e => goToId(e, "contact")}>Contactez-moi</button>
            </div>
            <img src={landingLogo} alt="alt message" className="landingLogo"/>
          </div>
          <div className="checkout">
            <div onClick={e => goToId(e, experiences[0].id)}>
              <p>Regarde mon travail</p>
              <div className="bottomArrow"/>
            </div>
          </div>
        </section>
        <section id="navbar">
          <div className="name" onClick={goToTop}>Adrien BOUYSSOU</div>
          <div className="shortName" onClick={goToTop}>AB.</div>
          <nav>
            {experiences.map(category => <div key={category.id}
                                              onClick={e => goToId(e, category.id)}>{category.navTitle}</div>)}
            <div onClick={e => goToId(e, "contact")}>Contact</div>
          </nav>
        </section>

        {experiences.map(category => <section id={category.id} key={category.id}>
          <h2>{category.title}</h2>
          <div className="experiences">
            {category.experiences.map((experience, index) => <div className="experience" key={index}>
              <div className="illustration"></div>
              <Markdown className="markdown">{experience.text}</Markdown>
            </div>)}
          </div>
        </section>)}

        <section id="contact">
          <h2>Contact</h2>
          <p>Bientôt disponible</p>
        </section>
      </div>
    </>
  )
}

export default App
