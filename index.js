/**
 * Evan Walter
 * This program takes a search parameter and retrieves corresponding data from
 * an api to display on the page.
 */

// --- Search Form Event Listener ---

var searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var textValue = document.querySelector("#search-bar").value;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(xhttp.responseText);
      console.log(res);

      var searchResultsContainer = document.getElementsByClassName(
        "search-results-container"
      )[0];

      // Refresh results
      searchResultsContainer.innerHTML = "";

      // Check for invalid/valid search terms
      if (res.status === "failure") {
        var failMsg = document.createElement("h4");
        failMsg.innerHTML = res.message.replace(textValue, `"${textValue}"`);
        searchResultsContainer.appendChild(failMsg);
      } else {
        // Paired Wines Result
        var pairedWinesEl = document.createElement("div");
        pairedWinesEl.classList.add("paired-wines");
        pairedWinesEl.innerHTML = `
          <h4>Wines to pair with ${textValue}:</h4>
        `;
        res.pairedWines.forEach(function (wine) {
          var wineEl = document.createElement("h4");
          wineEl.innerHTML = titleize(wine);
          pairedWinesEl.appendChild(wineEl);
        });
        searchResultsContainer.appendChild(pairedWinesEl);

        // Pairing Text
        var pairingTextEl = document.createElement("div");
        pairingTextEl.classList.add("pairing-text");
        pairingTextEl.innerHTML = `
          <p>${stringHelper(res.pairingText)}</p>
        `;
        searchResultsContainer.appendChild(pairingTextEl);

        // Product Matches
        var productMatchesEl = document.createElement("div");
        productMatchesEl.classList.add("product-matches");
        var productMatches = res.productMatches[0];
        productMatchesEl.innerHTML = `
          <h4>Product matches: </h4>
          <p>${stringHelper(productMatches.title)}</p>
          <img src=${stringHelper(productMatches.imageUrl)} />
          <p>Price: ${stringHelper(productMatches.price)}</p>
          <p>Score: ${stringHelper(roundHelper(productMatches.score))}</p>
          <p>Average Rating: ${stringHelper(
            roundHelper(productMatches.averageRating)
          )}</p>
          <p>Number of Ratings: ${stringHelper(productMatches.ratingCount)}</p>
          <a href=${stringHelper(
            productMatches.link
          )} target=_blank>Product Link</a>
        `;
        searchResultsContainer.appendChild(productMatchesEl);
      }
    }
  };

  xhttp.open(
    "GET",
    `https://api.spoonacular.com/food/wine/pairing?food=${textValue}&apiKey=919b3550399d4761aced47f4afec99ca`,
    true
  );
  xhttp.send();
});

// --- Helpers ---

// Capitalize each word
function titleize(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// Stringify and eliminate quotes (to display in innerHTML)
function stringHelper(str) {
  return JSON.stringify(str).replace(/\"/g, "");
}

// Round to the nearest hudredth
function roundHelper(num) {
  return Math.round(num * 100) / 100;
}
