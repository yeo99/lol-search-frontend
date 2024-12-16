import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/layout/Layout'
import { GlobalStyle } from './style/global'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <GlobalStyle />
    <Layout>
      "test"
    </Layout>
    </>
  )
}

export default App
