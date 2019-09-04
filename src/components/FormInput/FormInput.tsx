import * as React from 'react';
import './index.scss';

interface FormInputProps {
    title?: string;
    type?: string;
    placeholder?: string;
    onChange?(event, callback?);
    name: string;
    value: string | number;
    suggestionsList ?: {}[];
    showSuggestionsNum ?: number;
}

interface FormInputState {
    suggestionToShow: string[]
}

export default class FormInput extends React.Component<FormInputProps, FormInputState> {
    constructor (props) {
        super (props);
        this.state = {suggestionToShow: []};
    }

    onChangeHandler = (event) => {
        this.props.onChange(event, () => {
            if (this.props.value !== "")
            this.setState({
                suggestionToShow: this.props.suggestionsList.filter(s => s['value'].startsWith(this.props.value) ).slice(0, this.props.showSuggestionsNum).map(s => s['value'])
            });
            else {
                this.setState({
                    suggestionToShow: []
                })
            }
        });
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
                {this.state.suggestionToShow !== undefined && this.state.suggestionToShow.length > 0 
                    && <div className='suggestions-list'>
                    {this.state.suggestionToShow.map(s => <p className='suggestion-item'>{s}</p>)}
                </div>}
            </React.Fragment>
        );
    }
}