<?php

namespace Tests\Feature;

use App\Models\m_alumno;
use App\Models\m_maestro;
use App\Models\m_materia;
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

    public function testListaAlumnos()
    {
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

    public function testObtenerAlumnoPorId()
    {
        $id = 1;

        $response = $this->get('/api/alumno?id=' . $id);

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

    public function testGuardarAlumno()
    {
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

    public function testEliminarAlumno()
    {
        $alumno = m_alumno::find(2);

        $response = $this->json(
            'POST',
            'api/alumno/borrar',
            ['id' => $alumno->id]
        );

        $response->assertStatus(200);

        $this->assertDatabaseMissing(
            'alumnos',
            ['id' => $alumno->id]
        );
    }

    //Profesores

    public function testListaProfesores()
    {
        $response = $this->get('/api/maestros');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [
                'id',
                'nombre',
                'nocedula',
                'sexo',
                'edad',
                'created_at',
                'updated_at',
                'id_materia',
                'nombre_materias',
            ]
        ]);
    }

    public function testObtenerProfesorPorId()
    {
        $id = 1;

        $response = $this->get('/api/maestro?id=' . $id);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'id',
            'nombre',
            'nocedula',
            'sexo',
            'edad',
            'created_at',
            'updated_at',
        ]);
    }

    public function testEliminarProfesor()
    {
        $alumno = m_maestro::find(2);

        $response = $this->json(
            'POST',
            'api/maestro/borrar',
            ['id' => $alumno->id]
        );

        $response->assertStatus(200);

        $this->assertDatabaseMissing(
            'maestros',
            ['id' => $alumno->id]
        );
    }

    //Materias

    public function testListaMaterias()
    {
        $response = $this->get('/api/materias');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            '*' => [
                'id',
                'nombre',
                'duracion',
                'profesor',
                'dias',
                'created_at',
                'updated_at',
            ]
        ]);
    }

    public function testObtenerMateriaPorId()
    {
        $id = 1;

        $response = $this->get('/api/materia?id=' . $id);

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'id',
            'nombre',
            'duracion',
            'profesor',
            'dias',
            'created_at',
            'updated_at',
        ]);
    }

    public function testGuardarMateria()
    {
        $alumno = [
            //'id',
            'nombre' => 'test1',
            'duracion' => 'test1',
            'profesor' => 'test1',
            'dias' => 1,
        ];

        $response = $this->post('/api/materia', $alumno);
        $this->assertDatabaseHas('materias', $alumno);
        $response->assertStatus(201);
    }

    public function testEliminarMateria()
    {
        $alumno = m_materia::find(2);

        $response = $this->json(
            'POST',
            'api/materia/borrar',
            ['id' => $alumno->id]
        );

        $response->assertStatus(200);

        $this->assertDatabaseMissing(
            'materias',
            ['id' => $alumno->id]
        );
    }
}
