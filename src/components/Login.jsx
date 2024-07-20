import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:5000/api/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            }
        );

        // check response status
        if (response.status !== 200) {
            props.showAlert('Invalid Credentials', "danger");
            return
        }

        // response here
        const json = await response.json();
        const authToken = json.authToken;
        localStorage.setItem('token', authToken);
        navigate('/');
        props.showAlert('Logged in successfully', "success");


    }



    return (
        <>
            <div className="container">
                <div className='card my-2'>
                    <div className="card-header text-bg-secondary">
                        iNoteBook-Login
                    </div>
                    <form className='container my-2' onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input name='email' type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input name='password' type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" />
                        </div>

                        <button type="submit" className="btn btn-primary my-2">Login</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
