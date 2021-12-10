let modInfo = {
	name: "His-tree",
	id: "JJPmymod",
	author: "JJP",
	pointsName: "microseconds since the big bang",
	modFiles: ["layers.js", "tree.js"],

	discordName: "JJP's Games Discord",
	discordLink: "https://discord.gg/XGRJp9ZTDb",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}
// Set your version in num and name
let VERSION = {
	num: "0.1",
	name: "His-tree v0.1",
}

let changelog = `<h1>Changelog:</h1><br><br>
	<h2>Current Endgame: 1e9 points</h2><br><br>
	<h3>v0.2.0</h3><br>
		- <b>Added a fundraiser link and tab</b><br>
		- Added an atom milestone<br>
		- Made it so that you have to get an upgrade to get the atoms layer<br>
		- Added a current hardcap to the atoms effect<br>
		- Added some lore<br>
		- Fixed some bugs<br>
	<br><h3>v0.1.1</h3><br>
		- Added 2 upgrades to the protons layer<br>
		- Actually put in and endgame<br>
		- Added the softcaps layer incase it gets used in the future<br>
		- Added basis of the atoms layer<br>
		- Added 1 hidden useless achievement and 1 sneaky reward in the softcaps tab, if you actually read the changelog then free points to you I guess<br>
	<br><h3>v0.1</h3><br>
		- Added big bang layer<br>
	`


let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	if(!player.p.beep){
		return true}
	else{
		return false
	}
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if (hasUpgrade('p', 11)) gain = gain.times(upgradeEffect('p', 11))
	if (hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
	if (hasUpgrade('p', 14)) gain = gain.pow(upgradeEffect('p', 14))
	if (hasUpgrade('a', 11)) gain = gain.times(upgradeEffect('a', 11))
	gain = gain.times(tmp.a.effect)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1e9"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {
	
}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}