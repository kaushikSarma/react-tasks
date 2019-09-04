import * as React from 'react';

interface FormInputProps {
    title?: string;
    type?: string;
    placeholder?: string;
    onChange?(event);
    name: string;
    value: string | number
}

export default class FormInput extends React.Component<FormInputProps> {
    constructor (props) {
        super (props);
    }

    onChangeHandler = (event) => {
        this.props.onChange(event);
    }

    render = () => {
        const title = this.props.title === undefined ? "" : this.props.title;
        return (
            <React.Fragment>
                <h4>{title}</h4>
                <input
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    onChange={this.onChangeHandler}
                    value={this.props.value}
                ></input>
            </React.Fragment>
        );
    }
}