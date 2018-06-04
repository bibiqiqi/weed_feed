/*jshint esversion: 6*/

const GROW_ENTRIES_JSON = 'mock-grow-entries.json';
const appData = {
  page: "",
  allGrows: "",
  oneGrow: "",
  currentGrowIndex: "",
  timelineHtml: {
    leftSideHtml: "",
     rightSideHtml: "",
   },
   growSubmit: {
     name: "",
     date: "",
     strain: ""
   }
};

//promise functions
function resolve(letterOfOrder) {
  console.log(letterOfOrder);
}

function reject(letterOfOrder) {
  console.log(letterOfOrder);
}

//ajax calls
function getAllGrows() {
  return new Promise ((resolve, reject) => {
    //    const settings = {
    //    url: GROW_ENTRIES_JSON,
    //    dataType: 'json',
    //    type: 'GET',
    //    success: callback
    //  };
    //  $.ajax(settings);
    appData.allGrows = growCollection;
    if (appData.allGrows == growCollection) {
      resolve("got all grows");
    } else {
      reject("didn't get all grows");
    }
  });
}

function getGrow(id) {
  return new Promise ((resolve, reject) => {
    //  const settings = {
    //    url: GROW_ENTRIES_JSON/${id},
    //    dataType: 'json',
    //    type: 'GET',
    //    success: callback
    //  };
    //  $.ajax(settings);
    appData.oneGrow = postAgrow;
    if (appData.oneGrow == postAgrow) {
      resolve("got a grow");
    } else {
      reject("didn't get a grow");
    }
  });
}

function getEntry(id) {
  //  const settings = {
  //    url: GROW_ENTRIES_JSON/${id},
  //    dataType: 'json',
  //    type: 'GET',
  //    success: callback
  //  };
  //  $.ajax(settings);
  setTimeout(function(){callback(oneGrow)}, 100);
}

