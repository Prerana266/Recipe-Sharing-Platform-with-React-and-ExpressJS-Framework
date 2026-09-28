import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import InputForm from './InputForm'
import { NavLink } from 'react-router-dom'
import { FaUtensils, FaHeart, FaBookOpen } from "react-icons/fa"
import { FiLogIn, FiLogOut } from "react-icons/fi"

export default function Navbar() {

    const [isOpen, setIsOpen] = useState(false)

    let token = localStorage.getItem("token")

    const [isLogin, setIsLogin] = useState(token ? false : true)

    let user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {
        setIsLogin(token ? false : true)
    }, [token])

    const checkLogin = () => {

        if (token) {

            localStorage.removeItem("token")
            localStorage.removeItem("user")

            setIsLogin(true)

            window.dispatchEvent(new Event("logout"))

        } else {

            setIsOpen(true)

        }
    }

    return (
        <>
            <header className="navbar">

                {/* LOGO */}
                <NavLink to="/" className="brand">

                    <span className="brand-icon">
                        <FaUtensils />
                    </span>

                    <span>
                        <strong>Food</strong>Blog
                    </span>

                </NavLink>


                {/* NAVIGATION */}
                <nav className="nav-menu">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive
                                ? "nav-link active"
                                : "nav-link"
                        }
                    >
                        Home
                    </NavLink>


                    <NavLink
                        to={!isLogin ? "/myRecipe" : "/"}
                        onClick={(e) => {

                            if (isLogin) {
                                e.preventDefault()
                                setIsOpen(true)
                            }

                        }}
                        className="nav-link"
                    >
                        <FaBookOpen />
                        My Recipes
                    </NavLink>


                    <NavLink
                        to={!isLogin ? "/favRecipe" : "/"}
                        onClick={(e) => {

                            if (isLogin) {
                                e.preventDefault()
                                setIsOpen(true)
                            }

                        }}
                        className="nav-link"
                    >
                        <FaHeart />
                        Favourites
                    </NavLink>


                    {/* LOGIN / LOGOUT */}
                    <button
                        className="auth-button"
                        onClick={checkLogin}
                    >

                        {isLogin ? (
                            <>
                                <FiLogIn />
                                Login
                            </>
                        ) : (
                            <>
                                <FiLogOut />
                                Logout
                            </>
                        )}

                    </button>

                </nav>

            </header>


            {/* LOGIN MODAL */}
            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>

                    <InputForm
                        setIsOpen={() => setIsOpen(false)}
                    />

                </Modal>
            )}

        </>
    )
}