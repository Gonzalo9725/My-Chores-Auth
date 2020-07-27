import React, {useState, useCallback} from 'react'
import {auth, db} from '../firebase'
import { withRouter } from "react-router-dom"

const Login = (props) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim()){
            setError('Ingrese Email')
            return
        }
        if(!pass.trim()){
            setError('Ingrese Contraseña')
            return
        }
        if(pass.length < 6){
            setError('Ingrese una password mayor a 6 carácteres')
            return
        }
        
        setError(null)

        if(esRegistro){
            registrar()
        }else{
            login()
        }
    }

    const login = useCallback(async() => {

        try {
            await auth.signInWithEmailAndPassword(email, pass)
            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')

        } catch (error) {

            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if(error.code === 'auth/user-not-found'){
                setError('Usuario no registrado')
            }
            if(error.code === 'auth/wrong-password'){
                setError('Contraseña incorrecta')
            }
        }

    }, [email, pass, props.history])

    const registrar = useCallback(async() => {
        try {
            const res = await auth.createUserWithEmailAndPassword(email, pass)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })

            setEmail('')
            setPass('')
            setError(null)
            props.history.push('/admin')

        } catch (error) {
            if(error.code === 'auth/invalid-email'){
                setError('Email no válido')
            }
            if(error.code === 'auth/email-already-in-use'){
                setError('Email ya existe')
            }
        }
    }, [email, pass, props.history])

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Register' : 'Login'
                }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input 
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                        />
                        <input 
                            type="password"
                            className="form-control mb-2"
                            placeholder="Password"
                            onChange={e => setPass(e.target.value)}
                            value={pass}
                        />
                        <button 
                            className="btn btn-dark btn-lg btn-block" 
                            type="submit"
                        >
                            {
                                esRegistro ? 'Create' : 'Log In'
                            }
                        </button>
                        <button 
                            className="btn btn-info btn-sm btn-block"
                            onClick={() => setEsRegistro(!esRegistro)}
                            type="button"
                        >
                            {
                                esRegistro ? 'Do you have an account?' : 'Register'
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)