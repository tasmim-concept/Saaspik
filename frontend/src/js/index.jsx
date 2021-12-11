import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Header from './components/Header/Header'
import Dynamic from './components/Tabs/Dynamic'
import './components/Header/header-line'
import './components/Scroll/go-top'
const faq = require('./faq')

ReactDOM.render(
    <AppContainer>
        <Header />
    </AppContainer>,
    document.getElementById('header-brand')
)

ReactDOM.render(
    <AppContainer>
        <Dynamic tabs={faq} />
    </AppContainer>,
    document.getElementById('faq-tab')
)
