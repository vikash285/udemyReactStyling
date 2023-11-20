import React, { useState, Fragment } from "react";
import AddUser from "./components/Users/AddUser";
import UsersList from "./components/Users/UsersList";

function App() {
  const [usersList, setUsersList] = useState([]);
  const addUserHandler = (uName, uAge, uCollege) => {
    setUsersList((prevList) => {
      return [
        ...prevList,
        {
          name: uName,
          age: uAge,
          id: Math.random().toString(),
          college: uCollege,
        },
      ];
    });
  };
  return (
    <Fragment>
      <AddUser onAddUser={addUserHandler} />
      <UsersList users={usersList} />
    </Fragment>
  );
}

export default App;
