import React from 'react';
import {render} from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UiExtension from "@bloomreach/ui-extension";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dialog from "./Dialog";

const rootElement = document.getElementById("root");

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const ui = await UiExtension.register();
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App mode={'openUi'} ui={ui}/>}/>
                    <Route path="/dialog" element={<Dialog mode={'openUi'} ui={ui}/>}/>
                </Routes>
            </BrowserRouter>,
            rootElement
        );

    } catch (error) {
        console.log(error);
        console.error('Failed to register extension:', error.message);
        console.error('- error code:', error.code);
        render(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<App mode={'fallback'} />}/>
                    <Route path="/dialog" element={<Dialog mode={'fallback'} />}/>
                </Routes>
            </BrowserRouter>,
            rootElement
        );
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
