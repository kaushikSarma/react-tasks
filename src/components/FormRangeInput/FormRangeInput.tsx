import * as React from "react";

interface RangeInputProps {
    title ?: string;
    type : string;
    name: {min: string, max: string};
    value : {min:string|number , max:string|number};
    onChange ?(event);
    rangeofvaleus : {key: string, displayValue: string}[]
}

export default class FormRangeInput extends React.Component<RangeInputProps> {
    render() {
        if (this.props.type === "range-select")
        return (
            <React.Fragment>
                <h4>{this.props.title}</h4>
                <select
                    name={this.props.name.min}
                    value={this.props.value.min}
                    onChange={this.props.onChange}
                >
                    {this.props.rangeofvaleus !== undefined &&
                    this.props.rangeofvaleus.map(value => (
                        <option key={`min-${value.key}`} value={value.key}>
                        {value.displayValue}
                        </option>
                    ))}
                </select>
                <i className="separator">to</i>
                <select
                    name={this.props.name.max}
                    value={this.props.value.max}
                    onChange={this.props.onChange}
                >
                    {this.props.rangeofvaleus !== undefined &&
                    this.props.rangeofvaleus.map(value => (
                        <option key={`max-${value.key}`} value={value.key}>
                        {value.displayValue}
                        </option>
                    ))}
                </select>
            </React.Fragment>
        );
    }
}
