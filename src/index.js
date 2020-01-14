function createStore(){
    // The Store would have four parts
    // 1. The state
    // 2. Getting the state
    // 3. Listening to state for changes
    // 4. Update the state

    let state

    const getState = () => state

    return {
        getState
    }
}