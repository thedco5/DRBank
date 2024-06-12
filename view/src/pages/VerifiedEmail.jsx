import Header from "../comps/Header";
import Footer from "../comps/Footer";

import { translations as T } from "../scripts/translations.js"

const VerifiedEmail = () => {
	document.title = "DRBank · Email";
	return (
		<div className="container column">
			<main className="theme">

                <h1 className='foreground-primary'>Успешно потвърдихте имейла си!</h1>
				<p>Вие успешно изпълнихте най-важната стъпка след регистрацията си.</p>

				<h1 className='foreground-primary'>You successfully verified your email!</h1>
				<p>You have successfully done the most import thing after your sign-up.</p>

                <div className="container justify">
                    <a href="./" className="btn dark">{T.home["bg"]} - <strong>БГ</strong></a>
                    <a href="./en" className="btn dark">{T.home["en"]} - <strong>EN</strong></a>
                </div>
                
			</main>
			<Footer lang="bg" />
		</div>
	);
};

export default VerifiedEmail;