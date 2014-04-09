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
        var start_time  = new Date(timeslot.start * 1000);
        console.log(start_time);
        var start_format = start_time.getHours() + ":" + start_time.getMinutes();
        var end_time = new Date(timeslot.end * 1000);
        var end_format = end_time.getHours() + ":" + end_time.getMinutes();
        var title = $('<h2>').html(timeslot.game + " (" + start_format + " - " + end_format +  ")");
        title.appendTo(el);

        // Players
        var text = timeslot.users.length + " players: " + timeslot.users.join(', ');
        var players = $('<div>').addClass('players').html(text);
        players.appendTo(el);

        // Show timeslot
        el.appendTo(container);
    });
}
