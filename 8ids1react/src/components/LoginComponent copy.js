import React,{useState,useRef } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from 'primereact/button';
import { Image } from 'primereact/image';
import { Dialog } from 'primereact/dialog';
import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { Card } from 'primereact/card';



const LoginComponent = () => {


  const [visible, setVisible] = useState(false);

  
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



  useEffect(()=>{
    mostrarAlerta();
  }, []);
  const mostrarAlerta=()=>{
    Swal.fire('Bienvenido', 'Agradecemos tu preferencia,', 'info');
    
  }
  

  const fn_login = async (event)=> {
    event.preventDefault();

    const correo = document.getElementById("correo").value;
    const regExp = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;

    if (!regExp.test(correo)) {
      Swal.fire(
        'Formato de correo inválido',
        'Revisa nuevamente',
        'question'
      )
        document.getElementById("cont").setAttribute("disabled","disabled")
    }else{

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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La contraseña es incorrecta'})
        show();
      }

    }).catch((error) => {
      
    })

  }

  }

  return (
    <div>
      
      <p>Ingresa tu usuario</p>
      <div className="card flex justify-content-center">
          <InputText placeholder="example: user@email.com"
          id="correo" name="email" value={datosLogin.email} onChange={(e) => inputChange(e)} />
      </div>
      <br></br>
      <p>Ingresa tu contraseña:</p>
      <div className="card flex justify-content-center">
          <Password id="cont" name="password" 
          value={datosLogin.password} 
          feedback={false}
          onChange={(e) => inputChange(e)} toggleMask/>
      </div>
      <br></br>
      <div className="card flex justify-content-center">
          <Button label="Accesar"  onClick={fn_login} />
      </div>
      <br></br>
     
      </div>
   
    
      
  )
}


export default LoginComponent