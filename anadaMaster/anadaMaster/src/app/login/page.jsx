'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
    const [user, setUser] = useState('');
    const [pass, setPass] = useState('');
    const [mensaje, setMensaje] = useState('');

    const router = useRouter();

    const handleLogin = async () => {
        const result = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ user, pass }),
            headers: {
                'Content-type': 'application/json',
            },
        });
        const data = await result.json();

        if (data.message === 'OK') {
            setMensaje('Se ha hecho el login correctamente');
            handleHomeRedirect(data.userId)
        } else {
            setMensaje('ERROR, intente con otro nombre de usuario u otra contraseña');
            setPass('');
            setUser('');
        }
    };

    const handleHomeRedirect = (id) => {
        // Redirige a la página de home
        router.push(`/home/${id}`);
    };

    return(
        <div className="row" id="contenedor">
           <div className='m-3 p-3' id="login"> 
           <img 
                src="/logoAnadaMaster.jpeg" 
                alt="Añadamaster Logo" 
                id="logo"
            />
                <h1>User login</h1>
                <input 
                    type="text" 
                    className="form-control m-1" 
                    placeholder="User" 
                    aria-label="User" 
                    aria-describedby="basic-addon1" 
                    value={user} 
                    onChange={(e) => setUser(e.target.value)} 
                />
                <input 
                    type="password" 
                    className="form-control m-1" 
                    placeholder="Password" 
                    aria-label="Password" 
                    aria-describedby="basic-addon1" 
                    value={pass} 
                    onChange={(e) => setPass(e.target.value)} 
                />
                <button className="btn btn-light mt-3 mr-1 ml-1" onClick={handleLogin}>Login</button>
            </div>
            <div id="mensaje" className="text-center">
                {mensaje}
            </div>
        </div>
    );
}

export default Login;
