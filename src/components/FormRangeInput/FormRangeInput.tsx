import * as React from "react";

interface RangeInputProps {
    title ?: string;
    type : string;
    name : string;
    rangeofvalues : {key: string, displayValue: string}[];
    onChange ?(name, value, callback?);
}

interface RangeInputState {
    min: string | number;
    max: string | number;
}

export default class FormRangeInput extends React.Component<RangeInputProps, RangeInputState> {
    constructor (props) {
        super(props);
        this.state = {
            min: "Min",
            max: "Max",
        }
    }
    onChange = event => {
        event.preventDefault();
        const val = event.target.value;
        switch(event.target.name) {
            case `min${this.props.name}`:{
                const minindex = this.props.rangeofvalues.findIndex(
                e => e["key"] === val
                );
                const maxindex = this.props.rangeofvalues.findIndex(
                e => e["key"] === this.state.max
                );
                minindex < maxindex &&
                this.setState({ min: val },() => {
                    this.props.onChange(this.props.name, {min: this.state.min, max: this.state.max})
                });
                break;
            }
            case `max${this.props.name}`: {
                event.preventDefault();
                const minindex = this.props.rangeofvalues.findIndex(
                e => e["key"] === this.state.min
                );
                const maxindex = this.props.rangeofvalues.findIndex(
                e => e["key"] === val
                );
                minindex < maxindex &&
                this.setState({ max: val }, () => {
                    this.props.onChange(this.props.name, {min: this.state.min, max: this.state.max})
                });
                break;
            }
        }
    }
    render() {
        if (this.props.type === "range-select")
        return (
            <React.Fragment>
                <h4>{this.props.title}</h4>
                <select
                    name={`min${this.props.name}`}
                    value={this.state.min}
                    onChange={this.onChange}
                >
                    {this.props.rangeofvalues !== undefined &&
                    this.props.rangeofvalues.map(value => (
                        <option key={`min-${value.key}`} value={value.key}>
                        {value.displayValue}
                        </option>
                    ))}
                </select>
                <i className="separator">to</i>
                <select
                    name={`max${this.props.name}`}
                    value={this.state.max}
                    onChange={this.onChange}
                >
                    {this.props.rangeofvalues !== undefined &&
                    this.props.rangeofvalues.map(value => (
                        <option key={`max-${value.key}`} value={value.key}>
                        {value.displayValue}
                        </option>
                    ))}
                </select>
            </React.Fragment>
        );
    }
}
