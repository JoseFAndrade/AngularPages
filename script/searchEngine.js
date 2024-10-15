console.log("test");
function test(){
  var input = document.getElementById("page-search-input")
  var filter = input.value.toUpperCase();

  //obtain the values from the data
  //var entries = Object.entries(personas);
  var matchingEntries = [];
  for( const[key, value] of Object.entries(personas)){
    if(key.toUpperCase().indexOf(filter) > -1){

      matchingEntries.push(key);
    }
  }
  console.log("matches that were made");
  console.log(filter);
  removeEverything();
  if(!(filter === ""))
    populateResults(matchingEntries);

}

function populateResults(matchingEntries){
  tag = document.getElementsByClassName("personaResults")[0];
  matchingEntries.forEach( entry => {
    let liElement = document.createElement('li');
    liElement.innerText = entry;
    tag.appendChild(liElement);
  })
}

function removeEverything(){
  tag = document.getElementsByClassName("personaResults")[0];
  while(tag.hasChildNodes()){
    tag.removeChild(tag.firstChild);
  }
}

