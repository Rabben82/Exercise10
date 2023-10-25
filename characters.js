let userInput;

const inputField = document.querySelector('#addcharacter');
const output = document.querySelector('#output-characters');
const searchButton = document.querySelector('#add-button');

inputField.addEventListener('change', function (){
    userInput = inputField.value;
    
});

searchButton.addEventListener('click', function(){
    GetApi(userInput);
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        userInput = inputField.value;
        event.preventDefault();
        GetApi(userInput);
    }
});

function GetApi(userInput) {
    fetch(`https://www.swapi.tech/api/people/?name=${userInput}`, {
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
        console.log(data); // Log the entire API response for inspection

        output.innerHTML = ''; // Clear the existing content

        if(data.result.length > 0)
        {
            data.result.forEach(result => {
                output.rows = '5';
                const { name, height, mass, gender, hair_color } = result.properties;
                if(data.result.length > 1)
                {
                    output.rows = '11';
                }
                output.innerHTML += `Namn: ${name}\nHeight: ${height}\nMass: ${mass}\nGender: ${gender}\nHair Color: ${hair_color}\n\n`;
                
            })
        }
         else{
            output.innerHTML = 'Character not found';
         }   
    })
    .catch(err => console.log(err));
}
