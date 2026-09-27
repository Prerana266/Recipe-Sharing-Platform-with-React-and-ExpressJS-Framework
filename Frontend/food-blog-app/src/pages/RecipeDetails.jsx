import React, { useLayoutEffect } from 'react'
import profileImg from '../assets/profile.png'
import food from '../assets/foodRecipe.png'
import { useLoaderData, useNavigate } from 'react-router-dom'

export default function RecipeDetails() {
   const recipe = useLoaderData()
    const navigate = useNavigate()

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    console.log(recipe)
    console.log(recipe)
   
  return (
   <>
    <div className='outer-container'>
        <div className='profile'>
            <img src={profileImg} width="50px" height="50px"></img>
            <h5>{recipe.email}</h5>
        </div>
        <h3 className='title'>{recipe.title}</h3>
        <img
    src={
        recipe.coverImage?.startsWith("http")
            ? recipe.coverImage
            : `https://deploying-recipe-sharing-platform.onrender.com/images/${recipe.coverImage}`
    }
    width="220px"
    height="200px"
    alt={recipe.title}
/>
        <div className='recipe-details'>
            <div className='ingredients'><h4>Ingredients</h4><ul>{recipe.ingredients.map(item=>(<li>{item}</li>))}</ul></div>
            <div className='instructions'><h4>Instructions</h4><span>{recipe.instructions}</span></div>
        </div>
    </div>
   </>
  )
}