<?php

class InterfaceController extends BaseController
{
	public function index()
	{
		return View::make('index');
	}

    public function timeslots()
    {
        $data = [
            ['id' => 1, 'game' => 'COD2', 'start' => time(), 'end' => strtotime('+2 hours'), 'users' => ['Jakob', 'Max']],
            ['id' => 2, 'game' => 'CIV5', 'start' => strtotime('-1 hour'), 'end' => strtotime('+1 hour'), 'users' => ['Jakob', 'Anne', 'Yvonne']],
        ];
        return Response::json($data);
    }
}
