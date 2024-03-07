

window.onload=function(){
    var nameInput = document.getElementById('searchInput');
    document.querySelector('form.seach-form').addEventListener('submit', function (e) {
        e.preventDefault();
        try {
        //printCollectionInfo(nameInput.value.trim());
        var theSearchResultRecord = printCollectionInfo(nameInput.value.trim());
        document.getElementById("demo").innerHTML = theSearchResultRecord;
        console.log(nameInput.value); 
        //prevent the normal submission of the form
        } 
        catch (error) {
            console.error("Error:" + error.message);
        }
        

           
    });

   
    // a function that fetches URL and stores the json data into a variable and prints it
    async function printCollectionInfo(searchterm) {
        try {
            if (!searchterm) {
                alert("please enter a valid search term");
            }
            else {
            //creates variable
            var collectionInfo = "initial";  
            //URI of collection                               
            const response = await fetch('https://api.vam.ac.uk/v2/objects/search?q='+searchterm+'&order_sort=asc&page=1&page_size=15');   
            
            if(!response.ok) {
                throw new Error("HTTP fetch error!")
            }
            const data = await response.json();
            collectionInfo = data;

                console.log(collectionInfo);
                displayCollection(data);
                
            }
        }  
        catch (error) {
            console.error("Error" + error.message + "  this may also be due to an invalid search term");
        }
    }
    
    // prints the 2nd record in the array 
    function displayCollection(data){

        // create container for each record 

        const displayElement = document.getElementById("displayResults");

        for (let i = 0; i < data.records. length; i ++) {
            const currentRecord = data.records[i];

            //create div for each record 
            const recordContainer = document.createElement("div");

            //shows name and id number for each item
            console.log(currentRecord);
            console.log(currentRecord.systemNumber, currentRecord.objectType, currentRecord._primaryTitle);

            const recordInfo = document.createElement("p");
            recordInfo.textContent = `${currentRecord.systemNumber} ${currentRecord.objectType} ${currentRecord._primaryTitle}`;
            recordContainer.appendChild(recordInfo);
    

            // Check if the current record has an image URL
        if (currentRecord._images && currentRecord._images._primary_thumbnail) {
            // Create an image element
            const imgElement = document.createElement("img");
            // Set the image source and alt attribute
            imgElement.src = currentRecord._images._primary_thumbnail;
            imgElement.alt = "Collection Image";
            // Append the image element to the record container
            recordContainer.appendChild(imgElement);
        }

        // Append the record container to the display element
        displayElement.appendChild(recordContainer);
        }
        }
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
    
    






