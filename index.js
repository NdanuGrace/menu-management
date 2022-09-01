const searchBtn = document.getElementById('search-btn');
const mealItem= document.getElementById('meal');
const titleName= document.querySelector('h3');
const mealName = document.querySelector('.meal-name');
const recipeBtn = document.querySelector('.recipe-btn')
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');






// event listeners
searchBtn.addEventListener('click',getList );
mealItem.addEventListener('click' ,getRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});





// get meal 
function getList(){
    let searchMealName = document.getElementById('search-content').value.trim();

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchMealName}`)
    .then(response => response.json())
    .then(data => {
        let html ="";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                           <div class = "meal-item"  data-id= "${meal.idMeal}">
                            <div class = "meal-image">
                                <img src = "${meal.strMealThumb}" alt="food">
                            </div>
                       
                                <div class = 'meal-name'>
                                    <h3>${meal.strMeal}</h3>
                                    <button type = "click" class = "recipe-btn">View Recipe</button><br><br>
                                    <p><p>
                                </div>
                              </div>
                `
            });
            mealItem.classList.remove('notFound')
        } else{
            html = "Sorry there are no meals!"
            mealItem.classList.add('notFound');
        }
       mealItem.innerHTML = html; 
    }) 
    
} 
 

function getRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealList= e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealList.dataset.id}`)
        .then(response => response.json())
        .then(data => recipeModal(data.meals));
    }
}
    

function recipeModal(meal){
    
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
       
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}














//     e.preventDefault();
//     let mealItem = document.getElementById('meal')
    
//        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
//      .then(response => response.json())
//     .then(data => {

//     })

// }<button type = "click" class = "recipe-btn">View Recipe</button><br><br>
// 













