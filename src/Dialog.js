import Stackedit from 'stackedit-js';
import {Component} from "react";

const stackedit = new Stackedit();

class Dialog extends Component {


    constructor(props) {
        super(props)

        console.log('constructor', props)

        this.ui = props.ui;

        this.state = {
            text: ''
        }


    }

    componentDidMount() {
        this.setInitial(this.ui).then(text => this.setState({text: text})).then(value => {
            stackedit.openFile({
                name: 'Filename',
                content: {text: this.state.text}
            }, true /* silent mode */);
            stackedit.on('fileChange', (file) => {
                this.setState({text: file.content.text})
                ;
            });
        });
    }

    async setInitial(ui) {
        try {
            const options = await ui.dialog.options();
            const text = options.value;
            return text;
        } catch (error) {
            console.error('Failed to register extension:', error.message);
            console.error('- error code:', error.code);
        }
        return '';
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
