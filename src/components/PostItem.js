import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import AppContext from "./AppContext";

function PostItem({ post }) {
  const { dispatch } = useContext(AppContext);
  const [postToEdit, setPostToEdit] = useState(post);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  let date = new Date(post.createdAt);
  let dateUpdate = new Date(post.updatedAt);
  const updatePost = useCallback(async () => {
    try {
      setOpenEditForm(false);
      const token = localStorage.getItem("token");
      const option = {
        method: "put",
        url: `/api/v1/posts/${post._id}`,
        data: postToEdit,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(option);
      dispatch({
        type: "UPDATE_ONE_POST",
        payload: { ...postToEdit },
      });
    } catch (error) {
      console.log(error.response);
    }
  });
  const deletePost = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const option = {
        method: "delete",
        url: `/api/v1/posts/${post._id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios(option);
      dispatch({ type: "DELETE_ONE_POST", payload: { _id: post._id } });
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div className="post-item">
      <p className="post-content">{post.content}</p>
      <div className="post-footer">
        <div className="post-infors">
          <span>{`${
            date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
          }:${
            date.getMinutes() >= 10
              ? date.getMinutes()
              : "0" + date.getMinutes()
          }:${
            date.getSeconds() >= 10
              ? date.getSeconds()
              : "0" + date.getSeconds()
          }`}</span>
          <span>
            Date:{" "}
            {`${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()}/${
              date.getMonth() + 1 >= 10
                ? date.getMonth() + 1
                : "0" + (date.getMonth() + 1)
            }/${date.getFullYear()}`}
          </span>
          {post.createdAt !== post.updatedAt && (
            <span>
              Update:{" "}
              {`${
                dateUpdate.getDate() >= 10
                  ? dateUpdate.getDate()
                  : "0" + dateUpdate.getDate()
              }/${
                dateUpdate.getMonth() + 1 >= 10
                  ? dateUpdate.getMonth() + 1
                  : "0" + (dateUpdate.getMonth() + 1)
              } - ${
                dateUpdate.getHours() >= 10
                  ? dateUpdate.getHours()
                  : "0" + dateUpdate.getHours()
              }:${
                dateUpdate.getMinutes() >= 10
                  ? dateUpdate.getMinutes()
                  : "0" + dateUpdate.getMinutes()
              }`}
            </span>
          )}
        </div>
        {post.isEditable && (
          <div className="post-edit-delete">
            {openDeleteConfirm ? (
              <>
                <span className="delete-question">Are you sure ?</span>
                <span onClick={() => deletePost()}>Yes</span>
                <span onClick={() => setOpenDeleteConfirm(false)}>No</span>
              </>
            ) : (
              <>
                <span onClick={() => setOpenEditForm(true)}>Edit</span>
                <span onClick={() => setOpenDeleteConfirm(true)}>Delete</span>
              </>
            )}
          </div>
        )}
      </div>
      {openEditForm && (
        <div className="post-edit-form">
          <form className="edit-form">
            <textarea
              name="content"
              id="content"
              className="content"
              type="content"
              placeholder="How do feel today?"
              value={postToEdit.content}
              onChange={(e) => {
                setPostToEdit({ ...postToEdit, content: e.target.value });
              }}
            ></textarea>
            <div className="btn-container">
              <button
                onClick={() => updatePost()}
                className="btn"
                type="button"
              >
                Update
              </button>
              <button
                onClick={() => setOpenEditForm(false)}
                className="btn"
                type="button"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PostItem;
