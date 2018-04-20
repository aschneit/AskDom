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
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);