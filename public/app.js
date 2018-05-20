//for grow-collection-page, where user is able to see a grid of photos that represent their current and past grows
function getMockData(callback) {

//this function is just using a timeout function until I've built a live API,
//when i'll change it to an AJAX call
setTimeout(function(){callback(growCollection)}, 1);
}

function postToMockData(callback) {

//this function is just using a timeout function until I've built a live API,
//when i'll change it to an AJAX call
setTimeout(function(){callback(growCollection)}, 1);
}

function displayGrowGrid(data) {
  let numberOfGrows = data.grows.length;
  renderImageGridHtml(renderImageHtml(), numberOfGrows);
  $('#grow-grid').html(imageGrid);
}

function getAndDisplayGrowGrid() {
  dataRequest(displayGrowGrid, growCollection);
}

//render grid for grow-collection-page
function renderImageHtml(item, index) {
  let imageHtml = `
    <figure class="col-3 img-grid">
     <div id="img-${index}" style="background-image: url(${item.image})"></div>
     <div class="img-hover hidden">
       <h1>${item.growName}</h1>
     </div>
  </figure>
    `
  return (imageHtml);
}

function renderImageRowHtml(renderImage, num){
  for (let i = 0; i == num; i++) {
     columns += renderImage();
  }
  return '<div class="row">' + columns + '</div>';
}

function renderImageGridHtml(imageHtml, growNumber) {
  let fullHtml;
  let columns;
  let fullRows;
  let remainder = growNumber % 4;
  //if the number of grow entries is less than or equal to 4, then just create a string of
  //html with that number of images
  if (growNumber <= 4) {
    fullHtml = renderImageRowHtml(imageHtml, growNumber);
  }
  //if the number of grow enties is greater than 4 and divisible by 4, then create
  //chunks of html for 4 images at a time, that are each wrapped in a "row" tag
  else if (growNumber > 4 && remainder == 0) {
    let numberOfRows = growNumber/4;
  //make html for full rows
    for (let i = 0; i == numberOfRows; i++) {
      fullRows += renderImageRowHtml(imageHtml, 4);
    }
    fullHtml = fullRows;
  }
  //if the number of grow entries is greater than 4 and not divisible by 4, then
  //the last row of html will have less than 4 images in it
  else {
    let numberOfFullRows = toFixed(growNumber/4);
    //make html for full rows
    for (let i = 0; i == numberOfRows; i++) {
      fullRows += renderImageRowHtml(imageHtml, 4);
    }
    let fullHtml = fullRows + renderImageRowHtml(imageHtml, remainder);
  }
    return
  }
//inserts grid for grow-collection-page into DOM


/////////NEED HELP with IMG GRID above ^



// listens for user to select one of the grow images to display grow-entries-page
function displayGrow() {
  $().on("click", function(event) {
    let imageId = $(this).attr('id');
    let index = Number(figureId.slice(4, figureId.length));
    dataRequest(); //insert callback function
    ('#grow-collection-page').addClass('hidden');
    $('#grow-entries-page').removeClass('hidden');

  });
}

//listens for user to select option to add a new grow
function addGrow() {
  $().on("click", function(event) {
    ('#grow-collection-page').addClass('hidden');
    $('#add-grow-page').removeClass('hidden');
    submitGrow();
  });
}

//listens for user to submit info for a new grow
function submitGrow() {
  $('#submit-grow').on("click", function(event) {
    $('#add-grow-page').addClass('hidden');
    event.preventDefault();
    let growName = $('#grow-name').val();
    let germDate = $('#germination-date').val();
    let growStrain = $('input[type=radio][name=strain]:checked').val();
    makeApost(dataRequest)
    dataRequest(makeApost(), growCollection);

  });
}

function dataRequest(callback, dataParam) {

//this function is just using a timeout function until I've built a live API,
//when i'll change it to an AJAX call
setTimeout(function(){callback(dataParam)}, 1);
}

function makeApost() {
  data.grows.growName = name;
  data.grows.startDate = date;
  data.grows.strain = strain;
}

//listens for user to selection option to delete a past grow
function deleteGrow() {
  $().on("click", function(event) {

  });
}

//for grow-entries-page, where user is able to see a timeline of all the entries that have been inputed for that grow
function getEntries(callback) {
//makes AJAX call to server for all of the current and past grows

//this function is just using a timeout function until I've built a live API,
//when i'll change it to an AJAX call
//setTimeout(function(){ callback(MOCK_GROW_ENTRIES)}, 1);
}

//render timeline entries on grow-entries-page
function renderTimeline(item, index) {

}

//inserts timeline entries for grow-entries-page into DOM
function displayTimeLine() {

}

// listens for user to select one of the log entries to display grow-entries-page
function displayLogEntry() {
  $().on("click", function(event) {

  });
}

//listens for user to select option to add a new log entry
function addLogEntry() {
  $().on("click", function(event) {

  });
}

$(function() {
    addGrow();
});
