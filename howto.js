
var inthowto;
var base;
var config = {};

config.base = {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: [
        {name: "diva", states: [
            {name: "default", representation: ""}
        ]},

        {name: "divb", states: [
            {name: "default", representation: ""}
        ]},

        {name: "divc", states: [
            {name: "default", representation: ""}
        ]}
    ]
}

config.inthowto = {
    type: "environment",
    states: [
        {name: "default", representation: ""}
    ],
    locations: function () {
        var locs = [];
        for (var i in howto) {
            locs.push({
                name: "howto" + i,
                sequence: howto[i].sequence,
                states: [
                    {name: howto[i].locName, representation: "<span>" + howto[i].description + "</span>"}
                ]});
        }
        return locs;
    }()
}

$(function() {
    base = new Environment("base");
    loadConfig(base);
    initHowTo();
});

function initHowTo() {
    inthowto = new Environment("inthowto");
    config.inthowto.locations.sort(function(a, b){
        var a1= a.sequence, b1= b.sequence;
        if(a1 == b1) return 0;
        return a1> b1? 1: -1;
    });

    loadConfig(inthowto);
    placeHowTo();
    animateHowTo();
}

function placeHowTo() {
    for(var i in inthowto.locations) {

        var gameHeight = $("#ptotemy-game").outerHeight();
        var gameWidth = $("#ptotemy-game").outerWidth();

        var divId = inthowto.locations[i].states[0].name;

        var divPos = $("#"+divId).position();
        var divTop = divPos.top;
        var divLeft = divPos.left;
        var divHeight = $("#"+divId).outerHeight();
        var divWidth = $("#"+divId).outerWidth();

        var howtoHeight = $("#inthowto .location").eq(i).outerHeight();
        var howtoWidth = $("#inthowto .location").eq(i).outerWidth();

        var placement;
        if((divLeft+divWidth+howtoWidth+10) <= gameWidth)
            placement = "right";
        else if((divLeft-howtoWidth-10) >= 0)
            placement = "left";
        else if((divTop+divHeight+howtoHeight+10) <= gameHeight)
            placement = "bottom";
        else if((divTop-howtoHeight-10) >= 0)
            placement = "top";
        else placement = "center";

        switch(placement) {
            case "top":
                var thisTop = divTop-howtoHeight-5;
                var thisLeft = divLeft;
                if(howtoWidth <= divWidth)
                    thisLeft += parseInt((divWidth-howtoWidth)/2);

                $("#inthowto .location").eq(i).css('top', thisTop);
                $("#inthowto .location").eq(i).css('left', thisLeft);
                break;

            case "left":
                var thisTop = divTop + parseInt(divHeight/2) - parseInt(howtoHeight/2);
                var thisLeft = divLeft-howtoWidth-5;

                $("#inthowto .location").eq(i).css('top', thisTop);
                $("#inthowto .location").eq(i).css('left', thisLeft);
                break;

            case "bottom":
                var thisTop = divTop+divHeight+5;
                var thisLeft = divLeft;
                if(howtoWidth <= divWidth)
                    thisLeft += parseInt((divWidth-howtoWidth)/2);

                $("#inthowto .location").eq(i).css('top', thisTop);
                $("#inthowto .location").eq(i).css('left', thisLeft);
                break;

            case "right":
                var thisTop = divTop + parseInt(divHeight/2) - parseInt(howtoHeight/2);
                var thisLeft = divLeft+divWidth+5;

                $("#inthowto .location").eq(i).css('top', thisTop);
                $("#inthowto .location").eq(i).css('left', thisLeft);
                break;

            case "center":
                $("#inthowto .location").eq(i).css('top', (parseInt(gameHeight-howtoHeight)/2));
                $("#inthowto .location").eq(i).css('left', (parseInt(gameWidth-howtoWidth)/2));
                break;
        }
    }
}

function animateHowTo() {
    var interval = 2500;
    for(var i in inthowto.locations) {
//        $("#inthowto").delay(interval*i).css({background: "rgba(1, 1, 1, 0.8)"}).delay(interval-1000).css({background: "rgba(1, 1, 1, 0)"})
        $("#inthowto .location").eq(i).delay(interval*i).fadeIn().delay(interval-1000).fadeOut();
    }
}