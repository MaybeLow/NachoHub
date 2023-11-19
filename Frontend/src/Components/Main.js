import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Search from './Search'
import Home from './Home'
import Profile from './Profile'

const Main = () => {
    return (
        <div className='border-2 border-purple-700 w-96 text-white'>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/home' element={<Home />}></Route>
                <Route path='/profile' element={<Profile />}></Route>
                <Route path='/search' element={<Search />}></Route>
                <Route path='/notifications'></Route>
                <Route path='/lists'></Route>
                <Route path='/communities'></Route>
            </Routes>
        </div>
    )
}

export default Main