import React, { useState } from 'react'

const Menu = () => {
    const [visibleMenu, setVisibleMenu] = useState(false)
    const [visibleNav, setVisibleNav] = useState(false)
    function showMenu () {
        setVisibleMenu(true)

        setTimeout(() => {
            setVisibleNav(true)
        }, 250)
    }

    function closeMenu () {
        setVisibleNav(false)
        setTimeout(() => {
            setVisibleMenu(false)
        }, 1000)
    }

    function handleClick (e) {
        if (e.target.className === 'menu visible') {
            closeMenu()
        }
    }

    return <div className={'menu' + (visibleMenu ? ' visible' : '')} onClick={e => handleClick(e)}>
        {
            visibleMenu ? (
                <nav className={'menu-pages-navigation' + (visibleNav ? ' visible' : '')}>
                    <i className="icon_close" onClick={e => closeMenu()}/>
                    <ul>
                        <li><a href="home.html">Home</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </nav>
            ) : <i className="icon_menu" onClick={e => showMenu()}/>
        }
    </div>
}

export default Menu
