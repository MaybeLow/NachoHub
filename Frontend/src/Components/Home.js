import { React, useState } from 'react'

const Home = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div className="container mx-auto">
            <div className="flex items-center justify-center">
                <div className='flex items-center justify-center w-full h-16 rounded-2xl bg-grey-50 hover:bg-gray-500 transition-all hover:bg-opacity-50 duration-500 focus:bg-gray-900' 
                    onClick={() => handleTabClick(0)}>
                    For You
                </div>
                <div className='flex items-center justify-center w-full h-16 rounded-2xl bg-grey-50 hover:bg-gray-500 transition-all hover:bg-opacity-50 duration-500 focus:bg-gray-900'  
                    onClick={() => handleTabClick(1)}>
                    Following
                </div>
            </div>

            <div className="mt-4">
                {activeTab === 0 && <div>Content for Tab 1</div>}
                {activeTab === 1 && <div>Content for Tab 2</div>}
            </div>
        </div>
    );
}

export default Home