function postGrow(postObject) {
  return new Promise ((resolve, reject) => {
  //  const settings = {
  //    url: GROW_ENTRIES_JSON/${id},
  //    dataType: 'json',
  //    type: 'POST',
  //    data: postObject,
  //    success: callback
  //  };
  //  $.ajax(settings);
   postAgrow = postObject;
   if (postAgrow == postObject) {
     resolve("posted a grow");
   } else {
     reject("didn't post a grow");
   }
 });
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

////addClass, removeClass, and turnPage function that calls addClass
//and removeClass

function addClass(elements, myClass) {
  // if there are no elements, we're done
  if (!elements) { return; }
  // if we have a selector, get the chosen elements
  if (typeof(elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }
  // if we have a single DOM element, make it an array to simplify behavior
  else if (elements.tagName) { elements=[elements]; }
  // add class to all chosen elements
  for (var i=0; i<elements.length; i++) {
    // if class is not already found
    if ( (' '+elements[i].className+' ').indexOf(' '+myClass+' ') < 0 ) {
      // add class
      elements[i].className += ' ' + myClass;
    }
  }
}

function removeClass(elements, myClass) {
  // if there are no elements, we're done
  if (!elements) { return; }
  // if we have a selector, get the chosen elements
  if (typeof(elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }
  // if we have a single DOM element, make it an array to simplify behavior
  else if (elements.tagName) { elements=[elements]; }
  // create pattern to find class name
  var reg = new RegExp('(^| )'+myClass+'($| )','g');
  // remove class from all chosen elements
  for (var i=0; i<elements.length; i++) {
    elements[i].className = elements[i].className.replace(reg,' ');
  }
}


function turnPage(previousPage, newPage) {
  addClass(document.getElementById(previousPage),'hidden');
  removeClass(document.getElementById(newPage),'hidden');
}

////render, display, and event listener functions for image grid of all current grows

function renderImageGrid(item, index) {
  const imageHtml = `
    <a href="#" id="grow-${index}" class="grow-links" role="button">
      <h2>${appData.allGrows.grows[index].growName}</h2>
      <h4>Started: ${appData.allGrows.grows[index].startDate}</h4>
    </a>
  `;
    return imageHtml;
}

function renderAddGrow() {
  const addGrowHtml = `
  <a href="#" class="grid-images hidden" id="add-a-grow">
    <h2>+ Add<br>a Grow</h2>
  </a>
  `;
    return addGrowHtml;
}

function displayImageGrid() {
  return new Promise ((resolve, reject) => {
    const imageGrid = appData.allGrows.grows.map((item, index) => renderImageGrid(item, index)) + renderAddGrow();
    document.getElementById("grow-grid").innerHTML = imageGrid;
    removeClass(document.getElementById('add-a-grow'),'hidden');
    resolve("displayed image grid");
    reject("didn't display image grid");
  });
}

function onGrowClick() {
  const growLinks = document.querySelector('.grow-links');
  growLinks.addEventListener('click', function () {
    const imageId = this.getAttribute('id');
    appData.currentGrowIndex = Number(imageId.slice(4, imageId.length));
    appData.page = "timeline";
    main();
  });
}

function addGrowClick() {
  const addGrow = document.querySelector('#add-a-grow');
  addGrow.addEventListener('click', function () {
    turnPage("grow-collection-page", "add-grow-page");
    appData.page = "add-grow";
    main();
  });
}

////render, display, and event listener functions for grow-entries timeline page

//function renderTimelineBlank(side) {
//  const entryHtml= `
//  <div class="timeline-blank-entry ${side}>
//  </div>
//  `
//  return entryHtml;
//}

//function renderTimelineLine(lineOrKnotch, lineUnitHeight){
//  const timelineHtml= `
//  <div class="${lineOrKnotch}" style="height: ${lineUnitHeight}"></div>
//  `
//  return timelineHtml;
//}

function renderTimelineEntry(index, side, topPosition) {
  const entryHtml= `
  <div class="timeline-entry ${side}" id="entry-${index}" style="top:${topPosition}px">
    <h2>${appData.allGrows.grows[appData.currentGrowIndex].entries[index].date}</h2>
  </div>
  `
  return entryHtml;
}

function whichSide(arrayLength) {
  if (arrayLength % 2 == 0) {
    return "left";
  }
  else if (arrayLength % 2 != 0) {
    return "right";
  }
}

function renderAddAnEntry(side, topPosition) {
  const addEntryHtml= `
  <div class="timeline-entry ${side}" id="add-entry" style="top:${topPosition}px">
    <h2>Add An Entry</h2>
  </div>
  `
  return addEntryHtml;
}

function renderFullTimeline() {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const theseEntries = thisGrow.entries;
    const firstEntryDate = moment(theseEntries[0].date);
    const todaysDate = moment();
    const timeLineDays = todaysDate.diff(firstEntryDate, 'days');
    const timelineHeight = timeLineDays * 20;
    document.getElementById('timeline-line').setAttribute("style",`height:${timelineHeight}px`);
    document.getElementById('grow-timeline').setAttribute("style",`height:${timelineHeight/.9}px`);
    //1 line unit represents 1 day on the timeline
    let leftSideHtml = '';
    let rightSideHtml = '';
    let timelineMoment = firstEntryDate;
    let x = 0;
    let i;
     //x increments through theseEntries array, and keeps track of whether
    //the entry should be posted on the left or right (even number = left and odd number = right)
    //change to foreach
      for (i = 0; i < timeLineDays; i++){
      //i represents the days on the timeline, incrementing by 1 through every turn of the loop
      //and x increments by 1 every time a day with a log entry has been passed
        //if current date has an entry in the grow log,
        if ( x < theseEntries.length) {
          if (timelineMoment.isSame(theseEntries[x].date, 'day')){
          //determine whether the index is odd or even to determine
          //which side of the timeline to place the entry
            if (x % 2 == 0) {
              leftSideHtml += renderTimelineEntry(x, "left", i*12);
            } else if (x % 2 != 0) {
              rightSideHtml += renderTimelineEntry(x, "right", i*12);
            }
            x++;
          }
        timelineMoment = timelineMoment.add(1, 'd');
      }
    }
    if (whichSide(theseEntries.length) == "left") {
      //replace += with other method
      //templating library
      leftSideHtml += renderAddAnEntry("left", timelineHeight);
    } else if (whichSide(theseEntries.length) == "right") {
      rightSideHtml += renderAddAnEntry("right", timelineHeight);
    }
    appData.timelineHtml.leftSideHtml = leftSideHtml;
    appData.timelineHtml.rightSideHtml = rightSideHtml;
    resolve("rendered the timeline");
    reject("didnt render the timeline");
  });
}


function displayGrowTimeline() {
  return new Promise ((resolve, reject) => {
    turnPage('grow-collection-page', 'grow-entries-page');
    document.getElementById("grow-name").innerHTML = appData.allGrows.grows[appData.currentGrowIndex].growName;
    document.getElementById("left-side").innerHTML = appData.timelineHtml.leftSideHtml;
    document.getElementById("right-side").innerHTML = appData.timelineHtml.rightSideHtml;
    appData.currentGrowIndex = 0;
    resolve("displayed grow timeline");
    reject("didn't display grow timeline");
  });
}

function validateGrowSubmit() {
  return new Promise ((resolve, reject) => {
    //grow name validation
    const nameField = document.getElementById("new-grow-name").value;
    if (nameField == "") {
      alert("You have to give your grow a name.");;
    }
    else {
      appData.growSubmit.name = nameField;
    }
    //strain validation
    let strainField;
    //getting the value of the radio element, if checked
    const radios = document.getElementsByName("strain");
    radios.forEach(function(element){
      if (element.checked) {
        strainField = element.value;
      }
    });
    //varifying whether a value was checked
    if (strainField !=null) {
      appData.growSubmit.strain = strainField;
    }
    else {
      alert("You have to select a strain type.");
    }
    //date validation
    let dateField = document.getElementById("germination-date").value;
    if (dateField == "") {
      appData.growSubmit.date = moment();
    }
    else if (moment(dateField).isValid()) {
      appData.growSubmit.date = dateField;
    }
    else {
      alert("Not a valid date.");
    }
    if (appData.growSubmit.name !== "" && appData.growSubmit.strain !== "" && appData.growSubmit.date !== "") {
      resolve("validated the grow submission");
    } else {
      console.log("grow submission was no validated. calling submitGrow() again");
      onSubmitGrowClick();
    }
  });
}

//listens for user to submit info for a new grow
function onSubmitGrowClick() {
  const submitGrow = document.getElementById("submit-grow");
  submitGrow.addEventListener('click', function () {
    event.preventDefault();
    appData.allGrows = {};
    validateGrowSubmit().then(function(resolve){
      console.log("a " + resolve);
      return postGrow(makePostObject());
    }).then(function(resolve){
      console.log("b " + resolve);
      return getAllGrows();
    }).then(function(resolve){
      console.log("c " + resolve);
       turnPage("add-grow-page", "grow-entries-page");
      appData.currentGrowIndex = appData.allGrows.grows.length-1;
      appData.page = "timeline";
      main();
    });
  });
}

function makePostObject() {
  const post = {
    id: '',
    growName: appData.growSubmit.name,
    startDate: appData.growSubmit.date,
    endDate: '',
    strain: appData.growSubmit.strain,
  };
  return post;
}

//listens for user to select option to delete a past grow
//function deleteGrowPage() {
  //$().on("click", function(event) {
//  $('#grow-entries-page').addClass('hidden');
//  $('#delete-entry-page').removeClass('hidden');
//  deleteGrow(index);
  //});
//}
//listens for user to confirm their option to delete a past grow
//function deleteGrow(index) {
//  $('#delete-confirm').on("click", function(event) {
  //deleteThings(afterDeleteTest, index);
//  deleteThings(afterDeleteTest, 0);
//  });
//}

//function deleteThings(callback, id) {
//  const settings = {
//      url: GROW_ENTRIES_JSON/${id},
//      dataType: 'json',
//      type: 'DELETE',
//      success: function(result) {
//      }
//  });
//$.ajax(settings);
//  setTimeout(function(){callback(deleteAgrow)}, 100);
//  deleteAgrow.splice(index, 1);
//}

//for grow-entries-page, where user is able to see a timeline of all the entries that have been inputed for that grow

// listens for user to select one of the log entries to display grow-entries-page
//function displayLogEntry() {
//  $().on("click", function(event) {
//  });
//}

//listens for user to select option to add a new log entry
//function addLogEntry() {
//  $().on("click", function(event) {
//  });
//}
function main() {
  if (appData.page === "" || appData.page === "grows" ){
    getAllGrows().then(function(resolve){
        console.log("a " + resolve);
        return displayImageGrid();
    }).then(function(resolve){
      console.log("b " + resolve);
      onGrowClick();
      addGrowClick();
    });
  } else if (appData.page === "timeline") {
    renderFullTimeline().then(function(resolve){
      console.log("a " + resolve);
      return displayGrowTimeline();
    }).then(function(resolve){
      console.log("b " + resolve);
    });
  } else if (appData.page === "add-grow") {
    onSubmitGrowClick();
  }
}

$(function(){
  main();
});
