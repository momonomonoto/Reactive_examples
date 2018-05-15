let {Subject} = require("rx")

let update = new Subject() // update channel

let ADD = "+"
let SUBTRACT = "-"

let state = update
    .startWith(0)
    .scan((state, action) => {
        switch (action.type) {
            case ADD:
                return state + action.value
            case SUBTRACT:
                return state - action.value
            default:
                throw Error("unsupported action")
        }
    })

state.subscribe(s => console.log("state:", s))

// TEST
update.onNext({type: "+", value: 55}) // +1
update.onNext({type: "+", value: 2}) // +2
update.onNext({type: "-", value: 2}) // -2
update.onNext({type: "-", value: 1}) // -1
