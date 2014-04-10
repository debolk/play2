<?php

class Timeslot extends Jenssegers\Mongodb\Model
{
    protected $fillable = ['game', 'start', 'end', 'users'];

    public function scopeCurrent()
    {
        //FIXME return upcoming timeslots only (all timeslots which have their starting point in this hour or the next)
        return $this->all();
    }

    public function set($name)
    {
        // Remove name from all timeslots
        DB::collection('timeslots')->pull('users', $name);

        // Add this name to the timeslot
        DB::collection('timeslots')->where('_id', $this->_id)->push('users', $name);
    }
}
