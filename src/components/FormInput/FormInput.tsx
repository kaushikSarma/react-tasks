import * as React from 'react';
import './index.scss';

interface FormInputProps {
    title?: string;
    type?: string;
    placeholder?: string;
    name: string;
    suggestionsList ?: {}[];
    showSuggestionsNum ?: number;
    onChange?(name, value, callback?);
}

interface FormInputState {
    suggestionToShow: string[],
    selectedIndex: number,
    isActive: boolean,
    value: string,
}

export default class FormInput extends React.Component<FormInputProps, FormInputState> {
    constructor (props) {
        super (props);
        this.state = {suggestionToShow: [], selectedIndex: 0, isActive: false, value: ""};
    }

    onChangeHandler = (event) => {
        event.preventDefault();
        const val = event.target.value;
        this.setState({
            value: val
        }, () => {
            if (this.state.value !== "") {
                this.props.onChange(this.props.name, this.state.value)
                this.setState({
                    suggestionToShow: this.props.suggestionsList.filter(s => s['value'].startsWith(this.state.value) ).slice(0, this.props.showSuggestionsNum).map(s => s['value'])
                });
            }
            else
                this.setState({
                    suggestionToShow: []
                });
        });
    }

    updateSuggestion = (item, index:number) => {
        console.log(item.innerText), index;
        this.setState({
            selectedIndex: index
        })
    }

    onFocus = event => this.setState({ isActive: true });
       
    onBlur = event =>{ 
        this.setState({ isActive: false, suggestionToShow: [], selectedIndex: 0 })
    };
    
    render = () => {
        const title = this.props.title === undefined ? "" : this.props.title;
        return (
            <React.Fragment>
                <h4>{title}</h4>
                <div className='form-input-wrapper'>
                    <div className={`input-overlay ${this.state.isActive ? " active" : ""}`}>
                        <span className='field-value'>
                            {this.state.value}
                            <span className='cursor'></span>
                        </span>
                        <span className='field-suggesstion'>
                            {   this.state.value === '' ? "Search by brand" :
                                this.state.suggestionToShow[this.state.selectedIndex] === undefined ? "" 
                                : (this.state.suggestionToShow[this.state.selectedIndex]).replace(this.state.value.toString(), '')}
                        </span>
                    </div>
                    <input className='form-input-custom'
                        type={this.props.type}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        onChange={this.onChangeHandler}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        value={this.state.value}
                        autoComplete="off"
                    />
                    {this.state.isActive && this.state.suggestionToShow !== undefined 
                    && this.state.suggestionToShow.length > 0 
                        && <div className='suggestions-list'>
                        {this.state.suggestionToShow.map((s, index) => 
                            <p key={`${s}${index}`} className='suggestion-item' 
                            onMouseEnter={event => this.updateSuggestion(event.target, index)}>{s}</p>)
                        }
                    </div>}
                </div>
            </React.Fragment>
        );
    }
}