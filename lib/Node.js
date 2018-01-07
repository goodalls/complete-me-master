class Node {
  constructor(data) {
    this.children = {};
    this.data = data;
    this.isWord = false;
    this.favored = 0;
  }
}

module.exports = Node;
