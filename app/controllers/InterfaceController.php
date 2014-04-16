<?php

class InterfaceController extends BaseController
{
    public function __construct()
    {
        $this->memcache = new Memcached();
        $this->memcache->addServer('localhost', 11211);    
    }

	public function index()
	{
		return View::make('index');
	}

    public function timeslots()
    {
        // Load the timeslots using write-through caching
        $timeslots = $this->memcache->get('timeslots');

        if (! $timeslots) {
            $timeslots = Response::json(Timeslot::current());
            $this->memcache->set('timeslots', $timeslots, 180);
        }

        return $timeslots;
    }

    public function choose()
    {
        // Very basic validation
        if (!Input::has('name')) {
            App::abort(400, "Must enter a name");
        }

        // Find the current timeslot
        $timeslot = Timeslot::find(Input::get('timeslot'));
        if (!$timeslot) {
            App::abort(404, 'Timeslot does not exist');
        }

        // Add the name to the timeslot
        $timeslot->set(Input::get('name'));

        // Update memcache and return the updated set
        $new_timeslots = Response::json(Timeslot::current());
        $this->memcache->set('timeslots', $new_timeslots, 180);

        // Return updated set of timeslots
        return $new_timeslots;
    }
}
