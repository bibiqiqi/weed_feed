const GROW_ENTRIES_JSON = 'mock-grow-entries.json';
let LOCAL_DATA = {};
let CURRENT_GROW = {};
let GRID_TRACKER = 0;

//consolidate ^these into 1 object

//function getAllGrows() {
//  return new Promise ((resolve, reject) => {
//    const settings = {
    //    url: GROW_ENTRIES_JSON,
    //    dataType: 'json',
    //    type: 'GET',
    //    success: callback
    //  };
    //  $.ajax(settings);
//    timeout(100).then
//    resolve("success!");//fulfilled
//    reject("total failure");//rejected
//  });
//}


//function getAllGrows(callback) {
//  const settings = {
//    url: GROW_ENTRIES_JSON,
//    dataType: 'json',
//    type: 'GET',
//    success: callback
//  };
//  $.ajax(settings);
//setTimeout(function(){callback(growCollection)}, 100);
//LOCAL_DATA = growCollection;
//}

function getAllEntries(callback) {
//  const settings = {
//    url: GROW_ENTRIES_JSON,
//    dataType: 'json',
//    type: 'GET',
//    success: callback
//  };
//  $.ajax(settings);
setTimeout(function(){callback(growCollection)}, 100);
}

//flip the callback and id arguments
function getGrow(callback, id) {
  //  const settings = {
  //    url: GROW_ENTRIES_JSON/${id},
  //    dataType: 'json',
  //    type: 'GET',
  //    success: callback
  //  };
  //  $.ajax(settings);
  setTimeout(function(){callback(oneGrow)}, 100);
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
  <figure id="img-${LOCAL_DATA.grows[index].id}" class="grow-links">
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
  $('#grow-grid').html(imageGrid);
}

// listens for user to select one of the grow images to display grow-entries-page
function onGrowClick() {
  $().on("click", function(event) {
    let imageId = $(this).attr('id');
    console.log(imageId);
    let index = Number(imageId.slice(4, imageId.length));
    console.log(index);
    //let growId = LOCAL_DATA.grows[index].id;
    //console.log(growId);
    displayGrowTimeline(index);
    $('#grow-collection-page').addClass('hidden');
    $('#grow-entries-page').removeClass('hidden');
  });
}

//data object will be all the entries for one grow
//function renderGrowTimeline(index) {
//  let thisGrow = LOCAL_DATA.grow[index];
//  let firstEntryDate = moment(thisGrow.startDate);
//  let addNewEntryDate = moment();
//  let timeLength = addNewEntryDate - firstEntryDate;

  //.page class sets the section div to 100vh
  //header will be set to 15 vh
  //which leaves 85 vh for the grow-timeline div
  //the line will be an image that always has a height of 1vh,
  //in order to maintain the proportions of the line
  //algorithm will determine how many vertical repetitions of the
  //line image are equal to 1 day of the timeline, based on the overall
  //length of the timeline

//}

//function renderTimeline() {
//  let timeline = ;
//}

function displayGrowTimeline(index) {
  $('#grow-name').html(data.growName);
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
    let growName = $('#new-grow-name').val();
    let germDate = $('#germination-date').val();
    let growStrain = $('input[type=radio][name=strain]:checked').val();
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
  getAllGrows(displayImageGrid);
  //getAllGrows()
  //.then(displayImageGrid());
});
