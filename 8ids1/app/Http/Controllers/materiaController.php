<?php

namespace App\Http\Controllers;

use App\Models\m_materia;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http\Models\Materia;
use Illuminate\Support\Facades\Log;
use PhpParser\Node\Stmt\TryCatch;

class materiaController extends Controller
{
    public function index(){
        return view('home');
    }
    public function lista(){
        $materia = m_materia::all();
        return $materia;
    }
    public function materia (Request $request){
        $materia = m_materia::find($request->id);
        return $materia;
    }
    public function guardar(Request $request){
        try{
        $materia = new m_materia();
        $materia->nombre = $request->nombre;
        $materia->duracion = $request->duracion;
        $materia->profesor = $request->profesor;
        $materia->dias = $request->dias;

        $materia->save();

        Log::debug('metohodo Guardar Materia-> Correcto');

        }catch(Exception $e){
            Log::debug('metohodo Guardar Materia->'.$e->getMessage());
            $materia = M_materia::find($request->id);
        }

        return $materia;

    }
    public function borrar(Request $request){
        try {
            $materia = m_materia::find($request->id);
            $materia ->delete();
            Log::info('metohodo Borrar materia-> Correcto');
        } catch (Exception $e) {
            Log::debug('metohodo borrar materia ->'.$e->getMessage());
            $materia = M_materia::find($request->id);
        }

        return "OK";
    }

    public function combo(){
        $materia = m_materia::select('nombre as name', 'id as code')->get();
        return $materia;
    }

}
