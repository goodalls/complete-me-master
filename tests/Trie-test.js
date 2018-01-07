import { expect } from 'chai';
import Trie from '../lib/Trie';

describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie();
  });

  it('should be a thing', () => {
    expect(trie).to.exist;
  });

  describe('INSERT', () => {
    it('should add "pizza" as letters into the trie', () => {

      trie.insert('pizza');
      expect(trie.head.children.p.data).to.equal('p');
      expect(trie.head.children.p.children.i.data).to.equal('i');
    });
      
    it('should add nodes as letters into the trie', () => {

      trie.insert('apple');
      expect(trie.head.children.a.data).to.equal('a');
      expect(trie.head.children.a.children.p.data).to.equal('p');
    });

    it('should check isWord is true', () => {
      trie.insert('apple');
      expect(trie.head.children.a.children
        .p.children
        .p.children
        .l.children
        .e.isWord).to.equal(true);
    });
    it('should check length++', () => {
      expect(trie.length).to.equal(0);
      trie.insert('pizza');
      expect(trie.length).to.equal(1);
      trie.insert('apple');
      expect(trie.length).to.equal(2);
    });
  
    it('should return the word count entered', () => {
      trie.insert('apple');
      trie.insert('pizza');
      expect(trie.count()).to.equal(2);
    });
  });
  
  describe('SUGGEST', () => {
    it('should return words that start with search string', () => {
      trie.insert('apple');
      trie.insert('pizza');
      expect(trie.suggest('piz')).to.deep.equal([ 'pizza' ]);
      expect(trie.suggest('ap')).to.deep.equal([ 'apple' ]);
      trie.insert('pizzeria');
      trie.insert('appitizer');
      expect(trie.suggest('piz')).to.deep.equal([ 'pizza', 'pizzeria' ]);
      expect(trie.suggest('ap')).to.deep.equal([ 'apple', 'appitizer' ]);
    });
  
    it('should return true or false if word is entered', ()=> {
      expect(trie.isWordCheck('apple')).to.equal(false);
      trie.insert('apple');
      expect(trie.isWordCheck('apple')).to.equal(true);
    });

    it('should populate dictionary into trie', () => {
      trie.populate();
      expect(trie.length).to.equal(235886);
      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 'pizzeria', 
        'pizzicato', 'pizzle']);
    });
  
    it('should select favored higher number in suggestion', () => {
      trie.insert('pizza');
      trie.insert('pizzeria');
      expect(trie.suggest('piz')).to.deep.equal([ 'pizza', 'pizzeria']);
      trie.selectFavored('pizzeria');
      expect(trie.suggest('piz')).to.deep.equal([ 'pizzeria', 'pizza' ]);
    });
  });

  describe('DELETE', () => {
    it('should delete/remove a word', () => {
      trie.insert('pizza');
      trie.insert('pizzeria');
      expect(trie.suggest('piz')).to.deep.equal([ 'pizza', 'pizzeria']);
      trie.delete('pizza');
      expect(trie.suggest('piz')).to.deep.equal(['pizzeria']);
    });

    it('should delete/remove a word from middle of suggestions', () => {
      trie.populate();
      trie.suggest('piz');
      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizza', 
        'pizzeria', 'pizzicato', 'pizzle']);
      trie.delete('pizza');
      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizzeria', 
        'pizzicato', 'pizzle']);
      trie.delete('pizzle');
      expect(trie.suggest('piz')).to.deep.equal(['pize', 'pizzeria', 
        'pizzicato']);
    });
  });
});  