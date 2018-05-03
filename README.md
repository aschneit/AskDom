# AskDOM

AskDOM is a jQuery-inspired JavaScript library enabling easy manipulation of the DOM (Document Object Model). A user can employ it to:

* Create a DOMNodeCollection object from an HTML Element

* Append or remove elements nested within other elements

* Get/set values and attributes on elements, add/remove classes and event listers.

* Set functions to be invoked only after the DOM is fully loaded

* Simplify the process of making HTTP requests to web APIs

[Live Demo](http://aschneit.com/HopsToIt/)


## API

### $l

The wrapper $l creates a DOMNodeCollection object (an array of HTML elements) based on what it is wrapping. It can wrap a CSS selector to select its corresponding elements:

```JavaScript
$l('.title-image').append("this title");

$l('div').removeClass('selected');
```
Or it can wrap an HTML element to give it access to the AskDOM methods, as in the example of 'node' below:

```JavaScript
$l('.form').find('div').nodes.forEach(node => {
  let k = $l(node).attr("class");
  let v = $l(node).find('input').val();
}
```

Finally, it can be used to wrap functions as callbacks that will be only be run once the DOM is fully loaded.

```JavaScript
$l( () => {
  new Demo().run();
});
```

### html

Sets the innerHTML of each element in the DOMNodeCollection to the argument string, or gets the innerHTML of the first node in the collection.

### empty

Removes the innerHTML for each element in the collection

```JavaScript
$l('.info').empty();
```

### append

Adds the argument (a string, HTML element, or DOMNodeCollection) to each node in the collection

```JavaScript
$l('.display').append("<div class='info'></div>");
```

### val

Sets the value attribute for each element in the collection, or gets the value of the first element

```JavaScript
$l('.form').find("[type='text']").val('');
```

### attr

Sets the value for a particular attribute for each element in the collection, or gets the value of the attribute for the first element

```JavaScript
let k = $l(node).attr("class");
```

### addClass, removeClass

Adds/removes the class specified in the argument from each element in the collection

```JavaScript
$l('.info').removeClass('selected');
```

### children, parent

Creates a new DOMNodeCollection of all the child elements of every element in the collection, or a DOMNodeCollection of the parents of each element in the collection, respectively

### find

Creates a DOMNodeCollection of all the elements matching the argument selector that are descendants of each element in the collection

```JavaScript
$l('.form').find('div').append("<input type='text'></input>");
```

### remove

Removes the HTML of all elements in the collection from the DOM and from the collection itself

```JavaScript
$l('.beer-list').find('li').remove();
```

### on, off

Adds the event listener and callback specified in the arguments to each element in the collection, or removes them

```JavaScript
$l('.form').on('submit', (e) =>{
  e.preventDefault();
  let dataVals = {};
  $l('.form').find('div').nodes.forEach(node => {
    let k = $l(node).attr("class");
    let v = $l(node).find('input').val();
    v = v.split(" ").join("_");
    if (v !== "") dataVals[k] = v;
  });
  this.fetchData(dataVals, beerList);
});
```

### $l.ajax

Takes an options hash and merges it with default parameters to create a new XMLHttpRequest object. Appends data parameters to a query string for 'GET' requests and returns 'success' and 'error' callbacks.

```JavaScript
$l.ajax({
  type: 'GET',
  data: dataVals,
  url: "https://api.punkapi.com/v2/beers",
  success(data) {
    beerList = JSON.parse(data);
    $l('.beer-list').find('li').remove();
    beerList.forEach(beer =>{
      $l('.beer-list').append(`<li id=${beer.id}>${beer.name}</li>`);
    });
    $l('.form').find("[type='text']").val('');
    $l('.info').empty();
    $l('.info').removeClass('selected');
    document.getElementById('beer-list').scrollIntoView({behavior: 'smooth'});
    thisClass.displayBeerInfo(beerList);
  },
  error() {
    console.error("An error occurred.");
  },
});
```
