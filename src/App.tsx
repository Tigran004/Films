import { Route,Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home/Home'
import OneMovie from './Components/OneMovie/OneMovie'
import Header from './Components/Header/Header'
import Genre from './Components/Genre/Genre'
function App() {

  return (
    <>
    <Header/>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/:id' element={<OneMovie/>}/>
          <Route path='/genres/:id' element={<Genre/>}/>
      </Routes>
    </>
  )
}

export default App
