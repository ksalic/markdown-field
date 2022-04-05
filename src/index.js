import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UiExtension from "@bloomreach/ui-extension";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dialog from "./Dialog";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const ui = await UiExtension.register();

        console.log('ui..', ui);

        const routing = (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/dialog" element={<Dialog/>}/>
                </Routes>
            </BrowserRouter>
        );

        ReactDOM.render(routing, document.getElementById("root"));
    } catch (error) {
        console.log(error);
        console.error('Failed to register extension:', error.message);
        console.error('- error code:', error.code);
        const routing = (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App/>}/>
                    <Route path="/dialog" element={<Dialog/>}/>
                </Routes>
            </BrowserRouter>
        );

        ReactDOM.render(routing, document.getElementById('root'));
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
