import {$l} from "./main.js";



$l( () => {
  const rootEl = $l('.beer');
  $l.ajax({
    type: 'GET',
    url: "https://api.punkapi.com/v2/beers/1",
    success(data) {
      console.log(data);
    },
    error() {
      console.error("An error occurred.");
    },
  });
  rootEl.append("Hello");
});
