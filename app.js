'use strict';

$(document).ready(function () {
    var addHTML = "";
    $('.js-search-form').submit(function (event) {
        event.preventDefault();
        var userQuery = $('.js-query').val();
        getDataApi(userQuery);
    });

    function getDataApi(userSearch) {
        $.getJSON("https://www.googleapis.com/youtube/v3/search", {
                part: 'snippet',
                key: 'AIzaSyAb_vpzPd09vDWQAounmUNPVGPj-oLOxQc',
                q: userSearch,
                type: 'video',
            },
            function (apiData) {
                console.log(apiData);
                if (apiData.pageInfo.totalResults == 0) {
                    addHTML += '<p>No Results</p>';
                    $('.js-search-results').html(addHTML);
                } else {
                    displaySearch(apiData.items);
                }
            });
    }

    function displaySearch(videosArray) {
        var addHTML = "";
        $.each(videosArray, function (videoArrayKey, videoArrayValue) {
            addHTML += "<li>";
            addHTML += "<p>" + videoArrayValue.snippet.title + "</p>";
            addHTML += "<a href='https://www.youtube.com/watch?v=" + videoArrayValue.id.videoId + "' target='_blank'>";
            addHTML += "<img src='" + videoArrayValue.snippet.thumbnails.medium.url + "'/>";
            addHTML += "</a>";
            addHTML += "</li>";
        });
        console.log("work")
        $('.js-search-results').html(addHTML);
    }
});
