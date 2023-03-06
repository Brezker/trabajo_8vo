import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';

const NETeacher = () => {
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
        await axios.post(`${endpoint}/maestro`, teacher)
        .then((response) => {
            console.log("Guardando...")
            console.log(response.data)
        }).catch((error) => {

        })
        navigateTo('/m')
    }

    const volverVista = async (e) => {
        e.preventDefault();
        navigateTo('/m')
    }

    const footer = (
        <span>
            <Button label="Save" onClick={guardarDatos} icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" onClick={volverVista} />
        </span>
    );
    
    const [teacher, setTeacher] = useState(
        {
            id: 0,
            nombre: '',
            app: '',
            apm: '',
            nocedula: '',
            edad: '',
            sexo: '',
        }
    );

    const getProfesor = async () => {
        console.log("getProfesor")

        await axios.get(`${endpoint}/maestro`,{
            params: {id: _id}

        }).then((response) => {
            setTeacher(response.data)
        })
    }



    const inputChange = (event) =>{
        console.log("handleInputChange")
        console.log(event.target.name)
        console.log(event.target.value)
        
        setTeacher ({
            ...teacher,
            [event.target.name] : event.target.value
        })
    }

    const dropdownChange = (event) =>{
        console.log("dropdownChange")
        console.log(event.target.name)
        console.log(event.target.value.code)

        setSelectedMateria(event.target.value);

        setTeacher ({
            ...teacher,
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
        getProfesor();
     }
        obtenerMaterias();
    }, [])




  return (
    <div>
        <Card title="Maestro" subTitle="Subtitle" style={{ width: '25em' }} footer={footer}>
            
        <span className="p-float-label">
            <InputText id='nombre' value={teacher.nombre} onChange={inputChange} name='nombre'/>
            <label htmlFor="nombre">Nombre</label>
        </span>
        <br></br>
        <span className="p-float-label">
            <InputText id='app' value={teacher.app} onChange={inputChange} name='app'/>
            <label htmlFor="app">Apellido Paterno</label>
        </span>
        <br></br>
        <span className="p-float-label">
            <InputText id='apm' value={teacher.apm} onChange={inputChange} name='apm'/>
            <label htmlFor="apm">Apellido Materno</label>
        </span>
        <br></br>
        <span className="p-float-label">
            <InputText id='nocedula' value={teacher.nocedula} onChange={inputChange} name='nocedula'/>
            <label htmlFor="nocedula">Cedula</label>
        </span>
        <br></br>
        <span className="p-float-label">
            <InputText id='sexo' value={teacher.sexo} onChange={inputChange} name='sexo'/>
            <label htmlFor="sexo">Sexo</label>
        </span>
        <br></br>
        <span className="p-float-label">
            <InputText id='edad' type='number' value={teacher.edad} onChange={inputChange} name='edad'/>
            <label htmlFor="edad">Edad</label>
        </span>
        <br></br>
        <Dropdown value={selectedMateria}  
        name='id_materia' 
        onChange={dropdownChange}
        options={optionList}
        optionLabel="name" 
        placeholder="Seleccciona Materia" className="w-full md:w-14rem" />
        </Card>
    </div>
  )
}

export default NETeacher