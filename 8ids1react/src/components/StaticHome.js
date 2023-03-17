import React, { useState, useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';

const StaticHome = () => {
const endpoint = 'http://127.0.0.1:8000/api';

let navigate = useNavigate();

function navigateTo(string){
  navigate(string);
}

const irLogin = async (e) => {
  navigateTo('/login')
}

const irPrivac = async (e) => {
  navigateTo('/privac')
}

const end = <Button label="Login" severity="info" icon="pi pi-user" iconPos="right" onClick={irLogin}/> 

const start = <Button label="Aviso de Privacidad" iconPos="right" onClick={irPrivac}/>;

return (
    <div>
      <div className="card">
      <Menubar start={start} end={end} />
      </div>
      <div>
      <Card title="Home">
          <p className="m-0">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
              numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
          </p>
      </Card>
      </div>
    </div>
  )
}

export default StaticHome