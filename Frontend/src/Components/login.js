import { React, useState } from 'react'
import axios from 'axios';

const Login = () => {
    const [user, setUsername] = useState('');
    const [pwd, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log({user, pwd});
        axios.post("/login", {user, pwd})
            .then(response => {
                console.log(response);
                localStorage.setItem('JWT', response.accessToken);
                // Redirect to /
            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <form onSubmit={handleSubmit} className='text-black'>
            <label
                htmlFor="user">
                Username:
            </label>
            <input type='text' id='user' name='user' value={user} onChange={e => setUsername(e.target.value)} required></input>

            <label
                htmlFor="pwd">
                Password:
            </label>
            <input type='password' id="pwd" name='pwd' value={pwd} onChange={e => setPassword(e.target.value)} required></input>

            <button
                type='submit'
                className='text-white rounded-2xl bg-grey-50 hover:bg-gray-500 transition-all hover:bg-opacity-50 duration-500 focus:bg-gray-900'>
                Login
            </button>
        </form>

    )


}

export default Login