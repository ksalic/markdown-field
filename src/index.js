import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UiExtension from "@bloomreach/ui-extension";
import {Route, Router} from "react-router-dom";
import {Switch} from "@mui/material";
import Dialog from "./Dialog";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const ui = await UiExtension.register();

        console.log('ui..', ui);

        const routing = (
            <Router>
                <Switch>
                    <Route path="/dialog" render={props => <App ui={ui}/>}/>
                    <Route exact path="/" render={props => <Dialog ui={ui}/>}/>
                </Switch>
            </Router>
        );

        ReactDOM.render(routing, document.getElementById("root"));
    } catch (error) {
        console.log(error);
        console.error('Failed to register extension:', error.message);
        console.error('- error code:', error.code);
        ReactDOM.render(<App/>, document.getElementById('root'));
    }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
