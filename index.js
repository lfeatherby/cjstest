
const app = document.getElementById('root');
var multi = document.getElementById("multi");
var pic = document.createElement('img');
var colorPickerG = new iro.ColorPicker('#pickerG');
var colour1 = '';
var colour2 = '';
var currentColour = '';
var currentMode = '';
var currentCount = '';

$(document).ready(function () {
    $(".s-nav button").click(function () {
        $(".s-nav button").removeClass("active");
        $(this).addClass("active");
    });
    $("#resetALL").click(function () {
        $(":text").val("");
    });
    $(".num-nav button").click(function () {
        currentCount = $(this).text().charAt(0);
        $(".num-nav button").removeClass("active");
        $(this).addClass("active");
    });
    $(".s-nav button").click(function () {
        currentMode = $(this).text();
    });
    $("#numSteps").on("input", function () {
        $("#stepsVal").text($(this).val());
        currentCount = $(this).val();
    });
});

colorPickerG.on(['input:end'], function (color) {
    // log the current color as a HEX string
    var request = new XMLHttpRequest()
    currentColour = color.hexString.slice(1)
    multi.innerHTML = ''
    // Open a new connection, using the GET request on the URL endpoint
    //currentMode = document.getElementById('mode').value
    //currentCount = document.getElementById('count').value
    var full = 'https://www.thecolorapi.com/id?hex=' + currentColour;
    console.log(full);
    request.open('GET', full, true)



    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        //console.log(data)
        pic.src = data.image['bare']
        multi.appendChild(pic);
    }

    // Send request
    request.send()
});

function submit(event) {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()
    var x = event.target;
    currentColour = document.getElementById('colour').value
    multi.innerHTML = ''
    // Open a new connection, using the GET request on the URL endpoint
    currentColour = document.getElementById('colour1').value
    //currentMode = document.getElementById('mode').value
    //currentCount = document.getElementById('count').value
    var full = 'https://www.thecolorapi.com/scheme?hex=' + currentColour + '&mode=' + currentMode + '&count=' + currentCount;
    console.log(full);
    request.open('GET', full, true)

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        //console.log(data)

        for (var i = 0; i < data.count; i++) {
            var pic = document.createElement('img')
            pic.src = data.colors[i].image['bare']
            multi.appendChild(pic);
        }
    }

    // Send request
    request.send()

}

function on1() {
    document.getElementById("startOverlay").style.display = "block";
}

function on2() {
    document.getElementById("endOverlay").style.display = "block";
}

function off() {
    var overlays = document.getElementsByClassName("overlay");
    for (var j = 0; j < overlays.length; j++) {
        overlays[j].style.display = "none";
    }
}

function reset() {
    multi.innerHTML = ''
}