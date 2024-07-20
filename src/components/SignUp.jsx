import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUp = (props) => {
    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (credentials.password !== credentials.confirmPassword) {
            props.showAlert("Password Mismatched", "info")
            credentials.password = "";
            credentials.confirmPassword = "";
            return
        }


        const response = await fetch(`http://localhost:5000/api/auth/signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            }
        );

        // check response status
        if (response.status !== 200) {
            const json = await response.json();
            props.showAlert(json.error, "info")
            return
        }

        // response here
        console.log('response - 200')
        const json = await response.json();
        const authToken = json.authToken;
        localStorage.setItem('token', authToken);
        navigate('/');
        props.showAlert("User created successfully!", "success")


    }






    return (
        <div className="container">
            <div className='card my-2'>
                <div className="card-header text-bg-secondary">
                    iNoteBook-SignUp
                </div>

                <form className='container my-2' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onChange} value={credentials.name} required minLength={3} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={onChange} value={credentials.password} minLength={8} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name='confirmPassword' id="confirmPassword" onChange={onChange} value={credentials.confirmPassword} minLength={8} required />
                    </div>

                    <button type="submit" className="btn btn-primary my-2">SignUp</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp
