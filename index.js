let response;
let jsonData;
const url = 'https://hotels4.p.rapidapi.com/v2/get-meta-data';
const options = {
  method: 'GET',
  headers: {
		'X-RapidAPI-Key': 'df155ff4femsh864e83f10bfe13ap13cea8jsnc918ce314393',
		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
	}
};

try {
   response = await fetch(url, options);
  if (response.ok) {
   jsonData = await response.json(); // Convert the response to JSON
    console.log(jsonData);
  } else {
    console.error('Failed to fetch data:', response.status, response.statusText);
  }
} catch (error) {
  console.error(error);
}
console.log(jsonData.IN.lastMinuteDealsCardImageUrl);
const area = document.getElementById("area");
const date = document.getElementById("date");
const button = document.getElementById("btn");
const cardContainer = document.getElementById("cardContainer");

// Function to filter the data based on the entered name
function filterDataByName(name) {
    if (!name) {
        return jsonData;
    } else {
        // Filter data to find matching countries by country code
        return Object.keys(jsonData)
            .filter((countryCode) => countryCode.toLowerCase().includes(name.toLowerCase()))
            .reduce((filteredData, countryCode) => {
                filteredData[countryCode] = jsonData[countryCode];
                return filteredData;
            }, {});
    }
}
function displayFilteredData(filteredData) {
    cardContainer.innerHTML = ""; // Clear previous results

    if (Object.keys(filteredData).length === 0) {
        const noResultsMessage = document.createElement("p");
        noResultsMessage.textContent = "No matching countries found.";
        cardContainer.appendChild(noResultsMessage);
    } else {
        for (const countryCode in filteredData) {
            const countryData = filteredData[countryCode];
            const card = document.createElement("div");
            card.classList.add("country-card");
            const img = document.createElement("img");

            img.src= countryData.memberDealCardImageUrl; 
            img.id = "newimg";
            const headingO = document.createElement("h2");
            headingO.innerText = countryData.countryCode;

            const supportPhoneNumber = document.createElement("p");
            supportPhoneNumber.innerText = `Customer review :- ${countryData.tripOverviewHotelXSellAmount}`;
            const time = document.createElement("p");
           time.innerHTML=date.value;
           const rate = document.createElement("p");
           rate.innerHTML= `<i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-solid fa-star"></i>
           <i class="fa-regular fa-star"></i>`;
           rate.id="rating";
           const price = document.createElement("p");
           const tax = document.createElement("p");
            price.innerText="2000$";
            price.id="price";
            tax.innerText="Including taxes & fees";
            card.appendChild(img);
            card.appendChild(headingO);
            card.appendChild(supportPhoneNumber);
            card.appendChild(time);
            card.appendChild(rate);
            card.appendChild(price);
            card.appendChild(tax);
            cardContainer.appendChild(card);
        }
    }
}
button.addEventListener("click", (e) => {
    e.preventDefault();
    const name = area.value;
    const time = date.value;
    const filteredData = filterDataByName(name);
    displayFilteredData(filteredData);
});
displayFilteredData(jsonData);




