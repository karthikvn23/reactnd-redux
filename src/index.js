// Library code
function createStore(reducer){
    // The Store would have four parts
    // 1. The state
    // 2. Getting the state
    // 3. Listening to state for changes
    // 4. Update the state

    let state
    let listeners = []

    const getState = () => state

    const subscribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    const dispatch = (action) => {
        state = reducer(state, action)
        listeners.forEach((listener) => listener())
    }

    return {
        getState,
        subscribe,
        dispatch
    }
}

// App code (Reducer code)
// User will decide how to update state based on business needs
function todos(state = [], action){
    if(action.type === 'ADD'){
        return state.concat([action.todo])
    }

    return state
}

const store = createStore()
store.subscribe(
    () => {
        console.log('New state', store.getState())
    }
)
const unsubscribe = store.subscribe(
    () => {
        console.log('Store changed')
    }
)
unsubscribe()

const storeReducer = createStore(todos)
