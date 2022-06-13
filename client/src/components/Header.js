import React from 'react'
import { Link } from 'react-router-dom';

function Header(props) {

    const { linkTo, linkText } = props;

    return (
        <header className='d-flex justify-content-between'>
            <h1>Pet Shelter</h1>
            <Link to={linkTo}>{linkText}</Link>
        </header>
    )
}

export default Header