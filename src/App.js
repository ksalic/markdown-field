import {TextareaAutosize} from "@mui/material";
// import Stackedit from 'stackedit-js';
import {Component} from "react";

// const stackedit = new Stackedit();

class App extends Component {


    constructor(props) {
        super(props)

        console.log('constructor', props)

        this.ui = props.ui;

        this.state = {text: '', mode: 'view'};
    }

    componentDidMount() {
        this.getInitialState(this.ui).then(state => this.setState(state));
    }

    async getInitialState(ui) {
        try {
            const brDocument = await ui.document.get();
            const value = await ui.document.field.getValue();
            return {mode: brDocument.mode, text: value};
        } catch (error) {
            console.error('Failed to register extension:', error.message);
            console.error('- error code:', error.code);
        }
        return this.state;
    }

    async openDialog() {
        try {
            this.dialogOptions = {
                title: 'Markdown Editor',
                url: './dialog',
                size: 'large',
                value: this.state.text
            };

            const response = await this.ui.dialog.open(this.dialogOptions);
            await this.ui.document.field.setValue(response);
            this.setState({text: response})
        } catch (error) {
            if (error.code === 'DialogCanceled') {
                return;
            }
            console.error('Error after open dialog: ', error.code, error.message);
        }

    }

    render() {
        const {text, mode} = this.state;
        console.log(mode);
        return (
            <>
                <TextareaAutosize value={text} onChange={event => {
                    console.log(event);
                    this.setState({text: event.target.value})
                }} minRows={5} id={''} style={{width: '100%',}}/>
                <div className="stackedit-button-wrapper">
                    <span onClick={(e) => {
                        e.preventDefault();
                        this.openDialog();
                    }}>
                        <img alt={'stackedit button to open editor'} src="/stackedit-logo.svg"/>Edit with
                        StackEdit
                    </span>
                </div>
            </>
        );
    }
}

export default App;
