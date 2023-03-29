import React, { useState, useRef } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';

const LoginComponent = () => {

  const endpoint = 'http://127.0.0.1:8000/api';
  const toast = useRef(null);
  let navigate = useNavigate();

  const [datosLogin, setDatosLogin] = useState({
    email: '',
    password: '',
  });

  const inputChange = (event) => {

    setDatosLogin({
      ...datosLogin,
      [event.target.name]: event.target.value
    })
  }

  function navigateTo(string) {
    navigate(string);
  }

  const show = () => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Datos no válidos!!' });
  };

  const fn_login = async (event) => {
    event.preventDefault();

    await axios.post(`${endpoint}/login`, datosLogin)
      .then((response) => {

        console.log("Validando Acceso..")
        console.log(response.data)

        if (response.data.acceso === "Ok") {
          localStorage.setItem('token', "Ok")
          navigateTo('/menu')
        }
        else {
          show();
        }

      }).catch((error) => {

      })

  }

  return (
    <div class="contenedor">
      <Image src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png" alt="Image" width="250" />
      <div className="card flex justify-content-center">
        <span className="p-input-icon-left">
          <i className="pi pi-user" />
          <InputText placeholder='usuario' name="email" value={datosLogin.email} onChange={(e) => inputChange(e)} />
        </span>

      </div>
      <br></br>
      <div className="card flex justify-content-center">
        <span className="p-input-icon-left">
          <i className="pi pi-key" />
          
          <InputText placeholder='Contraseña' name="password" type='password'
            value={datosLogin.password}
            feedback={false}
            onChange={(e) => inputChange(e)} />
        </span>
      </div>
      <br></br>
      <div className="card flex justify-content-center">
        <Button label="Acceder" onClick={fn_login} />
      </div>
    </div>


  )
}

export default LoginComponent