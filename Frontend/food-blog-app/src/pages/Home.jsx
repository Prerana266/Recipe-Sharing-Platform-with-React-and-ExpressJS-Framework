import React, { useState } from 'react'
import foodRecipe from '../assets/foodRecipe.png'
import RecipeItems from '../components/RecipeItems'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'
import InputForm from '../components/InputForm'
import { FaArrowRight, FaStar } from "react-icons/fa6"
import { FiHeart, FiClock } from "react-icons/fi"

export default function Home() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)

    const addRecipe = () => {
        const token = localStorage.getItem("token")

        if (token) {
            navigate("/addRecipe")
        } else {
            setIsOpen(true)
        }
    }

    return (
        <>
            {/* ================= HERO ================= */}

            <section className="home">

                {/* Decorative background */}
                <div className="hero-glow hero-glow-one"></div>
                <div className="hero-glow hero-glow-two"></div>


                {/* ================= LEFT ================= */}

                <div className="left">

                    <div className="hero-badge">
                        <FaStar />
                        <span>Discover • Cook • Share</span>
                    </div>


                    <h1>
                        Good food,
                        <span>good mood.</span>
                    </h1>


                    <h4>
                        Welcome to a world of flavors! Explore a diverse
                        collection of delicious recipes, from quick and easy
                        meals to gourmet delights. Share your favorite recipes,
                        discover new flavors, and be part of a passionate
                        community that loves good food.
                    </h4>


                    <div className="hero-buttons">

                        {/* SAME FUNCTIONALITY */}
                        <button
                            className="create-recipe-btn"
                            onClick={addRecipe}
                        >
                            Share your recipe
                            <FaArrowRight />
                        </button>


                        {/* DESIGN / SCROLL ONLY */}
                        <button
                            className="explore-btn"
                            onClick={() => {
                                document
                                    .querySelector(".recipe")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    })
                            }}
                        >
                            Explore recipes
                        </button>

                    </div>


                    <div className="hero-stats">

                        <div className="hero-stat">

                            <div className="stat-icon">
                                <FiHeart />
                            </div>

                            <div>
                                <strong>Share</strong>
                                <small>your recipes</small>
                            </div>

                        </div>


                        <div className="hero-stat">

                            <div className="stat-icon">
                                <FiClock />
                            </div>

                            <div>
                                <strong>Quick</strong>
                                <small>easy meals</small>
                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= RIGHT ================= */}

                <div className="right">

                    <div className="food-circle"></div>


                    <div className="food-image-wrapper">

                        <img
                            src={foodRecipe}
                            alt="Delicious food"
                        />

                    </div>


                    {/* Floating card 1 */}

                    <div className="floating-card rating-card">

                        <div className="floating-icon">
                            <FaStar />
                        </div>

                        <div>
                            <strong>Made with love</strong>
                            <small>Every recipe matters</small>
                        </div>

                    </div>


                    {/* Floating card 2 */}

                    <div className="floating-card recipe-card-badge">

                        <span className="mini-dot"></span>

                        <div>
                            <strong>Fresh recipes</strong>
                            <small>Ready to explore</small>
                        </div>

                    </div>

                </div>


                {/* ================= WAVE ================= */}

                <div className="bg">

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1440 320"
                        preserveAspectRatio="none"
                    >

                        <path
                            fill="#fffaf5"
                            fillOpacity="1"
                            d="M0,224L48,202.7C96,181,192,139,288,133.3C384,128,480,160,576,170.7C672,181,768,171,864,154.7C960,139,1056,117,1152,128C1248,139,1344,181,1392,202.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        />

                    </svg>

                </div>

            </section>


            {/* ================= LOGIN MODAL ================= */}

            {isOpen && (
                <Modal onClose={() => setIsOpen(false)}>

                    <InputForm
                        setIsOpen={() => setIsOpen(false)}
                    />

                </Modal>
            )}


            {/* ================= RECIPES ================= */}

            <div className="recipe">

                <RecipeItems />

            </div>

        </>
    )
}