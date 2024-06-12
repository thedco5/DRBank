import React from "react";

import payingImage from "../assets/paying.jpeg";
import digitalCashImage from "../assets/digicash.png";

const HomeMainEN = () => {
	return (
		<main className="theme">
			<h1>Welcome to DRBank!</h1>
			<p className="center">Paying, simplified.</p>
			<br />
			<div>
				<img src={payingImage} className="para-img left" alt="[Image of cash exchange]" />
				<p><em>Have you ever needed to send someone money? Have you wandered what is the simplest way? Have you ever heard of online paying before?</em></p>
				<p><span className="foreground-primary">DRBank</span> is here to help you and guide you into the world of online payment systems. With our <a href="./" className="link">website</a> you can make transfers, send requests and view your spending history! The design of our website is carefully crafted to be intuitive and ease for new-comers.</p>
			</div>
			<hr />
			<div>
				<img src={digitalCashImage} className="para-img right" alt="[Image of 'digital' cash]" />
				<p>Today's rapidly changing environment creates the need for digitalization of payment processes. <span className="foreground-primary">DRBank</span> offers three main functionalities. With <a href="./transfer" className="link">transfers</a> you can send other users money. <a href="./request" className="link">Requests</a> are one our proudest features – you can ask other users for a transfer. Lastly, we offer the possibility to view your <a href="./stats" className="link">history</a>.</p>
			</div>
			<div className="container width-100 justify">  
				<a href="./register" className="btn dark">Sign up now!</a>
			</div>
		</main>
	);
};

export default HomeMainEN;