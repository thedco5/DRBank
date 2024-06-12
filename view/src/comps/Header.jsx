import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Menu from "./Menu.jsx";
import logo from "../assets/drbank_logo_dark.png";

import { translations as T } from "../scripts/translations.js";

const Header = ({ lang, noLogin }) => {
    
    const [isMenuOverflowing, setIsMenuOverflowing] = useState(true);
    const [isBurgerMenuVisible, setIsBurgerMenuVisible] = useState(false);

    let menuIcon = <i className="fa-solid fa-bars"/>;
    let closeIcon = <i className="fa-solid fa-xmark"/>;

    function detectOverflow() {
        let navbarMenu = document.getElementById("navbar-menu");
        setIsMenuOverflowing(navbarMenu.scrollWidth > navbarMenu.clientWidth);
    }

    useEffect(() => {
        const delayedFunction = () => { detectOverflow(); };
        const timeout = setTimeout(delayedFunction, 16);
        window.addEventListener('resize', detectOverflow);
        return () => {
            window.removeEventListener('resize', detectOverflow);
            clearTimeout(timeout);
        };
    }, []);

    const location = useLocation().pathname.replace(/^(\/..\/)|(\/)/, "");

	return (
        <>
            <header className="container row center">
                <a href="/" id="image-link">
                    <img src={logo} alt="DRBank Logo" />
                </a>
                <Menu id="navbar-menu" lang={lang} className={ (isMenuOverflowing ? "in" : "") + "visible" } />
                <a className="btn dark flat" href={`/${ lang === "bg" ? "en" : "bg" }/${location}`}>
                    <sup className={ lang === "bg" ? "bold" : "thin" }>БГ</sup>
                    <span className='thin'>/</span>
                    <sub className={ lang === "en" ? "bold" : "thin" }>EN</sub>
                </a>
                {
                    noLogin === "true" ? 
                        null : 
                        <a className="btn light" href="./login">{T.log_in.noun[lang]}</a>
                }
                { isMenuOverflowing ? (
                    <button className="btn dark flat" onClick={() => {
                            setIsBurgerMenuVisible(!isBurgerMenuVisible);
                            try {
                                document.getElementById("page").scrollTo({ top: 0, behavior: "smooth" });
                            } catch {}
                            
                        }}>
                        { isBurgerMenuVisible ? closeIcon : menuIcon }
                    </button>
                ) : null}
            </header>
            <Menu id="burger-menu" lang={lang} hidden={ !(isMenuOverflowing && isBurgerMenuVisible) }/>
        </>
	);
};

export default Header;