let displayResults = document.getElementById('display-results');


function clearData(){
    
    
    // the main function is to clear the  result of previous search;

    while ( displayResults.firstChild ){ 
       displayResults.removeChild( displayResults.firstChild );
    }

 }

function onLoad(){

    clearData();
    
    let keys = Object.keys(localStorage);
    let keysLength = keys.length;

    console.log(keys.length)

    let values =[];

    for(let i=0;i<keysLength;i++){

            
            values.push(localStorage.getItem(keys[i]));



    }

    console.log(keys, values);

    for(let i=0;i<values.length;i++){

        const element = document.createElement('div');

        const result = document.createElement('div');
        const Favourites= document.createElement('div');
  
        const FavouritesButton = document.createElement('button')
        const moreInfo = document.createElement('a');
        moreInfo.setAttribute('href','./AboutItem.html');

        
        // added eventListener;
        moreInfo.setAttribute("onclick",`addToDisplay(this.id)`);
  
        const resultName = document.createTextNode(`${values[i]}`)
        const ButtonName = document.createTextNode(`Remove to Favourites`)

        moreInfo.appendChild(resultName)
        moreInfo.setAttribute("id", `${values[i]}-${keys[i]}`)

        FavouritesButton.appendChild(ButtonName);
        Favourites.appendChild(FavouritesButton);
        FavouritesButton.setAttribute("id", `${keys[i]}-${values[i]}`)
        FavouritesButton.setAttribute('onclick',`removeFromFavourites(this.id)`);
        result.appendChild(moreInfo);
        
        element.appendChild(result);
        element.appendChild(Favourites);
        element.setAttribute("class","element")

        displayResults.appendChild(element);


    }

}

  function removeFromFavourites(id){

        let itemId = id.split('-')[0];

         localStorage.removeItem(itemId);
    

        onLoad();


}


function addToDisplay(id){

    let itemId  = id.split('-')[1];
 
    localStorage.setItem('about',itemId);
 
 }
 



window.addEventListener("load",onLoad);

