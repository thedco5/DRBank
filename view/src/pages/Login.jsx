import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from "../comps/Header";
import Footer from "../comps/Footer";

import { translations as T } from "../scripts/translations.js";
import { API_ROUTES } from '../scripts/apiroutes.js';

const Login = ({ lang }) => {

	document.title = "DRBank · " + T.log_in.noun[lang];

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [serverWarning, setServerWarning] = useState("");
	const [submitValue, setSubmitValue] = useState(T.log_in.verb[lang]);
	const [submitDisabled, setSubmitDisabled] = useState(false);

	const navigate = useNavigate();

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

	const checkUsername = checkElement("username", (val) => /^[a-zA-Z0-9_]+$/.test(val));
	const checkPassword = checkElement("password", (val) => val.length >= 8);

	/** INPUT FIELDS HANDLING */

	const handleUsername = (event) => {
		setUsername(event.target.value);
		checkUsername();
	}
	const handlePassword = (event) => {
		setPassword(event.target.value);
		checkPassword();
	}

	/** FORM SUBMITTING */

	const handleSubmit = async (event) => {

        event.preventDefault(); // stops refresh etc.
		document.getElementById("info-sent").hidden = true;
		setServerWarning("");

		filledOut = true;
		checkUsername();
		checkPassword();

		if (!filledOut) {
			document.getElementById("warning-all-fields").hidden = false;
		} else {
			document.getElementById("warning-all-fields").hidden = true;
			try {
				setSubmitDisabled(true);
				setSubmitValue(<i className="fa-solid fa-spinner spin-45"/>);
				const res = await fetch(API_ROUTES.USER_AUTH, {
					method: "POST",
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						username: username,
						password: password
					})
				});
				document.getElementById("info-sent").hidden = false;
				if (res.ok) {
					Cookies.set("jwt", res.json, { expires: 30 });
					navigate("./");
				}
				else { 
					console.error(res.text);
				}
				console.log(await res.json());
				document.getElementById("info-sent").hidden = true;
			} catch (error) {
				setServerWarning(T.an_error_occurred[lang]);
				console.error(error);
			} finally {
				setSubmitValue(T.log_in.verb[lang]);
				setSubmitDisabled(false);
			}
		}

    };

	return (
		<div className="container column">
			<Header lang={lang} noLogin="true" />
			<main className="theme container center justify">
				<form className="theme lighter" onSubmit={handleSubmit}>

					<h3 className="foreground-primary thematic">{T.log_in.noun[lang]}</h3>

					{/* MESSAGES */}
					<p hidden className="info" id="info-sent">{T.data_sent[lang]}.</p>
					<p hidden className="warning" id="warning-all-fields">{T.please_fill_all_fields[lang]}.</p>
					<p className="warning adjust-empty">{serverWarning}</p>

					{ /* USERNAME */ }
					<label htmlFor="username">{T.username[lang]}:</label>
					<input type="text" id="username" value={username} onChange={handleUsername} autoFocus autoComplete="off" />
					<p className="warning-text" id="warning-username" hidden>{T.username_requirements[lang]}!</p>

					{ /* PASSWORD */ }
					<label htmlFor="password">{T.password[lang]}:</label>
					<input type="password" id="password" value={password} onChange={handlePassword} autoComplete="off" />
					<p className="warning-text" id="warning-password" hidden>{T.password_requirements[lang]}!</p>

					<a href="./register" className='link'><em>{T.do_not_have_an_account[lang]}?</em></a>
					<a href="./forgotten_password" className='link'><em>{T.forgotten_password[lang]}?</em></a>

					<button type="submit" className='btn dark' id='submit' disabled={submitDisabled}>
						{submitValue}
					</button>

				</form>
			</main>
			<Footer lang={lang} />
		</div>
	);
};

export default Login;