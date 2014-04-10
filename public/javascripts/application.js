var selected_timeslot = null;

$(document).ready(function(){
    // Load the timeslots
    load_timeslots();

    // Selecting timeslots
    $('#timeslots').on('click', '.timeslot', select_timeslot);

    // Must type acceptable gamer name
    $('#name').on('keyup', validate_name);
    $('#name').trigger('keyup');
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
    // Clear the container
    var container = $('#timeslots').empty();

    $(timeslots).each(function(key, timeslot){
        // Create timeslot
        var el = $('<div>');
        el.addClass('timeslot');
        el.attr('data-id', timeslot._id);

        // Select if needed
        if (selected_timeslot == timeslot._id) {
            el.addClass('selected');
        }

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

function select_timeslot(event)
{
    // Do nothing if this timeslot is already selected
    if ($(this).hasClass('selected')) {
        return;
    }

    // Update interface
    event.preventDefault();
    $('.timeslot').each(function(key, timeslot){
        $(timeslot).removeClass('selected');
    });
    $(this).addClass('selected');

    // Store state
    selected_timeslot = $(this).attr('data-id');

    // Save on server
    $.ajax({
        url: '/choose',
        method: 'POST',
        data: JSON.stringify({
            name: $('#name').val(),
            timeslot: $(this).attr('data-id'),
        }),
        contentType:"application/json; charset=utf-8",
        dataType: 'json',
        success: draw_timeslots,
        error: reset_interface
    });
}

function reset_interface()
{
    // alert('Something wrong. Reloading interface.');
    // window.location.reload();
}

function validate_name()
{
    $('#name-error').toggle($(this).val().trim().length === 0);
}
