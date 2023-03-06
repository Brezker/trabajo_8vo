<?php

namespace App\Http\Controllers;

use App\Models\m_maestro;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http\Models\Maestro;
use Illuminate\Support\Facades\Log;
use Exception;

class maestroController extends Controller
{
    public function index(){ 
        return view('home');
    }
    public function lista(){
        //$maestro = m_maestro::all();
        $maestro = m_maestro::join('materias', 'maestros.id_materia','=','materias.id')
        ->select('maestros.*','materias.nombre as nombre_materias')
        ->get();
        return $maestro;
    }
    public function maestro (Request $request){
        $maestro = m_maestro::find($request->id);
        return $maestro;
    }
    public function guardar(Request $request){
        try {
            $maestro = new m_maestro();

            $maestro->nombre = $request->nombre;
            $maestro->app = $request->app;
            $maestro->apm = $request->apm;
            $maestro->nocedula = $request->nocedula;
            $maestro->sexo = $request->sexo;
            $maestro->edad = $request->edad;
        
            $maestro->id_materia = $request->id_materia;
            
            $maestro->save();
        } catch (Exception $e) {
            Log::debug('metohodo Guardar Maestro->'.$e->getMessage());
            $maestro = m_maestro::find($request->id);
        }
        
        return $maestro;
        
    }
    public function borrar(Request $request){
        try {
            $maestro = m_maestro::find($request->id);
            $maestro ->delete();
            Log::info('metohodo Borrar Maestro-> Correcto');
        } catch (Exception $e) {
            Log::debug('metohodo borrar Maestro ->'.$e->getMessage());
            $maestro = m_maestro::find($request->id);
        }
        
        return "OK";
    }
}
