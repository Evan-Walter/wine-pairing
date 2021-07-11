var resExample = {
  pairedWines: ["merlot", "cabernet sauvignon", "pinot noir"],
  pairingText:
    "Merlot, Cabernet Sauvignon, and Pinot Noir are great choices for Steak. After all, beef and red wine are a classic combination. Generally, leaner steaks go well with light or medium-bodied reds, such as pinot noir or merlot, while fattier steaks can handle a bold red, such as cabernet sauvingnon. The Darioush Signature Merlot with a 4.2 out of 5 star rating seems like a good match. It costs about 69 dollars per bottle.",
  productMatches: [
    {
      id: 445574,
      title: "Darioush Signature Merlot",
      description:
        "The moderate 2008 growing season yielded small amounts of mature, highly-concentrated Merlot. The resulting wine offers a profile of dense, expressive dark fruit– black raspberry, cherry and dried fig supported by a tight core of dark cocoa, licorice and cola. Sweet, succulent tannins add textural complexity, while a beautiful, long finish reveals notes of rosemary, cinnamon and graham cracker. Blend: 90% Merlot, 5% Cabernet Sauvignon, 5% Cabernet Franc",
      price: "$68.99",
      imageUrl: "https://spoonacular.com/productImages/445574-312x231.jpg",
      averageRating: 0.8400000000000001,
      ratingCount: 5.0,
      score: 0.7775000000000001,
      link: "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fdarioush-signature-merlot-2008%2F167005",
    },
  ],
};

var failureExample = {
  status: "failure",
  message: "Could not find a wine pairing for seak",
};

var searchResultsContainer = document.getElementsByClassName(
  "search-results-container"
)[0];

var searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var textValue = document.querySelector("#search-bar").value;

  /* var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var res = JSON.parse(xhttp.responseText);
      console.log(res); */
  var res = resExample; // for development without api requests

  // Refresh results
  searchResultsContainer.innerHTML = "";

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
          <a href=${stringHelper(productMatches.link)}>Product Link</a>
        `;
    searchResultsContainer.appendChild(productMatchesEl);
  }
  /*   }
  };

  xhttp.open(
    "GET",
    `https://api.spoonacular.com/food/wine/pairing?food=${textValue}&apiKey=919b3550399d4761aced47f4afec99ca`,
    true
  );
  xhttp.send(); */
});

// Helper functions
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
