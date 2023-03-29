import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Chips } from 'primereact/chips';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { useForm } from "react-hook-form";

const NEStudent = () => {
    const endpoint = 'http://127.0.0.1:8000/api';

    const {_id} = useParams();
    let navigate = useNavigate();

    function navigateTo(string){
    navigate(string);
    }
    const[selectedMateria, setSelectedMateria] = useState(null);
    const[optionList,setOptionList] = useState([]);

    const obtenerMaterias = async (e) =>{
        console.log("pobtenerMaterias")
        await axios.get(`${endpoint}/combo_materias`)
        .then((response) => {
            console.log(response.data)
            setOptionList(response.data)

        }) 
        
    }

    const guardarDatos = async (e) => {
        e.preventDefault();
        await axios.post(`${endpoint}/alumno`, student)
        .then((response) => {
            console.log("Guardando...")
            console.log(response.data)
        }).catch((error) => {

        })
        navigateTo('/alumnos')
        //Comentar para ver el log.
    }

    const volverVista = async (e) => {
        e.preventDefault();
        navigateTo('/alumnos')
    }

    const footer = (
        <span>
            <Button type="submit" label="Save" onClick={guardarDatos} icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" onClick={volverVista} />
        </span>
    );
    
    const [student, setStudent] = useState(
        {
            id: 0,
            nombre: '',
            app: '',
            apm: '',
            matricula: '',
            edad: '',
            sexo: '',
            id_materia: '',
        }
    );

    const getEmpleado = async () => {
        console.log("getEmpleado")

        await axios.get(`${endpoint}/alumno`,{
            params: {id: _id}

        }).then((response) => {
            setStudent(response.data)
        })
    }

    const inputChange = (event) =>{
        console.log("handleInputChange")
        console.log(event.target.name)
        console.log(event.target.value)


        
        setStudent ({
            ...student,
            [event.target.name] : event.target.value
        })
    }

    const { register, handleSubmit } = useForm();

    const dropdownChange = (event) =>{
        console.log("dropdownChange")
        console.log(event.target.name)
        console.log(event.target.value.code)

        setSelectedMateria(event.target.value);

        setStudent ({
            ...student,
            [event.target.name] : event.target.value.code
        })
    }
    
    useEffect(() => {

     if (_id === undefined)
     {
        console.log('sin parametro');
     }
     else
     {
        getEmpleado();
     }
        obtenerMaterias();
    }, [])

  return (
    <div>
        <center>
        <Card title="Estudiante" className="md:w-25rem" footer={footer}>
        <div className="card flex justify-content-center">
        <span className="p-float-label">
            <InputText id='nombre' value={student.nombre} onChange={inputChange} className="p-inputtext-sm" name='nombre' required/>
            <label htmlFor="nombre">Nombre</label>
        </span>
        </div>
        <br></br>
        <div className="card flex justify-content-center">
        <span className="p-float-label">
            <InputText id='app' value={student.app} onChange={inputChange} className="p-inputtext-sm" name='app' required/>
            <label htmlFor="app">Apellido Paterno</label>
        </span>
        </div>
        <br></br>
        <div className="card flex justify-content-center">

        <span className="p-float-label">
            <InputText id='apm' value={student.apm} onChange={inputChange} className="p-inputtext-sm" name='apm'/>
            <label htmlFor="apm">Apellido Materno</label>
        </span>
        </div>
        <br></br>
        <div className="card flex justify-content-center">

        <span className="p-float-label">
            <InputText id='matricula' value={student.matricula} onChange={inputChange} className="p-inputtext-sm" name='matricula' required/>
            <label htmlFor="matricula">Matricula</label>
        </span>
        </div>
        <br></br>
        <div className="card flex justify-content-center">

        <span className="p-float-label">
            <InputText id='sexo' value={student.sexo} onChange={inputChange} name='sexo' className="p-inputtext-sm" required/>
            <label htmlFor="sexo">Sexo</label>
        </span>
        </div>
        <br></br>
        <div className="card flex justify-content-center">

        <span className="p-float-label">
            <InputText id='edad' type='number' keyfilter="int" className="p-inputtext-sm" value={student.edad} onChange={inputChange} name='edad' required/>
            <label htmlFor="edad">Edad</label>
        </span>
        <br></br>
</div> 
<div className="card flex justify-content-center">

        <Dropdown value={selectedMateria}  
        name='id_materia' 
        onChange={dropdownChange}
        options={optionList} 
        optionLabel="name" 
        placeholder="Seleccciona Materia" className="w-full md:w-14rem p-inputtext-sm" required/>
        </div>
        </Card>
        </center>
    </div>
  )
}

export default NEStudent