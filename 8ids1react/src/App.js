//import logo from './logo.svg';
import './App.css';


import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";    //icons
import ShowAlumnos from './components/ShowAlumnos';
import NEStudent from './components/NEStudent';
import NETeacher from './components/NETeacher';
import ShowMaestros from './components/ShowMaestros';
import NESubject from './components/NESubject';
import ShowMaterias from './components/ShowMaterias';
import LoginComponent from './components/LoginComponent';


import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginComponent/>}/>
            <Route path="/alumnos" 
            element={isLoggedIn ? <ShowAlumnos/> : <Navigate to="/" />}/>
            <Route path="/student/ne/:_id?" 
            element={isLoggedIn ? <NEStudent/> : <Navigate to="/" />}/>
            <Route path="/m" 
            element={isLoggedIn ? <ShowMaestros/> : <Navigate to="/" />}/>
            <Route path="/m/teacher/nm/:_id?" 
            element={isLoggedIn ? <NETeacher/> : <Navigate to="/" />}/>
            <Route path="/s" 
            element={isLoggedIn ? <ShowMaterias/> : <Navigate to="/" />}/>
            <Route path="/s/subject/ns/:_id?" 
             element={isLoggedIn ? <NESubject/> : <Navigate to="/" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;


//npm audit fix --force