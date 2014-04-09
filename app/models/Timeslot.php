<?php

class Timeslot extends Jenssegers\Mongodb\Model
{
    protected $fillable = ['game', 'start', 'end', 'users'];
}
