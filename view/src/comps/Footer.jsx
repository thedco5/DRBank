import React from 'react';

import ThemeButton from "./ThemeButton.jsx";

import { translations as T } from "../scripts/translations.js"

const Footer = ({ lang }) => {
	return (
		<>
			<ThemeButton />
			<footer>
				<span>&copy; 2023-2024, DRBank. { T.footer[lang] }.</span>
			</footer>
		</>
	);
};

export default Footer;