import './App.css'
import landingLogo from '/occimore_logo.png';

const goToWork = (e) => {
  e.preventDefault();
  document.getElementById("work").scrollIntoView({behavior: 'smooth', block: 'start'});
}

const goToPersonal = (e) => {
  e.preventDefault();
  document.getElementById("personal").scrollIntoView({behavior: 'smooth', block: 'start'});
}

const goToContact = (e) => {
  e.preventDefault();
  document.getElementById("contact").scrollIntoView({behavior: 'smooth', block: 'start'});
}

const goToTop = (e) => {
  e.preventDefault();
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function App() {
  return (
    <>
      <div className="main">
        <section className="welcomeSection">
          <div className="welcomeText">
            <h1>Salut,<span>je suis <span className="highlight">Adrien BOUYSSOU</span></span></h1>
            <p className="welcomeSubtitle">Full-stack web developpeur chez Viveris Technologies</p>
            <p className="welcomeDescription">Ingénieur logiciel depuis 3 ans, je travaille principalement avec Java et
              ReactJS. J’ai rejoins Viveris
              Technologies (Toulouse, France) après mon diplôme en 2021. Je travaille là-bas en tant qu’ingénieur
              full-stack. Je travaille également toujours sur des side-projects sur mon temps libre.</p>
            <button className="contactMe" onClick={goToWork}>Contact me</button>
          </div>
          <img src={landingLogo} alt="alt message" className="landingLogo"/>
          <div className="checkout">
            <div onClick={goToWork}>
              <p>Regarde mon travail</p>
              <div className="bottomArrow"/>
            </div>
          </div>
        </section>
        <section id="navbar">
          <div className="name" onClick={goToTop}>Adrien BOUYSSOU</div>
          <div className="shortName" onClick={goToTop}>AB.</div>
          <nav>
            <div onClick={goToWork}>Travail</div>
            <div onClick={goToPersonal}>Personnel</div>
            <div onClick={goToContact}>Contact</div>
          </nav>
        </section>
        <section id="work" className="workSection experiences">
          <div className="experience">
            <div className="illustration"></div>
            <div className="description">
              <p>Depuis 2021, je travaille chez <span className="highlight">Viveris Technologies</span>. Basé à
                Toulouse, j'occupe le poste de développeur <span className="highlight">full-stack</span> au sein d'une
                équipe agile. Mon travail change au fil des jours, des semaines et des
                sprints.</p>
              <p>Mes compétences principales restent le développement web, en front-end avec <span
                className='highlight'>VueJS</span> que nous introduisons
                dans le projet, et en back-end avec une API en <span className="highlight">Spring</span>. Mais, il
                m'arrive également de travailler sur les
                bases de données, faire du réseau ou encore de l'administration système et travailler sur la CI du
                projet.</p>
            </div>
          </div>
          <div className="experience">
            <div className="illustration"></div>
            <div className="description">
              <p>De 2018 à 2021, j'ai fait une école d'ingénieur en alternance. Je travaillais pour <span
                className="highlight">Eiffage-Energie-Systèmes</span> et j'étudiais au sein de l'<span
                className="highlight">UTBM</span> (Université
                de Technologie de
                Belfort-Montbéliard).<br/>
                Je travaillais à Mulhouse, en Alsace, en tant que développeur web avec du <span
                  className="highlight">ReactJS</span> en framework front-end
                et en <span className="highlight">Spring Boot</span> pour le back-end.<br/>
                Pour mes études, mon université était localisée à Belfort, à une demi-heure de route de Mulhouse.
              </p>
            </div>
          </div>
        </section>
        <section id="personal" className="personalSection">
          Hello this is the personal section
        </section>
        <section id="contact" className="contactSection">
          Hello this is the contact section
        </section>
      </div>
    </>
  )
}

export default App
