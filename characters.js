let userInput;
const url = 'https://www.swapi.tech/api/people/?name=';

const inputField = document.querySelector('#addcharacter');
const output = document.querySelector('#output-characters');
const searchButton = document.querySelector('#search-button');

// Function to handle user input change
inputField.addEventListener('change', function (){
    userInput = inputField.value;
    
});

// Function to initiate the API request when the search button is clicked
searchButton.addEventListener('click', function(){
    GetApi(userInput);
})

// Function to initiate the API request when the Enter key is pressed
document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        userInput = inputField.value;
        event.preventDefault();
        GetApi(userInput);
    }
});

// Function to make the API request and display character information
function GetApi(userInput) {

    const ROW_DEFAULT = 5;
    const ROW_EXTRA = 11;

    fetch(`${url}${userInput}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(res => {
        if (res.ok)
            return res.json();
        throw new Error('Failed to get API');
    })
    .then(data => {
      
        output.innerHTML = ''; 

        if(data.result.length > 0)
        {
            data.result.forEach(result => {

                output.rows = (data.result.length > 1) ? ROW_EXTRA : ROW_DEFAULT;

                const { name, height, mass, gender, hair_color } = result.properties;
                
                output.innerHTML += `Namn: ${name}\nHeight: ${height}\nMass: ${mass}\nGender: ${gender}\nHair Color: ${hair_color}\n\n`;
            })
        }
        else{
            output.innerHTML = 'Character not found';
        }   
    })
    .catch(err => console.error('Error fetching character:', err));
}
