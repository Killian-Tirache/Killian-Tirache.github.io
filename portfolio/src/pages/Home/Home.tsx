import './Home.css';
import helloAnimation from './../../assets/hello-animation.gif';
import showcaseSiteImage from './../../assets/home-projects-images/showcase-site-image.jpeg';
import eCommerceImage from './../../assets/home-projects-images/e-commerce-site-image.jpeg';
import saasImage from './../../assets/home-projects-images/saas-site-image.jpeg';
import eLearningImage from './../../assets/home-projects-images/e-learning-site-image.jpeg';
import crmImage from './../../assets/home-projects-images/crm-site-image.jpeg';
import appMobileImage from './../../assets/home-projects-images/app-mobile-site-image.jpeg';
import { Link } from 'react-router-dom';
import Magnet from '../../components/MagnetButton/MagnetButton';
import HomeCard from '../../components/HomeCard/HomeCard';
import FadeInWhenVisible from '../../components/FadeinWhenVisible/FadeInWhenVisible';

export default function Home() {
    const projectListArray = [
        { name: 'Site vitrine', image: showcaseSiteImage,  },
        { name: 'E-commerce', image: eCommerceImage,  },
        { name: 'SAAS', image: saasImage,  },
        { name: 'E-learning', image: eLearningImage,  },
        { name: 'CRM', image: crmImage,  },
        { name: 'Application mobile', image: appMobileImage,  },
    ]

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
                <p>Voici quelques projets auxquels j'ai participé:</p>
                <div className="home__projects-list">
                    {projectListArray.map((project, index) => (
                        <FadeInWhenVisible
                        key={index}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className='home__project_container'
                        >
                            <Link to="/projects" className="home__project" style={{backgroundImage: `url(${project.image})`}} key={index}>
                                <h3>{project.name}</h3>
                            </Link>
                        </FadeInWhenVisible>
                    ))}
                </div>
                <div className='primary-button-container'>
                    <Magnet>
                        <Link to="/projects">
                            <button className='primary-button'>Envie d'en voir plus ?</button>
                        </Link>
                    </Magnet>
                </div>
            </section>
            <section className='home__about'>
                <h2>À propos</h2>
                <p>
                    Je suis un <span>développeur web passionné</span> par la création de sites web.<br/>
                    J'ai commencé à apprendre le <span>développement web il y a 2 ans</span> et depuis je n'ai jamais céssé d'apprendre.<br/>
                    J'ai une <span>bonne connaissance des technologies web</span> telles que HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, etc...
                </p>
                <div className='primary-button-container'>
                    <Magnet>
                        <Link to="/about">
                            <button className='primary-button'>Envie d'en voir plus ?</button>
                        </Link>
                    </Magnet>
                </div>
            </section>
        </main>
    )
}