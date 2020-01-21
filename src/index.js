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
// Basically all business logic is written
// Should be a Pure Function
function todos(state = [], action){
    console.log(state)
    switch (action.type) {
        case 'ADD_TODO' :
            return state.concat([action.todo])
        case REMOVE_TODO :
            return state.filter(
                (todo) => todo.id !== action.id
            )
        case TOGGLE_TODO :
            return state.map(
                (todo) => todo.id !== action.id ? todo  :
                    Object.assign({},  todo, {  complete: !todo.complete})
            )
        default :
            return state
    }
}

function goals(state = [], action){
    switch (action.type) {
        case 'ADD_GOAL':
            return state.concat([action.goal])
        case 'REMOVE_GOAL':
            return state.filter(
                (goal) => goal.id !== action.id
            )
        default :
            return state
    }
}

// Reducer function is passed while creating a store
const storeWithReducerAndDispatch = createStore(todos)

// Listinening to state chagnes: Calling subscribe function and passing a function to it
storeWithReducerAndDispatch.subscribe(
    () => {
        console.log('The new state is', storeWithReducerAndDispatch.getState())
    }
)

// Dispatch --> Used when ever we want to update the state, action(type of event occurring) is passed for performing update
storeWithReducerAndDispatch.dispatch(
        {
            type: 'ADD_TODO',
            todo:{
                id: 0,
                name: 'Learn Redux',
                complete: false
            }
        }
)

// const store = createStore()
// store.subscribe(
//     () => {
//         console.log('New state', store.getState())
//     }
// )
// const unsubscribe = store.subscribe(
//     () => {
//         console.log('Store changed')
//     }
// )
// unsubscribe()