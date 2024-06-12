import React from 'react';

import Header from "../comps/Header";
import Footer from "../comps/Footer";

import { translations as T } from "../scripts/translations.js";

const PageNotFoundPage = ({ lang }) => {
	document.title = "DRBank · " + T.error[lang] + "!";
	return (
		<div className="container column">
			<Header lang={lang} />
			<main className="theme">
				{ 
					lang === "bg"
						? <>
							<h1 className='foreground-inverted'>Няма такава станица</h1>
							<p>Тази страница не изглежда, че съществува. Проблемът може да е в адреса или в момента сървърът има грешка. <em> Прегледайте внимателно адреса и ако продължавате да имате същия проблем, свържете се с нас на имейл <a className="link" href="mailto:drbankemail@gmail.com">drbankemail@gmail.com</a>.</em></p>
						</>
						: <>
							<h1 className='foreground-inverted'>No such page found</h1>
							<p>This page does not seem to exist. The problem might be in the address or currently the server might have an error. <em> Check the address again carefully and if you keep getting the same problem, contact us at <a className="link" href="mailto:drbankemail@gmail.com">drbankemail@gmail.com</a>.</em></p>
						</>
				}
			</main>
			<Footer lang={lang} />
		</div>
	);
};

export default PageNotFoundPage;