import { Link } from "react-router-dom";

function Login({ onChange, onclick,notification }) {
    let element

if (notification.errorMsg) {
    element = (
        <h4 className="fixed top-0 left-0 z-[100] w-full border-b border-red-200 bg-red-50 px-6 py-4 text-center text-sm font-semibold text-red-700 shadow-lg">
            {notification.errorMsg}
        </h4>
    )
}

if (notification.succesMsg) {
    element = (
        <h4 className="fixed top-0 left-0 z-[100] w-full border-b border-emerald-200 bg-emerald-50 px-6 py-4 text-center text-sm font-semibold text-emerald-700 shadow-lg">
            {notification.succesMsg}
        </h4>
    )
}
    return (
        <form onSubmit={onclick}>
            <div>
                <h2>Log in here!</h2>
   {element}
                <div>
                    <label htmlFor="email">Enter email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={onChange}
                    />
                </div>

                <div>
                    <label htmlFor="password">Enter your Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={onChange}
                    />
                </div>
            </div>

            <button type="submit">Log In</button>

            <p>
                Don't have an account? <Link to="/">Sign in</Link>
            </p>
            {notification.errorMsg === "Incorrect Password" && (
    <Link to="/recover_password">
        Forgot your password?
    </Link>
)}

        </form>
    );
}

export default Login;