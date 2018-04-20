const DOMNodeCollection = require('./dom_node_collection.js');

$l = arg => {
  let array;
  if (arg instanceof HTMLElement) {
    array = [arg];
    return new DOMNodeCollection(array);
  } else if (typeof arg === "string") {
    array = Array.from(document.querySelectorAll(arg));
    return new DOMNodeCollection(array);
  } else if (typeof arg === "function") {
    const queue = [];
    queue.push(arg);

    let stateCheck = setInterval(() => {
      if (document.readyState === 'complete') {
          clearInterval(stateCheck);
          while (queue.length > 0) {
            queue.shift()();
          }
      }
    }, 100);
  }

};

$l.extend = (...args) => {

};
