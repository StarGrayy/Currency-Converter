const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
let msg = document.querySelector(".msg");
// Declare fromCurr and toCurr variables
let fromCurr;
let toCurr;

// Populate dropdowns and add event listeners
for (let select of dropdowns) {
    for (code in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = code;
        newOption.value = code;
        if (select.name === "from" && code === "USD") {
            newOption.selected = "selected";
        } else if (select.name === "to" && code === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// Function to update flag
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

// Event listener for button click
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    if (amount.value === "" || amount.value < 1) {
        amount.value = "1";
    }
    let amtVal = amount.value;

    // Update fromCurr and toCurr variables
    fromCurr = document.querySelector(".from select").value.toLowerCase();
    toCurr = document.querySelector(".to select").value.toLowerCase();

    const URL = `${BASE_URL}/${fromCurr}.json`;

    try {
        let response = await fetch(URL);
        if (response.ok) {
            let data = await response.json();
            let rate = data[fromCurr][toCurr];
            console.log(`Conversion rate ${fromCurr} to ${toCurr} is ${rate}`);
            let convertedAmt = amtVal * rate;
            convertedAmt=convertedAmt.toFixed(3);
            console.log(`Converted amount: ${convertedAmt}`);
            msg.innerText=`${amtVal} ${fromCurr.toUpperCase()} = ${convertedAmt} ${toCurr.toUpperCase()}`;
            } else {
            console.error("Failed to fetch data", response.status);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
});

