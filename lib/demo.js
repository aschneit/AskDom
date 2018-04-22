import {$l} from "./main.js";



$l( () => {
  const rootEl = $l('.beer');
  rootEl.append("<form class='abv-form'>");
  $l('.abv-form').append("<input type='text' class='abv-input'></input>");
  $l('.abv-form').append("<input type='submit' value='search'></button>");
  rootEl.append("<ul class ='abv-beer-list'>");
  let beerList = [];
  $l('.abv-form').on('submit', (e) =>{
    e.preventDefault();
    const abvVal = $l('.abv-input').val();
    $l.ajax({
      type: 'GET',
      data: {abv_gt: abvVal},
      url: "https://api.punkapi.com/v2/beers",
      success(data) {
        beerList = [];
        const arr = JSON.parse(data);
        $l('.abv-beer-list').find('li').remove();
        for (let i=0; i < arr.length; i++) {
          beerList.push(arr[i].name);
        }
        beerList.forEach(beer =>{
          $l('.abv-beer-list').append(`<li>${beer}</li>`);
        });
      },
      error() {
        console.error("An error occurred.");
      },
    });
  });




});
