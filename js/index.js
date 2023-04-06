//My api key = 276c6e39353bb75f934d98fb78190fb
//My hash key = 60ada66665f400b918739bca32abbaf8
//2nd api key = AIzaSyB1OT4HxQ7_QlsTrnx_T81XqfLYFRxYgAw
const searchHero = document.getElementById("searchHero");
const searchResults = document.getElementById("searchResults");

var favourite_buttons = [];

// for fetching the api thorugh xhr request
searchHero.addEventListener("keyup", function () {
  var xhrRequest = new XMLHttpRequest();
  var searchValue = this.value;
  if (searchValue.length <= 2) {
    searchResults.innerHTML = "";
    return;
  }
  xhrRequest.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      const response = JSON.parse(xhrRequest.responseText);
      if (response.response === "error") {
        searchResults.innerHTML = "";
        return;
      }
      const results = response.results;
      searchResults.innerHTML = "";

      for (let i of results) {
        var li = document.createElement("li");
        li.classList.add("search-item");
        li.innerHTML =
          '<a href="" class="searchResults" id="' +
          i.id +
          '">' +
          i.name +
          '<img src="' +
          i.image.url +
          '" alt="" class="image-size"></a></><div class ="add" id="' +
          i.id +
          '" data-name="' +
          i.name +
          '" data-photo="' +
          i.image.url +
          '"><i id="addFav" class="fa fa-heart"></i></div>';
        searchResults.appendChild(li);
      }

      let resultHeros = document.getElementsByClassName("searchResults");
      for (let j of resultHeros) {
        j.addEventListener("click", function (event) {
          event.preventDefault();
          console.log(this.id);
          localStorage.setItem("heroSelected", this.id);
          location.replace("./heroDetails.html");
        });
      }

      // adds superhero to favorite list
      favourite_buttons = document.getElementsByClassName("add");
      for (let i of favourite_buttons) {
        i.addEventListener("click", function () {
          if (i.innerHTML == '<i id="delFav" class="fa fa-heart"></i>') {
            i.innerHTML = '<i id="addFav" class="fa fa-heart"></i>';
            function remove(value) {
              return this.id != value.id;
            }
            // local storage saver
            let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
            newItems = oldItems.filter(remove.bind(i));
            localStorage.setItem("favHeroes", JSON.stringify(newItems));
            return;
          }
          i.innerHTML = '<i id="delFav" class="fa fa-heart"></i>';
          let favItem = {
            id: this.id,
            name: this.dataset.name,
            photoUrl: this.dataset.photo,
          };
          let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
          oldItems.push(favItem);
          localStorage.setItem("favHeroes", JSON.stringify(oldItems));
        });
      }
    }
  };
  xhrRequest.open(
    "GET",
    "https://www.superheroapi.com/api.php/3383566708344630/search/" +
      searchValue,
    true
  );
  xhrRequest.send();
});
