const DOMNodeCollection = require('./dom_node_collection.js');

const $l = arg => {
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
    document.addEventListener('DOMContentLoaded', () => {
      while (queue.length > 0) {
        queue.shift()();
      }
    }
  );}

};


window.$l = $l;

$l.extend = (first, ...args) => {
  args.forEach(arg => {
    first = Object.assign(first, arg);
  });
  return first;
};

$l.ajax = (options) => {
 const defaults = {
   success: () => {},
   error: () => {},
   url: "",
   method: 'GET',
   data: {},
   contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
 };
  const req = $l.extend(defaults, options);
  const xhr = new XMLHttpRequest();
  xhr.open(req.method, req.url);
  xhr.onload = () => {
    if (xhr.status === 200) {
     req.success(xhr.response);
   } else {
     req.error(xhr.response);
   }
  };
  xhr.send(JSON.stringify(req.data));

};
