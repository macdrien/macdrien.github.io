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
          <ul className="welcomeList">
            <li>Père</li>
            <li>Mari</li>
            <li>Développeur</li>
            <li>Full-stack Junior</li>
            <li>Barista</li>
            <li>Humain</li>
          </ul>
        </section>
      </div>
    </>
  )
}

export default App
