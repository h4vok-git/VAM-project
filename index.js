

window.onload=function(){
    var nameInput = document.getElementById('searchInput');
    document.querySelector('form.seach-form').addEventListener('submit', function (e) {
        
        //printCollectionInfo(nameInput.value.trim());
        var theSearchResultRecord = printCollectionInfo(nameInput.value.trim());
        document.getElementById("demo").innerHTML = theSearchResultRecord;
        console.log(nameInput.value); 
        //prevent the normal submission of the form
        e.preventDefault();

           
    });

   
    // a function that fetches URL and stores the json data into a variable and prints it
    async function printCollectionInfo(searchterm) {
        if (!searchterm) {
            alert("please enter a valid search term");
        }
        else {
        //creates variable
        var collectionInfo = "initial";  
        //URI of collection                               
        fetch('https://api.vam.ac.uk/v2/objects/search?q='+searchterm+'&order_sort=asc&page=1&page_size=15')   //await is used incorrectly here refer to week 1.5
        .then(response => response.json())
        .then(data => {
            collectionInfo = data;
            //print search results to console
            console.log(collectionInfo);
            displayCollection(data);
        })
            
        }
    }
    
    // prints the 2nd record in the array 
    function displayCollection(data){
        const name = data.records[1];
        console.log(name);
        console.log(name.systemNumber)
        //innerhtml is unsafe 
        document.getElementById("demo1").innerHTML = name.systemNumber + " " + name.objectType + " " + name._primaryTitle;
        document.getElementById("picturelink").innerHTML = name._images._primary_thumbnail;


    }
    
    








/*

    // test code below for debugging purposes




     // prints the search term to console
     function searchQuery() {
        var input = document.getElementById("searchInput").value;
        console.log(input);
    }

    // test section of code that searches for china
    fetch("https://api.vam.ac.uk/v2/objects/search?q=china&order_sort=asc&page=1&page_size=15")
    .then(response => response.json())
    .then((json) => console.log(json))

    // test section of code that searches for specific ID
    /* fetch("https://api.vam.ac.uk/v2/museumobject/O828146")
    .then((response) => response.json())
    .then((json) => console.log(json));
    */
    
    

}




