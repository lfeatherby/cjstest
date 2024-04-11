console.log("testing");
import Color from "https://colorjs.io/dist/color.js";
let green = new Color("lch", [80, 90, 120]);
let cssColor = green.display();
cssColor.color.inGamut();
