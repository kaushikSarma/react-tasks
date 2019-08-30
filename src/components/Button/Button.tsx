import * as React from 'react';

import './index.scss';

export default class Button extends React.Component {
    render = () => {
        return <span className='button'>{this.props.children}</span>;
    }
}