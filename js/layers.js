addLayer("p", {
    name: "Protons", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#bd5cac",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "protons", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "P", description: "P: Reset for protons", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    tabFormat: [
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
                return player.points.add(1).log(2).add(1)
            },
            effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
            cost: new Decimal(5),
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
        },
    },
    layerShown(){return true}
})

addLayer("ach", {
    startData() {return {
        unlocked: true,
        points: new Decimal(0),
        clicks:new Decimal(0),
    }},
symbol() {return "«"},
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
    },
    clickables: {
        11: {
            display() {return "Does nothing, but shows your clicks: " + player.ach.clicks},
            canClick() {return true},
            onClick(){player.ach.clicks = player.ach.clicks.add(1)},

            },
        },
})