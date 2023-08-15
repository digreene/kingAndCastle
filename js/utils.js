//parses a given array to a 2d array 
Array.prototype.parse2d = function () {
    const rows = []
    for (let i = 0; i < this.length; i += 16) {
        rows.push(this.slice(i, i + 16))
    }
    return rows
}

//converts a 2d array into new collision block objects
Array.prototype.createObjectsFrom2D = function () {
    const size = 64;
    const objects = []
    this.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if ((symbol) == 292) {
                objects.push(new CollisionBlock({
                    position: {
                        x: x * size,
                        y: y * size
                    }
                }))
            }
        })
    })
    return objects
}

