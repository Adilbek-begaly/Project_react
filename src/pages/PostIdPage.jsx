import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import PostService from "../API/PostService";
import { useFetching } from "../hooks/useFetching";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [fetchPostsById, isLoading, error] = useFetching( async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data);
    });

    const [fetchComments, isComLoading, comError] = useFetching( async (id) => {
        const response = await PostService.getCommentsByPostId(id)
        setComments(response.data);
    });

    useEffect(() => {
        fetchPostsById(params.id)
        fetchComments(params.id)
    }, []);
    return(
        <div>
            <h1>Вы открыли страницу поста c ID = {params.id}</h1>
            { isLoading
                ?<h2 style={{margin:'30px 0' , color:'teal'}}>Идет загрузка...</h2>
                :<div style={{margin:'20px 0'}}>{post.id}. {post.title}</div>
            }
            <h1> Комментари </h1>
            { isComLoading
                ? <h2 style={{margin:'30px 0' , color:'teal'}}>Идет загрузка...</h2>
                : <div>
                    {comments.map((comm) => 
                        <div key={comm.id} style={{marginTop:'20px'}}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}  
                  </div>
            }
        </div>
    )
};
export default PostIdPage;