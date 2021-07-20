console.log("I got called")

// Inorder to get the value of the input tag
let searchText = document.getElementById('input');
let displayResults = document.getElementById('display-results');


   function clearData(){

      // the main function is to clear the  result of previous search;

      while ( displayResults.firstChild ){ 
         displayResults.removeChild( displayResults.firstChild );
      }

   }

 


 async function fetchRelated(){

   // removing the previous suggestions

   clearData();


    let currentSearchResult = searchText.value;
    console.log(currentSearchResult)

   // handling the base case
    if(currentSearchResult.length==0){
       console.log("II ggoott ccaalleedd..!!")
       clearData();
       return;
    }



      // fetching data from the url provided

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${currentSearchResult}`);
    let responseJson = await response.json();
    let suggestionLists = responseJson.meals

    // handling the edge case
    if(suggestionLists==null){
       clearData();
       emptyArray =[{strMeal:'No data Found'}]
       addElements(emptyArray, false);
       return;
    }

  

   // adding new elements to suggestions
    addElements(suggestionLists, true);


 }

 function addElements(suggestionLists, flag1){

   // code for adding elements to the suggestion list based on search


   suggestionLists.map((answer)=>{



      const element = document.createElement('div');

      const result = document.createElement('div');
      const Favourites= document.createElement('div');

      const FavouritesButton = document.createElement('button')

      const resultName = document.createTextNode(`${answer.strMeal}`)
      const ButtonName = document.createTextNode(`Add to Favourites`)


     

      result.appendChild(resultName);

      //  code checking whether the current element is already
      // present in local storage
      // returns true if element is not there in localstorage or
      // not added to favourites

     let flag2= checkKeyInLocalStorage(answer.idMeal);




      if(flag1 && flag2){
      FavouritesButton.appendChild(ButtonName);
      FavouritesButton.setAttribute("id", `${answer.idMeal}-${answer.strMeal}`)
      
      // added eventListener;
      FavouritesButton.setAttribute("onclick",`addToFavourites(this.id)`);

      Favourites.appendChild(FavouritesButton)
      }

      element.appendChild(result);
      element.appendChild(Favourites);

      element.setAttribute("class","element")

      displayResults.appendChild(element);



   })
 }



// added EventListener to input tag
searchText.onkeydown = fetchRelated;





// added EventListener to 'Add to Favourites' button

function addToFavourites(id){

 document.getElementById(id).style.display='none'
 let itemId_Name  = id.split('-');
 
 let itemId = itemId_Name[0];
 let nameofItem = itemId_Name[1];



  localStorage.setItem(itemId,nameofItem);

  let keys = Object.keys(localStorage);
  let values =[];
  let keysLength = keys.length;

  for(let i=0;i<keysLength;i++){
         values.push(localStorage.getItem(keys[i]));
  }


  console.log(keys,values);


}

function checkKeyInLocalStorage(key){
   let keys = Object.keys(localStorage);
    
   console.log("keep smiling sahara",keys.includes(key))
   return keys.includes(key)==false;
}



