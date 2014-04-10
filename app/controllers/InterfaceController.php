<?php

class InterfaceController extends BaseController
{
	public function index()
	{
		return View::make('index');
	}

    public function timeslots()
    {
        $timeslots = Timeslot::current();

        //FIXME cache using memcache
        return Response::json($timeslots);
    }

    public function choose()
    {
        if (!Input::has('name')) {
            App::abort(400, "Must enter a name");
        }

        $timeslot = Timeslot::find(Input::get('timeslot'));
        if (!$timeslot) {
            App::abort(404, 'Timeslot does not exist');
        }

        // Set the timeslot
        $timeslot->set(Input::get('name'));

        return $this->timeslots();
    }
}
