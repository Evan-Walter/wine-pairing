var example = {
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

var searchForm = document.querySelector("#search-form");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      console.log(response);
      var searchResult = document.createElement("div");
      searchResult.classList.add("search-result");
      searchResult.innerHTML = `
        <img src= >
        <h4></h4>
        <p></p>
      `;
    }
  };

  var textValue = document.querySelector("#search-bar").value;
  xhttp.open(
    "GET",
    `https://api.spoonacular.com/food/wine/pairing?food=${textValue}&apiKey=919b3550399d4761aced47f4afec99ca`,
    true
  );
  xhttp.send();
});
