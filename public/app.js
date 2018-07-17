/*jshint esversion: 6*/

const appData = {
  page: "",
  allGrows: "",
  currentGrowIndex: "",
  currentEntryIndex: "",
  nutrientInstructs: {
    floraMicro: "",
    floraGrow: "",
    floraBloom: "",
    caliMagic: ""
  },
};

//promise functions
//function resolve(letterOfOrder) {
//  console.log(letterOfOrder);
//}

//function reject(letterOfOrder) {
//  console.log(letterOfOrder);
//}

//ajax calls
function getNutrientInstructs(objectToAddTo) {
  return new Promise ((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', `/nutrient-schedules/${name}`);
    req.onload = () => {
      const parsedData = JSON.parse(req.response);
      //entryInstructs = {
      //week: week number of entry
      //entryNumber: the entry number
      //wasWatered: if needs to be watered
      //wasfed: if needs to be fed
      //nutrients: {
      //  floraMicro: ,
      //  floraGrow: ,
      //  floraNloom: ,
      //  caliMagic
    //}
    //}
      const index = objectToAddTo.week - 1;
      const nutrientInstructs = parsedData.schedule[index].nutrients;
      objectToAddTo.nutrients = nutrientInstructs;
      return (req.status === 200 ? resolve(objectToAddTo) : reject(Error(req.statusText)));
    };
    req.onerror = (e) => reject(Error(`Network Error: ${e}`));
    req.send();
  });
}

function getAllGrows() {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', '/grows');
    req.onload = () => {
      const parsedData = JSON.parse(req.response);
      appData.allGrows = parsedData;
      return (req.status === 200 ? resolve(parsedData) : reject(Error(req.statusText)));
    };
    req.onerror = (e) => reject(Error(`Network Error: ${e}`));
    req.send();
  });
}

function postGrow(grow) {
  return new Promise((resolve, reject) => {
    const post = {
      name: grow.name,
      startDate: grow.startDate,
      strain: grow.strain,
    };
  //    const settings = {
  //      url: '/grows',
  //      dataType: 'json',
  //      type: 'POST',
  //      data: JSTON.stringify(post),
  //    };
  //    $.ajax(settings);
  //   const formData = new FormData();
  //   formData.append('name', 'adsfasdf');
  //   //formData.append('startDate', 'asdfasdf');
  //   //formData.append('strain', 'adfasdf');
    const req = new XMLHttpRequest();
    req.open('POST', '/grows', true);
    //const params = 'name=adsasf&startDate=asdfasdf&strain=whatever';
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //req.onreadystatechange = function() {//Call a function when the state changes.
    //   if(this.readyState == XMLHttpRequest.DONE && this.status == 200) {
    //     console.log('it worked');
    //   }
    // };
    req.onload = () => {
      console.log(req.response);
      return (req.status === 200 ? resolve(JSON.parse(req.response)) : reject(Error(req.statusText)));
    };
    req.send(post);
   });
}

function postEntry(postObject) {
  return new Promise ((resolve, reject) => {
  //  const settings = {
  //    url: GROW_ENTRIES_JSON,
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

function putEntry(putObject, paramsObject) {
  return new Promise ((resolve, reject) => {
    const settings = {
      url: GROW_ENTRIES_JSON,
      dataType: 'json',
      type: 'PUT',
      data: putObject,
      success: callback
    };
    $.ajax(settings);
    putAnEntry = putObject;
    if (putAnEntry === putObject) {
      resolve("edited an entry");
    } else {
      reject("didn't edit an entry");
    }
  });
}

function getAllGrows() {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open('GET', '/grows');
    req.onload = () => {
      const response = JSON.parse(req.response);
      console.log(response);
      appData.allGrows = response;
      return (req.status === 200 ? resolve(response) : reject(Error(req.statusText)));
    };
    req.onerror = (e) => reject(Error(`Network Error: ${e}`));
    req.send();
  });
}

function deleteEntry(paramsObj) {
//
console.log(paramsObj)
var xhr = new XMLHttpRequest();
xhr.open("DELETE", `entries/${paramsObj.growId}/${paramsObj.entryId}`, true);
xhr.onload = function () {
	var response = JSON.parse(xhr.responseText);
	if (xhr.readyState == 4 && xhr.status == "200") {
		console.table(response);
	} else {
		console.error(response);
	}
};
xhr.send(null);
  // var req = new XMLHttpRequest();
  // req.open("DELETE", `entries/${paramsObj.growId}/${paramsObj.entryId}`, true);
  // req.onload = function () {
  // 	const response = JSON.parse(req.responseText);
  // 	return (req.readyState == 4 && req.status == 204 ? resolve(response) : reject(Error(req.statusText)));
  // };
  // req.send(null);
 //});
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
  });
}

