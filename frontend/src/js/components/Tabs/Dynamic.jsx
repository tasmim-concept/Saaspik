import { hot } from 'react-hot-loader/root'
import React, { useState } from 'react'
import Sections from '../Tabs/Sections'
import Content from '../Tabs/Content'

const Dynamic = ({ tabs }) => {
    const [tab, setTab] = useState(tabs[0])
    const [fade, setFade] = useState(false)

    function handleSelect (id) {
        setFade(true)
        setTimeout(() => {
            setTab(tabs[id])
            setFade(false)
        }, 300)
    }

    return <div className="tabs container">
        <Sections tabs={ tabs } handleSelect={ id => handleSelect(id) } />
        <Content content={ tab.content } fade={ fade }/>
    </div>
}

export default hot(Dynamic)
