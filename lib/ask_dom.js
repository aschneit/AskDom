/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main_js__ = __webpack_require__(1);




Object(__WEBPACK_IMPORTED_MODULE_0__main_js__["a" /* $l */])( () => {
  const rootEl = Object(__WEBPACK_IMPORTED_MODULE_0__main_js__["a" /* $l */])('.beer');
  __WEBPACK_IMPORTED_MODULE_0__main_js__["a" /* $l */].ajax({
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


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__ = __webpack_require__(2);


const $l = arg => {
  let array;
  if (arg instanceof HTMLElement) {
    array = [arg];
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](array);
  } else if (typeof arg === "string") {
    array = Array.from(document.querySelectorAll(arg));
    return new __WEBPACK_IMPORTED_MODULE_0__dom_node_collection_js__["a" /* default */](array);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = $l;



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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class DOMNodeCollection {
  constructor (nodes) {
    this.nodes = nodes;
  }

  html(string) {
    if (string){
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML = string;
      }
    }else{
      return this.nodes[0].innerHTML;
    }
  }

  empty(){
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].innerHTML = "";
    }
  }

  append(input){
    let stringInput = [];
    if (input.constructor.name === "String"){
      stringInput = [input];
    }else if (input instanceof HTMLElement){
      stringInput = [input.outerHTML];
    }else{
      for (var k = 0; k < input.length; k++) {
        stringInput[k].push(input[k].outerHTML);
      }
    }

    for (var i = 0; i < this.nodes.length; i++) {
      for (var j = 0; j < stringInput.length; j++) {
        this.nodes[i].innerHTML += stringInput[j];
      }
    }
  }


  attr(key, val) {
     if (typeof val === "string") {
       this.nodes.forEach(node => node.setAttribute(key, val));
     } else {
       return this.nodes[0].getAttribute(key);
     }
 }


   addClass(newClass) {
     this.nodes.forEach(node => node.classList.add(newClass));
   }

   removeClass(oldClass) {
     this.nodes.forEach(node => node.classList.remove(oldClass));
 }

  children (){
    let nodeChildren = [];
    for (var i = 0; i < this.nodes.length; i++) {
      nodeChildren = nodeChildren.concat(this.nodes[i].children);
    }
    return new DOMNodeCollection(nodeChildren);
  }

  parent (){
    let nodeParents = [];
    for (var i = 0; i < this.nodes.length; i++) {
      nodeParents.push(this.nodes[i].parentNode);
    }
    return new DOMNodeCollection(nodeParents);
  }

  find (selector) {
    let foundElements = [];
    for (var i = 0; i < this.nodes.length; i++) {
      foundElements.push(this.nodes[i].querySelectorAll(selector));
    }
    return new DOMNodeCollection(foundElements);
  }

  remove () {
    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].outerHTML = "";
    }
    this.nodes = [];
  }

  on (type, callback){

    for (var i = 0; i < this.nodes.length; i++) {
      this.nodes[i].addEventListener(type, callback);

      if (!this.nodes[i][type + 'ing']){
        this.nodes[i][type + 'ing'] = [];
      }

      this.nodes[i][type + 'ing'].push(callback);
    }
  }

  off (type) {
    for (var i = 0; i < this.nodes.length; i++) {
      const callbacks = this.nodes[i][type + 'ing'];
      for (var j = 0; j < callbacks.length; j++) {
        this.nodes[i].removeEventListener(type, callbacks[j]);
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (DOMNodeCollection);


/***/ })
/******/ ]);
//# sourceMappingURL=ask_dom.js.map