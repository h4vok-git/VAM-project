
/* fetch("https://api.vam.ac.uk/v2/museumobject/O828146")
  .then((response) => response.json())
  .then((json) => console.log(json));


console.log("hi");
*/

async function printCollectionInfo() {
    //creates variable
    var collectionInfo = "initial";  
     //URI of collection                               
    await fetch('https://api.vam.ac.uk/v2/museumobject/O828146')   
      .then(response => response.json())
      .then(data => {
        collectionInfo = data;
        //print response
        console.log(collectionInfo);                               
      })
  
    //console.log("Response => ", collectionInfo);    
  }

printCollectionInfo(); 