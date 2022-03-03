import React, { useCallback, useContext, useEffect, useState } from "react";
import PostItem from "./PostItem";
import "../css/Post.css";
import axios from "axios";
import AppContext from "./AppContext";
function PostList() {
  const { state, dispatch } = useContext(AppContext);
  const { posts, user } = state;
  const [page, setPage] = useState(1);
  const getAllPosts = async () => {
    try {
      const option = {
        method: "get",
        url: `/api/v1/posts/${page}`,
      };
      const respone = await axios(option);
      const posts = respone.data.data.posts;

      dispatch({ type: "GET_ALL_POSTS", payload: posts });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, [page]);

  // const newPosts = posts.map((post) => {
  //   if (user) {
  //     return post.author.name === user.userName
  //       ? {
  //           ...post,
  //           isEditable: true,
  //         }
  //       : post;
  //   } else {
  //     return { ...post, isEditable: false };
  //   }
  // });
  const newPosts = posts.map((post) => {
    return {
      ...post,
      isEditable: true,
    };
  });
  return (
    <section className="post-section">
      <div className="post-list">
        {newPosts.map((post) => (
          <PostItem post={post} key={post._id} />
        ))}
      </div>
      <div className="more">
        {page > 1 && (
          <button
            className="btn"
            onClick={() => {
              setPage(page - 1);
            }}
          >
            PREV
          </button>
        )}
        {posts.length == 5 && (
          <button
            className="btn"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            NEXT
          </button>
        )}
      </div>
    </section>
  );
}

export default PostList;
