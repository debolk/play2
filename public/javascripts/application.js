var selected_timeslots = [];

$(document).ready(function(){
    // Load the timeslots
    load_timeslots();

    // Selecting timeslots
    $('#timeslots').on('click', '.timeslot', click_timeslot);

    // Must type acceptable gamer name
    $('#name').on('keyup', validate_name);
    $('#name').trigger('keyup');
});

function load_timeslots()
{
    $.ajax({
        url: '/timeslots',
        method: 'GET',
        success: function(results) {
            draw_timeslots(results);
            setTimeout(load_timeslots, 5*1000);
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
        if ($.inArray(timeslot._id, selected_timeslots) !== -1) {
            el.addClass('selected');
        }

        // Title of the timeslot
        var title = $('<h2>').html(timeslot.game + " (" + formatDate(timeslot.start) + " - " + formatDate(timeslot.end) +  ")");
        title.appendTo(el);

        // Number and names of players
        var players = $('<div>').addClass('players');
        if (typeof timeslot.users == 'undefined' || timeslot.users.length === 0) {
            players.text('No players');
        }
        else {
            players.text(timeslot.users.length + " players: " + timeslot.users.join(', '));
        }
        players.appendTo(el);

        // Show timeslot
        el.appendTo(container);
    });
}

function formatDate(date)
{
    // Return only the HH:MM part of date
    return date.substring(date.length-8, date.length-3);
}

function click_timeslot(event)
{
    event.preventDefault();

    // Show an alert if the player has to set a gamername first
    if ($('#name').val().trim().length === 0) {
        alert('Please set your name first in the top-right corner');
        return false;
    }

    // Toggle select of deselect actions
    if ($(this).hasClass('selected')) {
        deselect_timeslot.call(this);
    }
    else {
        select_timeslot.call(this);
    }
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

function select_timeslot()
{
    // Update interface
    $(this).addClass('selected');

    // Store state
    var id = $(this).attr('data-id');
    if ($.inArray(id, selected_timeslots) == -1) {
        selected_timeslots.push(id);
    }

    // Save on server
    $.ajax({
        url: '/choose',
        method: 'POST',
        data: JSON.stringify({
            name: $('#name').val(),
            timeslot: id,
        }),
        contentType:"application/json; charset=utf-8",
        dataType: 'json',
        success: draw_timeslots,
        error: reset_interface
    });
}

function deselect_timeslot()
{
    // Update interface
    $(this).removeClass('selected');

    // Remove this timeslot from state
    var id = $(this).attr('data-id');
    var index = selected_timeslots.indexOf(id);
    if (index > -1) {
        selected_timeslots.splice(index, 1);
    }

    // Save on server
    $.ajax({
        url: '/unchoose',
        method: 'POST',
        data: JSON.stringify({
            name: $('#name').val(),
            timeslot: id,
        }),
        contentType:"application/json; charset=utf-8",
        dataType: 'json',
        success: draw_timeslots,
        error: reset_interface
    });
}
