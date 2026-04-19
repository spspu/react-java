import axios from "axios";
import React, { useState, useEffect } from "react";

const api = "http://localhost:8080/api/todoapp";

export const Home = () => {
  const [title, setTitle] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    fetchAllTodo();
  }, []);

  const createTodo = async () => {
    try {
      const { data } = await axios.post(api, { title });
      setTodo([...todo, data]);   // ✅ FIXED
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const fetchAllTodo = async () => {
    try {
      const { data } = await axios.get(api);
      setTodo(data);   // ✅ FIXED
    } catch (error) {
      console.log("catch error: ", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${api}/${id}`);
      setTodo(todo.filter((t) => t.id !== id));
    } catch (error) {
      console.log("catch error: ", error);
    }
  };

  return (
    <div className="w-[50vw] h-[80vh] bg-white rounded-xl">
      <div className="bg-[#758AA2] p-5 flex gap-5 justify-center rounded-t-xl">
        <input
          className="p-2 rounded-md w-full outline-none px-5 text-black"
          placeholder="Add New Task"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          onClick={createTodo}
          className="py-2 px-5 rounded-md bg-[#2B2B52]"
        >
          Add
        </button>
      </div>

      <h1 className="text-black text-center pt-10 font-bold">
        List Of Todo
      </h1>

      <div className="p-5 space-y-2 overflow-y-auto h-[60vh]">
        {todo.map((item) => (
          <div
            key={item.id}
            className="bg-[#99AAAB] p-3 rounded-md flex items-center justify-between"
          >
            <p className="text-gray-900 text-sm">
              {item.title}
            </p>

            <button
              onClick={() => deleteTodo(item.id)}
              className="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-full"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};