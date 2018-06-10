/*jshint esversion: 6*/

const appData = {
  page: "",
  allGrows: "",
  oneGrow: "",
  currentGrowIndex: "",
  currentEntryIndex: "",
  timelineHtml: {
    leftSideHtml: "",
     rightSideHtml: "",
   },
   growSubmit: {
     name: "",
     date: "",
     strain: ""
   },
   entrySubmit: {
     week: "",
     phase: '',
     watered: "",
     fed: "",
     nutrients: {},
     notes: ""
   },
   entries: "",
   entryNumber: "",
   currentWeek: "",
};

//promise functions
function resolve(letterOfOrder) {
  console.log(letterOfOrder);
}

function reject(letterOfOrder) {
  console.log(letterOfOrder);
}

//ajax calls
function getNutrientInstructs() {
  return new Promise ((resolve, reject) => {
    //    const settings = {
    //    url: ,
    //    dataType: 'json',
    //    type: 'GET',
    //    success: callback
    //  };
    //  $.ajax(settings);
    appData.entrySubmit.nutrients = nutrientSchedg.schedule[appData.currentWeek];
    if (appData.entrySubmit.nutrients == nutrientSchedg.schedule[appData.currentWeek]) {
      resolve("got this week's nutrient schedg");
    } else {
      reject("didn't get this week's nutrient schedg");
    }
  });
}

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
    appData.oneGrow = oneGrow;
    if (appData.oneGrow == oneGrow) {
      resolve("got a grow");
    } else {
      reject("didn't get a grow");
    }
  });
}

