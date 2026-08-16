import './Home.css';
import helloAnimation from './../../assets/hello-animation.gif';
import { Link } from 'react-router-dom';
import Magnet from '../../components/MagnetButton/MagnetButton';
import HomeCard from '../../components/HomeCard/HomeCard';
import FadeInWhenVisible from '../../components/FadeinWhenVisible/FadeInWhenVisible';
import { projectsData } from '../../data/projects';
import usePageMeta from '../../hooks/usePageMeta';

export default function Home() {
    usePageMeta({
        description:
            "Killian Tirache, développeur web full-stack. Je conçois, développe et déploie des applications web : Under the Deep, un MMORPG idle dans le navigateur, et FushiNote, un suivi d'animés installable.",
    });

    const projectListArray = projectsData.slice(0, 6);

    return (
        <main>
            <section className="home">
                <div className="home__text">
                    <h1>Salut <img src={helloAnimation} alt="" /></h1>
                    <p>Moi c'est <span>killian</span><br/>Je suis développeur web</p>
                </div>
                <HomeCard />
            </section>
            <section className='home__projects'>
                <h2>Projets</h2>
                <p>Quelques projets que j'ai conçus et développés</p>
                <div className="home__projects-list">
                    {projectListArray.map((project, index) => (
                        <FadeInWhenVisible
                        key={project.id}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className='home__project_container'
                        >
                            <Link to={`/projects/${project.id}`} className="home__project" style={{backgroundImage: `url(${project.image})`}}>
                                <h3>{project.title}</h3>
                            </Link>
                        </FadeInWhenVisible>
                    ))}
                </div>
                <div className='primary-button-container'>
                    <Magnet>
                        <Link to="/projects">
                            <button className='primary-button'>Voir tous les projets</button>
                        </Link>
                    </Magnet>
                </div>
            </section>
            <section className='home__about'>
                <h2>À propos</h2>
                <p>
                    Je suis un <span>développeur web passionné</span> par la création de sites web.<br/>
                    J'ai commencé à apprendre le <span>développement web il y a 2 ans</span> et depuis je n'ai jamais cessé d'apprendre.<br/>
                    J'ai une <span>bonne connaissance des technologies web</span> telles que HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, etc...
                </p>
                <div className='primary-button-container'>
                    <Magnet>
                        <Link to="/about">
                            <button className='primary-button'>En savoir plus sur moi</button>
                        </Link>
                    </Magnet>
                </div>
            </section>
        </main>
    )
}