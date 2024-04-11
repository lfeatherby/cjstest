console.log("testing");
let green = new Color("srgb", [0, 0.9, 0]);
let cssColor = green.display();
cssColor.color.inGamut();
console.log(green.toString());
document.getElementById("testt").style.color = green.toString();