const fs = require('fs')

class Track {
    constructor() {
        this.inventory = {
            shovel: 0,
            skis: 0,
            sled: 0,
            snowblower: 0,
            tires: 0,
        }
        this.success = true
    }
    fillOrder(item, quantity, when) {
        this.inventory[item] = this.inventory[item] - quantity

        if (this.inventory[item] < 0) {
            this.isEmpty(item, when)
        }
    }

    reStock(item, quantity) {
        this.inventory[item] = this.inventory[item] + quantity
    }

    isEmpty(item, timeEmpty) {
        console.log(`OUT OF STOCK ${item} at: ${timeEmpty}`)
        this.success = false
    }

    onComplete() {
        console.log(`SUCCESS`, this.inventory)
    }
}

const main = (args) => {
    
    // Initialize instance of Track Class.
    const ourTrack = new Track()

    //Parse user input JSON files and then combine and sort into one array.
    const restock = JSON.parse(fs.readFileSync(args._[1]))
    const orders = JSON.parse(fs.readFileSync(args._[2]))
    const combine = restock.concat(orders)
    const sorted = combine.sort((a, b) => {
        let aDate
        let bDate
        a.restock_date ? aDate = new Date(a.restock_date) : aDate = new Date(a.order_date)
        b.restock_date ? bDate = new Date(b.restock_date) : bDate = new Date(b.order_date)
        return aDate - bDate
    })

    // Handle each stocking or ordering event, adjusting inventory in the proper order.
    for (let el of sorted) {
        let quantity = parseInt(el.item_quantity)

        el.restock_date ? 
            ourTrack.reStock(el.item_stocked, quantity)
            : ourTrack.fillOrder(el.item_ordered, quantity, el.order_date)
        
        // If any order cannot be fulfilled, exit early.
        if(ourTrack.success === false) {
            return null
        }
    }
    // If all events complete, return success message and remaining inventory.
    return ourTrack.onComplete()
}


module.exports = main