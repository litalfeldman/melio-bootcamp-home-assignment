/*
  Here you can *execute* your first task code
  Print the output of your logic implementation into the console

  Once you complete your first task, remove this file
* */

import {fetchCandidates} from "./API";
import {transformCandidatesData} from "./helper"

const runPlayground = async () => {

  console.log("Playground Area\n***************\n");

  // Add your logic here




  // An example of executing code from API.js file:
  const candidates = await fetchCandidates();
  const filtered = transformCandidatesData(candidates);


  console.log("candidates data: ", candidates);
  console.log("transformed data: ", filtered);

}

// We call this function in App.jsx file, on every page refresh it will run the function again
export const Playground = {
  runPlayground
};
