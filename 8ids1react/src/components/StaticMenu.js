import React, { useState, useEffect, useRef } from 'react';
import { DeferredContent } from 'primereact/deferredcontent';
import axios from 'axios';
import { Menubar } from 'primereact/menubar';
//import { useNavigate } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Splitter, SplitterPanel } from 'primereact/splitter';

const StaticMenu = () => {
  const [students, setStudents] = useState([]);
const endpoint = 'http://127.0.0.1:8000/api';

let navigate = useNavigate();

function navigateTo(string){
  navigate(string);
}

const bodyTemplate = (rowData) => {
  return <div>
  <Button icon="pi pi-file-edit" iconPos="right" onClick={()=> editStudent(rowData)}/>
  <Button icon="pi pi-trash" iconPos="right" onClick={()=> deleteStudent(rowData.id)}/>
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

const toast = useRef(null);

const onImageLoad = () => {
  toast.current.show({ severity: 'success', summary: 'Success', detail: 'Image loaded' });
};

return (
    <div>
      <div>
      <Menubar model={items}/>
      </div>
      <div>
      <Card title="Menu Principal">
          <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
              numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
          </p>
      </Card>
      </div>
      <div className="card">
          <p style={{marginBottom: '30rem', textAlign: 'center'}}>Scroll down to lazy load an image.</p>
          <Toast ref={toast} />
          <DeferredContent onLoad={onImageLoad}>
              <img className="w-full md:w-30rem md:block md:mx-auto" src="https://primefaces.org/cdn/primereact/images/galleria/galleria3.jpg" alt="Prime" />
          </DeferredContent>
      </div>
      <Splitter style={{ height: '300px' }}>
            <SplitterPanel className="flex align-items-center justify-content-center"><img className="w-full md:w-30rem md:block md:mx-auto" src="https://primefaces.org/cdn/primereact/images/galleria/galleria3.jpg" alt="Prime" />Panel 1</SplitterPanel>
            <SplitterPanel className="flex align-items-center justify-content-center">Panel 2
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae</SplitterPanel>
        </Splitter>
    </div>
  )
}

export default StaticMenu