/*Javascript code aim:
1.Form submission
2.Prevents the page from refreshing
3.Opens a modal to confirm submission
4.Extracts data from the form
5.Updates the access card with extracted data
*/
const form = document.getElementById('form');
var modal = document.getElementById("confirmationModal");
var proceedButton = document.querySelector(".proceed");
var span = document.getElementsByClassName("closeButton")[0];

form.addEventListener('submit', function(event){

    event.preventDefault();//prevent default form submission
    modal.style.display = "block";

    updateCard();
});

    //exiting the modal 
    span.onclick = function(){
    modal.style.display = "none";
    }

    proceedButton.onclick = function(){
    modal.style.display = "none";
    }

    window.onclick = function(event){
    if(event.target == modal){
     modal.style.display = "none";
    }
    }

    function updateCard(){
    //grab the values from the form during submission
    const name = document.getElementById('name').value;
    const faculty = document.getElementById('faculty').value;
    const role = document.getElementById('role').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.value || 'Not selected';
    const uploadedPhoto = document.getElementById('photo');
    
    //display the values on the card
    const today = new Date().toLocaleDateString();
    const randomID = "ACC" + Math.floor(Math.random() + 3750 + Math.random() * 1000);
    document.getElementById('generatedID').innerText = randomID;
    document.getElementById('cardName').innerText = name;
    document.getElementById('cardFaculty').innerText = faculty;
    document.getElementById('cardRole').innerText = role;
    document.getElementById('cardGender').innerText = gender;
    document.getElementById('cardDateIssued').innerText = "Date issued : " + today;

    if(uploadedPhoto.files && uploadedPhoto.files[0]){
        //translate file to displayabe format
        const reader = new FileReader();
        //tells the translator what to do after reading is done
        reader.onload = function(e){
            //set the card photo to the results of the reading
            document.getElementById('displayPhoto').src = e.target.result;
            document.getElementById('displayPhoto').style.display = 'block';
        };
        //read the file as data URL
        reader.readAsDataURL(uploadedPhoto.files[0]);
    }
    //draw barcode on an svg canvas
    JsBarcode("#barcode", randomID, {
        format: "CODE128",
        lineColor : "black",
        width : 2.5,
        displayValue : true,
        fontSize : 16,
        textMargin : 4,
    });
};


