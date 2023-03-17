<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\m_pase_lista;
use App\Models\m_alumno;

class paselistaController extends Controller
{
    public function pasedelista (Request $request){
        $datos = m_alumno::join('materias','alumnos.id_materia','=','materias.id')
        ->where('id_materia', '=', $request->id_materia)
        ->select('alumnos.*','materias.nombre as nombre_materia')
        ->get();
        return $datos;

    }

    public function guardar (Request $request){
        $pase_lista = new m_pase_lista();

        $pase_lista->fecha = now();
        $pase_lista->id_alumno = $request->id_alumno;
        $pase_lista->asistio = $request->asistio;

        $pase_lista->save();

        return $pase_lista;

    }
}
