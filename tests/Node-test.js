import { expect } from 'chai';
import Node from '../lib/Node';

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('pizza');
  });

  it('should be a thing', () => {
    expect(node).to.exist;
  });

  it('should take data and assign it to data prop', () => {
    expect(node.data).to.equal('pizza');
  });

});
