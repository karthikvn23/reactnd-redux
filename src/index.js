function createStore(){
    // The Store would have four parts
    // 1. The state
    // 2. Getting the state
    // 3. Listening to state for changes
    // 4. Update the state

    let state
    let listeners = []

    const getState = () => state

    subscribe = (listener) => {
        listeners.push(listener)

        return () => {
            listeners = listeners.filter((l) => l !== listener)
        }
    }

    return {
        getState,
        subscribe
    }
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