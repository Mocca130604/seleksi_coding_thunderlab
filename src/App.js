import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function Todo({ todo, index, markTodo, removeTodo }) {
  return (
    <div className="bg-white rounded-lg p-2 sm:p-4 my-2 sm:my-5">
      <div className="flex justify-between inline-block align-middle grid-cols-4">
        <div className="grid-cols-3 max-w-[65%] h-[fit]">
          <p
            style={{ textDecoration: todo.isDone ? "line-through" : "" }}
            className="truncate ... sm:text-lg text-sm font-shantell text-indigo-600 font-bold"
          >
            {todo.text}
          </p>
        </div>

        <div className="grid grid-cols-2">
          <button
            type="button"
            className="text-white justify-center flex bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg p-2.5 mr-2"
            onClick={() => markTodo(index)}
          >
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z" />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
          <button
            type="button"
            className="text-white justify-center flex bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg p-2.5 mr-2"
            onClick={() => removeTodo(index)}
          >
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
            </svg>
            <span class="sr-only">Icon description</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <div className="inline-block p-5 align-top flex justify-center mt-4 grid grid-cols-4 sm:mt-20 sm:grid-cols-12 gap-4">
      <input
        type="text"
        className="rounded-lg b-1 font-shantell text-indigo-600 border-b-indigo-500 p-2 col-span-3 sm:col-span-11 md:col-span-10 lg:col-span-11"
        placeholder="Input nama kegiatan"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></input>
      <button
        type="submit"
        className="text-white justify-center md:col-span-2 lg:col-span-1 inline-block align-middle flex bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg p-3 mr-2"
        onClick={() => handleSubmit()}
      >
        <svg
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
        <span className="sr-only">Icon description</span>
      </button>
    </div>
  );
}

function Clock() {
  const [date, setDate] = useState(new Date());

  function refreshClock() {
    setDate(new Date());
  }
  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);
  return (
    <span className="text-indigo-600 sm:m-5 font-lilita text-xl md:text-5xl">
      {date.toLocaleTimeString()}
    </span>
  );
}

function App() {
  const [todos, setTodos] = useState([
    {
      text: "Sample",
      isDone: false,
    },
  ]);

  const addTodo = (text) => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const markTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].isDone = true;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
  return (
    <div className="App">
      <body className="App-body">
        <div className="flex justify-start bg-white">
          <h1 className="font-bold text-5xl sm:text-8xl font-lilita m-5 text-indigo-600">
            Todos
          </h1>
        </div>
        <Clock />
        <div className="rounded-t-3xl bg-gradient-to-r from-indigo-600 to-violet-600 min-h-screen mt-5 sm:px-60 md:px-20">
          <FormTodo addTodo={addTodo} />
          <div className="w-full p-2 gap-2 sm:mt-10">
            {todos.map((todo, index) => (
              <Todo
                key={index}
                index={index}
                todo={todo}
                markTodo={markTodo}
                removeTodo={removeTodo}
              />
            ))}
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
