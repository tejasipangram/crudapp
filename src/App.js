import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import ListCard from "./components/ListCard";
import { GlobalContext } from "./globalContext";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import PaginatedList from "./components/Pagination";
import CreateList from "./components/CreateList";

function App() {
  const [allList, setAllList] = useState([]);
  const [key, setKey] = useState(null);
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotaItems] = useState(0);
  const totalPages = Math.ceil(totalItems / 10);

  //creating a list

  const createList = (title, body) => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        body: body,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const allData = allList;
        allData.unshift(json);
        console.log(allData);

        const data = allData.slice((page - 1) * 10, (page - 1) * 10 + 10);

        setList(data);
        setTotaItems(allList.length);
        setAllList(allData);
      });
  };

  //getting the data from json api
  const getAllData = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((json) => {
        const data = json.slice((page - 1) * 10, (page - 1) * 10 + 10);

        setList(data);
        setTotaItems(json.length);
        setAllList(json);
      });
  };

  //updating a list

  const updateList = async (id, title, body) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          id: 1,
          title: title,
          body: body,
          userId: 1,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    );

    const data = await res.json();

    //updating the data in the array
    const newData = list.map((list, index) => {
      if (list.id === id) {
        list.title = title;
        list.body = body;
      }
      return list;
    });

    setList(newData);

    // setKey(Math.random());
  };

  //deleting a list

  const deleteList = async (id) => {
    await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    });

    const newData = allList.filter((list, index) => {
      return list.id !== id;
    });
    const data = newData.slice((page - 1) * 10, (page - 1) * 10 + 10);

    setList(data);
    setTotaItems(newData.length);
    setAllList(newData);
  };
  useEffect(() => {
    getAllData();
  }, [page, key]);
  return (
    <GlobalContext.Provider
      value={{
        list,
        page,
        setPage,
        totalItems,
        updateList,
        deleteList,
        createList,
      }}
    >
      <div className="App">
        <Header />
        <div className="create">
          <CreateList name={"CREATE"} />
        </div>
        <div className="lists">
          {list.map((list, index) => {
            return (
              <ListCard
                id={list.id}
                key={list.id}
                title={list.title}
                body={list.body}
              />
            );
          })}
        </div>
        <PaginatedList items={totalItems} itemsPerPage={10} />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
