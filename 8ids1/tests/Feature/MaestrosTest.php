<?php

namespace Tests\Feature;

use App\Models\m_maestro;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class MaestrosTest extends TestCase
{
    public function testGuardarMaestro()
    {
        $maestro = [
            //'id',
            'nombre' => 'test',
            'app' => 'test',
            'apm' => 'test',
            'nocedula' => 'test',
            'edad' => 123,
            'sexo' => 'test',
            'id_materia' => 1
        ];

        $response = $this->post('/api/maestro', $maestro);
        $this->assertDatabaseHas('maestros', $maestro);
        $response->assertStatus(201);
    }
}
