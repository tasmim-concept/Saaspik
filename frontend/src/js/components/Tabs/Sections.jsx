import React, { useState } from 'react'

function Sections ({ tabs, handleSelect }) {
    const [active, setActive] = useState(0)
    function handleClick (id) {
        setActive(id)
        handleSelect(id)
    }

    function setColor (id) {
        switch (id) {
        case 1:
            return 'purple'
        case 2:
            return 'green'
        case 3:
            return 'fushia'
        case 0:
        default:
            return 'pink'
        }
    }

    return <ul className="tab-sections">
        {
            tabs.map((tab, id) =>
                <li
                    key={id} className={setColor(id) + (id === active ? ' active' : '')}
                    onClick={e => handleClick(id)}>{ tab.name }</li>)
        }
    </ul>
}

export default Sections
