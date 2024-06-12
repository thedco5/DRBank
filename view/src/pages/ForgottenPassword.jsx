import React from 'react';

import Header from "../comps/Header";
import Footer from "../comps/Footer";

const ForgottenPassword = ({ lang }) => {
    return (
        <div id="page" className="container column overflow">
            <Header lang={lang} />
            <main className="theme container column justify">
                {
                    lang == "bg" ?
                        <>
                            <h1>Забравена парола?</h1>
                            <p>&emsp;Моля свържете се с нас на имейл адрес <a className="link" href="mailto:drbankemail@gmail.com">drbankemail@gmail.com</a> за помощ със създаването на нова парола. Очаквайте най-бърз отговор в работно време. На Ваше разположение сме и сме готови да се отзовем и на други проблеми, които рядко може да имате.</p>
                        </>:
                        <>
                            <h1>Forgotten password?</h1>
                            <p>Please contact us by email <a className="link" href="mailto:drbankemail@gmail.com">drbankemail@gmail.com</a> for help with the making of a new password. Expect the rapidest answer in working hours. We are here to help you and we are ready to solve other problems you may rarely have.</p>
                        </>
                }
                
            </main>
            <Footer lang={lang} />
        </div>
    );
}

export default ForgottenPassword;