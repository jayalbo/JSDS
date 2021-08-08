import { Stack } from "./Stack.mjs";
/**
 * Represents an element in the Trie.
 */
class Element {
  constructor(key, content, end) {
    /**
     * @param {any} [key] - The value of the element
     * @param {any} [content] - The content of the element
     * @param {boolena} [end] - Indicate if the node if end of path
     */
    this.key = key ?? null;
    this.content = content ?? null;
    this.child = new Map();
    this.end = end ?? false;
  }
}
/**
 * Trie Class
 */
class Trie {
  constructor() {
    this.root = new Element();
    this.elements = 0;
  }
  /**
   * Adds a new element to the Trie
   * @param {any} val - The value of the element
   * @param {any=} content - Content of the element, default null
   * @returns {boolean} true if element was created, false if element exists
   */
  add(val, content = null) {
    let currentElement = this.root;

    for (let c of val) {
      if (!currentElement.child.has(c)) {
        currentElement.child.set(c, new Element(c));
      }
      currentElement = currentElement.child.get(c);
    }

    if (!currentElement.end) {
      this.elements++; // Increment total elements if node is new
      currentElement.end = true;
      currentElement.content = content; // Set content
      return true;
    } else return false;
  }
  /**
   * Updates the content of an existing element
   * @param {any} val - The value of the element
   * @param {any=} content - Content of the element, default null
   * @returns {boolean} true if element was updated, false if element does not exists
   */
  update(val, content = null) {
    let currentElement = this.root;

    for (let c of val) {
      if (!currentElement.child.has(c)) {
        currentElement.child.set(c, new Element(c));
      }
      currentElement = currentElement.child.get(c);
    }

    if (!currentElement.end) return false;
    else {
      currentElement.end = true;
      currentElement.content = content; // Set content
      return true;
    }
  }
  /**
   * Indicates if an element exists in the Trie
   * @param {any} val - The value of the element
   * @returns {boolean} true if element exists, false if element does not exists
   */
  contains(val) {
    let currentElement = this.root;
    for (let c of val) {
      if (!currentElement.child.has(c)) return false;
      currentElement = currentElement.child.get(c);
    }
    return currentElement.end;
  }
  /**
   * Returns number of elements
   * @returns {number} size
   */
  get size() {
    return this.elements;
  }
  /**
   * Returns content of an element
   * @param {any} val - The value of the element
   * @returns {any} - Content of the element, return null if element does not exists or if its content is not set
   */
  get(val) {
    let currentElement = this.root;
    for (let c of val) {
      if (!currentElement.child.has(c)) return false;
      currentElement = currentElement.child.get(c);
    }
    if (!currentElement.end) return null;
    else {
      return currentElement.content;
    }
  }
  /**
   * Returns a sub Trie given a prefix
   * @param {any} prefix - The prefix of the element(s) to be found
   * @returns {Element} - Return Element matching the prefix
   */
  find(prefix) {
    let currentElement = this.root;
    for (let c of prefix) {
      if (!currentElement.child.has(c)) return false;
      currentElement = currentElement.child.get(c);
    }
    return currentElement;
  }
  /**
   * Removes an element from the Trie
   * @param {any} val - The value of the element
   * @returns {boolean} true if element exists, false if element does not exists
   */
  remove(val) {
    let currentElement = this.root;
    for (let c of val) {
      if (!currentElement.child.has(c)) return false;
      currentElement = currentElement.child.get(c);
    }
    if (currentElement.end) {
      currentElement.end = false;
      currentElement.content = null;
      this.elements--;
      return true;
    } else return false;
  }
  get isEmpty() {
    return this.elements === 0;
  }
  /**
   * Clears the Trie
   */
  clear() {
    this.root = new Element();
    this.elements = 0;
  }
  /**
   * Converts and return an array of elements contained in the Trie
   * @returns {Array}
   */
  toArray() {
    const arr = [];
    const dfs = (word = "", node) => {
      if (node.child?.size > 0) {
        node.child.forEach((value) => {
          dfs(`${word}${value.key}`, value);
        });
      }
      if (node.end) arr.push(word);
    };
    dfs("", this.root);
    return arr;
  }
}

export { Trie };
