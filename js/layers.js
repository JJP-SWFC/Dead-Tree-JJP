function openNewTab(url){
   window.open(url, "_blank").focus(); 
}
addLayer("l", {
	startData() { return {unlocked: true}},
	color: "#ff8888",
	symbol: "L",
	row: "side",
	position: -1,
	layerShown() { return true },
	tooltip: "Link",
    tabFormat: [
		"blank", "blank", "blank",
        ["raw-html", "<h1><a class=rainbow-text href=https://www.justgiving.com/fundraising/jjp-games target=_blank>Donate to my charity fundraiser</a></h1>"],
	],
})
//Add the protons layer
addLayer("p", {
    name: "Protons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    infoboxes: {
        lore: {
            title: "And there was something",
            body: `After just a few seconds, there is now <i>something</i> there, it doesn't do much yet but maybe it will soon...`
        }
    },
    color: "#bd5cac",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "protons", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('p', 12)) mult = mult.times(upgradeEffect('p', 12))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {
            key:"p", description: "P:Reset for protons", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    tabFormat: [
        ["infobox", "lore"],
        "main-display",
        "prestige-button",
        "blank",
        ["toggle", ["p", "beep"]],
        ["display-text", 
            function() { return '^ Can\'t generate points while on, not sure why this is useful but it was funny'}],
        "milestones",
        "blank",
        "blank",
        "upgrades"
    ],
    upgrades: {
        11: {
            title: "Particle accelerator",
            description: "Protons multiply microsecond gain",
            effect() {
                return player[this.layer].points.add(1).pow(0.5)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(1),
        },
        12: {
            title: "Self-boosting magic",
            description: "Protons boost themselves",
            effect() {
                return (player[this.layer].points.add(1).log(2).add(1) * upgradeEffect('p', 15))
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(5),
            unlocked(){return hasUpgrade('p',11)},
        },
        13: {
            title: "Gimme those upgrades",
            description: "Get +3 points per second for every proton upgrade",
            effect() {
                return new Decimal(player.p.upgrades.length).times(3).plus(1)
            },
            effectDisplay() {
                return "+" + format(upgradeEffect(this.layer, this.id))
            },
            cost: new Decimal(20),
            unlocked(){return hasUpgrade('p',12)},
        },
        14: {
            title: "I've got the power",
            description: "Raise microsecond gain to the power of 1.1",
            effect() { return (1.1)},
            effectDisplay(){return format(upgradeEffect(this.layer, this.id))},
            cost: new Decimal(200),
            unlocked(){return hasUpgrade('p',13)},
        },
        15: {
            title: "Some boring upgrade",
            description: "Multiply self-boosting magic by 10",
            effect() {
                if (hasUpgrade('p',15)){
                    return 10
                }
                else{
                    return 1
                }
            },
            cost: new Decimal(1000),
            unlocked(){return hasUpgrade('p',14)},
        },
        21: {
            title: "A new layer?",
            description: "Adds a new layer",
            cost: new Decimal(10000),
            unlocked(){return hasUpgrade('p',15)},
        },
    },

    layerShown(){return true},
    doReset(layer){
    if(layer!="p"){
    let keep = []
    if(hasMilestone("a","1")){keep.push("upgrades")}
    layerDataReset(this.layer,keep)
    }}
})

//Achievements Layer
addLayer("ach", {
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
        clicks:new Decimal(0),
    }},
symbol() {return "«"},
position: 1,
tooltip(){return "Achievements"},
    color: "#ffff00",
    resource: "achievements",
    row: "side",


    requires(){
        return new Decimal(10).tetrate(1e300)},
    
    type: "none",
    exponent: 3,
    gainMult() {
        let gain = new Decimal(1)
        return gain
    },
    gainExp() {
        let gain = new Decimal(1)
        return gain
    },
    achievements: {
        11: {
            name: "Finally got 1 second in",
            done(){return player.points.gte(1000000)},
            tooltip: "Get 1000000 microseconds",
            onComplete(){
                player.ach.points = player.ach.points.add(1)
            },
        },
        21: {
            name: "Wasting your time",
            done(){return player.ach.clicks.gte(200)},
            tooltip: "Waste your time by clicking on the button 200 times",
            onComplete() {player.ach.points = player.ach.points.add(1)},
            style: {
                opacity: function() { 
                    return (hasAchievement("ach", 21) ? 1 : 0)
                },
            }
        }
    },
    clickables: {
        11: {
            display() {return "Does nothing, but shows your clicks: " + player.ach.clicks},
            canClick() {return true},
            onClick(){player.ach.clicks = player.ach.clicks.add(1)},

            },
        },
},)

//Softcaps layer
addLayer("softcaps", {
    name: "Softcaps",
    symbol: "S",
    color: "#c90616",
    requires: new Decimal(10),
    row: "side",
    tooltip: "Softcaps",
    position: 10,
    tabFormat: [
        ["display-text",
            function() {return "I've not put this in yet"}],
        "blank",
        ["row", ["clickables", 11]],

    ],
    clickables: {
        11: {
            display() { return "Free 1000 points, this is only useful if you found this button at the start"},
            canClick() { return true},
            onClick() {openNewTab("https://cntr.click/t8rnJPd")}
        }
    }
})

// Atoms Layer
addLayer("a", {
    name: "Atoms",
    symbol: "A",
    color: "#0EF18C",
    resource: "atoms",
    requires: new Decimal(25000),
    startData() { return {
        unlocked: true,
        points: new Decimal(0),
    }},
    baseResource: "protons",
    baseAmount() {return player["p"].points},
    type: "normal",
    exponent: 0.5,
    infoboxes: {
        lore: {
            title: "Something new?",
            body() {
                if(player.a.total.gte(1)){
                    return `It worked! We made some atoms! Maybe JJP will stop being lazy soon and allow us to smash atoms together!`
                }
                else{
                    return `This "proton" nonsense is getting a bit boring, I wonder if something will happen if I smash them together...`
                }
            }
        }
    },
    layerShown(){
        return (hasUpgrade('p', 21) || player.a.total.gte(1))
    },
    base: new Decimal(2),
    gainMult(){
        mult = new Decimal(1)
        return mult
    },
    gainExp(){
        return new Decimal(1)
    },
    row: 1,
    effect() {
        if (player.a.points >= 99){
            return 1000
        }
        return (player.a.points.add(1).pow(1.5))
    },
    effectDescription() {
        return `which multiply your point gain by ${format(this.effect())}`
    },
    tabFormat: [
        ["infobox", "lore"],
        "main-display",
        "prestige-button",
        "blank",
        "milestones",
        "blank",
        "upgrades"
    ],
    upgrades: {
        11: {
            title: "More point boosts",
            description: "Atoms boost point gain by even more",
            cost: new Decimal(1),
            effect() {
                return (player[this.layer].points.pow(0.5).add(1))
            },
            effectDisplay() {
                return "x" + format(upgradeEffect(this.layer, this.id))
            },
        },
    },
    hotkeys: [
        {
            key:"a", description: "A:Reset for atoms", onPress() {
                if (canReset(this.layer))
                    doReset(this.layer)
            }
        },
    ],
    milestones: {
        1: {
            requirementDescription: "3 Atoms",
            effectDescription: "Keep Proton Upgrades On All Reset",
            done() {return player[this.layer].points.gte(3)},
        },
    },
})
