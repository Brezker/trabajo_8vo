import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Menubar } from 'primereact/menubar';
//import { useNavigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
 


const ShowMaestros = () => {
  const [teachers, setTeachers] = useState([]);
const endpoint = 'http://127.0.0.1:8000/api';

let navigate = useNavigate();

function navigateTo(string){
  navigate(string);
}

const bodyTemplate = (rowData) => {
  return <div>
  <Button icon="pi pi-file-edit" iconPos="right" onClick={()=> editTeacher(rowData)}/>
  <Button icon="pi pi-trash" iconPos="right" onClick={()=> deleteTeacher(rowData.id)}/>
  </div>;

}

const editTeacher = (row) =>{
  
  navigateTo ('teacher/nm/' + row.id);
  console.log("Click: " + row.nombre);
}

  useEffect(() => {
    getAllTeachers();
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
    label:'Estudiante',
    icon:'pi pi-user',
    command: (event) => {
      navigateTo('/alumnos')
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


const getAllTeachers = async () =>{
  
    await axios.get(`${endpoint}/maestros`)
    .then(response => {
      console.log(response.data);
      setTeachers(response.data)
    }).catch(function (error){
      console.log(error);
    })
  }

  const deleteTeacher = async (_id) => {
    await axios.post(`${endpoint}/maestro/borrar`,{
      id: _id
    }).then(response => {
       getAllTeachers();
    }).catch(function (error){
       console.log(error);
    })
  }


return (
    <div>
      <div>
      <Menubar model={items}/>
      </div>
        <div className="card">
            <DataTable value={teachers} responsiveLayout="scroll">
                <Column field="id" header="ID"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="app" header="Apellido paterno"></Column>
                <Column field="apm" header="Apelido materno"></Column>
                <Column field="nocedula" header="Cedula"></Column>
                <Column field="sexo" header="Sexo"></Column>
                <Column field="edad" header="Edad"></Column>
                <Column field="nombre_materias" header="materias"></Column>
                <Column header="Acciones" body={bodyTemplate}></Column>
            </DataTable>
        </div>
    </div>
  )
}

export default ShowMaestros