function getAllEntries() {
  return new Promise ((resolve, reject) => {
    //    const settings = {
    //    url: GROW_ENTRIES_JSON,
    //    dataType: 'json',
    //    type: 'GET',
    //    success: callback
    //  };
    //  $.ajax(settings);
    appData.entries = growCollection;
    if (appData.entries == growCollection) {
      resolve("got all grows");
    } else {
      reject("didn't get all grows");
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


function postEntry(postObject) {
  return new Promise ((resolve, reject) => {
  //  const settings = {
  //    url: GROW_ENTRIES_JSON/${id},
  //    dataType: 'json',
  //    type: 'POST',
  //    data: postObject,
  //    success: callback
  //  };
  //  $.ajax(settings);
   postAentry = postObject;
   if (postAentry == postObject) {
     resolve("posted an entry");
   } else {
     reject("didn't post an entry");
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

function deleteGrow (callback, id) {
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

function deleteEntry (callback, id) {
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

function putEntry(callback, putObject, index, id) {
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

///goBack function (event listener that's on most pages)
function goBack(currentPageId, returningPageId, newPageName, selector) {
  const backArrow = document.querySelectorAll(selector);
  backArrow[0].addEventListener('click', function () {
    turnPage(currentPageId, returningPageId);
    appData.page = newPageName;
    main();
    console.log("goBack ran");
  });
}

////render, display, and event listener functions for image grid of all current grows

function renderImageGrid(item, index) {
  const imageHtml = `
    <a href="#" id="grow-${index}" class="grow-links" role="button">
      <h3>${appData.allGrows.grows[index].growName}</h3>
      <h4>Started:<br>${appData.allGrows.grows[index].startDate}</h4>
    </a>
  `;
    return imageHtml;
}

function renderAddGrow() {
  const addGrowHtml = `
  <a href="#" class="grid-images hidden" id="add-a-grow">
    <h3>+ Add<br>a Grow</h3>
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
    appData.currentGrowIndex = Number(imageId.slice(5, imageId.length));
    console.log(appData.currentGrowIndex);
    appData.page = "timeline";
    main();
    console.log("onGrowClick ran");
  });
}

function addGrowClick() {
  const addGrow = document.querySelector('#add-a-grow');
  addGrow.addEventListener('click', function () {
    turnPage("grow-collection-page", "add-grow-page");
    appData.page = "add-grow";
    main();
    console.log("addGrowClick ran");
  });
}

function renderTimelineEntry(index, side, topPosition) {
  const theseEntries = appData.allGrows.grows[appData.currentGrowIndex].entries;
   if (theseEntries[index].phase === "flowering" && side === "left") {
    const entryHtml= `
    <div class="timeline-entry past-entry ${side}" id="entry-${index}" style="top:${topPosition}px">
      <h2>${theseEntries[index].date}</h2>
      <img src="flowering.png"/>
    </div>
    `;
    return entryHtml;
  } else if (theseEntries[index].phase === "vegetative" && side === "left") {
    const entryHtml= `
    <div class="timeline-entry past-entry ${side}" id="entry-${index}" style="top:${topPosition}px">
      <h2>${theseEntries[index].date}</h2>
      <img src="vegetative.png" style="transform:scaleX(-1);
          filter: FlipH;"/>
    </div>
    `;
    return entryHtml;
  } else if (theseEntries[index].phase === "flowering" && side === "right") {
    const entryHtml= `
    <div class="timeline-entry past-entry ${side}" id="entry-${index}" style="top:${topPosition}px">
      <img src="flowering.png" style="transform:scaleX(-1);
          filter: FlipH;"/>
      <h2>${theseEntries[index].date}</h2>
    </div>
    `;
    return entryHtml;
  } else if (theseEntries[index].phase === "vegetative" && side === "right") {
    const entryHtml= `
    <div class="timeline-entry past-entry ${side}" id="entry-${index}" style="top:${topPosition}px">
      <img src="vegetative.png"/>
      <h2>${theseEntries[index].date}</h2>
    </div>
    `;
    return entryHtml;
  }
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
    const timelineHeight = timeLineDays * 20; //20px per day
    document.getElementById('timeline-line').setAttribute("style",`height:${timelineHeight}px`);
    //document.getElementById('grow-timeline').setAttribute("style",`height:${timelineHeight/.9}px`);
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
              leftSideHtml += renderTimelineEntry(x, "left", i*20);
            } else if (x % 2 != 0) {
              rightSideHtml += renderTimelineEntry(x, "right", i*20);
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
    resolve("displayed grow timeline");
    reject("didn't display grow timeline");
  });
}

function validateGrowSubmit() {
  return new Promise ((resolve, reject) => {
    //grow name validation
    const nameField = document.getElementById("new-grow-name").value;
    if (nameField == "") {
      alert("You have to give your grow a name.");
    }
    else {
      Submit.name = nameField;
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
    if (strainField != null) {
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

function onSubmitGrowClick() {
  const submitGrow = document.getElementById("submit-grow");
  submitGrow.addEventListener('click', function () {
    event.preventDefault();
    appData.allGrows = {};
    validateGrowSubmit().then(function(resolve){
      console.log("a " + resolve);
      return postGrow(makeGrowPost());
    }).then(function(resolve){
      appData.allGrows = {};
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

function makeGrowPost() {
  const post = {
    id: '',
    growName: appData.growSubmit.name,
    startDate: appData.growSubmit.date,
    endDate: '',
    strain: appData.growSubmit.strain,
  };
  return post;
}

function makeEntryPost() {
  const post = {
    date: moment(),
    week: appData.currentWeek,
    phase: appData.entrySubmit.phase,
    watered: appData.entrySubmit.watered,
    fed:
      {
        floraMicro: appData.entrySubmit.nutrients.floraMicro,
        floraGrow: appData.entrySubmit.nutrients.floraGrow,
        floraBloom: appData.entrySubmit.nutrients.floraBloom,
        caliMagic: appData.entrySubmit.nutrients.caliMagic,
      },
    notes: appData.entrySubmit.notes
  };
  return post;
}

function onEntryClick() {
  Array.from(document.getElementsByClassName("past-entry")).forEach(
    function(element) {
      element.addEventListener('click', function () {
        const entryId = this.getAttribute('id');
        appData.currentEntryIndex = Number(entryId.slice(6, entryId.length));
        appData.entryNumber = appData.currentEntryIndex + 1;
        appData.page = "view-entry";
        main();
        console.log("onEntryClick ran");
      });
    }
  );
}

function displayEntry() {
  return new Promise ((resolve, reject) => {
    turnPage("grow-entries-page", "view-entry-page");
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    console.log(appData.currentGrowIndex);
    const thisEntry = thisGrow.entries[appData.currentEntryIndex];
    console.log(appData.currentEntryIndex);
    const thisEntryDate = moment(thisEntry.date);
    const weekNumberClass = document.querySelectorAll("#view-entry-page .week-number");
    weekNumberClass[0].innerHTML = thisEntry.week;
    const entryNumberClass = document.querySelectorAll("#view-entry-page .entry-number");
    entryNumberClass[0].innerHTML = appData.entryNumber;
    document.getElementById('past-entry-date').innerHTML = thisEntryDate.format("M.D.YY");
    if (thisEntry.phase === "vegetative"){
      removeClass(document.getElementById("vegetative-phase"),'hidden');
    }
    else if (thisEntry.phase === "flowering") {
      removeClass(document.getElementById("flowering-phase"),'hidden');
    }
    if (thisEntry.watered === true) {
      removeClass(document.getElementById("watered"),'hidden');
    }
    else {
      removeClass(document.getElementById("fed"),'hidden');
      removeClass(document.querySelectorAll("#view-entry-page .nutrient-list"),'hidden');
      console.log(thisEntry.nutrients);
      document.querySelectorAll("#view-entry-page .flora-micro")[0].innerHTML = thisEntry.nutrients.floraMicro;
      document.querySelectorAll("#view-entry-page .flora-grow")[0].innerHTML = thisEntry.nutrients.floraGrow;
      document.querySelectorAll("#view-entry-page .flora-bloom")[0].innerHTML = thisEntry.nutrients.floraBloom;
      document.querySelectorAll("#view-entry-page .cali-magic")[0].innerHTML = thisEntry.nutrients.caliMagic;
    }
    const myGrows = Array.from(document.getElementsByClassName("my-grow"));
    myGrows.forEach(
      function(element) {
        element.innerHTML = thisGrow.growName;
      }
    );
    resolve("displayed entry");
    reject("didn't display entry");
  });
}

function addEntryClick() {
  const addEntry = document.getElementById('add-entry');
  addEntry.addEventListener('click', function () {
    turnPage("grow-entries-page", "add-entry-page");
    appData.page = "add-entry";
    main();
    console.log("addEntryClick ran");
  });
}

function calculateInstructs() {
  const todaysDate = moment();
  const startDate = moment(appData.allGrows.grows[appData.currentGrowIndex].startDate);
  appData.currentWeek = todaysDate.diff(startDate, 'weeks');
  appData.entrySubmit.week = todaysDate.diff(startDate, 'weeks');
  const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
  appData.entryNumber = thisGrow.entries.length + 1;
  if (appData.entryNumber % 2 == 0) {
    appData.entrySubmit.watered = true;
    appData.entrySubmit.fed = false;
    return false;
  } else if (appData.entryNumber % 2 != 0) {
    appData.entrySubmit.watered = false;
    appData.entrySubmit.fed = true;
    return true;
  }
  console.log("a");
}

function displayEntryInstructs(trueOrFalse) {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const theseEntries = thisGrow.entries;
    const weekNumberClass = document.querySelectorAll("#add-entry-page .week-number");
    weekNumberClass[0].innerHTML = appData.entrySubmit.week;
    const entryNumberClass = document.querySelectorAll("#add-entry-page .entry-number");
    entryNumberClass[0].innerHTML = appData.entryNumber;
    if (trueOrFalse) {
      removeClass(document.getElementById("feed-instruct"),'hidden');
      document.querySelectorAll("#add-entry-page .flora-micro")[0].innerHTML = appData.entrySubmit.nutrients.floraMicro;
      document.querySelectorAll("#add-entry-page .flora-grow")[0].innerHTML = appData.entrySubmit.nutrients.floraGrow;
      document.querySelectorAll("#add-entry-page .flora-bloom")[0].innerHTML = appData.entrySubmit.nutrients.floraBloom;
      document.querySelectorAll("#add-entry-page .cali-magic")[0].innerHTML = appData.entrySubmit.nutrients.caliMagic;
    } else {
      removeClass(document.getElementById("water-instruct"),'hidden');
      addClass(document.getElementById("water-instruct"),'flex');
    }
    const lastEntry = theseEntries[theseEntries.length - 1];
    if (appData.currentWeek > 2 && lastEntry.phase === "vegetative") {
      removeClass(document.getElementById("phase-switch"),'hidden');
    }
    resolve("displayed entry instructs");
    reject("didn't display entry instructs");
  });
}

function onSubmitEntryClick() {
  const submitEntry = document.getElementById("submit-entry");
  submitEntry.addEventListener('click', function () {
    event.preventDefault();
    const phaseSwitch = document.getElementById('phase-switch').checked;
    if (phaseSwitch) {
      appData.entrySubmit.phase = 'flowering';
    }
    appData.entrySubmit.notes = document.getElementById("entry-notes").value;
    postEntry(makeEntryPost).then(function(resolve){
      //clear out the relevant local data
      appData.allGrows = {};
      appData.currentEntryIndex = '';
      appData.entrySubmit = '';
      console.log("a " + resolve);
      return getGrow(appData.currentGrowIndex);
    }).then(function(resolve){
      console.log("c " + resolve);
      turnPage("add-entry-page", "grow-entries-page");
      appData.page = "timeline";
      main();
    });
  });
}

function onDeleteEntry() {
  const deleteEntry = document.getElementById("delete-entry");
  submitEntry.addEventListener('click', function () {
    turnPage("grow-collection-page", "add-grow-page");

  });
}

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
      onEntryClick();
      addEntryClick();
      goBack("grow-entries-page", "grow-collection-page", "grows", "#grow-entries-page button");
    });
  } else if (appData.page === "add-grow") {
    onSubmitGrowClick();
    goBack("add-grow-page", "grow-collection-page", "grows", "#add-grow-page button");
  } else if (appData.page === "add-entry") {
      if (calculateInstructs() === true) {
          getNutrientInstructs().then(function(resolve){
          console.log("b " + resolve);
          return displayEntryInstructs(true);
        }).then(function(resolve){
           console.log("c " + resolve);
          onSubmitEntryClick();
          goBack("add-entry-page", "grow-entries-page", "timeline", "#add-entry-page button");
        });
      }
      else {
        displayEntryInstructs(false).then(function(resolve){
          console.log("b " + resolve);
          onSubmitEntryClick();
          goBack("add-entry-page", "grow-entries-page", "timeline", "#add-entry-page button");
        });
      }
  } else if (appData.page === "view-entry") {
    displayEntry().then(function(resolve){
      console.log("a " + resolve);
      goBack("view-entry-page", "grow-entries-page", "timeline", "#view-entry-page button");
    });
  }
}

$(function(){
  main();
});
