import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import { Menubar } from 'primereact/menubar';
//import { useNavigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
 


const ShowMaterias = () => {
  const [subjects, setSubjects] = useState([]);
const endpoint = 'http://127.0.0.1:8000/api';

let navigate = useNavigate();

function navigateTo(string){
  navigate(string);
}

const bodyTemplate = (rowData) => {
  return <div>
  <Button icon="pi pi-file-edit" iconPos="right" onClick={()=> editSubject(rowData)}/>
  <Button icon="pi pi-trash" iconPos="right" onClick={()=> deleteSubject(rowData.id)}/>
  </div>;

}

const editSubject = (row) =>{
  
  navigateTo ('subject/ns/' + row.id);
  console.log("Click: " + row.nombre);
}

  useEffect(() => {
    getAllSubjects();
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
  label:'Maestro',
  icon:'pi pi-users',
  command: (event) => {
    navigateTo('/m')
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


const getAllSubjects = async () =>{
  
    await axios.get(`${endpoint}/materias`)
    .then(response => {
      console.log(response.data);
      setSubjects(response.data)
    }).catch(function (error){
      console.log(error);
    })
  }

  const deleteSubject = async (_id) => {
    await axios.post(`${endpoint}/materia/borrar`,{
      id: _id
    }).then(response => {
       getAllSubjects();
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
            <DataTable value={subjects} responsiveLayout="scroll">
                <Column field="id" header="ID"></Column>
                <Column field="nombre" header="Nombre"></Column>
                <Column field="duracion" header="Horas"></Column>
                <Column field="profesor" header="Profesor"></Column>
                <Column field="dias" header="Días por semana"></Column>
                <Column header="Acciones" body={bodyTemplate}></Column>
            </DataTable>
        </div>
    </div>
  )
}

export default ShowMaterias