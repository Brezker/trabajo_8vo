import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


const NESubject = () => {
    const endpoint = 'http://127.0.0.1:8000/api';

    const { _id } = useParams();
    let navigate = useNavigate();


    function navigateTo(string) {
        navigate(string);
    }

    const guardarDatos = async (e) => {
        e.preventDefault();
        await axios.post(`${endpoint}/materia`, subject)
            .then((response) => {
                console.log("Guardando...")
                console.log(response.data)
            }).catch((error) => {

            })
        navigateTo('/s')
    }

    const volverVista = async (e) => {
        e.preventDefault();
        navigateTo('/s')
    }

    const footer = (
        <span>
            <Button label="Save" onClick={guardarDatos} icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" onClick={volverVista} />
        </span>
    );

    const [subject, setSubject] = useState(
        {
            id: 0,
            nombre: '',
            duracion: '',
            profesor: '',
            dias: '',
        }
    );

    const getEstudiar = async () => {
        console.log("getEstudiar")

        await axios.get(`${endpoint}/materia`, {
            params: { id: _id }

        }).then((response) => {
            setSubject(response.data)
        })
    }



    const inputChange = (event) => {
        console.log("handleInputChange")
        console.log(event.target.name)
        console.log(event.target.value)

        setSubject({
            ...subject,
            [event.target.name]: event.target.value
        })
    }


    useEffect(() => {

        if (_id === undefined) {
            console.log('sin parametro');
        }
        else {
            getEstudiar();
        }

    }, [])




    return (
        <div>
            <center>
                <Card title="Materia" subTitle="Subtitle" className="md:w-25rem" footer={footer}>

                    <span className="p-float-label">
                        <InputText id='nombre' value={subject.nombre} onChange={inputChange} name='nombre' className="p-inputtext-sm" />
                        <label htmlFor="nombre">Materia</label>
                    </span>
                    <br></br>
                    <span className="p-float-label">
                        <InputText id='duracion' type='number' value={subject.duracion} onChange={inputChange} name='duracion' className="p-inputtext-sm" keyfilter="int" />
                        <label htmlFor="duracion">Duracion</label>
                    </span>
                    <br></br>
                    <span className="p-float-label">
                        <InputText id='profesor' value={subject.profesor} onChange={inputChange} name='profesor' className="p-inputtext-sm" />
                        <label htmlFor="profesor">Profesor</label>
                    </span>
                    <br></br>
                    <span className="p-float-label">
                        <InputText id='dias' type='number' value={subject.dias} onChange={inputChange} name='dias' className="p-inputtext-sm" keyfilter="int" />
                        <label htmlFor="dias">Dias</label>
                    </span>
                    <br></br>
                </Card>
            </center>
        </div>
    )
}

export default NESubject