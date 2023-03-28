import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Menubar } from 'primereact/menubar';
//import { useNavigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const ShowAlumnos = () => {
  const [students, setStudents] = useState([]);
const endpoint = 'http://127.0.0.1:8000/api';

let navigate = useNavigate();

function navigateTo(string){
  navigate(string);
}

const bodyTemplate = (rowData) => {
  return <div>
  <Button icon="pi pi-file-edit" iconPos="right" onClick={()=> editStudent(rowData)}/>
  <Button icon="pi pi-trash" iconPos="right" className='p-button-danger' onClick={()=> deleteStudent(rowData.id)}/>
  </div>;
}

const toast = useRef(null);

const guardarAsistencia = async (rowData, asistio) => {
  await axios.post(`${endpoint}/paselistaguard`, {
    id_alumno: rowData.id,
    asistio: asistio,
  }).then(response => {
    console.log(response.data)
    if (asistio) {
      toast.current.show({ severity: 'success', summary: 'Asistencia Guardada', detail: 'El estudiante asistio' });
    } else {
      toast.current.show({ severity: 'error', summary: 'Asistencia Guardada', detail: 'El estudiante no asistio' });
    }
  }).catch(function (error){
    console.log(error)
  })
};

const bodyTemplate2 = (rowData) => {
  return <div>
  <Toast ref={toast} />
  <Button icon="pi pi-check" iconPos="right" className='p-button-success' onClick={()=> guardarAsistencia(rowData, true)}/>
  <Button icon="pi pi-times" iconPos="right" className='p-button-danger' onClick={()=> guardarAsistencia(rowData, false)}/>
  </div>;
  
}

const editStudent = (row) =>{
  
  navigateTo ('student/ne/' + row.id);
  console.log("Click: " + row.nombre);
}

  useEffect(() => {
    getAllStudents();
}, []);


const items = [
  {
     label:'Crear',
     icon:'pi pi-fw pi-bars',
     items:[
        {
           label:'Nuevo',
           icon:'pi pi-fw pi-plus',
           items:[
              {
                 label:'Estudiante', 
                 icon:'pi pi-user-plus',
                 command: (event) => {
                  navigateTo('/student/ne')
                 }
              },
              {
                label:'Maestro', 
                icon:'pi pi-users',
                command: (event) => {
                 navigateTo('/m/teacher/nm')
                }
             },
             {
              label:'Materia', 
              icon:'pi pi-book',
              command: (event) => {
               navigateTo('/s/subject/ns')
              }
           }
           ]
        }
     ]
  },
  {
    label:'Maestro',
    icon:'pi pi-users',
    command: (event) => {
      navigateTo('/m')
 }
},
{
  label:'Materia',
  icon:'pi pi-book',
  command: (event) => {
    navigateTo('/s')
}
},
{
  label:'Exit',
  icon:'pi pi-fw pi-power-off',
  command: (event)=>{
    localStorage.removeItem('token');
    navigateTo('/')
  }
}
];


const getAllStudents = async () =>{
  
    await axios.get(`${endpoint}/alumnos`)
    .then(response => {
      console.log(response.data);
      setStudents(response.data)
    }).catch(function (error){
      console.log(error);
    })
  }

const deleteStudent = async (_id) => {
  await axios.post(`${endpoint}/alumno/borrar`,{
    id: _id
  }).then(response => {
      getAllStudents();
  }).catch(function (error){
      console.log(error);
  })
}

const irMenu = async (e) => {
  navigateTo('/menu')
}

const end = <Button label="Menu" severity="info" icon="pi pi-arrow-circle-left" iconPos="left" onClick={irMenu}/>;

return (
    <div>
      <div>
      <Menubar model={items} end={end}/>
      </div>
        <div className="card">
            <DataTable value={students} responsiveLayout="scroll">
                <Column field="id" header="ID"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="app" header="Apellido paterno"></Column>
                <Column field="apm" header="Apelido materno"></Column>
                <Column field="matricula" header="Matrícula"></Column>
                <Column field="sexo" header="Sexo"></Column>
                <Column field="edad" header="Edad"></Column>
                <Column field="nombre_materias" header="materias"></Column>
                <Column header="Acciones" body={bodyTemplate}></Column>
                <Column header="Asistencia" body={bodyTemplate2}></Column>
            </DataTable>
        </div>
    </div>
  )
}

export default ShowAlumnos