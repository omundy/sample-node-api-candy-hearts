var express = require("express");
var router = express.Router();
var functions = require("../app/functions.js");
let path = require("path");

// test
router.get("/", function (req, res, next) {
	res.json({ message: "hello, world!" });
});

// test => just the text
router.get("/random", (req, res, next) => {
	res.json({ message: functions.getPhrase() });
});

// test => just the svg
router.get("/heart.svg", (req, res, next) => {
	let svg = functions.getSvg();
	res.writeHead(200, {
		"Content-Type": "image/svg+xml",
		"Content-Length": svg.length,
	});
	res.end(svg);
});

// production > return actual png file 
router.get("/heart.png", async function (req, res, next) {
	let img = await functions.addTextOnImage();

	// previously wrote to disk and sent file. Not possible on Vercel
	// res.sendFile(path.join(__dirname, "../app/hearts/svg-image.png"));

	res.writeHead(200, {
		"Content-Type": "image/png",
		"Content-Length": img.length,
	});
	// console.log(img);
	res.end(img);
});

module.exports = router;
