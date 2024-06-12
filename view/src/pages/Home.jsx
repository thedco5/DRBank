import React from 'react';
import Cookies from 'js-cookie';

import Header from "../comps/Header";
import Footer from "../comps/Footer";

import HomeMainBG from "../comps/HomeMainBG.jsx";
import HomeMainEN from "../comps/HomeMainEN.jsx";
import HomePage from "../comps/HomePage.jsx";

import { translations as T } from "../scripts/translations.js";

const Home = ({ lang }) => {
	document.title = "DRBank · " + T.home[lang];
	return (
		<div id="page" className="container column overflow">
			<Header lang={lang} />
			{
				Cookies.get("jwt") ? 
					<HomePage/> :
					lang === "bg" ? <HomeMainBG /> : <HomeMainEN />
			}
			<Footer lang={lang} />
		</div>
	);
};

export default Home;