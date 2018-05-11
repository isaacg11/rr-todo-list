import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';

let intitialState = {
    todos: [
        {name: 'mow lawn', day: 'mon', tools: 'lawn mower', id: 1},
        {name: 'wash dishes', day: 'tue', tools: 'sponge', id: 2},
        {name: 'clean laundry', day: 'wed', tools: 'washing machine', id: 3}
    ],
    todoName: '',
    todoDay: '',
    todoTools: '',
    selectedTodo: null
}

const reducer = (state = intitialState, action) => {
    switch(action.type) {
        case 'populateForm':
            return {...state, 
                todoName: action.todoInfo.name,
                todoDay: action.todoInfo.day,
                todoTools: action.todoInfo.tools,
                selectedTodo: action.selectedTodo
            }
        case 'setNameValue':
            return {...state, 
                todoName: action.todoName
            }
        case 'setDayValue':
            return {...state, 
                todoDay: action.todoDay
            }
        case 'setToolsValue':
            return {...state, 
                todoTools: action.todoTools
            }
        case 'updateTodo':
            action.event.preventDefault();
            state.todos.splice((state.selectedTodo - 1), 1);
            state.todos.push({
                name: state.todoName,
                day: state.todoDay,
                tools: state.todoTools
            })
            return state;
        case 'addTodo':
            state.todos.push({
                name: state.todoName,
                day: state.todoDay,
                tools: state.todoTools
            })
            return state;
        default:
            return state;
    }
}

const store = createStore(reducer);

class Todos extends Component {
    render() {
        return (
            <div>
                <h1>Todos</h1>
                <ul>
                    {store.getState().todos.map((td, index) => 
                        <li key={index++}>{td.name} 
                            <button onClick={() => store.dispatch({type: 'populateForm', todoInfo: td, selectedTodo: index++})}>view</button>
                        </li>
                    )}
                </ul>

                <h1>Info</h1>
                <form onSubmit={(e) => store.dispatch({type: 'updateTodo', event: e})}>
                    <div>
                        <input
                            value={store.getState().todoName}  
                            onChange={(e) => store.dispatch({type: 'setNameValue', todoName: e.target.value})}
                            type="text"
                            placeholder="todo name..." />
                    </div>
                    <div>
                        <input
                            value={store.getState().todoDay}  
                            onChange={(e) => store.dispatch({type: 'setDayValue', todoDay: e.target.value})}                         
                            type="text" 
                            placeholder="todo day..."/>
                    </div>
                    <div>
                        <input
                            value={store.getState().todoTools}                          
                            onChange={(e) => store.dispatch({type: 'setToolsValue', todoTools: e.target.value})}                                                  
                            type="text" 
                            placeholder="todo tools..."/>
                    </div>
                    <div>
                        <button>update</button>
                    </div>
                </form>
                <div>
                    <button onClick={() => store.dispatch({type: 'addTodo'})}>save</button>
                </div>
            </div>
        )
    }
}

const r = () => {
    render(
        <Todos />,
        document.getElementById('root')
    )
}

r();

store.subscribe(r)
