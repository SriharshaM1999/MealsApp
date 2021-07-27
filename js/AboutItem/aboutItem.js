let mainLeft = document.getElementById('main-left');
let mainRight =document.getElementById('main-right')
let mainRightTop = document.getElementById('main-right-top');
let mainRightMiddle = document.getElementById('main-right-middle');
let mainRightBottom = document.getElementById('main-right-bottom');


async function display(){

  // fetches the data about the item based on item id and display the necessary info

  console.log("display")

   // getting the value of key about present in the local storage
  let idToBeDisplayed = Number(localStorage.getItem('about'));

  console.log(idToBeDisplayed);
  
  console.log(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idToBeDisplayed}`)


  // making the request to get info based on the id;
  let dataReceived = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idToBeDisplayed}`)

  dataReceived = await dataReceived.json();

  console.log(dataReceived)

  addElements(dataReceived.meals[0])


}

function addElements(meal){

    // the mainfunctionality is to create the html elements from json data and to render the elements on the page;

    console.log(meal);

    let image = document.createElement('img');
    let paragraph = document.createElement('p');
    let heading = document.createElement('h2')
    let youtube = document.createElement('a')

    image.setAttribute('src',`${meal.strMealThumb}`)


    mainLeft.appendChild(image);


    heading.innerHTML = meal.strMeal;
    paragraph.innerHTML = meal.strInstructions;
  
    let youtubeName = document.createTextNode("For More Info")

    mainRightTop.appendChild(heading)
    mainRightMiddle.appendChild(paragraph);


    youtube.setAttribute('href',`${meal.strSource}`);
    youtube.appendChild(youtubeName);

    mainRightBottom.appendChild(youtube)

// final removing the about key from the localstorage;
    localStorage.removeItem('about');

}


// added event Listener;
window.addEventListener("load",display);


