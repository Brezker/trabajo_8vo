import React,{useState,useRef } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from 'primereact/button';

const LoginComponent = () => {

  const endpoint = 'http://127.0.0.1:8000/api';
  const toast = useRef(null);
  let navigate  = useNavigate();

  const [datosLogin,setDatosLogin] = useState({
    email: '',
    password: '',
  });

  const inputChange = (event) => {
    
    setDatosLogin({
      ...datosLogin,
      [event.target.name] : event.target.value
    })
  }

  function navigateTo(string)
  {
      navigate(string);
  }
  
  const show = () => {
    toast.current.show({ severity: 'info', summary: 'Info', detail: 'Datos no válidos!!' });
  };

  const fn_login = async (event)=> {
    event.preventDefault();

    await axios.post(`${endpoint}/login`, datosLogin)
    .then((response) => {
      
      console.log("Validando Acceso..")
      console.log(response.data)

      if(response.data.acceso === "Ok")
      {
        localStorage.setItem('token',"Ok")
        navigateTo('/alumnos')
      }
      else
      {
        show();
      }

    }).catch((error) => {
      
    })

  }

  return (
    <div>
      <div className="card flex justify-content-center">
          <InputText name="email" value={datosLogin.email} onChange={(e) => inputChange(e)} />
      </div>
      <div className="card flex justify-content-center">
          <Password name="password" 
          value={datosLogin.password} 
          feedback={false}
          onChange={(e) => inputChange(e)} />
      </div>
      <div className="card flex justify-content-center">
          <Button label="Accesar"  onClick={fn_login} />
      </div>
    </div>
      
      
  )
}

export default LoginComponent