import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

//局部热更新
if (module && module.hot) {
  module.hot.accept()
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App></App>)
