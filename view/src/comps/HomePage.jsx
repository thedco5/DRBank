import React from 'react';

import Header from "../comps/Header";
import Footer from "../comps/Footer";

import { translations as T } from "../scripts/translations.js";

const HomePage = ({ lang }) => {
	document.title = "DRBank · " + T.home[lang];
	return (
		<div id="page" className="container column overflow">
			<Header lang={lang} />
			<Footer lang={lang} />
		</div>
	);
};

export default HomePage;