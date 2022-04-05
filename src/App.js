import {Link, TextareaAutosize} from "@mui/material";
import Stackedit from 'stackedit-js';
import {Component} from "react";

const stackedit = new Stackedit();

class App extends Component {


    constructor(props) {
        super(props)

        console.log('constructor', props)

        this.ui = props.ui;

        this.state = {text: '', mode: 'view', html: ''};
    }

    componentDidMount() {
        this.getInitialState(this.ui).then(state => this.setState(state, () => {
            stackedit.openFile({
                name: 'Filename',
                content: {text: this.state.text}
            }, true /* silent mode */);
            stackedit.on('fileChange', (file) => {
                this.setState({html: file.content.html});
            });
        }));

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
                size: 'medium',
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
        const {text, html, mode} = this.state;
        console.log(mode);
        return (
            <>
                {mode === 'edit' && <><TextareaAutosize value={text} onChange={event => {
                    this.setState({text: event.target.value}, () => {
                        if (this.ui) {
                            this.ui.document.field.setValue(event.target.value);
                        }
                    })
                }} minRows={5} style={{width: '100%',}}/>
                    <div className="stackedit-button-wrapper">
                        <Link style={{cursor: "pointer"}} onClick={(e) => {
                            this.openDialog();
                        }}>
                            <img alt={'stackedit button to open editor'} src="/stackedit-logo.svg"/>Edit with
                            StackEdit
                        </Link>
                    </div>
                </>}
                {mode !== 'edit' && <div dangerouslySetInnerHTML={{__html: html}}/>}
            </>
        );
    }

}

export default App;
