import React, { useEffect, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { useFormik } from 'formik';
import { classNames } from 'primereact/utils';

const NEStudent = () => {

    const initialStudent = {
        id: 0,
        nombre: '',
        app: '',
        apm: '',
        matricula: '',
        edad: '',
        sexo: '',
        id_materia: 0,
    };

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
            } else if (!/^[a-zA-Z]+(\s*[a-zA-Z]+[áéíóúÁÉÍÓÚ]*)*[a-zA-ZñÑ]+$/.test(data.nombre)) {
                errors.nombre = 'Campo invalido';
            }

            if (!data.app) {
                errors.app = 'El apellido paterno es requerido'
            } else if (!/^[a-zA-Z]+(\s*[a-zA-ZÁÉÍÓÚáéíúó]*)*[a-zA-ZñÑ]+$/.test(data.app)) {
                errors.app = 'Campo invalido';
            }

            if (!data.apm) {
                errors.apm = 'El apellido materno es requerido'
            } else if (!/^[a-zA-Z]+(\s*[a-zA-Z]+[áéíóúÁÉÍÓÚ]*)*[a-zA-ZñÑ]+$/.test(data.apm)) {
                errors.apm = 'Campo invalido';
            }

            if (!data.matricula) {
                errors.matricula = 'La matricula es requerida'
            } else if (!/^[0-9]+$/.test(data.matricula)) {
                errors.matricula = 'Solo se aceptan números';
            } else if (!/^.{1,10}$/.test(data.matricula)) {
                errors.matricula = 'Solo un máximo de 10 digitos';
            } else if (!/^\d{10,}$/.test(data.matricula)) {
                errors.matricula = 'Deben de ser al menos 10 digitos'
            }

            if (!data.edad) {
                errors.edad = 'La edad es requerida'
            } else if (!/^\d{1,2}$/.test(data.edad)) {
                errors.edad = 'Solo se aceptan números y maximo 2';
            }

            if (!data.sexo) {
                errors.sexo = 'La sexo es requerido'
            } else if (!/^[a-zA-Z]{1,2}$/.test(data.sexo)) {
                errors.sexo = 'Solo se aceptan letras y maximo 2';
            }

            if (!data.id_materia) {
                errors.id_materia = 'Selecciona una materia';
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

    const [selectedMateria, setSelectedMateria] = useState(null);

    const [optionList, setOptionList] = useState([]);

    const [student, setStudent] = useState(initialStudent);

    let navigate = useNavigate();

    function navigateTo(string) {
        navigate(string);
    }

    //usa formik para validar el formulario que se renderiza

    const obtenerMaterias = async (e) => {
        console.log("obtenerMaterias")

        await axios.get(`${endpoint}/combo_materias`)
            .then((response) => {
                console.log(response.data)
                setOptionList(response.data)
            })
    }

    function volverVista() {
        navigateTo('/alumnos')
    }

    const getEmpleado = async (ID) => {
        console.log("getEmpleado")

        await axios.get(`${endpoint}/alumno`, {
            params: { id: ID }

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

    const guardarDatos = async (e) => {
        setStudent({
            ...student,
            'id_materia': selectedMateria
        })

        await axios.post(`${endpoint}/alumno`, e)
            .then((response) => {
                console.log("Guardando...")
                console.log(response.data)
            }).catch((error) => {

            })
        navigateTo('/alumnos')
    }

    useEffect(() => {

        if (_id === undefined) {
            console.log('sin parametro');
        }
        else {
            getEmpleado(_id);
        }
        obtenerMaterias();

    }, [_id])

    const isFormFieldValid = (name) => !!(formik.touched[name] && formik.errors[name]);
    const getFormErrorMessage = (name) => {
        return isFormFieldValid(name) && <small className="p-error">{formik.errors[name]}</small>;
    };

    return (
        <div>
            <center>
                <Card title="Estudiante" subTitle="Subtitle" style={{ width: '25em' }}>
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
                                <InputText id='app' name='app' value={formik.values.app} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('app') })} />
                                <label htmlFor="app" className={classNames({ 'p-error': isFormFieldValid('app') })} >App</label>
                            </span>
                            {getFormErrorMessage('app')}
                        </div>
                        <br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id='apm' name='apm' value={formik.values.apm} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('apm') })} />
                                <label htmlFor="apm" className={classNames({ 'p-error': isFormFieldValid('apm') })}>Apm</label>
                            </span>
                            {getFormErrorMessage('apm')}
                        </div>
                        <br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id='matricula' name='matricula' value={formik.values.matricula} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('matricula') })} />
                                <label htmlFor="matricula" className={classNames({ 'p-error': isFormFieldValid('matricula') })}>Matricula</label>
                            </span>
                            {getFormErrorMessage('matricula')}
                        </div>
                        <br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id='sexo' name='sexo' value={formik.values.sexo} onChange={formik.handleChange} className={classNames({ 'p-invalid': isFormFieldValid('sexo') })} />
                                <label htmlFor="sexo" className={classNames({ 'p-error': isFormFieldValid('sexo') })}>Sexo</label>
                            </span>
                            {getFormErrorMessage('sexo')}
                        </div>
                        <br></br>
                        <div className="field">
                            <span className="p-float-label">
                                <InputText id='edad' type='number' value={formik.values.edad} onChange={formik.handleChange} name='edad' className={classNames({ 'p-invalid': isFormFieldValid('edad') })} />
                                <label htmlFor="edad" className={classNames({ 'p-error': isFormFieldValid('edad') })}>Edad</label>
                            </span>
                            {getFormErrorMessage('edad')}
                        </div>
                        <br></br>
                        <div className="field">
                            <span>
                                <Dropdown value={formik.values.id_materia} name="id_materia" onChange={formik.handleChange} options={optionList} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid('id_materia') })} placeholder="Selecciona una materia" />
                            </span>
                            {getFormErrorMessage('id_materia')}
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

export default NEStudent