import "./styles.css";
import LoginPage from "./LoginPage.js"
import { useState } from 'react';
import HomePage from "./Home/HomePage"

export default function App() {
    let webBody;

    const [loginStatus, setLoginStatus] = useState('false');

    if (loginStatus === 'true') {
        webBody = <HomePage />
    } else {
        webBody = <LoginPage loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
    }

    return <div>{webBody}</div>;
}