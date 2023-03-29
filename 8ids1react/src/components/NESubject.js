import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';

//import 'bootstrap/dist/css/bootstrap.min.css';

const NESubject = () => {



    const [subject, setSubject] = useState(
        {
            id: 0,
            nombre: '',
            duracion: '',
            profesor: '',
            dias: '',
        }
    );

    const initialValues = {
        id: 0,
        nombre: '',
        duracion: '',
        profesor: '',
        dias: '',
    };
    

    





    const formik = useFormik({
        initialValues, validate: (data) => {
            let errors = {};
            if (!data.nombre) {
                errors.nombre = 'El nombre de la materia es requerido'
            } /*else if (!/^[a-zA-Z]+(\s*[a-zA-Z]+[áéíóúÁÉÍÓÚ])[a-zA-ZñÑ]+$/.test(data.nombre)) {
                errors.nombre = 'Campo invalido';
            }*/

            if (!data.duracion) {
                errors.duracion = 'Las horas son requeridas'
            } else if (!/^[0-9]+$/.test(data.duracion)) {
                errors.duracion = 'Solo se aceptan números';
            } else if(!/^.{1,5}$/.test(data.duracion)){
                errors.duracion = 'Solo un máximo de 5 digitos';
            } 

            if (!data.profesor) {
                errors.profesor = 'El nombre del profesor es requerido'
            } else if (!/^[a-zA-Z]+(\s*[a-zA-ZÁÉÍÓÚáéíúó])[a-zA-ZñÑ]+$/.test(data.profesor)) {
                errors.profesor = 'Campo invalido';
            }

            if (!data.dias) {
                errors.dias = 'Los dias a la semana en número son requeridos'
            } else if (!/^\d{1,2}$/.test(data.dias)) {
                errors.dias = 'Solo se aceptan números y maximo 2';
            }

            
            return errors;
        },
        onSubmit: (data) => {
            console.log(data);
            guardarDatos(data);
            formik.resetForm();
        }
    });

    const endpoint = 'http://127.0.0.1:8000/api';

    const { _id } = useParams();

    //const [selectedMateria, setSelectedMateria] = useState(null);

    //const [optionList, setOptionList] = useState([]);

    //const [student, setStudent] = useState(initialStudent);

    let navigate = useNavigate();


    function navigateTo(string) {
        navigate(string);
    }


    function volverVista() {
        navigateTo('/alumnos')
    }

/**
 * 
 *


    const footer = (
        <span>
            <Button label="Save" type="submit" onClick={guardarDatos} icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-times" className="p-button-secondary ml-2" />
        </span>
    );
    *
    */






    

    const getEstudiar = async (ID) => {
        console.log("getEstudiar")

        await axios.get(`${endpoint}/materia`,{
            params: {id: ID}

        }).then((response) => {
            initialValues.nombre=response.data.nombre;
            initialValues.duracion=response.data.duracion;
            initialValues.profesor=response.data.profesor;
            initialValues.dias=response.data.dias;
            initialValues.id=_id;
        })
    }


    const guardarDatos = async (e) => {
        setSubject({
            ...subject,
            //'id_materia': selectedMateria
        })
        await axios.post(`${endpoint}/materia`, e)
        .then((response) => {
            console.log("Guardando...")
            console.log(response.data)
        }).catch((error) => {

        })
        navigateTo('/s')
    }



    /**
*
*
    const inputChange = (event) =>{
        console.log("handleInputChange")
        console.log(event.target.name)
        console.log(event.target.value)
        
        setSubject ({
            ...subject,
            [event.target.name] : event.target.value
        })
    }
*
*/
    
    
    useEffect(() => {

     if (_id === undefined)
     {
        console.log('sin parametro');
     }
     else
     {
        getEstudiar();
     }

    }, [_id])

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };


    return (
        <div>
            <center>
            <Card title="Materia" subTitle="Subtitle" style={{ width: '25em' }}>
                <form onSubmit={formik.handleSubmit} className="p-fluid">
                    <div className="field">

                        <span className="p-float-label">
                            <InputText id='nombre' name='nombre' value={formik.values.nombre} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('nombre') })} />
                            <label htmlFor="nombre" className={classNames({ 'p-error': isFormFieldValid('nombre') })}>Nombre</label>
                        </span>
                        {getFormErrorMessage('nombre')}
                    </div>
                    <br></br>
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id='duracion' name='duracion' value={formik.values.duracion} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('duracion') })} />
                            <label htmlFor="duracion" className={classNames({ 'p-error': isFormFieldValid('duracion') })} >Duracion</label>
                        </span>
                        {getFormErrorMessage('duracion')}
                    </div>
                    <br></br>
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id='profesor' name='profesor' value={formik.values.profesor} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('profesor') })} />
                            <label htmlFor="profesor" className={classNames({ 'p-error': isFormFieldValid('profesor') })}>Profesor</label>
                        </span>
                        {getFormErrorMessage('profesor')}
                    </div>
                    <br></br>
                    <div className="field">
                        <span className="p-float-label">
                            <InputText id='dias' name='dias' value={formik.values.dias} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('dias') })} />
                            <label htmlFor="dias" className={classNames({ 'p-error': isFormFieldValid('dias') })}>Dias</label>
                        </span>
                        {getFormErrorMessage('dias')}
                    </div>
                    <br></br>
                    <span>
                        <Button type='submit' label="Save" icon="pi pi-check" />
                        <Button label="Cancel" icon="pi pi-times" onClick={volverVista} className="p-button-secondary ml-2" />
                    </span>
                </form>
            </Card>
            </center>
        </div>
    )
}

export default NESubject