import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

export default function RecipeItems() {
    const recipes = useLoaderData()
    const [allRecipes, setAllRecipes] = useState()
    let path = window.location.pathname === "/myRecipe" ? true : false
    const [favItems, setFavItems] = useState(() => {
    let user = JSON.parse(localStorage.getItem("user"))
    let favKey = `fav_${user?.email}`
    return JSON.parse(localStorage.getItem(favKey)) ?? []
})
    const [isFavRecipe, setIsFavRecipe] = useState(false)
    const navigate=useNavigate()
    console.log(allRecipes)

    useEffect(() => {
        setAllRecipes(recipes)
    }, [recipes])

  useEffect(() => {
    const handleLogin = () => {
        const user = JSON.parse(localStorage.getItem("user"))
        const favKey = `fav_${user?.email}`

        const savedFavs =
            JSON.parse(localStorage.getItem(favKey)) ?? []

        setFavItems(savedFavs)
    }

    const handleLogout = () => {
        setFavItems([])
        setIsFavRecipe(false)
    }

    window.addEventListener("login", handleLogin)
    window.addEventListener("logout", handleLogout)

    return () => {
        window.removeEventListener("login", handleLogin)
        window.removeEventListener("logout", handleLogout)
    }
}, [])

    const onDelete = async (id) => {
        await axios.delete(`https://deploying-recipe-sharing-platform.onrender.com/recipe/${id}`)
            .then((res) => console.log(res))
        setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id))
        let filterItem = favItems.filter(recipe => recipe._id !== id)
        localStorage.setItem(favKey, JSON.stringify(filterItem))
    }

    const favRecipe = (item) => {
    const user = JSON.parse(localStorage.getItem("user"))
    const favKey = `fav_${user?.email}`

    const isAlreadyFav = favItems.some(
        recipe => recipe._id === item._id
    )

    let updatedFavItems

    if (isAlreadyFav) {
        updatedFavItems = favItems.filter(
            recipe => recipe._id !== item._id
        )
    } else {
        updatedFavItems = [...favItems, item]
    }

    setFavItems(updatedFavItems)
    localStorage.setItem(favKey, JSON.stringify(updatedFavItems))
}

    return (
        <>
            <div className='card-container'>
                {
                    allRecipes?.map((item, index) => {
                        return (
                            <div
    key={index}
    className='card'
    onDoubleClick={() => navigate(`/recipe/${item._id}`)}
>
                                <img
    src={
        item.coverImage?.startsWith("http")
            ? item.coverImage
            : `https://deploying-recipe-sharing-platform.onrender.com/images/${item.coverImage}`
    }
    width="120px"
    height="100px"
    alt={item.title}
/>
                                <div className='card-body'>
                                    <div className='title'>{item.title}</div>
                                    <div className='icons'>
                                        <div className='timer'><BsStopwatchFill />{item.time}</div>
                                        {(!path) ? <FaHeart onClick={() => favRecipe(item)}
                                            style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }} /> :
                                            <div className='action'>
                                                <Link to={`/editRecipe/${item._id}`} className="editIcon"><FaEdit /></Link>
                                                <MdDelete onClick={() => onDelete(item._id)} className='deleteIcon' />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}