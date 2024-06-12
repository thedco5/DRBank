import React from 'react';

import Header from "../comps/Header";
import Footer from "../comps/Footer";

const Terms = ({ lang }) => {
    return (
        <div id="page" className="container column overflow">
            <Header lang={lang} />
            <main className="theme container column">
                {
                    lang == "bg" ?
                        <>
                            <h1>Общи условия</h1>
                            <p>&emsp;Потребителите на тази система трябва да имат навършено пълнолетие. Трябва да се спазват авторските права на системата и от нея от друга страна. За работата на този сайт <u>се използват бисквитки</u>. За използване на нашите услуги, потребителя трабва да потвърди имейла си чрез полученото си писмо. Не е позволено да се използва вулгарен или рязък език за имена, съобщения или подобни в системата.</p>
                        </>:
                        <>
                            <h1>Common terms</h1>
                            <p>The user of this system must be at least eighteen years old. They have to oblige to copyright as well as the system has to. This site <u>uses cookies</u> in order to properly work. The user has to verify their email address so that they can use the functionalities. It is not permitted to use vulgar language for names, messages etc.</p>
                        </>
                }
                
            </main>
            <Footer lang={lang} />
        </div>
    );
}

export default Terms;