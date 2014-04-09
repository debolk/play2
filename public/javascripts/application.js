$(document).ready(function(){
    // Load the timeslots
    load_timeslots();
});

function load_timeslots()
{
    console.log('Reloading timeslots');
    $.ajax({
        url: '/timeslots',
        method: 'GET',
        success: function(results) {
            draw_timeslots(results);
        },
        dataType: 'json',
    });
}

function draw_timeslots(timeslots)
{
    // Stuff to draw
    var container = $('#timeslots');

    $(timeslots).each(function(key, timeslot){
        // Create timeslot
        var el = $('<div>');
        el.addClass('timeslot');
        el.attr('data-id', timeslot.id);

        // Title of the timeslot
        var title = $('<h2>').html(timeslot.game + " (" + formatDate(timeslot.start) + " - " + formatDate(timeslot.end) +  ")");
        title.appendTo(el);

        // Players
        var text = timeslot.users.length + " players: " + timeslot.users.join(', ');
        var players = $('<div>').addClass('players').html(text);
        players.appendTo(el);

        // Show timeslot
        el.appendTo(container);
    });
}

function formatDate(string)
{
    var date = new Date(string * 1000);
    var hours  = date.getHours();
    var minutes = date.getMinutes();

    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }

    return hours + ":" + minutes;
}