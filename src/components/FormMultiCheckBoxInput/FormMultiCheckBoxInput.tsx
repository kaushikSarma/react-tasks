import * as React from 'react';

interface FormMultiCheckBoxInputProps {
    title: string;
    valueslist: {}[];
    value: boolean[];
    onChange(event);
}

export default class FormMultiCheckBoxInput extends React.Component<FormMultiCheckBoxInputProps> {
    exists(object) {
        return (
            object !== null &&
            object !== undefined &&
            object !== {} &&
            object.length > 0
        );
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
                    onChange={this.props.onChange}
                    data-index={index}
                    checked={this.props.value[index]}
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