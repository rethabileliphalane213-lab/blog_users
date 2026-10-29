import { useState,useEffect } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import HomePage from "./homePage";

function Main(){
    const backendUrl=import.meta.env.VITE_BACKEND_URL

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
 const [general, setGeneral] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirm: ""
    });
const [fetchPost,setFetchPost]=useState([])
///////////////////////////////////////////////////////////////////////////////////////
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
}, [[token]]);
///////////////////////////////////////////////////////////////////////////////////////////////////////

 const generalChnage = (event) => {
        setGeneral({
            ...general,
            [event.target.name]: event.target.value
        });
    };

////////////////////////////////////////////////////////////////////////////////////////////////////////////
async function btnClick(e) {
    e.preventDefault();

    if (general.password.trim() === "" || general.confirm.trim() === "") {
        setErrorOrSucces({
            errorMsg: "Passwords cannot be empty",
            succesMsg: ""
        });
        return;
    }

    if (general.password !== general.confirm) {
        setErrorOrSucces({
            errorMsg: "Passwords must match",
            succesMsg: ""
        });
        return;
    }

    setErrorOrSucces({
        errorMsg: "",
        succesMsg: ""
    });

    try {
        const response = await fetch(
            `${backendUrl}/signin/users`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...general })
            }
        );

        const data = await response.json();

        if (!response.ok || data.error) {
            setErrorOrSucces({
                errorMsg: data.error || "Registration failed",
                succesMsg: ""
            });
            return;
        }
        localStorage.setItem("token", data.token);
setToken(data.token);

        if (data.succes) {
            setErrorOrSucces({
                errorMsg: "",
                succesMsg: data.succes
            });
        }
        console.log(data);
    } catch (e) {
        console.error(e);

        setErrorOrSucces({
            errorMsg: "Unable to connect to the server",
            succesMsg: ""
        });
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
return (
    <BrowserRouter>
        {token ? (
            <Routes>
                <Route
                    path="/"
                    element={
                      <HomePage
    posts={fetchPost}
    notification={errorOrSucess}
   
/>
                    }
                />

                
              
            </Routes>
        ) : (
            <Routes>
                <Route
                    path="/"
                    element={
                        <Signin
                            general={general}
                            onChange={generalChnage}
                            onclick={btnClick}
                            notification={errorOrSucess}
                        />
                    }
                />

                <Route
                    path="/login"
                    element={
                        <Login
                            onChange={loghandleChange}
                            onclick={loginClick}
                            notification={errorOrSucess}
                        />
                    }
                />

                <Route
                    path="/recover_password"
                    element={
                        <ForgotPassword
                            onChange={newPsswordChange}
                            onclick={passwordRecovery}
                            notification={errorOrSucess}
                            email={logger.email}
                            otpRecovery={otpRecovery}
                            onClick={sendOtpPin}
                            newPassword={newPassword}
                            showInput={showInput}
                        />
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/login" replace />}
                />
            </Routes>
        )}
    </BrowserRouter>
)

}

export default Main;
