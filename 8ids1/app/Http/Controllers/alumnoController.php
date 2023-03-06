<?php

namespace App\Http\Controllers;

use App\Models\m_alumno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http\Models\Alumno;

class alumnoController extends Controller
{
    public function index(){ 
        return view('home');
    }
    public function lista(){
        //$alumno = m_alumno::all();
        $alumno = m_alumno::join('materias', 'alumnos.id_materia','=','materias.id')
        ->select('alumnos.*','materias.nombre as nombre_materias')
        ->get();
        return $alumno;
    }
    public function alumno(Request $request){
        $alumno = m_alumno::find($request->id);
        return $alumno;
    }
    public function guardar(Request $request){
        if($request->id == 0){
            $alumno = new m_alumno();
        }
        else {
            $alumno = m_alumno::find($request->id);
        }

        $alumno->nombre = $request->nombre;
        $alumno->app = $request->app;
        $alumno->apm = $request->apm;
        $alumno->matricula = $request->matricula;
        $alumno->sexo = $request->sexo;
        $alumno->edad = $request->edad;

        $alumno->id_materia = $request->id_materia;
    
        $alumno->save();

        return $alumno;
        
    }
    public function borrar(Request $request){

        $alumno = m_alumno::find($request->id);
        $alumno ->delete();
        return "OK";
    }

}
