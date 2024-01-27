import './App.css'
import profilePicture from '/adrien_bouyssou_on_innov_novembre_2017.jpg';

function App() {
  return (
    <>
      <nav className="navbar">
        <div className="title">Adrien BOUYSSOU</div>
      </nav>
      <div className="main">
        <section className="welcomeSection">
          <div className="shadowOnImg">
            <img src={profilePicture} alt="alt message" className="profilePicture"/>
          </div>
          <p className="welcomeMessage">J'ai terminé mes 5 années d'études supérieures en 2021 après 3 ans d'alternance.<br/>
            Désireux de toujours en découvrir d'avantage, j'ai rejoins Viveris Technologies à la sortie de mes études afin d'intégrer un projet complet et complexe dans lequel j'apprends tous les jours de nouvelles choses. C'est ainsi que le métier de Développeur Full-stack junior c'est imposé à moi.<br/>
            Développeur passionné, je ponctus mon parcours de petits projets annexes afin d'en apprendre toujours plus.<br/>
            Passionné de café, je projette également de suivre une formation dans ce domaine de sorte à compléter mes compétences avec celles d'un barista.
          </p>
        </section>
      </div>
    </>
  )
}

export default App
