//fetchRandomMeal will fetch random meal everytime when it is called.
async function fetchRandomMeal() {
    try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        let res = await data.json()
        // console.log(res)
        displayRandomMeal(res)
    } catch (error) {
        console.log(error)
    }
}
// displayRandomMeal will display the fetched data from the above function.
const randomDish = document.getElementById("randomDish")
const modal = document.getElementById("modal")
const modalMealName = document.getElementById("modalTitle")  
const modalMealImage = document.getElementById("modalImage")  
const modalIngredients = document.getElementById("modalIngredients")

function displayRandomMeal(mealData) {
    randomDish.innerHTML = " "

    const mealName = document.createElement('h2')
    mealName.textContent = mealData.meals[0].strMeal

    const mealImage = document.createElement('img')
    mealImage.src = mealData.meals[0].strMealThumb
    randomDish.addEventListener('click', () => openModal(mealData.meals[0]))

    randomDish.appendChild(mealImage)
    randomDish.appendChild(mealName)
}
//calling the function
fetchRandomMeal()

//making open modal function to open the modal on randomDish click.
function openModal(meal) {
    modalMealName.textContent = meal.strMeal
    modalMealImage.src = meal.strMealThumb

    modalIngredients.innerHTML = " "

    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`]
        const measure = meal[`strMeasure${i}`]

        if (ingredient && measure) {
            const listItem = document.createElement('li')
            listItem.textContent = `${ingredient}: ${measure}`
            modalIngredients.appendChild(listItem)
        }
    }

    const category = document.getElementById("randomCategory")
    category.innerHTML = meal.strCategory

    const area = document.getElementById("randomArea")
    area.innerHTML = meal.strArea

    modal.style.display = "block"
}





const closeModal = document.getElementById("closeBtn")
//making event listener to close button
closeModal.addEventListener('click', () => {
    modal.style.display = "none"
})
//this event listner will close the modal when user clicks outside the modal
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none"
    }
})

const searchBox=document.getElementById("category")
//making a function to fetch meals by category with different api
async function fetchMealsByCategory() {
    try {
        category=searchBox.value
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        let res = await data.json()
        console.log(res)
        displayMeals(res)
    } catch (error) {
        console.log(error)
    }
}


//these two event listeners will trigger the search box when pressed enter or clicked the search icon
searchBox.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        location.href="#categoryHeading"
    fetchMealsByCategory()
}
})
document.getElementById("searchIcon").addEventListener("click",function(event){
    fetchMealsByCategory()
    location.href="#categoryHeading"
})

//this function will fetch meals using id to display the ingredients in the modal
async function fetchMealDetailsById(mealId) {
    try {
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        let res = await data.json()
        return res.meals[0]
    } catch (error) {
        console.log(error)
    }
}



const heading=document.getElementById("categoryHeading")
const searchResult=document.getElementById("searchResult")

//displayMeals will display the results for the searched category.
function displayMeals(results) {
    searchResult.innerHTML = " "
    heading.innerHTML = " "

    if (results.meals) {
        results.meals.forEach(meal => {
            const mealDiv = document.createElement('div')
            mealDiv.setAttribute("class", "mealDivBox")
            const mealName = document.createElement('h3')
            mealName.textContent = meal.strMeal
            const mealImage = document.createElement('img')
            mealImage.src = meal.strMealThumb
            mealDiv.appendChild(mealImage)
            mealDiv.appendChild(mealName)
            searchResult.appendChild(mealDiv)

            heading.innerHTML = `Meals for ${searchBox.value}`

            mealDiv.addEventListener('click', async () => {
                const mealDetails = await fetchMealDetailsById(meal.idMeal)
                openModal(mealDetails)
            })
        })
    } else {
        const error = document.createElement('p')
        error.innerText = 'No meals found for the selected category.'
        searchResult.appendChild(error)
    }
}
const btn = document.getElementById("toggle")
const theme = document.getElementById("theme")
btn.addEventListener("click", function() {
if (theme.getAttribute("href") == "./lightmode.css") {
    theme.href = "./darkmode.css"
    btn.innerText="Light Mode"

} else {
    theme.href = "./lightmode.css"
    btn.innerText="Dark Mode"
}
})
