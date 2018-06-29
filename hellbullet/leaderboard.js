/* global diff, DIFF_EASY, DIFF_NORM, DIFF_HARD, DIFF_INSANE */
/* global timer */

var leaderboardata;

function loadleaderboard() {
    leaderboardata = $.parseJSON($.ajax({
        url: "hellbulletleaderboard.json",
        async: false,
        dataType: "json"
    }).responseText);
    
    var div = $('<div></div>').attr('id', 'leaderboard');
    
    $('body').append(div);
}

function getleaderboardata() {
    switch (diff) {
        case DIFF_EASY:
            return leaderboardata.easy;
        case DIFF_NORM:
            return leaderboardata.normal;
        case DIFF_HARD:
            return leaderboardata.hard;
        case DIFF_INSANE:
            return leaderboardata.insane;
    }
}

function getPosInBoard(time) {
    var data = getleaderboardata();
    
    for (var i = 0; i < data.length; i++) {
        if (time > data[i].time) {
            return i;
        }
    }
    
    return -1;
}

function updateLeaderBoardData(index, name, time) {
    var data = getleaderboardata();
    
    for(var i = data.length - 1; i > index; i--) {
        data[i] = data[i - 1];
    }
    
    data[index] = { "name": name, "time": time };
}

function writeleaderboardata() {
    $.ajax({
        url: "update.php",
        data: ({ json: JSON.stringify(leaderboardata) }),
        async: true
    }).responseText;
}

function viewLeaderBoard() {
    $('#optionsholder').hide();
    var div = $('#leaderboard').empty();
    div.append($('<h1></h1>').text('Leaderboard'));
    
    var difficulties = [ "Easy", "Normal", "Hard", "Insane" ];
    difficulties.forEach(function(d) {
        div.append(
            $('<input/>')
                .attr('id', 'rlb' + d.toLowerCase())
                .attr('type', 'radio')
                .attr('name', 'difflb')
                .attr('value', d.toLowerCase())
                .change(updateLBView)
        );
        div.append(d);
    });
    
    switch (diff) {
        case DIFF_EASY:
            $('#rlbeasy').prop("checked", true);
            break;
        case DIFF_HARD:
            $('#rlbhard').prop("checked", true);
            break;
        case DIFF_INSANE:
            $('#rlbinsane').prop("checked", true);
            break;
        default:
            $('#rlbnormal').prop("checked", true);
            break;
    }
    
    div.append(
        $('<table></table>')
            .attr('id', 'leaderboardtable')
    );
    updateLBView();
    
    div.append(
        $('<button></button>')
            .text("Close")
            .on('click', hideLB)
    );
}

function updateLBView() {
    var table = $('#leaderboardtable').empty();
    
    var data;
    switch ($('input[name="difflb"]:checked').val()) {
        case "easy":
            data = leaderboardata.easy;
            break;
        case "insane":
            data = leaderboardata.insane;
            break;
        case "hard":
            data = leaderboardata.hard;
            break;
        default:
            data = leaderboardata.normal;
            break;
    }
    
    var hd = $('<tr></tr>');
    hd.append($('<th></th>').text("Name"));
    hd.append($('<th></th>').text("Time"));
    table.append(hd);
    
    data.forEach(function(d, di) {
        var tr = $('<tr></tr>');
        tr.append($('<td></td>').text((di + 1) + '. ' + d.name));
        tr.append($('<td></td>').text((d.time / 1000) + "s"));
        table.append(tr);
    });
}

function submitScore() {
    var name = $('#nameforlb').val();
    if(name !== "") {
        $('#scoresubmitter').hide();
        updateLeaderBoardData(getPosInBoard(timer.time()), name, timer.time());
    }
                          
    writeleaderboardata();
}

function hideLB() {
    $('#optionsholder').show();
    $('#leaderboard').empty();
}
