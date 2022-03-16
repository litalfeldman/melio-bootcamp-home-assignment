
export const getPersistentCandidatesData = () => {
  return JSON.parse(window.localStorage.getItem('candidates'));
}

export const setPersistentCandidatesData = (data) => {
  window.localStorage.setItem('candidates', JSON.stringify(data));
}

// Candidates grouped by the first letter of their name 
const groupBy = (array, key) => {
  return array.reduce((result, currentValue) => {
    const firstLetter = currentValue[key][0]; 
    if (!result[firstLetter]) { 
      result[firstLetter] = [];
    }
    result[firstLetter].push(currentValue); 
    return result;
  }, {}); // Empty object is the initial value for result object
}

const sortObjectsByKey = (unordered) => {
  return Object.keys(unordered).sort().reduce((obj, key) => { 
    obj[key] = unordered[key]; 
    return obj;
  }, {});
}

export const transformCandidatesData = (data) => {
  const filteredResults = data.map(candidate => 
      { 
        const { location, name, picture, login, email } = candidate;
        const { first, last } = name;
        const { city, country } = location;
        return {
          firstName: first,
          lastName: last,
          picture: picture.large,
          uuid: login.uuid,
          email,
          city,
          country,
          isFavorite: false,
          isPreferred: country === ('United States' || 'United Kingdom'),
        }
      }
    )
  const keyedByFirstName = groupBy(filteredResults, 'firstName');
  const sortedAlphabetically = sortObjectsByKey(keyedByFirstName);
  return sortedAlphabetically;
}
