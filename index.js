

window.onload=function(){
    var nameInput = document.getElementById('searchInput');
    document.querySelector('form.search-form').addEventListener('submit', function (e) {
        
        if (nameInput.value.trim()) {
            printCollectionInfo(nameInput.value.trim());
        } else {
            alert("Please enter a valid search term");
        }
        e.preventDefault();
           
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
            const response = await fetch('https://api.vam.ac.uk/v2/objects/search?q='+searchterm+'&order_sort=asc&page=1&page_size=50'); 
            console.log(response);  
            
            if(!response.ok) {
                throw new Error("HTTP fetch error!")
            }
            const data = await response.json();
            collectionInfo = data;

                console.log(data);
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
        //cleans the collection entry after new search term is typed 
        displayElement.innerHTML = "";

        if (data.records.length === 0) {
            // Display a message when no records are found
            const noResultsMessage = document.createElement("p");
            noResultsMessage.classList.add("noResultsMessage");
            noResultsMessage.textContent = "No results found.";
            displayElement.appendChild(noResultsMessage);
        }

        for (let i = 0; i < data.records. length; i ++) {
            const currentRecord = data.records[i];

            //create div for each record 
            const recordContainer = document.createElement("div");
            recordContainer.className="collectionEntry"

            //shows name and id number for each item in CONSOLE
            console.log(currentRecord);
            console.log(currentRecord.systemNumber, currentRecord.objectType, currentRecord._primaryTitle);

            //display text 
            const recordInfo = document.createElement("p");
            //innerHTML was necessary as <br> would appear formatted as string 
            //the very long line below is all the text that is displayed
            recordInfo.innerHTML = `<br><strong>Title</strong>: ${currentRecord._primaryTitle}<br><strong>Object Type</strong>: ${currentRecord.objectType}<br>
            <strong>Origin</strong>: ${currentRecord._primaryPlace}<br><strong>Date</strong>: ${currentRecord._primaryDate}<br><strong>Item Code</strong>: ${currentRecord.systemNumber}<br><br>`;

            recordContainer.appendChild(recordInfo);
    

            // Check if the current record has an image URL
        if (currentRecord._images && currentRecord._images._primary_thumbnail) {
            // Create an image element
            const imgElement = document.createElement("img");
            // Set the image source 
            imgElement.src = currentRecord._images._primary_thumbnail;
            // Append the image element to the record container
            recordContainer.appendChild(imgElement);
        }
        else{
            const emptyImg = document.createElement("img");
            emptyImg.src = "images/empty.jpg";
            recordContainer.appendChild(emptyImg);
            emptyImg.alt = "Placeholder Image";
        }
        // Append the record container to the display element
        displayElement.appendChild(recordContainer);
        }
        }
    }
    
    









    






