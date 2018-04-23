import {$l} from "./main.js";



$l( () => {
  const rootEl = $l('.beer');
  const crit = ["abv_gt", "abv_lt", "ibu_gt", "ibu_lt", "ebc_gt",
  "ebc_lt", "beer_name", "yeast", "brewed_before", "brewed_after",
  "hops", "malt", "food"];
  rootEl.append("<div class='title-image'></div>");
  $l('.title-image').append("<div class='beer-image'><img src='./beer.png'></img></div>");
  $l('.title-image').append("<div class='title'>Hop to It</div>");
  rootEl.append("<form class='form'>");
  crit.forEach(el => {
    $l('.form').append(`<div class=${el}></div>`);
  });
  const labels = ["Min ABV", "Max ABV", "Min IBU", "Max IBU",
  "Min EBC", "Max EBC", "Beer Name", "Yeast", "Brewed Before (mm-yyyy)",
  "Brewed After (mm-yyyy)", "Hops", "Malt", "Food Pairing"];

  for (let i = 0; i< labels.length; i++) {
    let position = $l('.form').find('div').nodes;
    $l(position[i]).append(`<label>${labels[i]}</label>`);
  }

  $l('.form').find('div').append("<input type='text'></input>");
  $l('.form').append("<input type='submit' value='search' class='search-button'></input>");
  rootEl.append("<ul class ='beer-list'>");
  let beerList = [];

  $l('.form').on('submit', (e) =>{
    e.preventDefault();
    let dataVals = {};
    $l('.form').find('div').nodes.forEach(node => {
      let k = $l(node).attr("class");
      let v = $l(node).find('input').val();
      v = v.split(" ").join("_");
      if (v !== "") dataVals[k] = v;
    });

    $l.ajax({
      type: 'GET',
      data: dataVals,
      url: "https://api.punkapi.com/v2/beers",
      success(data) {
        beerList = [];
        const arr = JSON.parse(data);
        $l('.beer-list').find('li').remove();
        for (let i=0; i < arr.length; i++) {
          beerList.push(arr[i].name);
        }
        beerList.forEach(beer =>{
          $l('.beer-list').append(`<li>${beer}</li>`);
        });
        $l('.form').find("[type='text']").val('');
        console.log(data);
      },
      error() {
        console.error("An error occurred.");
      },
    });
  });




});
