import { hot } from 'react-hot-loader/root'
import React from 'react'
import Menu from './Menu'
import Logo from './Logo'

const Header = () => {
    return <div className="brand">
        <Menu />
        <Logo />
    </div>
}

export default hot(Header)
