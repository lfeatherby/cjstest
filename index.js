console.log("tests2");
let green = new Color("lch", [80, 90, 120]);
let cssColor = green.display();
cssColor.color.inGamut();
