<?php

class Timeslot extends Jenssegers\Mongodb\Model
{
    protected $fillable = ['game', 'start', 'end', 'users'];
    protected $dates = ['start', 'end'];

    /**
     * Return all timeslots which have their starting point in the next two hours or are ongoing
     */
    public function scopeCurrent($query)
    {
        return $query->where('start', '<=', new DateTime('+6 hours'))->where('end', '>', new DateTime('+2 hours'))->get();
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
