// import Stackedit from 'stackedit-js';
import {Component} from "react";

// const stackedit = new Stackedit();

class Dialog extends Component {


    constructor(props) {
        super(props)

        console.log('constructor', props)

    }


    render() {
        return (
            <>
                <h1>dialog</h1>
            </>
        );
    }
}

export default Dialog;
