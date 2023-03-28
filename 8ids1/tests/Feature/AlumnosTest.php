<?php

namespace Tests\Feature;

use App\Models\m_alumno;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AlumnosTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    public function testListaAlumnos(){
        $response = $this->get('/api/alumnos');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [
                'id',
                'nombre',
                'matricula',
                'sexo',
                'edad',
                'created_at',
                'updated_at',
                'id_materia',
                'nombre_materias',
            ]
        ]);
    }

    public function testObtenerAlumnoPorId(){
        $id = 1;

        $response = $this->get('/api/alumno?id='.$id);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'id',
            'nombre',
            'matricula',
            'sexo',
            'edad',
            'created_at',
            'updated_at',
        ]);
    }

    public function testGuardarAlumno(){
        $alumno = [
            //'id',
            'nombre' => 'test1',
            'app' => 'test1',
            'apm' => 'test1',
            'matricula' => 'test1',
            'sexo' => 'test1',
            'edad' => 123,
            'id_materia' => 1
        ];

        $response = $this->post('/api/alumno', $alumno);
        $this->assertDatabaseHas('alumnos', $alumno);
        $response->assertStatus(201);
        
    }

    public function testEliminarAlumno(){
        $alumno = m_alumno::find(5);

        $response = $this->json('POST', 'api/alumno/borrar',
        ['id' => $alumno->id]);
        
        $response->assertStatus(200);

        $this->assertDatabaseMissing('alumnos',
        ['id' => $alumno->id]);
    }
/*
    public function testBorrarAlumno(){
        $alumno = m_alumno::find(6);

        $response = $this->json('POST', 'api/alumno/borrar',
        ['id' => $alumno->id]);
        
        $response->assertStatus(200);

        $this->assertDatabaseMissing('alumnos',
        ['id' => $alumno->id]);
    }*/
/*
    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }*/
}
