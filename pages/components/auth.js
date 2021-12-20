import React, { useState } from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';


const AuthForm = () => {
    
    const { data: session } = useSession(); 

    const logoutHandler = () => {
        signOut();
    }

    const [usuario, guardarUsuario] = useState({
        email: '',
        password:''
    })

    const {email, password} = usuario;

    //cambio
    const cambio = (e) => {
        guardarUsuario({
            ...usuario,
            [ e.target.name ] : e.target.value
        });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false, 
            email: email, 
            password: password
        });

        if(result.error) {
            console.log(result.error);
        }   
    }

    return ( 

        <div>
        {!session&& (
            <form 
                onSubmit = {submitHandler}
            > 
                <div>
                    <label for="email"> Email </label>
                    <input type="email" id="email" name="email" value={email} onChange={ cambio }/>
                </div>

                <div>
                    <label for="password"> Password </label>
                    <input type="password" id="password" name="password" value={password} onChange={ cambio }/>
                </div>

                <div>
                <button type="submit"> ingresar </button>
                </div>
            </form>
        )}

        {session && (
          <h1>Usuario Loggeado {session.user.email} </h1>
        )}

        {session && (
            <button value="Logout" onClick={ () => logoutHandler() }> Salir </button>
        )}
        
        </div>  

     );
}
 
export default AuthForm;