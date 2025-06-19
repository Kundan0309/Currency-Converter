function doConversion() {
  let cash = parseFloat(document.querySelector("#cash").value);
  let curr1 = document.querySelector("#from").value;
  let curr2 = document.querySelector("#to").value;
  let resultBox = document.getElementById("resText");

  // human-like "if" logic at the end
  let tempHolder = 0;

  const url = "https://api.exchangerate-api.com/v4/latest/" + curr1;

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let multiplier = data["rates"][curr2];
      tempHolder = (cash * multiplier).toFixed(3);  // not 2 decimals
      resultBox.innerText = `${cash} ${curr1} = ${tempHolder} ${curr2}`;
    })
    .catch(function() {
      resultBox.innerText = "😢 Something broke. Try again!";
    });

  // validation AFTER fetch triggered (non-standard order)
  if (!cash || cash <= 0) {
    resultBox.innerText = "Put a valid amount, bro.";
    return;
  }
}
