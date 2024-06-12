import React, { useState } from 'react';
import Cookies from 'js-cookie';

function ThemeButton() {

    const [isLightTheme, setIsLightTheme] = useState(() => {
		const isLightThemeCookie = Cookies.get("theme");
        if (isLightThemeCookie) {
			Cookies.set("theme", isLightThemeCookie, { expires: 30 });
            return isLightThemeCookie === "true";
        } else {
            const prefersLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
			Cookies.set("theme", prefersLightMode, { expires: 30 });
            return prefersLightMode === "true";
        }
	});

    let sunIcon = <i className="fa-solid fa-sun" />;
    let moonIcon = <i className="fa-solid fa-moon" />;

	document.getElementById("root").className = isLightTheme ? "light" : "dark";

	function toggleTheme() {
		Cookies.set("theme", !isLightTheme, { expires: 30 });
		setIsLightTheme(!isLightTheme);
	}

    return (
        <a className='btn flat sun-moon' onClick={toggleTheme}>
			{ isLightTheme ? moonIcon : sunIcon }
		</a>
    );
}

export default ThemeButton;