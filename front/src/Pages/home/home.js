import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import translations from "../../translations";
import logo from "../../Assets/hissati.png";
import pictures from "../../Assets/pictures.png";
import before from "../../Assets/before.svg";
import after from "../../Assets/after.svg";
import deco from "../../Assets/Physics.svg";
import fb from "../../Assets/facebook.svg";
import instagram from "../../Assets/instagram.svg";
import telegram from "../../Assets/telegram.svg";
import phone from "../../Assets/phone.svg";
import mail from "../../Assets/mail.svg";

import "./home.css";

const Home = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const matieres = ["Physiques", "Sciences", "HistoireGéo", "Arab", "Français", "Anglais", "Allemand", "Espagnole", "Italien", "Mathématiques", "Chimie", "Mécanique", "Philosophie"];
    const [visibleCount, setVisibleCount] = useState(2);
    const [language, setLanguage] = useState('fr'); // Langue par défaut en français
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Pour gérer l'affichage du menu déroulant


    useEffect(() => {
        const updateVisibleCount = () => {
            const width = window.innerWidth;
            if (width <= 500) {
                setVisibleCount(2); // Définit visibleCount à 2 pour les écrans <= 500
            } else if (width <= 720) {
                setVisibleCount(4); // Définit visibleCount à 4 pour les écrans entre 501 et 720
            } else {
                setVisibleCount(5); // Définit visibleCount à 5 pour les écrans > 720
            }
        };
    
        updateVisibleCount(); // Appel initial
        console.log("verdict : ", visibleCount); // Peut être déplacé dans un autre useEffect
    
        window.addEventListener('resize', updateVisibleCount); // Met à jour lors du redimensionnement
    
        return () => window.removeEventListener('resize', updateVisibleCount); // Nettoyage
    }, []);

    const getContainerClassName = () => {
        if (currentIndex > 0 && currentIndex < matieres.length - visibleCount) {
            console.log(currentIndex)
          return 'container';
        } else if (currentIndex === matieres.length - visibleCount) {
            console.log(currentIndex) 

          return 'container-before'; 
        } else if (currentIndex < matieres.length - visibleCount) {
            console.log(currentIndex) 

          return 'container-after'; 
        } else {
            console.log(currentIndex) 

          return 'container';
        }
    };

    const goToNext = () => {
        if (currentIndex < matieres.length - visibleCount) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const changeLanguage = (lang) => {
        setLanguage(lang);
        setIsDropdownOpen(false);
    };

    return (
        <div className="home">
            <div className="navbar">
                <img className="logo" alt="logo" src={logo}></img>
                <div className="titles">
                    <a className="title" href="#accueil-section">{translations[language].home}</a>
                    <a className="title" href="#about-section">{translations[language].about}</a>
                    <a className="title" href="#contacts-section">{translations[language].contacts}</a>

                    {/* Changement de langue */}
                    <div className="language-selector">
                        <p className="title" onClick={toggleDropdown}>
                            {language === 'fr' ? 'Fr' : 'Ar'} &#x25BC;
                        </p>
                        {isDropdownOpen && (
                            <div className="dropdown">
                                <p className="drop" onClick={() => changeLanguage('fr')}>FR</p>
                                <p className="drop" onClick={() => changeLanguage('ar')}>AR</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="butons">
                    <button className="buton1" onClick={() => {navigate("/signIn")}}>{translations[language].signIn}</button>
                    <button className="buton2" onClick={() => {navigate("/signUp")}}>{translations[language].signUp}</button>
                </div>          
            </div>

            <div className="accueil" id="accueil-section">
                <div className="text">
                    <p className="titre">{translations[language].platformTitle}</p>
                    <p className="titre2">{translations[language].subtitle}</p>
                    <button className="buton2" onClick={() => {navigate("/signUp")}}>{translations[language].signUp}</button>
                </div>
                <img className="picture" alt="pictures" src={pictures}></img>
            </div>

            <div className="about" id='about-section'>
                <p className="titre1">{translations[language].aboutUs}</p>
                <div className="plusieurs">
                    <p className="titre3">{translations[language].aboutDesc1}</p>
                    <p className="titre3">{translations[language].aboutDesc2}</p>
                    <p className="titre3">{translations[language].aboutDesc3}</p>
                </div>
            </div>

            <div className="matieres">
                <p className="titre1">{translations[language].subjects}</p>
                <div className={getContainerClassName()}>
                    {currentIndex > 0 && (
                        <button className="button" onClick={goToPrevious}>
                            <img className='before-image' alt='before' src={before} />
                        </button>
                    )}

                    <div className="matieres-display">
                        {matieres.slice(currentIndex, currentIndex + visibleCount).map((matiere, index) => (
                            <div className="item" key={index}>
                                <img className="decoration" alt="deco" src={deco} />
                                <p className="titre4">{translations[language][matiere]}</p>
                            </div>
                        ))}
                    </div>

                    {currentIndex < matieres.length - visibleCount && (
                        <button className="button" onClick={goToNext}>
                            <img className='after-image' alt='after' src={after} />
                        </button>
                    )}
                </div>
            </div>

            <div className="contacts" id="contacts-section">
                <div className="social-media">
                    <div className="part">
                        <div className="line">
                            <img className="social" alt="social" src={mail}></img>
                            <p className="titre5">hissati@gmail.com</p>
                        </div>
                        <div className="line">
                            <img className="social" alt="social" src={phone}></img>
                            <p className="titre5">0524618456</p>
                        </div>
                    </div>
                    <div className="part">
                        <div className="line">
                            <img className="social" alt="social" src={telegram}></img>
                            <p className="titre5">hissati_eduaction</p>
                        </div>
                        <div className="line">
                            <img className="social" alt="social" src={fb}></img>
                            <p className="titre5">hissati_eduaction</p>
                        </div>
                        <div className="line">
                            <img className="social" alt="social" src={instagram}></img>
                            <p className="titre5">hissati_eduaction</p>
                        </div>
                    </div>
                </div>
                <p className="titre5">Copyright © 2024 Projet Algérie Streaming Educatif </p>
            </div>
        </div>
    );
}

export default Home;
