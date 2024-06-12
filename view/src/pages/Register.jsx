import React, { useState } from 'react';

import Header from "../comps/Header";
import Footer from "../comps/Footer";

import { translations as T } from "../scripts/translations.js";
import { API_ROUTES } from '../scripts/apiroutes.js';

const Register = ({ lang }) => {

	document.title = "DRBank · " + T.register.noun[lang];

	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repeatedPassword, setRepeatedPassword] = useState("");

	const [serverWarning, setServerWarning] = useState("");
	const [submitValue, setSubmitValue] = useState(T.register.verb[lang]);
	const [submitDisabled, setSubmitDisabled] = useState(false);

	let filledOut;

	/** INPUT VALUES CHECKING */
	
	function checkElement(elementId, statement) {
		return () => {
			const element = document.getElementById(elementId);
			if (statement(element.value)) {
				document.getElementById("warning-" + element.id).hidden = true;
				element.style.borderBottomColor = "var(--greenish-color)";
			} else {
				document.getElementById("warning-" + element.id).hidden = false;
				element.style.borderBottomColor = "var(--redish-color)";
				filledOut = false;
			}
		};
	}

	const checkName = checkElement("name", (val) => !!val);
	const checkUsername = checkElement("username", (val) => /^[a-zA-Z0-9_]+$/.test(val));
	const checkEmail = checkElement("email", (val) => /^\S+@\S+$/.test(val));
	const checkPassword = checkElement("password", (val) => val.length >= 8);
	const checkPasswordRepeat = checkElement("repeat-password", (val) => val === document.getElementById("password").value);
	const checkTerms = () => { 
		if (document.getElementById("agree-with-terms").checked) {
			document.getElementById("warning-agree-with-terms").hidden = true;
		} else {
			document.getElementById("warning-agree-with-terms").hidden = false;
			filledOut = false;
		}
	}

	/** INPUT FIELDS HANDLING */

	const handleName = (event) => {
		setName(event.target.value);
		checkName();
	}
	const handleUsername = (event) => {
		setUsername(event.target.value);
		checkUsername();
	}
	const handleEmail = (event) => {
		setEmail(event.target.value);
		checkEmail();
	}
	const handlePassword = (event) => {
		setPassword(event.target.value);
		checkPassword();
	}
	const handlePasswordRepeat = (event) => {
		setRepeatedPassword(event.target.value);
		checkPasswordRepeat();
	}

	/** FORM SUBMITTING */

	const handleSubmit = async (event) => {

        event.preventDefault(); // stops refresh etc.
		document.getElementById("info-sent").hidden = true;
		setServerWarning("");

		filledOut = true;
		checkName();
		checkUsername();
		checkEmail();
		checkPassword();
		checkPasswordRepeat();
		checkTerms();

		if (!filledOut) {
			document.getElementById("warning-all-fields").hidden = false;
		} else {
			document.getElementById("warning-all-fields").hidden = true;
			try {
				setSubmitDisabled(true);
				setSubmitValue(<i className="fa-solid fa-spinner spin-45"/>);
				const res = await fetch(API_ROUTES.USER_CREATE, {
					method: "POST",
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						name: name,
						username: username,
						email: email,
						password: password
					})
				});
				document.getElementById("info-sent").hidden = false;
				if (res.ok) {
					document.getElementById("info-login").hidden = false;
				} else if (res.status === 409) {
					let json = await res.json();
					if (json.message === "username")
						setServerWarning(T.username_exists[lang] + ".");
					else if (json.message === "email")
						setServerWarning(T.email_exists[lang] + ".");
					else setServerWarning(T.an_error_occurred[lang] + ":" + <br/> + json.message);
				}
				document.getElementById("info-sent").hidden = true;
			} catch (error) {
				setServerWarning(T.an_error_occurred[lang]);
				console.error(error);
			} finally {
				setSubmitValue(T.register.verb[lang]);
				setSubmitDisabled(false);
			}
		}

    };

	return (
		
		<div className="container column">
			<Header lang={lang} />
			<main className="theme container center justify">
				<form className="theme lighter" onSubmit={handleSubmit}>

					<h3 className="foreground-primary thematic">{T.register.noun[lang]}</h3>

					{/* MESSAGES */}
					<p hidden className="info" id="info-sent">{T.data_sent[lang]}.</p>
					<p hidden className="info" id="info-login">
						{T.registration_success[lang]}!
						<a href="./login" className="link-white">{T.to[lang]} {T.log_in.noun[lang]}</a>
					</p>
					<p hidden className="warning" id="warning-all-fields">{T.please_fill_all_fields[lang]}.</p>
					<p className="warning adjust-empty">{serverWarning}</p>

					{ /* NAME */ }
					<label htmlFor="name">{T.full_name[lang]}:</label>
					<input type="text" id="name" value={name} onChange={handleName} autoFocus autoComplete="off"/>
					<p className="warning-text" id="warning-name" hidden>{T.please_fill_name[lang]}!</p>

					{ /* USERNAME */ }
					<label htmlFor="username">{T.username[lang]}:</label>
					<input type="text" id="username" value={username} onChange={handleUsername} autoComplete="off" placeholder="'usEr_65'"/>
					<p className="warning-text" id="warning-username" hidden>{T.username_requirements[lang]}!</p>

					{ /* EMAIL */ }
					<label htmlFor="email">{T.email[lang]}:</label>
					<input type="email" id="email" value={email} onChange={handleEmail} autoComplete="off" placeholder="'my.email@mail.co'"/>
					<p className="warning-text" id="warning-email" hidden>{T.email_requirements[lang]}!</p>

					{ /* PASSWORD */ }
					<label htmlFor="password">{T.password[lang]}:</label>
					<input type="password" id="password" value={password} onChange={handlePassword} autoComplete="off"/>
					<p className="warning-text" id="warning-password" hidden>{T.password_requirements[lang]}!</p>

					{ /* CONFIRM PASSWORD */ }
					<label htmlFor="repeat-password">{T.repeat_password[lang]}:</label>
					<input type="password" id="repeat-password" value={repeatedPassword} onChange={handlePasswordRepeat} autoComplete="off"/>
					<p className="warning-text" id="warning-repeat-password" hidden>{T.repeat_password_requirements[lang]}!</p>

					{ /* TERMS */ }
					<div className="container center">
						<input type="checkbox" id="agree-with-terms" className="check-input" />
						<label htmlFor="agree-with-terms" className="check-input">
							{T.I_agree_with[lang]} <a href="./terms" target="_blank" className='link'>{T.the_terms[lang]}</a>
						</label>
					</div>
					<p className="warning-text" id="warning-agree-with-terms" hidden>{T.terms_necessary[lang]}!</p>
					
					<a href="./login" className='link'><em>{T.already_have_an_account[lang]}?</em></a>

					<button type="submit" className='btn dark' id='submit' disabled={submitDisabled}>
						{submitValue}
					</button>

				</form>
			</main>
			<Footer lang={lang} />
		</div>
	);
};

export default Register;