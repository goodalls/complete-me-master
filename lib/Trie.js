const Node = require('./Node.js');

class Trie {
  constructor() {
    this.head = new Node(null);
    this.length = 0;
    this.suggestArray = [];
  }

  insert(string, node = this.head) {
    //base case
    if (string.length === 0) {
      if (node.isWord) {
        return;
      } else {
        this.length += 1;
        node.isWord = true;
        return;
      }
    }
    if (!node.children[string[0]]) {
      node.children[string[0]] = new Node(string[0]);
    }
    return this.insert(string.substr(1), node.children[string[0]]);
  }

  count() {
    return this.length;
  }

  suggest(string) {
    this.suggestArray = [];
    let current = this.descender(string);

    if (!current || !current.children) {
      return [];
    } else {
      return this.findSuggestions(current, string);
    }
  }

  findSuggestions(current, string) {
    let nextLetter = Object.keys(current.children);

    //base case
    if (current.isWord) {
      this.suggestArray.push({
        word: string,
        favored: current.favored
      });
    }
    nextLetter.forEach((value) => {
      this.findSuggestions(current.children[value], string + value);
    });

    return this.suggestionsSort(this.suggestArray);
  }

  suggestionsSort(array) {
    array.sort((a, b) =>
      b.favored - a.favored
    );
    return array.map(object => object.word);
  }

  populate(dictionary) {

    dictionary.sort().forEach((word, index) => {
      if (word !== dictionary[index + 1]) {
        this.insert(word.toLowerCase());
      }
    });
  }

  isWordCheck(string) {
    let node = this.head;

    while (string.length > 1) {
      if (!node.children[string[0]]) {
        return false;
      } else {
        node = node.children[string[0]];
        string = string.substr(1);
      }
    }
    return (node.children[string] && node.children[string].isWord) ? true : false;
  }

  selectFavored(string) {
    let current = this.descender(string);

    current.favored++;
  }

  delete(string) {
    let node = this.descender(string);

    if (node.isWord) {
      node.isWord = false;
    }
  }

  descender(string) {
    let current = this.head;
    let wordArray = [...string];

    wordArray.forEach((letter) => {
      if (current.children[letter]) {
        current = current.children[letter];
      } else {
        current = undefined;
      }
    });
    return current;
  }
}

module.exports = Trie;

