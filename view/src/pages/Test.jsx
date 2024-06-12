import React, { useState, useEffect } from 'react';

import Header from "../comps/Header";
import Footer from "../comps/Footer";

import { translations as T } from "../scripts/translations.js";
import { API_ROUTES } from '../scripts/apiroutes.js';

const Test = ({ lang }) => {

    document.title = "DRBank · " + T.test[lang];

    const [para, setPara] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(API_ROUTES.TEST);
            const data = await res.text();
            setPara(data);
        };
        fetchData();
    }, []);

    return (
        <div className="container column">
            <Header lang={lang} />
            <main className="theme">
                <p>Test – {para}</p>
            </main>
            <Footer lang={lang} />
        </div>
    );
};

export default Test;