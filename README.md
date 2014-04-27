play2
=====

Game chooser tool for the BolkLAN, second version

## Requirements
* nginx
* PHP5 with the memcache and mongodb modules
* MongoDB server
* Memcache server

## Installation
Install the system and its requirements on a server. Configure nginx (with PHP-FPM) to point to `public/`.

## Usage
The main interface is accessed via the root path `/`. Users must enter their (gamer) name in the top-right corner of the interface. They can then add their name to a timeslot simply by clicking it. Clicking a selected timeslot again will remove the name set. There's no protection or registration of names of any kind. There's no administration interface of any kind, use a suitable client for MongoDB to create additional timeslots. You can find an example of the timeslots used in `timeslots.json`.

## License
Copyright Jakob Buis 2014. All rights reserved.