///drawing cover-page canvas wallpaper
//convert the mouse coordinates that are passed from the event object
//from window coordinates to canvas coordinates
function windowToCanvas(canvas, x, y) {
  const bbox = canvas.getBoundingClientRect();
  return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
          };
}



function drawWallPaper() {
  const canvas = document.getElementById('weed-canvas');
  const currentWeed = new Image(100, 100);
  currentWeed.src = "weed-1-smaller.png";
  const context = canvas.getContext('2d');

  canvas.addEventListener("mousemove", function(e){
    if (currentWeed.complete){
      const loc = windowToCanvas(canvas, e.clientX, e.clientY);
      console.log(`x coordinate of mouse is: ${e.clientX}`);
      console.log(`y coordinate of mouse is: ${e.clientY}`);
      console.log(currentWeed);
      console.log(`the image width is ${currentWeed.width} and the image height is ${currentWeed.height}`);
      context.drawImage(currentWeed, e.clientX, e.clientY, currentWeed.width, currentWeed.height);
    }
  });
};

////render, display, and event listener functions for image grid of all current grows

function renderImageGrid(item, index) {
  const imageHtml = `
    <a href="#" id="grow-${index}" class="grow-links" role="button">
      <h3>${item.name}</h3>
      <h4>Started:<br>${item.startDate}</h4>
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

function displayImageGrid(data) {
  return new Promise ((resolve, reject) => {
    // TODO: add in something that displays a message when there are no grows in the database
    const imageGrid = data.grows.map((item, index) => renderImageGrid(item, index)) + renderAddGrow();
    document.getElementById("grow-grid").innerHTML = imageGrid;
    removeClass(document.getElementById('add-a-grow'),'hidden');
    resolve("displayed image grid");
    reject("didn't display image grid");
  });
}

function onGrowClick() {
  const growLinks = Array.from(document.getElementsByClassName("grow-links")).forEach(function(element) {
    element.addEventListener('click', function () {
      const imageId = this.getAttribute('id');
      appData.currentGrowIndex = Number(imageId.slice(5, imageId.length));
      appData.page = "timeline";
      main();
    });
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
    const timelineHtml = {
      leftSide: leftSideHtml,
      rightSide: rightSideHtml
    }
    //appData.timelineHtml.leftSideHtml = leftSideHtml;
    //appData.timelineHtml.rightSideHtml = rightSideHtml;
    resolve(timelineHtml);
    reject("didnt render the timeline");
  });
}


function displayGrowTimeline(timelineHtml) {
  return new Promise ((resolve, reject) => {
    turnPage('grow-collection-page', 'grow-entries-page');
    document.getElementById("grow-name").innerHTML = appData.allGrows.grows[appData.currentGrowIndex].name;
    document.getElementById("left-side").innerHTML = timelineHtml.leftSide;
    document.getElementById("right-side").innerHTML = timelineHtml.rightSide;
    resolve("displayed grow timeline");
    reject("didn't display grow timeline");
  });
}

function validateGrowSubmit() {
  return new Promise ((resolve, reject) => {
    const growSubmit = {};
    const nameField = document.getElementById("new-grow-name").value;
    if (nameField == "") {
      alert("You have to give your grow a name.");
    }
    else {
      growSubmit.name = nameField;
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
      growSubmit.strain = strainField;
    }
    else {
      alert("You have to select a strain type.");
    }
    //date validation
    let dateField = document.getElementById("germination-date").value;
    if (dateField == "") {
      growSubmit.startDate = moment();
    }
    else if (moment(dateField).isValid()) {
      growSubmit.startDate = dateField;
    }
    else {
      alert("Not a valid date.");
    }
    if (growSubmit.name !== "" && growSubmit.strain !== "" && growSubmit.startDate !== "") {
      resolve(growSubmit);
    } else {
      reject("grow submission was no validated. calling submitGrow() again");
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
      return postGrow(resolve);
    }).then(function(resolve){
      appData.allGrows = {};
      return getAllGrows();
    }).then(function(resolve){
       turnPage("add-grow-page", "grow-entries-page");
      appData.currentGrowIndex = appData.allGrows.grows.length-1;
      appData.page = "timeline";
      main();
    });
  });
}

function makeGrowPost() {
  const post = {
    name: appData.growSubmit.name,
    startDate: appData.growSubmit.date,
    strain: appData.growSubmit.strain,
  };
  return post;
}

function onEntryClick() {
  Array.from(document.getElementsByClassName("past-entry")).forEach(function(element) {
    element.addEventListener('click', function () {
      const entryId = this.getAttribute('id');
      appData.currentEntryIndex = Number(entryId.slice(6, entryId.length));
      appData.page = "view-entry";
      main();
    });
  });
}

function displayEntry() {
  return new Promise ((resolve, reject) => {
    turnPage("grow-entries-page", "view-entry-page");
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const thisEntry = thisGrow.entries[appData.currentEntryIndex];
    const thisEntryDate = moment(thisEntry.date);
    document.querySelectorAll("#view-entry-page .week-number")[0].innerHTML = thisEntry.week;
    const entryNumber = appData.currentEntryIndex + 1;
    document.querySelectorAll("#view-entry-page .entry-number")[0].innerHTML = entryNumber;
    document.getElementById('past-entry-date').innerHTML = thisEntryDate.format("M.D.YY");
    if (thisEntry.phase === "vegetative"){
      removeClass(document.getElementById("vegetative-phase"),'hidden');
    }
    else if (thisEntry.phase === "flowering") {
      removeClass(document.getElementById("flowering-phase"),'hidden');
    }
    if (thisEntry.wasWatered === true) {
      removeClass(document.getElementById("watered"),'hidden');
    }
    else {
      removeClass(document.getElementById("fed"),'hidden');
      removeClass(document.querySelectorAll("#view-entry-page .nutrient-list"),'hidden');
      document.querySelectorAll("#view-entry-page .flora-micro")[0].innerHTML = thisEntry.nutrients.floraMicro;
      document.querySelectorAll("#view-entry-page .flora-grow")[0].innerHTML = thisEntry.nutrients.floraGrow;
      document.querySelectorAll("#view-entry-page .flora-bloom")[0].innerHTML = thisEntry.nutrients.floraBloom;
      document.querySelectorAll("#view-entry-page .cali-magic")[0].innerHTML = thisEntry.nutrients.caliMagic;
    }
    const myGrows = Array.from(document.getElementsByClassName("my-grow"));
    myGrows.forEach(
      function(element) {
        element.innerHTML = thisGrow.name;
      }
    );
    const entryNotes = document.getElementById("notes");
    entryNotes.innerHTML = thisEntry.notes;
    resolve(thisEntry);
    reject("didn't display entry");
  });
}

function goBackFromEntry() {
  const backArrow = document.querySelectorAll("#view-entry-page button");
  backArrow[0].addEventListener('click', function () {
    turnPage("view-entry-page", "grow-entries-page");
    turnPage("entry-edit", "notes-box");
    addClass(document.getElementById("vegetative-phase"),'hidden');
    addClass(document.getElementById("flowering-phase"),'hidden');
    addClass(document.getElementById("watered"),'hidden');
    addClass(document.getElementById("fed"),'hidden');
    addClass(document.querySelectorAll("#view-entry-page .nutrient-list"),'hidden');
    appData.page = "timeline";
    main();
  });
}

function addEntryClick() {
  const addEntry = document.getElementById('add-entry');
  addEntry.addEventListener('click', function () {
    turnPage("grow-entries-page", "add-entry-page");
    appData.page = "add-entry";
    main();
  });
}

function calculateInstructs() {
  return new Promise ((resolve, reject) => {
    const entryInstructs = {};
    const todaysDate = moment();
    const startDate = moment(appData.allGrows.grows[appData.currentGrowIndex].startDate);
    entryInstructs.week = todaysDate.diff(startDate, 'weeks');
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    entryInstructs.number = thisGrow.entries.length + 1;
    if (entryInstructs.number % 2 == 0) {
      entryInstructs.wasWatered = true;
      entryInstructs.wasFed = false;
      return false;
    } else if (entryInstructs.number % 2 != 0) {
      entryInstructs.wasWatered = false;
      entryInstructs.wasFed = true;
      return true;
    }
    resolve(entryInstructs);
    reject('instructions were not calculated');
  });
}

function displayEntryInstructs(entryInstructs) {
  return new Promise ((resolve, reject) => {
    //entryInstructs = {
    //week: week number of entry
    //number: the entry number
    //wasWatered: if needs to be watered
    //wasfed: if needs to be fed
    //nutrients: {
    //  floraMicro: ,
    //  floraGrow: ,
    //  floraNloom: ,
    //  caliMagic
    //}
  //}
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const theseEntries = thisGrow.entries;
    document.querySelectorAll("#add-entry-page .week-number")[0].innerHTML = entryInstructs.week;
    document.querySelectorAll("#add-entry-page .entry-number")[0].innerHTML = entryInstructs.number;
    if (entryInstructs.wasFed) {
      removeClass(document.getElementById("feed-instruct"),'hidden');
      document.querySelectorAll("#add-entry-page .flora-micro")[0].innerHTML = entryInstructs.nutrients.floraMicro;
      document.querySelectorAll("#add-entry-page .flora-grow")[0].innerHTML = entryInstructs.nutrients.floraGrow;
      document.querySelectorAll("#add-entry-page .flora-bloom")[0].innerHTML = entryInstructs.nutrients.floraBloom;
      document.querySelectorAll("#add-entry-page .cali-magic")[0].innerHTML = entryInstructs.nutrients.caliMagic;
    } else {
      removeClass(document.getElementById("water-instruct"),'hidden');
      addClass(document.getElementById("water-instruct"),'flex');
    }
    const lastEntry = theseEntries[theseEntries.length - 1];
    if (entryInstructs.week > 2 && lastEntry.phase === "vegetative") {
      removeClass(document.getElementById("phase-switch"),'hidden');
    }
    resolve(entryInstructs);
    reject("didn't display entry instructs");
  });
}

function onSubmitEntryClick(entrySubmit) {
  //entrySubmit = {
  //number: the entry number,
  //date,
  //week: week number of entry,
  //phase: vegeative or flowering,
  //wasWatered: if needs to be watered,
  //wasfed: if needs to be fed,
  //nutrients: {
  //  floraMicro: ,
  //  floraGrow: ,
  //  floraNloom: ,
  //  caliMagic
  //}
//}
  const submitEntry = document.getElementById("submit-entry");
  submitEntry.addEventListener('click', function () {
    event.preventDefault();
    const phaseSwitch = document.getElementById('phase-switch').checked;
    if (phaseSwitch) {
      entrySubmit.phase = 'flowering';
    }
    else {
      entrySubmit.phase = 'vegetative';
    }
    entrySubmit.date = moment();
    entrySubmit.notes = document.getElementById("entry-notes").value;
    postEntry(entrySubmit).then(function(resolve){
      appData.allGrows = {};
      appData.currentEntryIndex = '';
      return getAllGrows();
    }).then(function(resolve){
      turnPage("add-entry-page", "grow-entries-page");
      appData.page = "timeline";
      main();
    });
  });
}

function onDeleteEntry() {
  const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
  const thisEntry = thisGrow.entries[appData.currentEntryIndex];
  const params = {
    growId: thisGrow.shortId,
    entryId: thisEntry.shortId
  };
  const deleteThisEntry = document.getElementById("delete-entry");
  deleteThisEntry.addEventListener('click', function () {
    turnPage("view-entry-page", "delete-entry-page");
    const deleteConfirm = document.getElementById("delete-confirm");
    deleteConfirm.addEventListener('click', function () {
      deleteEntry(params).then(function(){
      return getAllGrows();
    }).then(function(){
       turnPage("delete-entry-page", "grow-entries-page");
      });
    });
    const deleteDeny = document.getElementById("delete-deny");
    deleteDeny.addEventListener('click', function () {
      turnPage("delete-entry-page", "view-entry-page");
    });
  });
}

function onEditEntry() {
  const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
  const thisEntry = thisGrow.entries[appData.currentEntryIndex];
  const params = {
    growId: thisGrow.shortId,
    entryId: thisEntry.shortId
  };
  const editEntry = document.getElementById("edit-entry");
  editEntry.addEventListener('click', function () {
    turnPage("notes-box", "entry-edit");
    document.getElementById("edit-notes").innerHTML = thisEntry.notes;
    document.getElementById('post-id').setAttribute('value', thisEntry.id);
    const submitEdit = document.getElementById("submit-edit");
    submitEdit.addEventListener('click', function () {
      const editNotes = document.getElementById("edit-notes").value;
      putEntry(editNotes, params).then(function(resolve){
          return getAllGrows();
      }).then(function(resolve){
          turnPage("entry-edit", "notes-box");
      });
    });
    const exitEdit = document.getElementById("exit-edit");
    exitEdit.addEventListener('click', function () {
      turnPage("entry-edit", "notes-box");
    });
  });
}

function main() {
  if (appData.page === "" || appData.page === "cover" ){
    drawWallPaper();
  } else if (appData.page === "grows" ){
    getAllGrows().then(function(resolve){
        return displayImageGrid(resolve);
    }).then(function(resolve){
      onGrowClick();
      addGrowClick();
    });
  } else if (appData.page === "timeline") {
    renderFullTimeline().then(function(resolve){
      return displayGrowTimeline(resolve);
    }).then(function(resolve){
      onEntryClick();
      addEntryClick();
      goBack("grow-entries-page", "grow-collection-page", "grows", "#grow-entries-page button");
    });
  } else if (appData.page === "add-grow") {
    onSubmitGrowClick();
    goBack("add-grow-page", "grow-collection-page", "grows", "#add-grow-page button");
  } else if (appData.page === "add-entry") {
      calculateInstructs().then(function(resolve){
        if (resolve.wasFed === true) {
            getNutrientInstructs(resolve).then(function(resolve){
            return displayEntryInstructs(resolve);
          }).then(function(resolve){
            onSubmitEntryClick(resolve);
            goBack("add-entry-page", "grow-entries-page", "timeline", "#add-entry-page button");
          });
        }
        else {
          displayEntryInstructs(resolve).then(function(resolve){
            onSubmitEntryClick(resolve);
            goBack("add-entry-page", "grow-entries-page", "timeline", "#add-entry-page button");
          });
        }
      });
  } else if (appData.page === "view-entry") {
    displayEntry().then(function(){
      onDeleteEntry();
      onEditEntry();
      goBackFromEntry();
    });
  }
}
// TODO: convert to vanilla javascript
$(function(){
  main();
});
