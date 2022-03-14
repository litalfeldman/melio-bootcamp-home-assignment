let candidates = undefined

export const getPersistentCandidatesData = () => {
  return candidates
}

export const setPersistentCandidatesData = (data) => {
  candidates = data
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

// Sort candidates in alphabetical order
const sortObjectsByKey = (unordered) => {
  return Object.keys(unordered).sort().reduce((obj, key) => { 
    obj[key] = unordered[key]; 
    return obj;
  }, {});
}

export const transformCandidatesData = (data) => {

  let results = data.results
  const filteredResults = results.map(candidate => 
      { const newCandidate = {};
        newCandidate.firstName = candidate.name.first;
        newCandidate.lastName = candidate.name.last;
        newCandidate.email = candidate.email;
        newCandidate.city = candidate.location.city;
        newCandidate.country = candidate.location.country;
        newCandidate.picture = candidate.picture.large;
        newCandidate.uuid = candidate.login.uuid;
        newCandidate.isFavorite = false;
        newCandidate.isPreferred = candidate.location.country == ('United States' || 'United Kingdom');
        return newCandidate;
      }
    )
  let keyedByFirstName = groupBy(filteredResults, 'firstName');
  let sortedByKey = sortObjectsByKey(keyedByFirstName);

  return sortedByKey;
}
