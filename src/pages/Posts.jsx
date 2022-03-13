import React, { useEffect, useState } from "react";
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import getPageCount from "../utils/pages";
import PostFilter from "../components/PostFilter";
import PostFrom from "../components/PostFrom";
import PostList from "../components/PostList";
import MyModal from "../components/UI/MyModal/MyModal";
import Loader from "../components/UI/Loader/Loader";
import Pagination from "../components/UI/pagination/Pagination";
import MyButton from "../components/UI/button/MyButton";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSerachedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching( async(limit, page) => {
    const response = await PostService.getAll(limit, page)
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  });

  useEffect(() => {
    fetchPosts(limit, page)
  },[]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  };

  const changePage = (page) =>{
    setPage(page)
    fetchPosts(limit, page)
  };

  return (
    <div className="App">
        <MyButton style={{marginTop: 30}} onClick={() =>setModal(true)}>
            Создать пост
        </MyButton>
        <MyModal visible={modal} setVisible={setModal}>
            <PostFrom create={createPost}/>
        </MyModal>
        <hr style={{margin: '15px 0'}}/>
        <PostFilter filter={filter} setFilter={setFilter} />
        { postError &&
            <h1>Произошла ошибка ${postError}</h1>  
        }
        { isPostsLoading
          ?<div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}><Loader /></div>
          :<PostList remove={removePost} posts={sortedAndSerachedPosts} title={'Список постов'}/>
        }
        <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
    </div>
  )
};
export default Posts;