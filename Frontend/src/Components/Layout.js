import React from 'react'
import { Outlet } from 'react-router-dom'
import { GiBirdTwitter } from 'react-icons/gi'
import { AiOutlineHome } from 'react-icons/ai'
import { BiSearchAlt } from 'react-icons/bi'
import { AiTwotoneNotification } from 'react-icons/ai'
import { IoIosListBox } from 'react-icons/io'
import { CgProfile } from 'react-icons/cg'
import { RiCommunityLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom'

const LEFT_BAR_ITEMS = [
    {
        title: 'home',
        url: '',
        icon: AiOutlineHome
    },
    {
        title: 'profile',
        url: 'profile',
        icon: CgProfile
    },
    {
        title: 'search',
        url: 'search',
        icon: BiSearchAlt
    },
    {
        title: 'notifications',
        url: 'notifications',
        icon: AiTwotoneNotification
    },
    {
        title: 'lists',
        url: 'lists',
        icon: IoIosListBox
    },
    {
        title: 'communities',
        url: 'communities',
        icon: RiCommunityLine
    }
]

const Layout = () => {
    return (
        <div className='flex box-border border-2 border-purple-500'>
            <div className="relative w-64 text-white p-4 box-border border-2 border-green-500 justify-between h-screen">
                <GiBirdTwitter size="32px" onClick={() => alert("Hello!")} />
                <div className="box-border border-2 border-red-500 grid place-items-start h-auto text-lg mt-3">
                    {LEFT_BAR_ITEMS.map((item) =>
                        <NavLink to={'/' + item.url} className="flex border-2 border-blue-100 py-3 place-items-center rounded-2xl hover:bg-gray-500 transition-all hover:bg-opacity-50 duration-500 focus:bg-gray-900" key={item.title}>
                            <item.icon />
                            {item.title}
                        </NavLink>
                    )
                    }
                </div>
            </div>
            <div className='text-white w-96 box-border border-2 border-white-500'>
                <Outlet />
            </div>
        </div>



    )
}

export default Layout