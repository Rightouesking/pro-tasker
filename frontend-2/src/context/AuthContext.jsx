import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
const UserContext = createContext({
    currentUser: null
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
   const navigate = useNavigate();
   
    useEffect(() => {
    }, []);

    const logout = () => {
        localStorage.removeItem("treetoken");
        setCurrentUser(null);
        navigate("/");
    };

    const values = {
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        logout,
    };
    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
        );
}   

// eslint-disable-next-line react-refresh/only-export-components
export const useUser = () => {
    const context = useContext(UserContext);
    return context;
};

export default UserContext;



// import { backendClient } from "../client/backendclients";
// import { createContext, useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// const UserContext = createContext({
//     currentUser: null
// });

// export const AuthProvider = ({ children }) => {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//    const navigate = useNavigate();
   
//   useEffect(() => {
//     // retrieve token from localstorage
//     const token = JSON.parse(localStorage.getItem("treetoken"));
//     console.log(token, "from userContext");
//     const fetchUser = async () => {
//       // retrieve token from localstorage
//       const token = JSON.parse(localStorage.getItem("treetoken"));
//       console.log(token, "from userContext");
//       // skip fetch if no token is found
//       if (!token) {
//         setLoading(false);
//         return;
//       }
//       // try / catch block to safely handle fetch request
//       try {
//         const res = await backendClient.get("/projects", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         // handle failed fetch response
//         // if (!res.ok) throw new Error("Failed to fetch user");
//         // converts response to json format
//         setCurrentUser(res.data.user);
//       } catch (error) {
//         // log error, then remove invalid token and reset user
//         console.error(error);
//         localStorage.removeItem("treetoken");
//         setCurrentUser(null);
//         navigate("/")
//       } finally {
//         // whether or not fetch succeeds, update loading flag
//         setLoading(false);
//       }
//     };
//     fetchUser();
//   }, []);

//     const logout = () => {
//         localStorage.removeItem("treetoken");
//         setCurrentUser(null);
//         navigate("/");
//     };

//     const values = {
//         currentUser,
//         setCurrentUser,
//         loading,
//         setLoading,
//         logout,
//     };
//     return (
//         <UserContext.Provider value={values}>
//             {children}
//         </UserContext.Provider>
//         );
// }   

// // eslint-disable-next-line react-refresh/only-export-components
// export const useUser = () => {
//     const context = useContext(UserContext);
//     return context;
// };

// export default UserContext;

// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // const AuthContext = createContext();
// // // This hook should be INSIDE the file and exported
// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };
// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [token, setToken] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   useEffect(() => {
// //     const savedToken = localStorage.getItem('token');
// //     if (savedToken) {
// //       setToken(savedToken);
// //     }
// //     setLoading(false);
// //   }, []);
// //   const login = (userData, userToken) => {
// //     setUser(userData);
// //     setToken(userToken);
// //     localStorage.setItem('token', userToken);
// //   };
// //   const logout = () => {
// //     setUser(null);
// //     setToken(null);
// //     localStorage.removeItem('token');
// //   };
// //   const value = {
// //     user,
// //     token,
// //     login,
// //     logout,
// //     loading,
// //     isAuthenticated: !!token
// //   };
// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };
// // export default AuthContext;


// // import React, { createContext, useContext, useState, useEffect } from 'react';
// // const AuthContext = createContext();
// // export const useAuth = () => {
// //   const context = useContext(AuthContext);
// //   if (!context) {
// //     throw new Error('useAuth must be used within an AuthProvider');
// //   }
// //   return context;
// // };
// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null);
// //   const [token, setToken] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   useEffect(() => {
// //     // Check for existing token on mount
// //     const savedToken = localStorage.getItem('token');
// //     if (savedToken) {
// //       setToken(savedToken);
// //       // You might want to verify the token here
// //     }
// //     setLoading(false);
// //   }, []);
// //   const login = (userData, userToken) => {
// //     setUser(userData);
// //     setToken(userToken);
// //     localStorage.setItem('token', userToken);
// //   };
// //   const logout = () => {
// //     setUser(null);
// //     setToken(null);
// //     localStorage.removeItem('token');
// //   };
// //   const value = {
// //     user,
// //     token,
// //     login,
// //     logout,
// //     loading,
// //     isAuthenticated: !!token
// //   };
// //   return (
// //     <AuthContext.Provider value={value}>
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };
// // export default AuthContext;
// // import { createContext, useContext, useState, useEffect } from 'react'
// // import axios from 'axios'

// // const AuthContext = createContext()

// // export const AuthProvider = ({ children }) => {
// //   const [user, setUser] = useState(null)
// //   const [loading, setLoading] = useState(true)

// //   const login = async (credentials) => {
// //     const response = await axios.post('/api/users/login', credentials, {
// //       withCredentials: true,
// //     })
// //     setUser(response.data.user)
// //   }

// //   const logout = async () => {
// //     await axios.post('/api/users/logout', {}, { withCredentials: true })
// //     setUser(null)
// //   }

// //   useEffect(() => {
// //     const checkAuth = async () => {
// //       try {
// //         const res = await axios.get('/api/users/me', { withCredentials: true })
// //         setUser(res.data)
// //       } catch (err) {
// //         setUser(null)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }
// //     checkAuth()
// //   }, [])

// //   return (
// //     <AuthContext.Provider value={{ user, login, logout, loading }}>
// //       {children}
// //     </AuthContext.Provider>
// //   )
// // }

// // export const useAuth = () => useContext(AuthContext)
