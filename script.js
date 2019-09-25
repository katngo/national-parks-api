'use strict';
const apiKey = 'sn5YFaEUIgiI4t5bZ7Ucolow8i0bKvXyEHYncEBj';
const searchURL = 'https://api.nps.gov/api/v1/parks?';

function getParks(stateSearch, limit=10) {
  const stateCode = {
    stateCode : stateSearch,
    limit,
    apiKey
  }
  const finalURL = searchURL + $.param(stateCode);
  console.log(finalURL);
  fetch(finalURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => showResults(responseJson))
    .catch(err => {
      $("#error-message").text(`Something went wrong. ${err.message}`);
    });
}

function showResults(responseJson) {
  $('.results').empty();
  console.log(responseJson);
  for (let i=0; i< responseJson.data.length; i++) {
    $("header").remove();
    $(".results").append(`
    <li><h3>${responseJson.data[i].name}</h3></li>,
    <li>${responseJson.data[i].description}</li>,
    <li><a href='${responseJson.data[i].directionsUrl}'>Link</a></li>
    `)
  }
  
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const getValue= $('#state-search').val();
    const getNumber= $('#search-results').val();
    getParks(getValue, getNumber);
  })
}
$(watchForm);