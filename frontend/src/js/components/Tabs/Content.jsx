import React, { useEffect, useState } from 'react'

const Content = ({ content, fade }) => {
    const [active, setActive] = useState(1)

    function handleSelect (id) {
        if (id === active) {
            setActive(0)
        } else {
            setActive(id)
        }
    }

    useEffect(() => {
        if (fade) {
            setActive(0)
        }
    })

    return <div className={'tab-content' + (fade ? '' : ' visible')}>
        {
            content.map((pane, id) => <div
                key={id} onClick={e => handleSelect(id + 1)}
                className={'tab-pane' + (id + 1 === active ? ' active' : '')}
            >
                <div className="tab-pane-header">
                    <h4>{ pane.header }</h4>
                    <i className="icon"/>
                </div>
                <div className="tab-pane-text">
                    <p>{ pane.text }</p>
                </div>
            </div>)
        }
    </div>
}

export default Content
