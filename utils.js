const doFilter = (data, filter) => {
  if (!filter) {
    return [];
  }
  const result = (data || []).reduce((accData, curData) => { // filtre sur les data / personnes / animaux
    const filteredPeople = (curData.people || []).reduce((accPeople, curPeople) => { // filtre sur les persones / animaus
      const filteredAnimals = (curPeople.animals || []).reduce((accAnimal, curAnimal) => { // filtre sur les animaux
        if (curAnimal.name.includes(filter)) {
          accAnimal.push(curAnimal);
        }
        return accAnimal;
      }, []);
      if (curPeople.name.includes(filter) || filteredAnimals.length > 0) {
        accPeople.push(Object.assign(curPeople, Object.assign(curPeople, { animals: filteredAnimals })));
      }
      return accPeople;
    }, []);
    if (curData.name.includes(filter) || filteredPeople.length > 0) {
      accData.push(Object.assign(curData, Object.assign(curData, { people: filteredPeople })));
    }
    return accData;
  }, []);
  return result;
};

const doCount = (data) => {
  const result = (data || []).map((curData) => Object.assign(curData, {
    name: `${curData.name} [${(curData.people || []).length}]`,
    people: curData.people.map((curPeople) => Object.assign(curPeople, { name: `${curPeople.name} [${(curPeople.animals || []).length}]` })),
  }));
  return result;
};

module.exports = {
  doFilter,
  doCount,
};
