import {$l} from "./main.js";



$l( () => {
  const rootEl = $l('.beer');
  const crit = ["abv_gt", "abv_lt", "ibu_gt", "ibu_lt", "ebc_gt",
  "ebc_lt", "beer_name", "yeast", "brewed_before", "brewed_after",
  "hops", "malt", "food"];
  rootEl.append("<form class='form'>");
  crit.forEach(el => {
    $l('.form').append(`<div class=${el}></div>`);
  });
  $l('.form').find('div').append("<input type='text'></input>");
  $l('.form').append("<input type='submit' value='search'></button>");
  rootEl.append("<ul class ='beer-list'>");
  let beerList = [];
  $l('.form').on('submit', (e) =>{
    e.preventDefault();
    const abvVal = $l('div.abv_gt > input').val();
    $l.ajax({
      type: 'GET',
      data: {abv_gt: abvVal},
      url: "https://api.punkapi.com/v2/beers",
      success(data) {
        console.log(data);
        beerList = [];
        const arr = JSON.parse(data);
        $l('.beer-list').find('li').remove();
        for (let i=0; i < arr.length; i++) {
          beerList.push(arr[i].name);
        }
        beerList.forEach(beer =>{
          $l('.beer-list').append(`<li>${beer}</li>`);
        });
      },
      error() {
        console.error("An error occurred.");
      },
    });
  });




});
