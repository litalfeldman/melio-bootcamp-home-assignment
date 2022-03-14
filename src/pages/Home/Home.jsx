import React, {useEffect, useState} from "react";
import "../page.css";
import {fetchCandidates} from "../../utils/API.js";
import {getPersistentCandidatesData, setPersistentCandidatesData, transformCandidatesData} from "../../utils/helper.js";
import {Card} from "../../components/Card/Card";

/*
  This is a "React component", you don't really need to know react in dept,
*/
export const Home = () => {

  // once you populated candidates variable with data
  // search online how to "render an array of items in react" and add your implementation below (line 41)
  // to update the candidates variable, you need to use setCandidatesFunction
  // Note - every time you use this function, it will auto refresh your Home page, we call it in React - "Render".
  const [candidates, setCandidatesFunction] = useState({});

  // this is "React Hook", a function that will be called ONCE, on every page load
  useEffect(() => {
    runOnHomePageLoad();
  }, []);

  const runOnHomePageLoad = async () => {
    // once you will succeed getting the data, make it persistent as required.
    // if the data is already fetched and persistent - don't fetch it again, use the condition below
    const data = getPersistentCandidatesData();
    if (data) {
      setCandidatesFunction(data);
    } else {

      // replace the empty array once you implemented the fetching code with: await fetchCandidates()
      const fetchedData = await fetchCandidates();

      // replace the empty array once the data is transformed
      const transformedData = transformCandidatesData(fetchedData)
      setPersistentCandidatesData(transformedData)

      //this function will save a "React State" and allow you to use the data via candidates variable outside.
      setCandidatesFunction(transformedData);
    }
  }


  return (
    <div id="page">
      <div className="container"> 
        <div className="page-title">Firm's candidates</div>
        <div className="page-subtitle">Lital Feldman</div>
      </div>
      <div className="candidates-list">
        {
          Object.values(candidates).flatMap(candidateArray => candidateArray.map(candidate =><div key={candidate.uuid}> <Card candidate={candidate}/></div>))
        }
      </div>
    </div>
  );
};
