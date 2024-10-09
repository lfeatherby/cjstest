

const app = document.getElementById('root');
var multi = document.getElementById("multi");
var grad = document.getElementById("grad");
var pic = document.createElement('img');
var colourPickerS = new iro.ColorPicker('#pickerS', {
    color: "#ff5005"
});
var colourPickerE = new iro.ColorPicker('#pickerE', {
    color: "#bf00ff"
});
var colour1xyz = [0, 0, 0];
var colour1hex = '';
var colour1rgb = '';
var colour1src = '';
var colour2xyz = [0, 0, 0];
var colour2hex = '';
var colour2rgb = '';
var colour2src = '';
var currentColour = '';
var currentMode = '';
var currentCount = '';
var gradientSteps = 5;
let colour1 = new Color("xyz-d65", colour1xyz);
let colour2 = new Color("xyz-d65", colour2xyz);

$(document).ready(function () {
    $(".s-nav button").click(function () {
        $(".s-nav button").removeClass("active");
        $(this).addClass("active");
    });
    $("#resetALL").click(function () {
        $(":text").val("");
    });
    $(".num-nav button").click(function () {
        $(".num-nav button").removeClass("active");
        $(this).addClass("active");
        currentCount = $(this).text().charAt(0);
        currentColour = colourPickerS.color.hexString.slice(1);
        submit();
    });
    $(".s-nav button").click(function () {
        currentMode = $(this).text();
    });
    $("#numSteps").on("input", function () {
        $("#stepsVal").text($(this).val());
        currentCount = $(this).val();
        gradientSteps = $(this).val();
    });
    $("#numSteps").on("mouseup", function () {
        currentCount = $(this).val();
        currentColour = colourPickerS.color.hexString.slice(1);
        submit();
        var x = getGradient(colour1, colour2, gradientSteps);
        // console.log(x.size);
        showGradient(x);
        console.log(x);
    });
});

colourPickerS.on(['input:end'], function (color) {
    // log the current color as a HEX string
    var request = new XMLHttpRequest();
    currentColour = color.hexString.slice(1);
    colour1hex = color.hexString;
    document.getElementById("box1").style.backgroundColor = colour1hex;
    multi.innerHTML = '';
    // Open a new connection, using the GET request on the URL endpoint
    //currentMode = document.getElementById('mode').value
    //currentCount = document.getElementById('count').value
    var full = 'https://www.thecolorapi.com/id?hex=' + currentColour;
    console.log(full);
    request.open('GET', full, true);



    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        //console.log(data);
        colour1.xyz.x = data.XYZ["X"];
        colour1.xyz.y = data.XYZ["Y"];
        colour1.xyz.z = data.XYZ["Z"];
        console.log(colour1);
        colour1.srgb.r = data.rgb["r"];
        colour1.srgb.g = data.rgb["g"];
        colour1.srgb.b = data.rgb["b"];
        //console.log(colour1);
        colour1src = data.image["bare"];
        console.log(colour1src);
        //pic.src = data.image['bare'];
        //multi.appendChild(pic);
    }

    // Send request
    request.send();
});

colourPickerE.on(['input:end'], function (color) {
    // log the current color as a HEX string
    var request = new XMLHttpRequest();
    currentColour = color.hexString.slice(1);
    colour2hex = color.hexString;
    document.getElementById("box2").style.backgroundColor = colour2hex;
    //colour2 = currentColour;
    multi.innerHTML = '';
    // Open a new connection, using the GET request on the URL endpoint
    //currentMode = document.getElementById('mode').value
    //currentCount = document.getElementById('count').value
    var full = 'https://www.thecolorapi.com/id?hex=' + currentColour;
    console.log(full);
    request.open('GET', full, true);



    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        //console.log(data)
        colour2.xyz.x = data.XYZ["X"];
        colour2.xyz.y = data.XYZ["Y"];
        colour2.xyz.z = data.XYZ["Z"];
        console.log(colour2);
        colour2.srgb.r = data.rgb["r"];
        colour2.srgb.g = data.rgb["g"];
        colour2.srgb.b = data.rgb["b"];
        colour2src = data.image["bare"];
    }

    // Send request
    request.send()
});




function submit() {
    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest()
    multi.innerHTML = ''
    // Open a new connection, using the GET request on the URL endpoint
    //currentMode = document.getElementById('mode').value
    //currentCount = document.getElementById('count').value
    var full = 'https://www.thecolorapi.com/id?hex=' + currentColour;
    //console.log(full);
    request.open('GET', full, true);

    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);

        //pic.src = data.image['bare'];
        //multi.appendChild(pic);

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
    //let col = colour1.to("srgb");
}

function rgbtostring(colour) {
    var rgbstr = "rgb(" + Math.round(colour.srgb[0]) + "," + Math.round(colour.srgb[1]) + "," + Math.round(colour.srgb[2]) + ")";
    return rgbstr;
}

function getGradient(c1, c2, gsteps) {
    grad.innerHTML = '';
    var r = Color.range(c1, c2);
    str1 = "r=" + r;
    console.log(str1);
    //deltaEMethod?
    var stops = Color.steps(r, { space: "xyz", outputSpace: "lch", maxSteps: gsteps, maxDeltaE: 3 });
    str2 = "stops=" + stops;
    console.log(str2);
    // var gradi = c1.steps(c2, {
    //   space: "xyz",
    // outputSpace: "lch",
    // maxDeltaE: 3,
    // maxSteps: gsteps
    // });
    console.log(stops.length);
    var pics = new Set();
    //pics.add(colour1src);
    // Open a new connection, using the GET request on the URL endpoint
    //currentMode = document.getElementById('mode').value
    //currentCount = document.getElementById('count').value
    for (var g = 0; g < stops.length; g++) {
        var request = new XMLHttpRequest();
        currentColour = rgbtostring(stops[g]);
        var full = 'https://www.thecolorapi.com/id?rgb=' + currentColour;
        //console.log(full);
        request.open('GET', full, true);

        request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response);
            //console.log(data);
            var p = document.createElement("img");
            pics.add(data.image["bare"]);


        }

        // Send request
        request.send()
    }
    //pics.add(colour2src);
    return pics;

}

function showGradient(picssrc) {
    for (const x of picssrc.values()) {
        var p = document.createElement("img");
        p.src = x;
        grad.appendChild(p);
    }
}