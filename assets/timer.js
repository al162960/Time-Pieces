$('#control').fadeIn(1500);	// JavaScript is loaded and app is ready.

document.createElement('header');
document.createElement('footer');
document.createElement('section');
document.createElement('aside');
document.createElement('nav');
document.createElement('article');
document.createElement('time');

function Timer() {
    var Seconds = 0;
    var Minutes = 0;
    var Hours = 0;
    var running = false;
    this.start = function (startHours, startMinutes, startSeconds) {
        if (startSeconds) Seconds = startSeconds;
        if (startMinutes) Minutes = startMinutes;
        if (startHours) Hours = startHours;
        running = true;
    }
    this.restart = function () {
        running = true;
    }
    this.stop = function () {
        running = false;
    }
    this.duration = function () {
        if (running == false) {
            var TimeStr = LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds);
            return TimeStr;
        }
        else {
            Seconds = Seconds + 1;
            if (Seconds == 60) {
                Seconds = 0;
                Minutes = Minutes + 1;
            }
            if (Minutes == 60) {
                Minutes = 0;
                Hours = Hours + 1;
            }
            var TimeStr = LeadingZero(Hours) + ":" + LeadingZero(Minutes) + ":" + LeadingZero(Seconds);
            return TimeStr;
        }
    }
    this.update = function (x) {
        $('#timer' + x).text(this.duration());
    }

    function LeadingZero(Time) {
        return (Time < 10) ? "0" + Time : +Time;
    }
}

var timer = new Array();

var timerNum = 1;

setInterval(updateTimers, 1000);

function updateTimers() {
    for (x = 1; x <= timerNum; x++) {
        timer[x].update(x);
    }
}

// Add a timer
$('a#new').live('click', function () {
    timepiecename = prompt("Enter the name of the time piece", "Time Piece " + timerNum);
    if (timepiecename != null) {
        timer[x] = new Timer();
        $('body').append('<section id="s' + timerNum + '"><h2 id="timepiecetitle">' + timepiecename + '</h2><time id="timer' + timerNum + '">00:00:00</time><a id="control" class="start" href="javascript: void(0);">Start</a><a class="reset" href="javascript: void(0);">Reset</a><a class="delete" href="javascript: void(0);">Delete</a></section>');
        timerNum += 1;
    }
});

// Global timer reset
$('#reset-all').live('click', function () {
    for (x = 1; x <= timerNum; x++) {
        timer[x] = new Timer();
        $("#s" + x + " #control").text('Start');
        $("#s" + x + " #control").removeClass();
        $("#s" + x + " #control").addClass("restart");
    }
});

// Start timer
$('.start').live('click', function () {
    $(this).text('Pause');
    $(this).removeClass("start");
    $(this).addClass("pause");
    var theParent = $(this).closest('section').attr('id');
    var num = theParent.substr(1);
    timer[num].start(0, 0, 0);
});

// Pause timer
$('.pause').live('click', function () {
    $(this).text('Start');
    $(this).removeClass("pause");
    $(this).addClass("restart");
    var theParent = $(this).closest('section').attr('id');
    var num = theParent.substr(1);
    timer[num].stop();
});

// Restart timer
$('.restart').live('click', function () {
    $(this).text('Pause');
    $(this).removeClass("restart");
    $(this).addClass("pause");
    var theParent = $(this).closest('section').attr('id');
    var num = theParent.substr(1);
    timer[num].restart();
});

// Rest timer
$('.reset').live('click', function () {
    var theParent = $(this).closest('section').attr('id');
    var num = theParent.substr(1);
    timer[num] = new Timer();
    $('#s' + num + ' #control').text('Start');
    $('#s' + num + ' #control').removeClass();
    $('#s' + num + ' #control').addClass('start');
});

// Delete timer
$('.delete').live('click', function () {
    var theParent = $(this).closest('section').attr('id');
    var num = theParent.substr(1);
    timer[num].stop();
    $('#' + theParent).remove();
});

// Change title promt when title is clicked
$('#timepiecetitle').live('click', function () {
    var theParent = $(this).closest('section').attr('id');
    var num = theParent.substr(1);
    var currentName = $('#timepiecetitle').html();
    var name = prompt('Enter a new name for this time piece', currentName);
    $('#s' + num + ' h2').text(name);
});