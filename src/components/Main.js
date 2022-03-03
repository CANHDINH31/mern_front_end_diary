import React, { useContext } from "react";
import Form from "./Form";
import PostList from "./PostList";
import AppContext from "./AppContext";
import { Link } from "react-router-dom";

function Main() {
  const { state } = useContext(AppContext);
  const { user } = state;
  return (
    <div>
      {user ? (
        <>
          <Form />
          <PostList />
        </>
      ) : (
        <>
          <p>
            Hello, welcome to your dairy. Thank you for visiting website ❤️ 😘
          </p>
          <br />
          <p>
            <Link to="/login">Now, please login to start.</Link>
          </p>
          <br />
          <p>
            You don't have a account.{" "}
            <Link to="/register">Create account here !!!</Link>
          </p>
        </>
      )}
    </div>
  );
}

export default Main;
