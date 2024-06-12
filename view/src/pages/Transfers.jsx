import React, { useState } from 'react';

import Header from "../comps/Header";
import Footer from "../comps/Footer";

import { translations as T } from "../scripts/translations.js";
import { API_ROUTES } from '../scripts/apiroutes.js';

const Home = ({ lang }) => {

	document.title = "DRBank · " + T.transfer[lang];

    const [sum, setSum] = useState("");
    const [currency, setCurrency] = useState("BGN");
	const [receiver, setReceiver] = useState("");
    const [message, setMessage] = useState("");

    const [bgnSelected, setBgnSelected] = useState("selected");
    const [eurSelected, setEurSelected] = useState("");

	const [serverWarning, setServerWarning] = useState("");
	const [submitValue, setSubmitValue] = useState(T.save[lang]);
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

    const checkSum = checkElement("sum", (val) => /^\d+(,\d{1,2})?$/.test(val));
    const checkReceiver = checkElement("receiver", (val) => /^[a-zA-Z0-9_]+$/.test(val));
    const checkMessage = checkElement("message", (val) => !!val);

    /** INPUT FIELDS HANDLING */

	const handleSum = (event) => {
		setSum(event.target.value);
		checkSum();
	}
    const handleReceiver = (event) => {
		setReceiver(event.target.value);
		checkReceiver();
	}
    const handleMessage = (event) => {
        setMessage(event.target.value);
        checkMessage();
    }

    const handleCurrency = (event) => {
        setCurrency(event.target.id);
        if (currency === "EUR") {
            setBgnSelected("selected");
            setEurSelected("");
        } else {
            setBgnSelected("");
            setEurSelected("selected");
        }
    }

    /** FORM SUBMITTING */

    const handleSubmit = async (event) => {

        event.preventDefault(); // stops refresh etc.
		document.getElementById("info-sent").hidden = true;
		setServerWarning("");

		filledOut = true;
		checkSum();
		checkReceiver();
        checkMessage();

		if (!filledOut) {
			document.getElementById("warning-all-fields").hidden = false;
		} else {
			document.getElementById("warning-all-fields").hidden = true;
			try {
				setSubmitDisabled(true);
				setSubmitValue(<i className="fa-solid fa-spinner spin-45"/>);
				const res = await fetch(API_ROUTES.TRANSFER_CREATE, {
					method: "POST",
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						sum: sum,
						currency: currency,
                        receiver: receiver,
                        message: message
					})
				});
				document.getElementById("info-sent").hidden = false;
				if (res.ok) {
                    document.getElementById("info-saved").hidden = false;
                } else {

				}
				console.log(await res.json());
				document.getElementById("info-sent").hidden = true;
			} catch (error) {
				setServerWarning(T.an_error_occurred[lang]);
				console.error(error);
			} finally {
				setSubmitValue(T.save[lang]);
				setSubmitDisabled(false);
			}
		}

    };

	return (
		<div id="page" className="container column overflow">
			<Header lang={lang} />

            <main className="theme container column justify">
                {
                    lang == "bg" ?
                        <>
                            <h1>Преводи на средства</h1>
                            <p>&emsp;<span className="foreground-primary">DRBank</span> Ви позволява след успешна регистрация и потвърждаване на имейл да преведете пари на друг потребител. Ако получите превод може да го приемете или отхвърлите.</p>
                            <div className="container width-100 justify">
                                <a href="./register" className="link">Регистрирайте се сега!</a>
                            </div>
                        </>:
                        <>
                            <h1>Money transfer</h1>
                            <p><span className="foreground-primary">DRBank</span> allows you after a successful sign-up and email verification to send money to another user by their username. If you receive a transfer yourself, you can accept ot reject it.</p>
                            <div className="container width-100 justify">
                                <a href="./register" className="link">Sign up today!</a>
                            </div>
                        </>
                }
                
            </main>

            <main className="theme container center justify display-none">
                <form className="theme lighter" onSubmit={handleSubmit}>

                    <h3 className="foreground-primary thematic">{T.transfer[lang]}</h3>

                    {/* MESSAGES */}
                    <p hidden className="info" id="info-sent">{T.data_sent[lang]}.</p>
                    <p hidden className="info" id="info-saved">{T.transfer_saved[lang]}.</p>
                    <p hidden className="warning" id="warning-all-fields">{T.please_fill_all_fields[lang]}.</p>
                    <p className="warning adjust-empty">{serverWarning}</p>

                    { /* SUM */ }
                    <label htmlFor="sum">{T.sum[lang]}:</label>
                    <input type="text" id="sum" value={sum} onChange={handleSum} autoFocus autoComplete="off" />
                    <p className="warning-text" id="warning-sum" hidden>{T.sum_requirements[lang]}!</p>

                    { /* CURRENCY */ }
                    <div>
                        <label htmlFor="BGN" className={bgnSelected}>BGN (лв.)</label>
                        <input type="radio" name="currency" id="BGN" onChange={handleCurrency} defaultChecked hidden/>
                        <label htmlFor="EUR" className={eurSelected}>EUR (€)</label>
                        <input type="radio" name="currency" id="EUR" onChange={handleCurrency} hidden/>
                    </div>
                    
                    { /* RECEIVER */ }
                    <label htmlFor="receiver">{T.receiver[lang]}:</label>
                    <input type="text" id="receiver" value={receiver} onChange={handleReceiver} autoComplete="off" />
                    <p className="warning-text" id="warning-receiver" hidden>{T.username_requirements[lang]}!</p>

                    { /* MESSAGE */ }
                    <label htmlFor="message">{T.message[lang]}:</label>
                    <div className="inputlike">
                        <textarea id="message" value={message} onChange={handleMessage} autoComplete="off"/>
                    </div>
                    <p className="warning-text" id="warning-message" hidden>{T.please_fill_message[lang]}!</p>

                    <button type="submit" className='btn dark' id='submit' disabled={submitDisabled}>
                        {submitValue}
                    </button>

                </form>
            </main>

			<Footer lang={lang} />
		</div>
	);
};

export default Home;