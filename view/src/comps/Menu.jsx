import { useLocation } from 'react-router-dom';
import { translations as T } from "../scripts/translations.js"

const Menu = ({ id, className, hidden, lang }) => {
    return (
        <>
            <nav id={id} className={className} hidden={hidden}>
                <ul className="container justify">
                    <li><a href="./home" className="no-text-wrap">
                        <i className="fa-solid fa-house" /> {T.home[lang]}
                    </a></li>
                    <li><a href="./transfers" className="no-text-wrap">
                        <i className="fa-solid fa-money-bills" /> {T.transfers[lang]}
                    </a></li>
                    <li><a href="./requests" className="no-text-wrap">
                        <i className="fa-solid fa-money-check-dollar" /> {T.requests[lang]}
                    </a></li>
                    <li><a href="./stats" className="no-text-wrap">
                        <i className="fa-solid fa-chart-line" /> {T.stats[lang]}
                    </a></li>
                </ul>
            </nav>
        </>
    )
}

export default Menu;