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
