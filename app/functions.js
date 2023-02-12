var exports = (module.exports = {});

var words = require("./words.js");
let path = require("path");

exports.getPhrase = () => {
	let verb = words.verbs[Math.floor(Math.random() * words.verbs.length)];
	let noun = words.nouns[Math.floor(Math.random() * words.nouns.length)];
	let phrases = [
		`${capitalizeFirstLetter(verb)} me`, // 2
		`Let's ${verb}`,
		`Nice ${noun}`,
		`Cute ${noun}`,
		`You ${verb} me`, // 3
		`I like your ${noun}`, // 4
		`I want to ${verb} you`, // 5
	];
	let r = Math.floor(Math.random() * phrases.length);
	console.log(phrases);
	return phrases[r];
};
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

const width = 600;
const height = 600;

exports.getSvg = () => {
	const phrase = exports.getPhrase().toUpperCase();
	let words = phrase.split(" ");
	// default
	let svgStr = "";
    let fontSize = 58;
	if (words.length == 1) {
		svgStr = `<text x="50%" y="50%" text-anchor="middle" class="title">${words[0]}</text>`;
	} else if (words.length == 2) {
		svgStr = `
        <text x="50%" y="40%" text-anchor="middle" class="title">${words[0]}</text>
        <text x="50%" y="55%" text-anchor="middle" class="title">${words[1]}</text>
        `;
	} else if (words.length == 3) {
		svgStr = `
        <text x="50%" y="37%" text-anchor="middle" class="title">${words[0]}</text>
        <text x="50%" y="52%" text-anchor="middle" class="title">${words[1]}</text>
        <text x="50%" y="67%" text-anchor="middle" class="title">${words[2]}</text>
        `;
	} else if (words.length == 4) {
		svgStr = `
        <text x="50%" y="37%" text-anchor="middle" class="title">${words[0]} ${words[1]}</text>
        <text x="50%" y="52%" text-anchor="middle" class="title">${words[2]}</text>
        <text x="50%" y="67%" text-anchor="middle" class="title">${words[3]}</text>
        `;
	} else if (words.length == 5) {
		svgStr = `
        <text x="50%" y="37%" text-anchor="middle" class="title">${words[0]} ${words[1]} ${words[2]}</text>
        <text x="50%" y="52%" text-anchor="middle" class="title">${words[3]}</text>
        <text x="50%" y="67%" text-anchor="middle" class="title">${words[4]}</text>
        `;
	}
    console.log(words)

	return `
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
        width="${width}" height="${height}" style="fill: #001;">
        <style>
        .title { fill: #b0669a; font-family: Arial; font-size: ${fontSize}px; font-weight: bold; }
        .group { transform:rotate(-15) translate(-85px,10px) skewX(10deg); }
        </style>
        <!--  test  
        <rect width="100%" height="100%" fill="#ff0000aa"/>
        -->
        <g class="group">
        ${svgStr}
        </g>
    </svg>
    `;
};

const sharp = require("sharp");

// https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp
async function addTextOnImage() {
	try {
		const svgImage = exports.getSvg();
		const svgBuffer = Buffer.from(svgImage);
		const svgPng = await sharp(svgBuffer).png().toBuffer();
		const image = await sharp({
            // create the background
			create: {
				width: width,
				height: height,
				channels: 4,
                background: { r: 255, g: 0, b: 0, alpha: 0 },
				// background: { r: 255, g: 0, b: 0, alpha: 0.7 }, // test
			},
		})
        // add the png and svg on top
			.composite([
				{
					input: path.join(__dirname,"/hearts/heart.png"),
					top: 0,
					left: 0,
				}, {
					input: svgPng,
					top: 0,
					left: 0,
				},
			])
            .tint(tints[Math.floor(Math.random()*tints.length)])
          

        .png()
        .toBuffer()
			sharp(image).toFile("./app/hearts/svg-image.png");
		return image;
	} catch (error) {
		console.log(error);
	}
}

const tints = [
    { r: 210, g: 162, b: 208 }, // purple
    { r: 255, g: 158, b: 11 }, // orange
    { r: 98, g: 204, b: 220 }, // blue
    { r: 251, g: 213, b: 0 }, // yellow
    { r: 95, g: 200, b: 101 }, // green
    { r: 255, g: 199, b: 206 }, // pink
]

exports.addTextOnImage = addTextOnImage;
