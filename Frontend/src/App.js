import './App.css';
import { Route, Routes } from 'react-router-dom';
import Search from './Components/Search'
import Home from './Components/Home'
import Layout from './Components/Layout';
import Profile from './Components/Profile'

function App() {
  return (
      <Routes>
        <Route path='/login' element={<Home />} />
        <Route path='/Register' element={<Home />} />
        {/* Secure route */}
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='profile' element={<Profile />}></Route>
          <Route path='search' element={<Search />}></Route>
          <Route path='notifications'></Route>
          <Route path='lists'></Route>
          <Route path='communities'></Route>
        </Route>
      </Routes>
   
  )
}

export default App