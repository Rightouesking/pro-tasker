import { useState } from "react";
import { backendClient } from "../client/backendclients";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

function SignInPage() {
  const navigate = useNavigate();

  const { setCurrentUser } = useUser();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await backendClient.post("/users/login", formData);
      console.log(res.data);

      localStorage.setItem("treetoken", JSON.stringify(res.data.token));

      // set currentUser in context
      setCurrentUser(res.data.user);

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-5">Sign In Page</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 max-w-xl mx-auto"
      >
        <h2 className="text-xl font-bold">Sign In</h2>

        <label htmlFor="email" />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="outline p-2 rounded-md w-full"
          required
        />

        <label htmlFor="password" />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="outline p-2 rounded-md w-full"
          required
        />

        <input
          type="submit"
          value="Login"
          className="outline p-2 rounded-md w-full hover:bg-gray-950 hover:text-white hover:cursor-pointer"
          required
        />
      </form>
    </main>
  );
}

export default SignInPage;

// //sign up or login page
// import { useState, useEffect } from "react";
// import { backendClient } from "../client/backendclients";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "../context/AuthContext";
// // import HomeButton from "../components/HomeButton";
// function SignInPage() {
//   // state inputs for navigation & login/create acc functions
//   const navigate = useNavigate();
//   const { setCurrentUser } = useUser();
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [errortext, setErrorText] = useState("");
//   useEffect(() => {}, []);
//   // ensures controlled component bahavior while updating form data
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // prevent default functional behavior
//     setErrorText(""); // clear previous error; if any
//     try {
//       // sends form data to login
//       const res = await backendClient.post("/users/login", formData);
//       console.log(res.data);
//       // store token on client side for authentication
//       localStorage.setItem("treetoken", JSON.stringify(res.data.token));
//       // store user object to enable session management
//       setCurrentUser(res.data.user);
//       // will eventually route to 'User Dashboard' upon successful login
//       // for now route to projects page
//       navigate("/dashboard");
//     } catch (error) {
//       console.log(error);
//       //  check for error response that user info does not exist
//       // optional chaining to safely access nested data
//       const message = error?.response?.data.error || "";
//       if (message === "Cannot find User") {
//         navigate("/register");
//       } else {
//         setErrorText("Login Failed. Please try again.");
//       }
//     }
//   };
//   return (
//     <main className="signin-container">
//       {/* <HomeButton /> */}
//       <h1 className="signin-header">LogIn</h1>
//       <form
//         className="signin-form flex flex-col my-3 gap-2 items-center"
//         onSubmit={handleSubmit}
//       >
//         {errortext && <p className="signin-err">{errortext}</p>}
//         <label htmlFor="email" />
//         {/* controlled data input */}
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <label htmlFor="password" />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <input type="submit" value="LogIn" id="login-btn" />
//       </form>
//       {/* custom button to redirect to create account page if no account exists */}
//       <p className="signin-quest">
//         Don't have an account?{" "}
//         <button
//           className="signin-create-btn"
//           onClick={() => navigate("/register")}
//           style={{ background: "none" }}
//         >
//           Create Account
//         </button>
//       </p>
//     </main>
//   );
// }
// export default SignInPage;

// // import React, { useState } from 'react'
// // import { useNavigate } from 'react-router-dom'
// // import  { useAuth } from '../context/AuthContext.jsx'
// // import { backendClient } from '../client/backendclients.js'

// // const LoginPage = () => {
// //   const { login } = useAuth()
// //   const navigate = useNavigate()
// //   const [form, setForm] = useState({ email: '', password: '' })
// //   const [error, setError] = useState('')

// //   const handleChange = (e) => {
// //     setForm({ ...form, [e.target.name]: e.target.value })
// //   }
// // ///====Handle Login===///
// //   const handleSubmit= async (e) => {
// //     e.preventDefault();
// //     try {
// //       const response = await backendClient.post("/users/login", formData);
// //      login(response.data.user, response.data.token);
// //       navigate("/settings");
// //     } catch (error) {
// //       console.error("Login error:", error);
// //       const msg = error.response?.data?.message || "Invalid email or password.";
// //       setErrorMessage(msg);
// //     }
// //   };

// //   // const handleSubmit = async (e) => {
// //   //   e.preventDefault()
// //   //   try {
// //   //     await login(form)
// //   //     navigate('/dashboard')
// //   //   } catch (err) {
// //   //     setError('Invalid credentials')
// //   //   }
// //   // }

// //   return (
// //     <div>
// //       <h2>Login</h2>
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       <form onSubmit={handleSubmit}>
// //         <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
// //         <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
// //         <button type="submit">Log In</button>
// //       </form>
// //     </div>
// //   )
// // }

// // export default LoginPage
