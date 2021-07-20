let mainLeft = document.getElementById('main-left');
let mainRight =document.getElementById('main-right')
let mainRightTop = document.getElementById('main-right-top');
let mainRightMiddle = document.getElementById('main-right-middle');
let mainRightBottom = document.getElementById('main-right-bottom');


async function display(){

  console.log("display")

  let idToBeDisplayed = Number(localStorage.getItem('about'));

  console.log(idToBeDisplayed);

  console.log(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idToBeDisplayed}`)

  let dataReceived = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idToBeDisplayed}`)

  dataReceived = await dataReceived.json();

  console.log(dataReceived)

  addElements(dataReceived.meals[0])


}

function addElements(meal){

    console.log(meal);

    let image = document.createElement('img');
    let paragraph = document.createElement('p');
    let heading = document.createElement('h2')
    let youtube = document.createElement('a')

    image.setAttribute('src',`${meal.strMealThumb}`)
    // image.setAttribute('width','80%');
    // image.setAttribute('height','80%');
    // image.style.padding

    mainLeft.appendChild(image);


    heading.innerHTML = meal.strMeal;
    paragraph.innerHTML = meal.strInstructions;
  
    let youtubeName = document.createTextNode("For More Info")

    mainRightTop.appendChild(heading)
    mainRightMiddle.appendChild(paragraph);


    youtube.setAttribute('href',`${meal.strSource}`);
    youtube.appendChild(youtubeName);

    mainRightBottom.appendChild(youtube)


    localStorage.removeItem('about');

}



window.addEventListener("load",display);


