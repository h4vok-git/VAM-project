window.onload=function(){
    var nameInput = document.getElementById('searchInput');

    document.querySelector('form.seach-form').addEventListener('submit', function (e) {

        //prevent the normal submission of the form
        e.preventDefault();

        console.log(nameInput.value);    
    });

    /* fetch("https://api.vam.ac.uk/v2/museumobject/O828146")
    .then((response) => response.json())
    .then((json) => console.log(json));


    console.log("hi");
    */

    async function printCollectionInfo() {
        //creates variable
        var collectionInfo = "initial";  
        //URI of collection                               
        fetch('https://api.vam.ac.uk/v2/museumobject/O828146')   //await is used incorrectly here refer to week 1.5
        .then(response => response.json())
        .then(data => {
            collectionInfo = data;
            //print response
            console.log(collectionInfo);      
        })
    }

    printCollectionInfo(); 



    function searchQuery() {
        var input = document.getElementById("searchInput").value;
        alert(input);
        console.log(input);
    }

    fetch("https://api.vam.ac.uk/v2/objects/search?q=china&order_sort=asc&page=1&page_size=15")
    .then(response => response.json())
    .then((json) => console.log(json));



        
     
    demoPromise();

    
    

}





