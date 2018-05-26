const GROW_ENTRIES_JSON = 'mock-grow-entries.json';
let LOCAL_DATA = {};
let CURRENT_GROW = {};
let gridTracker = 0;

//change my lets to const
//consolidate ^these into 1 object

function getAllGrows() {
  return new Promise ((resolve, reject) => {
    LOCAL_DATA = growCollection;
    //    const settings = {
    //    url: GROW_ENTRIES_JSON,
    //    dataType: 'json',
    //    type: 'GET',
    //    success: callback
    //  };
    //  $.ajax(settings);

    resolve("success!");//fulfilled
    reject("total failure");//rejected
  });
}

//flip the callback and id arguments
function getGrow(callback, id) {

  return new Promise ((resolve, reject) => {
    //  const settings = {
    //    url: GROW_ENTRIES_JSON/${id},
    //    dataType: 'json',
    //    type: 'GET',
    //    success: callback
    //  };
    //  $.ajax(settings);
    setTimeout(function(){callback(oneGrow)}, 100);
    resolve("success!");
    reject("total failure");
  })
}

//flip the callback and id arguments
function getEntry(callback, id) {
  //  const settings = {
  //    url: GROW_ENTRIES_JSON/${id},
  //    dataType: 'json',
  //    type: 'GET',
  //    success: callback
  //  };
  //  $.ajax(settings);
  setTimeout(function(){callback(oneGrow)}, 100);
}

function postGrow(callback, postObject) {
  //  const settings = {
  //    url: GROW_ENTRIES_JSON/${id},
  //    dataType: 'json',
  //    type: 'POST',
  //    data: postObject,
  //    success: callback
  //  };
  //  $.ajax(settings);
  setTimeout(function(){callback(postGrow)}, 100);
  postGrow = postObject;
}

function afterPostTest(data) {
  console.log(data);
}

function postEntry(callback, postObject) {
  //  const settings = {
  //    url: GROW_ENTRIES_JSON/${id},
  //    dataType: 'json',
  //    type: 'POST',
  //    data: postObject,
  //    success: callback
  //  };
  //  $.ajax(settings);
  setTimeout(function(){callback(postEntry)}, 100);
  postEntry = postObject;
}

function deleteThings (callback, id) {
//  const settings = {
//      url: GROW_ENTRIES_JSON/${id},
//      dataType: 'json',
//      type: 'DELETE',
//      success: function(result) {
//      }
//  });
//$.ajax(settings);
  setTimeout(function(){callback(deleteAgrow)}, 100);
  deleteAgrow.splice(index, 1);
}

function afterDeleteTest(data) {
  console.log(deleteAgrow);
}

function putThings(callback, putObject, index, id) {
//  const settings = {
//    url:  GROW_ENTRIES_JSON/${id},
//    dataType: 'json',
//    type: 'PUT',
//    data: putObject,
//    success: function(result) {
//    }
//});
//$.ajax(settings);
  setTimeout(function(){callback(putGrow)}, 100);
  putGrow.splice(index, 0, putObject);
}

//function displayGrowGrid(data) {
//  LOCAL_DATA = data;
//  let numberOfGrows = LOCAL_DATA.grows.length;
//  let imageGrid = renderImageGridHtml(renderImageHtml(), numberOfGrows);
//  $('#grow-grid').html(imageGrid);
//}

//function getAndDisplayGrowGrid() {
//  getAllGrows(displayGrowGrid);
//}

//render grid for grow-collection-page
function renderImageGrid(item, index) {
  let imageHtml = `
  <figure id="img-${index}" class="grow-links">
    <div class="grid-images" style="background-image: url(${LOCAL_DATA.grows[index].image})"></div>
    <div class="img-hover hidden">
      <h1>${LOCAL_DATA.grows[index].growName}</h1>
    </div>
  </figure>
  `
    return imageHtml;
}

function displayImageGrid() {
  let imageGrid = LOCAL_DATA.grows.map((item, index) => renderImageGrid(item, index));
  document.getElementById("grow-grid").innerHTML = imageGrid;
}

// listens for user to select one of the grow images to display grow-entries-page
function onGrowClick() {
  let currentGrow = document.querySelector('.grow-links');
  currentGrow.addEventListener('click', function () {
    const imageId = this.getAttribute('id');
    let imageIndex= Number(imageId.slice(4, imageId.length));
    let growId = LOCAL_DATA.grows[index].id;
    getGrow(callback, id)
    displayGrowTimeline(imageIndex);
    $('#grow-collection-page').addClass('hidden');
    $('#grow-entries-page').removeClass('hidden');
  });
}

//function renderGrowTimeline(index) {
//  let thisGrow = LOCAL_DATA.grows[];
//  let firstEntryDate = moment(thisGrow.startDate);
//  let addNewEntryDate = moment();
//  let timeLength = addNewEntryDate - firstEntryDate;
//  let timelineHeight = document.getElementById('img-${index}').clientHeight;
//  let lineUnitHeight = timelineHeight/timeLength;
//average time of growth = 3-5 months (90-150 days)
  //the line will be made up of a vertically repeated vector image of a
  //vertical rectangle that represents 1 day of time
  //the height of the line unit will be determined by the algorithm
  //
//}

function displayGrowTimeline(index) {
  document.getElementById("grow-name").innerHTML = data.growName;

  renderGrowTimeline(index);
}

//listens for user to select option to add a new grow
function addGrow() {
  //$().on("click", function(event) {
    $('#grow-collection-page').addClass('hidden');
    $('#add-grow-page').removeClass('hidden');
    submitGrow();
  //});
}

//listens for user to submit info for a new grow
function submitGrow() {
  $('#submit-grow').on("click", function(event) {
    $('#add-grow-page').addClass('hidden');
    event.preventDefault();
    const growName = $('#new-grow-name').val();
    const germDate = $('#germination-date').val();
    const growStrain = $('input[type=radio][name=strain]:checked').val();
    postGrow(afterPostTest, makePostObject(growName, germDate, growStrain));
  });
}

function makePostObject(name, date, strain) {
  const post = {
    id: '',
    growName: name,
    startDate: date,
    endDate: '',
    strain: strain,
  };
  return post;
}

//listens for user to select option to delete a past grow
function deleteGrowPage() {
  //$().on("click", function(event) {
  $('#grow-entries-page').addClass('hidden');
  $('#delete-entry-page').removeClass('hidden');
  deleteGrow(index);
  //});
}
//listens for user to confirm their option to delete a past grow
function deleteGrow(index) {
  $('#delete-confirm').on("click", function(event) {
  //deleteThings(afterDeleteTest, index);
  deleteThings(afterDeleteTest, 0);
  });
}

function deleteThings(callback, id) {
//  const settings = {
//      url: GROW_ENTRIES_JSON/${id},
//      dataType: 'json',
//      type: 'DELETE',
//      success: function(result) {
//      }
//  });
//$.ajax(settings);
  setTimeout(function(){callback(deleteAgrow)}, 100);
  deleteAgrow.splice(index, 1);
}

//for grow-entries-page, where user is able to see a timeline of all the entries that have been inputed for that grow


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

$(function(){
  //consolidate in 1 function: 1. make data call, 2. display info, 3. call event listeners
  getAllGrows().then(function(){
    return displayImageGrid();
  }).then(function(){
    return onGrowClick();
  });
});
