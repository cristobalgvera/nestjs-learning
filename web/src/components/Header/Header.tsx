import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE } from '../Routes/route';

const { HOME, REGISTER, LOGIN, PROFILE } = ROUTE;

const Header = () => (
    <div>
        <div>
            <Link to={HOME}>Home</Link>
        </div>
        <div>
            <Link to={LOGIN}>Login</Link>
        </div>
        <div>
            <Link to={REGISTER}>Register</Link>
        </div>
        <div>
            <Link to={PROFILE}>Profile</Link>
        </div>
    </div>
);

export default Header;
