<?php

class Timeslot extends Jenssegers\Mongodb\Model
{
    protected $fillable = ['game', 'start', 'end', 'users'];

    public function scopeCurrent()
    {
        //FIXME return upcoming timeslots only (all timeslots which have their starting point in this hour or the next)
        return $this->all();
    }

    /**
     * Add a new name to this timeslot, if it isn't set already
     * @param string $name the name to add to the player list
     * @return void
     */
    public function set($name)
    {
        if (! in_array($name, $this->users)) {
            DB::collection('timeslots')->where('_id', $this->_id)->push('users', $name);
        }
    }

    /**
     * Remove a name from the timeslot
     * @param string $name the name to yank
     * @return void
     */
    public function remove($name) 
    {
        DB::collection('timeslots')->where('_id', $this->_id)->pull('users', $name);
    }
}
