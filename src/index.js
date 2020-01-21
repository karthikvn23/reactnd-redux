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

    // Dispatch is doing two things
    // 1. Calling the reducer function
    // 2. Calling all the listener functions so that all stores subscribed can get to know about the state
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

const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

// Action Creators
function addTodoAction(todo) {
    return {
        type: ADD_TODO,
        todo
    }
}

function removeTodoAction(id) {
    return {
        type: REMOVE_TODO,
        id
    }
}

function toggleTodoAction(id) {
    return {
        type: TOGGLE_TODO,
        id
    }
}

function addGoalAction(goal) {
    return {
        type: ADD_GOAL,
        goal
    }
}

function removeGoalAction(goal) {
    return {
        type: REMOVE_GOAL,
        goal
    }
}

// App code (Reducer code)
// User will decide how to update state based on business needs
// Basically all business logic is written
// Should be a Pure Function
function todos(state = [], action){
    console.log(state)
    switch (action.type) {
        case ADD_TODO :
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
        case ADD_GOAL:
            return state.concat([action.goal])
        case REMOVE_GOAL:
            return state.filter(
                (goal) => goal.id !== action.id
            )
        default :
            return state
    }
}

function app (state = {}, action) {
    return {
        todos: todos(state.todos, action),
        goals: goals(state.goals, action),
    }
}

// Reducer function is passed while creating a store
const storeWithReducerAndDispatch = createStore(app)

// Listinening to state chagnes: Calling subscribe function and passing a function to it
storeWithReducerAndDispatch.subscribe(
    () => {
        console.log('The new state is', storeWithReducerAndDispatch.getState())
    }
)

// Dispatch --> Used when ever we want to update the state, action(type of event occurring) is passed for performing update
storeWithReducerAndDispatch.dispatch(
    addTodoAction(
        {
            id: 0,
            name: 'Walk the dog',
            complete: false,
        }
    )
)

storeWithReducerAndDispatch.dispatch(
    addTodoAction(
        {
            id: 1,
            name: 'Wash the car',
            complete: false,
        }
    )
)

storeWithReducerAndDispatch.dispatch(
    addTodoAction(
        {
            id: 2,
            name: 'Go to the gym',
            complete: true,
        }
    )
)

storeWithReducerAndDispatch.dispatch(
    removeTodoAction(
        {
            id: 1
        }
    )
)

storeWithReducerAndDispatch.dispatch(
    toggleTodoAction(
        {
            id: 0
        }
    )
)

storeWithReducerAndDispatch.dispatch(
    addGoalAction(
        {
            id: 0,
            name: 'Learn Redux'
        }
    )
)

storeWithReducerAndDispatch.dispatch(
    addGoalAction(
        {
                id: 1,
                name: 'Lose 20 pounds'
            }
    )
)

storeWithReducerAndDispatch.dispatch(
    removeGoalAction(
        {
            id: 0
        }
    )
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