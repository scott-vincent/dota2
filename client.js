var serverUrl = "http://localhost:8080";

function makeHeroHtml(hero) {
    var html = "<div>"
        + "<span class='table-col'>" + hero.name + "</span>"
        + "<span class='table-col'>" + hero.attr + "</span>"
        + "<span class='table-col'>" + hero.str + "</span>"
        + "</div>";
    return html;
}

function showStats(data) {
    $("#hero-count").html(data.length);

    if (data.length > 0) {
        $("#heroes").html(makeHeroHtml(data[0]));
        for (var i = 1; i < data.length; i++) {
            $("#heroes").append(makeHeroHtml(data[i]));
        }
    }
}

function showError(error) {
    var errMsg;
    if (error.status === 0) {
        errMsg = "The server is not running.";
    }
    else {
        errMsg = "Error " + error.status + ": " + error.statusText;
    }
    $("#error").html("Could not get data from the server. " + errMsg);
    $("#error-banner").show();
}

function getStats() {
    $.ajax({
        url: serverUrl,
        success: function(data) {
            showStats(data);
        },
        error: function(error) {
            showError(error);
        }
    });
}

$(document).ready(function() {
    $("#error-banner").hide();
    getStats();
});