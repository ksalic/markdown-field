import Stackedit from 'stackedit-js';
import {Component} from "react";

const stackedit = new Stackedit();

class Dialog extends Component {


    constructor(props) {
        super(props)

        console.log('constructor', props)

        this.ui = props.ui;

        this.state = {
            text: 'intial text.. hello markdowner'
        }
    }

    componentDidMount() {
        this.setInitial(this.ui).then(text => this.setState({text: text}, () => {
            stackedit.openFile({
                name: 'Filename', // with an optional filename
                content: {
                    text: this.state.text // and the Markdown content.
                }
            });
            stackedit.on('fileChange', (file) => {
                console.log('change..... ', file.content.text);
                this.setState({text: file.content.text, html: file.content.html})
            });

            stackedit.on('close', () => {
                console.log('close..... ');
                this.ui.dialog.close(this.state.text);
            });
        }))

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
        return 'error retrieving value, but all is good...';
    }


    render() {
        const {html} = this.state;
        return (
            <>
                <div dangerouslySetInnerHTML={{__html: html}}/>
            </>
        );
    }
}

export default Dialog;
