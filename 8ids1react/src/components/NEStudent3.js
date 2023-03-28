import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Formik, useFormik } from 'formik';
import { classNames } from 'primereact/utils';

const NEStudent = () => {
    const endpoint = 'http://127.0.0.1:8000/api';

    const { _id } = useParams();
    let navigate = useNavigate();


    function navigateTo(string) {
        navigate(string);
    }
    const [selectedMateria, setSelectedMateria] = useState(null);
    const [optionList, setOptionList] = useState([]);

    const obtenerMaterias = async (e) => {
        console.log("pobtenerMaterias")
        await axios.get(`${endpoint}/combo_materias`)
            .then((response) => {
                console.log(response.data)
                setOptionList(response.data)


            })

    }


    const initialValues = {
        id: 0,
        nombre: '',
        app: '',
        apm: '',
        matricula: '',
        edad: '',
        sexo: '',
        id_materia: null,
    };

    const formik = useFormik({
        initialValues, validate: (data) => {
            let errors = {};
            if (!data.nombre) {
                errors.nombre = 'El nombre es requerido'
            } else if (!/^[a-zA-Z]+(\s*[a-zA-Z]+[áéíóúÁÉÍÓÚ]*)*[a-zA-ZñÑ]+$/.test(data.nombre)
            ) {
                errors.nombre = 'Campo invalido';
            }

            if (!data.app) {
                errors.app = 'El apellido paterno es requerido'
            } else if (!/^[a-zA-Z]+(\s*[a-zA-Z]+[áéíóúÁÉÍÓÚ]*)*[a-zA-ZñÑ]+$/.test(data.app)
            ) {
                errors.app = 'Campo invalido';
            }

            if (!data.apm) {
                errors.apm = 'El apellido materno es requerido'
            } else if (!/^[a-zA-Z]+(\s*[a-zA-Z]+[áéíóúÁÉÍÓÚ]*)*[a-zA-ZñÑ]+$/.test(data.apm)
            ) {
                errors.apm = 'Campo invalido';
            }

            if (!data.matricula) {
                errors.matricula = 'La matricula es requerida'
            } else if (!/^[0-9]+$/.test(data.matricula)) {
                errors.matricula = 'Solo se aceptan números';
            } /*else if (!/^.{1, 10}$/.test(data.matricula)) {
                errors.matricula = 'Solo se acepta un maximo de 10 digitos';
            }*/

            if (!data.edad) {
                errors.edad = 'La edad es requerida'
            } else if (!/^\d{1,2}$/.test(data.edad)) {
                errors.edad = 'Solo se aceptan letras y maximo 2 números';
            }

            if (!data.id_materia) {
                errors.id_materia = 'Debes selaccionar una materia';
            }
            return errors;
        },
        onSubmit: (data) => {
            console.log(data);
            //guardarDatos(data);
            //formik.resetForm();
        }
    });



    const guardarDatos = async (e) => {
        await axios.post(`${endpoint}/alumno`, e)
            .then((response) => {
                console.log("Guardando...")
                console.log(response.data)
            }).catch((error) => {
                console.error(error);
            })
        //navigateTo('/alumnos')
    }

    const volverVista = async (e) => {
        e.preventDefault();
        navigateTo('/alumnos')
    }

    const footer = (
        <span>
            <Button label="Save" onClick={guardarDatos} icon="pi pi-check" />
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

        await axios.get(`${endpoint}/alumno`, {
            params: { id: _id }

        }).then((response) => {
            initialValues.nombre = response.data.nombre;
            initialValues.app = response.data.app;
            initialValues.apm = response.data.apm;
            initialValues.matricula = response.data.matricula;
            initialValues.edad = response.data.edad;
            initialValues.sexo = response.data.sexo;
            initialValues.id_materia = response.data.id_materia;
            initialValues.id = _id;
        })
    }

    const inputChange = (event) => {
        console.log("handleInputChange")
        console.log(event.target.name)
        console.log(event.target.value)

        setStudent({
            ...student,
            [event.target.name]: event.target.value
        })
    }

    const dropdownChange = (event) => {
        console.log("dropdownChange")
        console.log(event.target.name)
        console.log(event.target.value.code)

        setSelectedMateria(event.target.value);

        setStudent({
            ...student,
            [event.target.name]: event.target.value.code
        })
    }

    useEffect(() => {

        if (_id === undefined) {
            console.log('sin parametro');
        }
        else {
            getEmpleado();
        }
        obtenerMaterias();
    }, [])


    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };





    return (
        <div>
            <Card title="Estudiante" subTitle="Subtitle" style={{ width: '25em' }} footer={footer}>
                <form onSubmit={formik.handleSubmit} className="p-fluid">

                    <div className="field">
                        <span className="p-float-label">
                            <InputText id='nombre' name='nombre' value={formik.values.nombre} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('nombre') })} />

                            <label htmlFor="nombre" className={classNames({ 'p-error': isFormFieldValid('nombre') })}>Nombre</label>
                        </span>
                        {getFormErrorMessage('nombre')}
                    </div>

                    <br></br>
                    <span className="p-float-label">
                        <InputText id='app' value={formik.values.app} onChange={formik.handleChange} name='app' />
                        <label htmlFor="app" className={classNames({ 'p-error': isFormFieldValid('app') })}>Apellido Paterno</label>
                    </span>
                    {getFormErrorMessage('app')}


                    <br></br>
                    <span className="p-float-label">
                        <InputText id='apm' value={formik.values.apm} onChange={formik.handleChange} name='apm' />
                        <label htmlFor="apm" className={classNames({ 'p-error': isFormFieldValid('apm') })}>Apellido Materno</label>
                    </span>
                    {getFormErrorMessage('apm')}

                    <br></br>
                    <span className="p-float-label">
                        <InputText id='matricula' value={formik.values.matricula} onChange={formik.handleChange} name='matricula' />
                        <label htmlFor="matricula" className={classNames({ 'p-error': isFormFieldValid('matricula') })}>Matricula</label>
                    </span>
                    {getFormErrorMessage('matricula')}

                    <br></br>
                    <span className="p-float-label">
                        <InputText id='sexo' value={formik.values.sexo} onChange={formik.handleChange} name='sexo' />
                        <label htmlFor="sexo" className={classNames({ 'p-error': isFormFieldValid('sexo') })}>Sexo</label>
                    </span>
                    {getFormErrorMessage('sexo')}


                    <br></br>
                    <span className="p-float-label">
                        <InputText id='edad' type='number' value={formik.values.edad} onChange={formik.handleChange} name='edad' />
                        <label htmlFor="edad" className={classNames({ 'p-error': isFormFieldValid('edad') })}>Edad</label>
                    </span>
                    {getFormErrorMessage('edad')}

                    <br></br>

                    <Dropdown value={formik.values.id_materia}
                        name='id_materia'
                        onChange={formik.handleChange}
                        options={optionList}
                        optionLabel="name"
                        className={classNames({ 'p-error': isFormFieldValid('id_materia') })}
                        placeholder="Seleccciona Materia" />
                         {getFormErrorMessage('id_materia')}
                    <span>
                        <Button type='submit' label="Save" icon="pi pi-check" />
                    </span>
                </form>
            </Card>
        </div>
    )
}

export default NEStudent