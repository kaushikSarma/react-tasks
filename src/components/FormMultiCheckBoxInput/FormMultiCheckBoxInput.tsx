import * as React from 'react';

interface FormMultiCheckBoxInputProps {
    title: string;
    valueslist: {}[];
    name: string;
    onChange(name, value, callback?);
}

interface FormMultiCheckBoxInputState {
    value: boolean[];
}
export default class FormMultiCheckBoxInput extends React.Component<FormMultiCheckBoxInputProps, FormMultiCheckBoxInputState> {
    exists(object) {
        return (
            object !== null &&
            object !== undefined &&
            object !== {} &&
            object.length > 0
        );
    }

    onInputChange = index => (event) => {
        let newstate = this.state.value;
        newstate[index] = event.target.checked;
        this.setState({
            value: newstate
        }, () => {
            this.props.onChange(this.props.name, this.state.value)
        });
    } 

    constructor (props) {
        super(props);
        this.state = {
            value: []
        }
    }
    render () {
        return <React.Fragment>
            <h4>{this.props.title}</h4>
            {this.exists(this.props.valueslist) &&
            this.props.valueslist.map((choice, index) => 
                <div key={`color-${choice["title"]}`} className="color-input">
                  <input
                    type="checkbox"
                    name="colorChoices"
                    onChange={this.onInputChange(index)}
                    checked={this.state.value[index]}
                  ></input>
                  <span
                    className="color-display-bubble"
                    style={{ background: choice["color"] }}
                  ></span>
                  <label>{choice["title"]}</label>
                </div>
            )}
        </React.Fragment>
    }
}