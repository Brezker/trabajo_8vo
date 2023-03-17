<?php

namespace App\Http\Controllers;

use App\Models\m_alumno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http\Models\Alumno;
use Illuminate\Support\Facades\Log;
use Exception;

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
        try {
            $alumno = new m_alumno();

            $alumno->nombre = $request->nombre;
            $alumno->app = $request->app;
            $alumno->apm = $request->apm;
            $alumno->matricula = $request->matricula;
            $alumno->sexo = $request->sexo;
            $alumno->edad = $request->edad;

            $alumno->id_materia = $request->id_materia;
        
            $alumno->save();
            
            Log::debug('metohodo Guardar Alumno-> Correcto');

        } catch (Exception $e) {
            Log::debug('metohodo Guardar Alumno->'.$e->getMessage());
            $alumno = m_alumno::find($request->id);
        }

        return $alumno;
        
    }
    public function borrar(Request $request){
        try {
            $alumno = m_alumno::find($request->id);
            $alumno ->delete();
            Log::info('metohodo Borrar Alumno-> Correcto');
        } catch (Exception $e) {
            Log::debug('metohodo borrar Alumno ->'.$e->getMessage());
            $alumno = m_alumno::find($request->id);
        }
        return "OK";
    }

}
