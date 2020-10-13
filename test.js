const chai = require('chai');

const { expect } = chai;
const utils = require('./utils');

const data = [
  {
    name: 'test avec un 4 en filtre numérique',
  },
  {
    name: 'test sans people',
  },
  {
    name: 'test avec people et sans animaux',
    people:
        [{
          name: 'mot cle noanimals',
        }],
  },
  {
    name: 'test pour respecter la CASSE',
  },
];

describe('Test avec un filtre null', () => {
  it('should return an empty array', () => {
    const result = utils.doFilter(data, null);
    expect(result).to.be.an('array').that.is.empty;
  });
});

describe('Test avec un filtre vide', () => {
  it('should return an empty array', () => {
    const result = utils.doFilter(data, null);
    expect(result).to.be.an('array').that.is.empty;
  });
});

describe('Test avec un filtre numérique', () => {
  it('should return one result', () => {
    const result = utils.doFilter(data, 4);
    expect(result).to.be.an('array').to.have.lengthOf(1);
  });
});

describe('Test avec un set de données qui n\'a pas de people', () => {
  it('should return one result with empty people array', () => {
    const result = utils.doFilter(data, 4);
    expect(result).to.be.an('array').to.have.lengthOf(1);
    expect(result[0].people).to.be.an('array').to.have.lengthOf(0);
  });
});

describe('Test avec un people qui n\'a pas d`\'animaux', () => {
  it('should return one result with one people with empty animals array', () => {
    const result = utils.doFilter(data, 'noanimals');
    expect(result).to.be.an('array').to.have.lengthOf(1);
    expect(result[0].people).to.be.an('array').to.have.lengthOf(1);
    expect(result[0].people[0].animals).to.be.an('array').to.have.lengthOf(0);
  });
});

describe('Test de respet de la casse', () => {
  it('should return one result', () => {
    const result = utils.doFilter(data, 'CASSE');
    expect(result).to.be.an('array').to.have.lengthOf(1);
  });
  it('should return no result', () => {
    const result = utils.doFilter(data, 'casse');
    expect(result).to.be.an('array').to.have.lengthOf(0);
  });
});
