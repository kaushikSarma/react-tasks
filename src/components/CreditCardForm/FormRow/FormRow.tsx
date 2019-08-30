import * as React from 'react';

import './index.scss';

export default class FormRow extends React.Component {
    render = () => {
        return (
            <div className='row'>
                {this.props.children}
            </div>
        ); 
    }
}