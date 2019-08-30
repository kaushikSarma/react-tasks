import * as React from 'react';
import { Link } from 'react-router-dom';

import Button from '@component/Button';

import './index.scss';

export default class Header extends React.Component {
    render = () => {
        return (
            <nav className='pageHeader'>
                <Link to='/search'><Button>Search</Button></Link>
                <Link to='/manage-cards'><Button>Cards</Button></Link>
            </nav>
        );
    }
}