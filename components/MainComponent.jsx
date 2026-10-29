import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";

function Main(){
     const[token,setToken]=useState(localStorage.getItem("token")||"")
       const [errorOrSucess, setErrorOrSucces] = useState({
    errorMsg: "",
    succesMsg: ""
});
const [post,setPost]=useState({
    title:"",
    post:"",
    file:null
})
const [fetchPost,setFetchPost]=useState([])

     useEffect(() => {
    if (!token) return;

    async function fetchPosts() {
        try {
            const response = await fetch(
                `${backendUrl}/posT`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok || data.error) {
                setErrorOrSucces({
                    errorMsg: data.error || "Failed to fetch posts. Please try again.",
                    succesMsg: ""
                });
                return;
            }

            // Store the retrieved posts in state
            setFetchPost(data.posts);
            console.log(data.posts)

        } catch (e) {
            console.error(e);

            setErrorOrSucces({
                errorMsg: "Unable to connect to the server",
                succesMsg: ""
            });
        }
    }

    fetchPosts();
}, [[token],[fetchPost.length]]);

return(
  <div>Hello</div>
)
}

export default Main;
