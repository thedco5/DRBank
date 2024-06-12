import React from 'react';
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PageNotFound from './pages/PageNotFound';
import Test from './pages/Test';
import Transfers from './pages/Transfers';
import ForgottenPassword from './pages/ForgottenPassword';
import Terms from './pages/Terms';

import './main.css'
import VerifiedEmail from './pages/VerifiedEmail';

export default function Root() {
	return (
		
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home lang="bg" />} />
				<Route path="/home" element={<Home lang="bg" />} />
				<Route path="/register" element={<Register lang="bg" />} />
				<Route path="/login" element={<Login lang="bg" />} />
				<Route path="/transfers" element={<Transfers lang="bg" />} />
				<Route path="/forgotten_password" element={<ForgottenPassword lang="bg" />} />
				<Route path="/terms" element={<Terms lang="bg" />} />
				<Route path="/verified" element={<VerifiedEmail />} />
				<Route path="/test" element={<Test lang="bg" />} />
				<Route path='/:lang/*' element={<LocalizedRoutes lang="bg" />} />
				<Route path="*" element={<PageNotFound lang="bg" />} />
			</Routes>
		</BrowserRouter>
	);
}

function LocalizedRoutes() {
	let { lang } = useParams();
	if (lang !== "bg" && lang !== "en") {
		return (
			<Routes>
				<Route path="/*" element={<PageNotFound lang="bg" />} />
			</Routes>
		);
	}
	document.documentElement.lang = lang;
	return (
		<Routes>
			<Route path="/" element={<Home lang={lang} />} />
			<Route path="/home" element={<Home lang={lang} />} />
			<Route path="/register" element={<Register lang={lang} />} />
			<Route path="/login" element={<Login lang={lang} />} />
			<Route path="/transfers" element={<Transfers lang={lang} />} />
			<Route path="/terms" element={<Terms lang={lang} />} />
			<Route path="/forgotten_password" element={<ForgottenPassword lang={lang} />} />
			<Route path="/test" element={<Test lang={lang} />} />
			<Route path="/*" element={<PageNotFound lang={lang} />} />
		</Routes>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Root />);