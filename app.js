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
const randomDish=document.getElementById("randomDish")
function displayRandomMeal(mealData) {
    randomDish.innerHTML = ''
    const mealName = document.createElement('h2')
    mealName.textContent = mealData.meals[0].strMeal
    const mealImage = document.createElement('img')
    mealImage.src = mealData.meals[0].strMealThumb
    randomDish.appendChild(mealImage)
    randomDish.appendChild(mealName)
}
fetchRandomMeal()

const searchBox=document.getElementById("category")
async function fetchMealsByCategory() {
    try {
        category=searchBox.value
        let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        let res = await data.json();
        console.log(res);
        displayMeals(res);
    } catch (error) {
        console.log(error);
    }
}
fetchMealsByCategory()


searchBox.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
    fetchMealsByCategory()
}
})


const searchResult=document.getElementById("searchResult")

function displayMeals(mealsData) {
    searchResult.innerHTML = '';

    if (mealsData.meals) {
        mealsData.meals.forEach(meal => {
            const mealDiv = document.createElement('div');
            mealDiv.setAttribute("class","mealDivBox")
            const mealName = document.createElement('h3');
            mealName.textContent = meal.strMeal;
            const mealImage = document.createElement('img');
            mealImage.src = meal.strMealThumb;
            mealImage.alt = meal.strMeal;
            
            mealDiv.appendChild(mealImage);
            mealDiv.appendChild(mealName);
            searchResult.appendChild(mealDiv);
        });
    } else {
        const noMealsMessage = document.createElement('p');
        noMealsMessage.innerText = 'No meals found for the selected category.';
        searchResult.appendChild(noMealsMessage);
    }
}