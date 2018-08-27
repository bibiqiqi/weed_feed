/*jshint esversion: 6*/

const appData = {
  page: "",
  allGrows: "",
  currentGrowIndex: "",
  currentEntryIndex: "",
  entryDeets: {}
};

//ajax call functions
function getNutrientInstructs(entryDeets) {
  const stage = entryDeets.phaseProgress.stage;
  return new Promise ((resolve, reject) => {
    //console.log(`getNutrientInstructs() is making a request to this endpoint: /nutrient-schedules`);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/nutrient-schedules`);
    xhr.onload = () => {
      const parsedData = JSON.parse(xhr.response);
      parsedData.schedule.forEach(function(elem){
        if (elem.stage === stage ) {
          entryDeets.nutrients = elem.nutrients;
        }
      });
      return (xhr.status === 200 ? resolve(entryDeets) : reject(Error(xhr.statusText)));
    };
    xhr.send();
  });
}

function getAllGrows() {
  return new Promise((resolve, reject) => {
    //console.log('getAllGrows() is making a request to this endpoint: /grows');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/grows');
    xhr.onload = () => {
      const parsedData = JSON.parse(xhr.response);
      appData.allGrows = parsedData;
      //console.log('getAllGrows assigned all the grows in the db to appData.allGrows:', appData.allGrows);
      return (xhr.status === 200 ? resolve(parsedData) : reject(Error(xhr.statusText)));
    };
    xhr.send();
  });
}

function postGrow(grow) {
  return new Promise((resolve, reject) => {
    //console.log('postGrow() is making a request with', grow, 'to this endpoint: /grows');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/grows', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = () => {
      //console.log(xhr.response);
      const parsedResp = JSON.parse(xhr.response);
      return (xhr.status === 201 ? resolve(parsedResp) : reject(Error(xhr.statusText)));
    };
    xhr.send(JSON.stringify(grow));
   });
}

function postEntry(entry) {
  return new Promise((resolve, reject) => {
    const growId = appData.allGrows.grows[appData.currentGrowIndex].shortId;
    //console.log('postEntry() is making a request with', entry, 'to this endpoint: /entries/', growId);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/entries/${growId}`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = () => {
      const parsedResp = JSON.parse(xhr.response);
      return (xhr.status === 201 ? resolve(parsedResp) : reject(Error(xhr.statusText)));
    };
    xhr.send(JSON.stringify(entry));
   });
}

function putGrow(edit) {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const growId = thisGrow.shortId;
    //console.log('putGrow() is making a request with', edit, 'to this endpoint: /entries/', growId);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/grows/${growId}`, true);
    xhr.setRequestHeader("Content-type", "application/json", "charset=utf-8");
    xhr.onload = () => {
      return (xhr.status === 204 ? resolve(xhr.statusText) : reject(Error(xhr.statusText)));
    };
    xhr.send(JSON.stringify(edit));
   });
}

function putEntry(edit) {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const growId = thisGrow.shortId;
    const entryId = thisGrow.entries[appData.currentEntryIndex].shortId;
    //console.log('putEntry() is making a request with', edit, 'to this endpoint: /entries', growId, '/', entryId);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/entries/${growId}/${entryId}`, true);
    xhr.setRequestHeader("Content-type", "application/json", "charset=utf-8");
    xhr.onload = () => {
      return (xhr.status === 204 ? resolve(xhr.statusText) : reject(Error(xhr.statusText)));
    };
    xhr.send(JSON.stringify(edit));
   });
}

function deleteGrow() {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex], growId = thisGrow.shortId, growName = thisGrow.name;
    //console.log('deleteGrow() is making a request to this endpoint: /grows/', growId);
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `grows/${growId}/`, true);
    xhr.onload = () => {
      return (xhr.status === 204 ? resolve(xhr.statusText) : reject(Error(xhr.statusText)));
    };
    xhr.send(null);
  });
}

function deleteEntry() {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex], growId = thisGrow.shortId, growName = thisGrow.name;
    const thisEntry = thisGrow.entries[appData.currentEntryIndex], entryId = thisEntry.shortId, entryNumber = thisEntry.number;
    //console.log('deleteEntry() is making a request to this endpoint: /entries/', growId, '/', entryId);
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `entries/${growId}/${entryId}`, true);
    xhr.onload = () => {
      return (xhr.status === 204 ? resolve(xhr.status) : reject(Error(xhr.statusText)));
    };
    xhr.send(null);
  });
}

//directional functions
function addClass(elements, myClass) {
  if (!elements) { return; }
  if (typeof(elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }
  else if (elements.tagName) { elements=[elements]; }
  for (var i=0; i<elements.length; i++) {
    if ( (' '+elements[i].className+' ').indexOf(' '+myClass+' ') < 0 ) {
      elements[i].className += ' ' + myClass;
    }
  }
}

function removeClass(elements, myClass) {
  if (!elements) { return; }
  if (typeof(elements) === 'string') {
    elements = document.querySelectorAll(elements);
  }
  else if (elements.tagName) { elements=[elements]; }
  var reg = new RegExp('(^| )'+myClass+'($| )','g');
  for (var i=0; i<elements.length; i++) {
    elements[i].className = elements[i].className.replace(reg,' ');
  }
}

//3rd argument is optional. if it's passed in, this function triggers the main()
//if not, it just adds and removes the hidden class
function turnPage(previousPage, newPage, newPageName = 0) {
  addClass(document.getElementById(previousPage),'hidden');
  removeClass(document.getElementById(newPage),'hidden');
  //console.log('turnPage() is turning page from', previousPage, 'to', newPage);
  if (newPageName !== 0) {
    appData.page = newPageName;
    //console.log('turnPage() set appData.page equal to ', appData.page);
    main();
  }
}

///goBack function (event listener that's on most pages)
function goBack(currentPageId, returningPageId, selector, newPageName = 0) {
  const backArrow = document.querySelectorAll(selector);
  backArrow[0].onclick =  function () {
    turnPage(currentPageId, returningPageId, newPageName);
  };
}

function goBackFromEntry(resolveObj = 0) {
  if (resolveObj !== 0) {
    if (resolveObj.number === 1 ) {
      const backArrow = document.querySelector('#add-entry-page .back-arrow');
      backArrow.onclick = function () {
        hideEntryInstructs();
        hidePhaseIcon("add-entry-page", "grow-collection-page", "grows");
      };
    }
  }
  if (appData.page === "get-first-entry-stage") {
    const backArrow = document.querySelector('#add-entry-page .back-arrow');
    backArrow.onclick = function () {
      addClass(document.getElementById("grow-progression"), 'hidden');
      addClass(document.getElementById("to-seedling"), 'hidden');
      hidePhaseIcon("add-entry-page", "grow-collection-page", "grows");
      };
  } else if (appData.page === "get-entry-stage") {
    const backArrow = document.querySelector('#add-entry-page .back-arrow');
    backArrow.onclick = function () {
      addClass(document.getElementById(resolveObj.parentId), 'hidden');
      hidePhaseIcon("add-entry-page", "grow-entries-page", "timeline");
      };
    } else if (appData.page === "add-entry") {
      const backArrow = document.querySelector('#add-entry-page .back-arrow');
      backArrow.onclick = function () {
        hideEntryInstructs();
        hidePhaseIcon("add-entry-page", "grow-entries-page", "timeline");
      };
    } else if (appData.page === "view-entry") {
      const backArrow = document.querySelector('#view-entry-page .back-arrow');
      backArrow.onclick = function () {
        addClass(document.getElementById("watered"),'hidden');
        addClass(document.getElementById("fed"),'hidden');
        addClass(document.querySelector('#view-entry-page .nutrient-list'),'hidden');
        removeClass(document.getElementById("delete-entry"), 'hidden');
        removeClass(document.getElementById("edit-entry"), 'hidden');
        turnPage("entry-edit", "notes-box");
        hidePhaseIcon("view-entry-page", "grow-entries-page", "timeline");
      };
    }
  }

function hideEntryInstructs() {
  addClass(document.getElementById("entry-submission"),'hidden');
  addClass(document.getElementById("water-feed-instruct"),'hidden');
  addClass(document.getElementById("water-instruct"),'hidden');
  addClass(document.getElementById("feed-instruct"),'hidden');
}

function hidePhaseIcon(currentPageId, newPageId, newPageName) {
  addClass(document.querySelector(`#${currentPageId} .vegetative-phase`),'hidden');
  addClass(document.querySelector(`#${currentPageId} .flowering-phase`),'hidden');
  addClass(document.querySelector(`#${currentPageId} .seedling-stage`),'hidden');
  turnPage(currentPageId, newPageId, newPageName);
}
///drawing cover-page canvas wallpaper

let loadedImageArray = [];
let weeds = [];
let weedImg;
let c;

function makeImagePathArray() {
  const imageArray = [];
  let i = 1;
  while (i < 9) {
    imageArray.push(`weed_plants/weed-${i}.png`);
    i++;
  }
  return imageArray;
}

function preload() {
  const imagePathArray = makeImagePathArray();
  imagePathArray.forEach(function(e){
    loadedImageArray.push(loadImage(e));
  });
}

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  c.parent('cover-page');
  imageMode(CENTER);
}

function getRandomImage() {
  return new Promise ((resolve, reject) => {
    const min = Math.ceil(0);
    const max = Math.floor(loadedImageArray.length-1);
    const num = Math.floor(Math.random() * (max - min + 1));
    const img = loadedImageArray[num];
    weedImg = img;
    resolve(img);
  });
}

function draw() {
  if (screen.width < 1000) { //if device is mobile
    noLoop();
    removeClass(document.getElementById("cover-page-mobile"),'hidden');
  } else {
    removeClass(document.getElementById("enter-button"),'hidden');
    getRandomImage().then(function(img) {
    //console.log('getRandomImage() is passing', img, 'to drawWeed');
    return drawWeed(img);
    });
  }
}

function drawWeed(img) {
    var w = random(10, 200);
    var h = w / img.width * img.height;
    var r = random(-0.5, 0.5);

    var a = random(0, 360);
    var d = random(100, 200);
    var x = mouseX + cos(a) * d;
    var y = mouseY + sin(a) * d;

    push();
    translate(x, y);
    rotate(r);
    if (random(1) > 0.5) {
      scale(-1, 1);
    }
    image(img, 0, 0, w, h);
    pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function weed() {
  this.reset();
}

weed.prototype.reset = function() {
  this.x = random(0, width);
  this.y = random(0, height);
  this.w = 0;
  this.h = 0;
  this.growth = random(0.1, 2);
  this.r = 0;
  this.rSpeed = random(-.01, .01);
  this.maxW = 400;//random(100, 400);
};

weed.prototype.draw = function() {
  this.w += this.growth;
  this.h = this.w / weedImg.width * weedImg.height;
  this.r += this.rSpeed;

  push();
  translate(this.x, this.y);
  rotate(this.r);
  image(weedImg, 0, 0, this.w, this.h);
  pop();

  if (this.w > this.maxW) this.reset();
};

//render html functions
function renderGrowHtml(item, index) {
let imageHtml;
  if (item.endDate === null) {
    imageHtml = `
      <a href="#" id="grow-${index}" class="grow-links" role="button">
        <h2>${item.name}</h2>
        <br><br>
        <h3>Started:<br>${moment(item.startDate).format('YYYY-MM-DD')}</h3>
      </a>
    `;
  } else {
    imageHtml = `
    <a href="#" id="grow-${index}" class="grow-links finished-grow" role="button">
      <h2>${item.name}</h2>
      <br><br>
      <h3>Started:<br>${moment(item.startDate).format('YYYY-MM-DD')}</h3>
      <h3>Ended:<br>${moment(item.endDate).format('YYYY-MM-DD')}</h3>
    </a>
  `;
}
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

function renderAddEntry(side, topPosition) {
  const addEntryHtml= `
  <div class="timeline-entry ${side}" id="add-entry" style="top:${topPosition}vw">
    <h4>Add An Entry</h4>
  </div>
  `;
  return addEntryHtml;
}

function renderLeftTimelineEntry(index, topPosition, imageSrc, style = "transform: none") {
  const theseEntries = appData.allGrows.grows[appData.currentGrowIndex].entries;
  return `
  <div class="timeline-entry past-entry left" id="entry-${index}" style="top:${topPosition}vw">
    <h4>${moment(theseEntries[index].date).format('YYYY-MM-DD')}</h4>
    <img src="${imageSrc}" style=${style}/>
  </div>
  `;
}

function renderRightTimelineEntry(index, topPosition, imageSrc, style = "transform: none") {
  const theseEntries = appData.allGrows.grows[appData.currentGrowIndex].entries;
  return `
    <div class="timeline-entry past-entry right" id="entry-${index}" style="top:${topPosition}vw">
      <img src="${imageSrc}" style="${style}"/>
      <h4>${moment(theseEntries[index].date).format('YYYY-MM-DD')}</h4>
    </div>`;
}

function renderFullTimeline() {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const theseEntries = thisGrow.entries;
    const firstEntryDate = moment(theseEntries[0].date);
    let timelineDays;
    const todaysDate = moment();
    if (todaysDate.diff(firstEntryDate, 'days') < 1) {
      timelineDays = 1;
    }
    else {
      timelineDays = todaysDate.diff(firstEntryDate, 'days');
    }
    const timelineHeight = (timelineDays + 4) * 2;
    document.getElementById('timeline-line').setAttribute("style",`height:${timelineHeight}vw`);
    let leftSideHtml = '';
    let rightSideHtml = '';
    let timelineMoment = firstEntryDate;
    let x = 0; //x tracks the entries. i tracks the timeline days
      for (i = 0; i <= timelineDays; i++){
        if ( x < theseEntries.length) {
          if (timelineMoment.isSame(theseEntries[x].date, 'day')){
            if (x % 2 === 0) {
              leftSideHtml += calculateTimeLineEntry(x, "left", i * 2);
            } else if (x % 2 !== 0) {
              rightSideHtml += calculateTimeLineEntry(x, "right", i * 2);
            }
            x++;
          }
        timelineMoment = timelineMoment.add(1, 'day');
      }
    }
    if (thisGrow.endDate === null) {
      if (whichSide(theseEntries.length) === "left") {
        leftSideHtml += renderAddEntry("left", timelineHeight);
      } else if (whichSide(theseEntries.length) === "right") {
        rightSideHtml += renderAddEntry("right", timelineHeight);
      }
    }
    const timelineHtml = {
      leftSide: leftSideHtml,
      rightSide: rightSideHtml
    };
    resolve(timelineHtml);
    reject("didnt render the timeline");
  });
}

//display functions
function displayGrowGrid(data) {
    const imageGrid = data.grows.map((item, index) => renderGrowHtml(item, index)) + renderAddGrow();
    document.getElementById("grow-grid").innerHTML = imageGrid;
    removeClass(document.getElementById('add-a-grow'),'hidden');
}

function displayGrowTimeline(timelineHtml) {
  return new Promise ((resolve, reject) => {
    document.querySelectorAll("#grow-entries-page .grow-name")[0].innerHTML = appData.allGrows.grows[appData.currentGrowIndex].name;
    document.getElementById("left-side").innerHTML = timelineHtml.leftSide;
    document.getElementById("right-side").innerHTML = timelineHtml.rightSide;
    resolve("success");
  });
}

function displayEntryInstructs(entryInstructs) {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const theseEntries = thisGrow.entries;
    removeClass(document.getElementById("entry-submission"),'hidden');
    removeClass(document.getElementById("water-feed-instruct"),'hidden');
    if (entryInstructs.wasFed) {
      removeClass(document.getElementById("feed-instruct"),'hidden');
      document.querySelector("#add-entry-page .flora-micro").innerHTML = entryInstructs.nutrients.floraMicro;
      document.querySelector("#add-entry-page .flora-grow").innerHTML = entryInstructs.nutrients.floraGrow;
      document.querySelector("#add-entry-page .flora-bloom").innerHTML = entryInstructs.nutrients.floraBloom;
      document.querySelector("#add-entry-page .cali-magic").innerHTML = entryInstructs.nutrients.caliMagic;
    } else {
      removeClass(document.getElementById("water-instruct"),'hidden');
    }
    resolve(entryInstructs);
    reject("didn't display entry instructs");
  });
}

function displayEntryHeader(page, entryDeets) {
  const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
  let entry;
  if (page === "#view-entry-page") {
    entry = thisGrow.entries[appData.currentEntryIndex];
  }
  else {
    entry = entryDeets;
  }
  document.querySelectorAll(`${page} .grow-name`)[0].innerHTML = thisGrow.name;
  document.querySelectorAll(`${page} .week-number`)[0].innerHTML = entry.week;
  document.querySelectorAll(`${page} .entry-number`)[0].innerHTML = entry.number;
  document.querySelectorAll(`${page} .entry-date`)[0].innerHTML = moment(entry.date).format('YYYY-MM-DD');
  if (entry.phaseProgress.stage === "seedling"){
    removeClass(document.querySelector(`${page} .seedling-stage`),'hidden');
  } else if (entry.phaseProgress.stage !== "seedling" && entry.phaseProgress.phase === "vegetative"){
    removeClass(document.querySelector(`${page} .vegetative-phase`),'hidden');
  } else if (entry.phaseProgress.phase === "flowering") {
    removeClass(document.querySelector(`${page} .flowering-phase`),'hidden');
  }
}

function displayEntry() {
  const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
  const thisEntry = thisGrow.entries[appData.currentEntryIndex];
  //console.log('displayEntry() is passing "#view-entry-page" to displayEntryHeader');
  displayEntryHeader('#view-entry-page');
    if (thisEntry.wasWatered === true) {
      removeClass(document.getElementById("watered"),'hidden');
    }
    else {
      removeClass(document.getElementById("fed"),'hidden');
      removeClass(document.querySelector("#view-entry-page .nutrient-list"),'hidden');
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
}


function displayGrowProgressQuestion(resolveObj) {
  return new Promise ((resolve, reject) => {
    //console.log('displayGrowProgressQuestion()');
    removeClass(document.getElementById("grow-progression"),'hidden');
    removeClass(document.getElementById(resolveObj.parentId),'hidden');
    resolve(resolveObj);
  });
}

function displayEntryInstructsHeader(resolveObj) {
  const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
  displayEntryHeader('#add-entry-page', resolveObj.entryDeets);
  document.querySelectorAll(`#${resolveObj.parentId} .grow-name`)[0].innerHTML = thisGrow.name;
  //console.log('displayEntryInstructsHeader() is passing', resolveObj, 'to');
  onProgressConfirm(resolveObj); //if user clicks, onProgressConfirm returns an alterned entryDeets
  onProgressDeny(resolveObj);
}


//functions to receive and validate user input

function onProgressDeny(resolveObj) {
    const userDeny = document.querySelector(`#${resolveObj.parentId} .progress-deny`);
    userDeny.onclick = function() {
      //console.log('onProgressDeny()');
      addClass(document.getElementById("grow-progression"), 'hidden');
      addClass(document.getElementById(resolveObj.parentId), 'hidden');
      appData.entryDeets = resolveObj.entryDeets;
      //console.log('onProgressDeny() set appData.entryDeets equal to', appData.page);
      appData.page = "add-entry";
      //console.log('onProgressDeny() set appData.page equal to', appData.page, 'now');
      main();
    };
}

function onProgressConfirm(resolveObj) {
  const phaseProgress = resolveObj.entryDeets.phaseProgress;
  const userConfirms = document.querySelector(`#${resolveObj.parentId} .progress-confirm`);
  userConfirms.onclick = function () {
    //console.log('onProgressConfirm()');
    if (resolveObj.parentId === "to-seedling") {
      resolveObj.entryDeets.phaseProgress.stage = "seedling";
    } else if (resolveObj.parentId === "to-vegetative") {
      phaseProgress.stage = "vegetative";
    } else if (resolveObj.parentId === "to-flowering") {
      phaseProgress.phase = "flowering";
      phaseProgress.stage = "early bloom";
      phaseProgress.week = 1;
    } else if (resolveObj.parentId === "to-peak-bloom") {
      phaseProgress.stage = "peak bloom";
    } else if (resolveObj.parentId === "to-late-bloom") {
      phaseProgress.stage = "late bloom";
    } else if (resolveObj.parentId === "to-flush") {
      phaseProgress.stage = "flush";
    } else if (resolveObj.parentId === "to-end") {
      phaseProgress.stage = "end";
    }
    addClass(document.getElementById("grow-progression"), 'hidden');
    addClass(document.getElementById(resolveObj.parentId), 'hidden');
    if (phaseProgress.stage === "end") {
      const edit = {endDate: moment().format('YYYY-MM-DD')};
      //console.log('User ended the grow and onProgressConfirm() is passing', edit, 'to putGrow');
      putGrow(edit).then(function(resolve){
        appData.allGrows = '';
        //console.log('onProgressConfirm set appData.allGrows equal to an empty string now');
        turnPage("add-entry-page", "grow-collection-page", "grows");
      });
    }
    else {
      appData.entryDeets = resolveObj.entryDeets;
      //console.log('onProgressConfirm() set appData.entryDeets equal to', appData.entryDeets);
      appData.page = "add-entry";
      //console.log('onProgressConfirm() set appData.page equal to', appData.page);
      main();
    }
  };
}

function validateGrowSubmit() {
  return new Promise ((resolve, reject) => {
    const growSubmit = {};
    const nameField = document.getElementById("new-grow-name").value;
    if (nameField === "") {
      alert("You have to give your grow a name.");
    } else {
      growSubmit.name = nameField;
    }
    let strainField;
    const strainTypeRadios = document.getElementsByName("strain");
    strainTypeRadios.forEach(function(element){
      if (element.checked) {
        strainField = element.value;
      }
    });
    if (strainField !== undefined) {
      growSubmit.strain = strainField;
    } else {
      alert("You have to select a strain type.");
    }
    let dateField = document.getElementById("germination-date").value;
    if (dateField === "") {
      growSubmit.startDate = moment();
      //console.log("the startDate moment for the new Grow is", growSubmit.startDate);
    } else if (moment(dateField).isValid()) {
      growSubmit.startDate = moment(dateField);
    } else {
      alert("Not a valid date.");
    }
    if (growSubmit.name !== undefined && growSubmit.strain !== undefined && growSubmit.startDate !== undefined) {
      resolve(growSubmit);
    } else {
      reject(//console.log("grow submission was not validated. calling submitGrow() again"));
      onSubmitGrowClick();
    }
  });
}

function onSubmitGrowClick() {
  const submitGrow = document.getElementById("submit-grow");
  submitGrow.onclick = function () {
    event.preventDefault();
    validateGrowSubmit().then(function(resolve){
      return postGrow(resolve);
    }).then(function(resolve){
      appData.allGrows = '';
      //console.log('onSubmitGrowClick() set appData.allGrows to an empty string');
      return getAllGrows(resolve);
    }).then(function(resolve){
      // findMostRecentGrow(resolve);
        //console.log(resolve);
        appData.currentGrowIndex = resolve.grows.length-1;
        //console.log('onSubmitGrowClick() set appData.currentGrowIndex to', appData.currentGrowIndex);
      turnPage("add-grow-page", "first-entry-page", "add-first-entry");
    });
  };
}

function onSubmitEntryClick(entrySubmit) {
  const submitEntry = document.getElementById("submit-entry");
  submitEntry.onclick = function () {
    event.preventDefault();
    entrySubmit.notes = document.getElementById("entry-notes").value;
    //console.log('onSubmitEntryClick is passing:', entrySubmit, 'to postEntry()');
    postEntry(entrySubmit).then(function(){
      appData.allGrows = '';
      //console.log('onSubmitEntryClick() set appData.allGrows to an empty string');
      appData.currentEntryIndex = '';
      //console.log('onSubmitEntryClick() set appData.currentEntryIndex to an empty string');
      appData.entryDeets = '';
      //console.log('onSubmitEntryClick() set appData.entryDeets to an empty string now');
      return getAllGrows();
    }).then(function(resolve){
      //console.log('onSubmitEntryClick called getAllGrows:', resolve);
      hideEntryInstructs();
      hidePhaseIcon("add-entry-page", "grow-entries-page", "timeline");
    });
  };
}

function onEditEntryClick() {
  const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
  const thisEntry = thisGrow.entries[appData.currentEntryIndex];
  const editEntry = document.getElementById("edit-entry");
  editEntry.onclick = function () {
    document.getElementById('edit-notes').innerHTML = thisEntry.notes;
    //console.log("edit-entry button was clicked");
    turnPage("notes-box", "entry-edit");
    onSubmitEditClick();
    const exitEdit = document.getElementById("exit-edit");
    exitEdit.onclick = function () {
      event.preventDefault();
      turnPage("entry-edit", "notes-box");
    };
  };
}

function onSubmitEditClick() {
  const submitEdit = document.getElementById("submit-edit");
  submitEdit.onclick = function () {
    event.preventDefault();
    const edit = {};
    edit.notes = document.getElementById("edit-notes").value;
    //console.log('onSubmitEditClick() is passing:', edit, 'to putEntry()');
    putEntry(edit).then(function(){
        appData.allGrows = '';
        //console.log('onSubmitEditClick() is setting appData.allGrows to an empty string now');
        return getAllGrows();
    }).then(function(resolve){
      //console.log('onSubmitEditClick() called getAllGrows():', resolve);
      turnPage("view-entry-page", "grow-entries-page", "timeline");
    });
  };
}


//calculation functions

function calculateNeededUserInput() {
  return new Promise((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const lastEntry = thisGrow.entries[thisGrow.entries.length-1];
    const lastPhaseProgress = lastEntry.phaseProgress;
    const lastPhase = lastPhaseProgress.phase;
    const lastStage = lastPhaseProgress.stage;
    const resolveObj = {};
    resolveObj.entryDeets = {};
    const entryDeets = resolveObj.entryDeets;
    entryDeets.number = lastEntry.number + 1;
    entryDeets.date = moment();
    const startDate = moment(thisGrow.startDate);
    entryDeets.week = entryDeets.date.diff(startDate, 'weeks') + 1;
    entryDeets.phaseProgress = {};
    entryDeets.phaseProgress.phase = lastPhaseProgress.phase;
    entryDeets.phaseProgress.phaseStartDate = lastPhaseProgress.phaseStartDate;
    entryDeets.phaseProgress.stage = lastPhaseProgress.stage;
    const currentWeekOfCurrentPhase = entryDeets.date.diff(lastPhaseProgress.phaseStartDate, 'weeks') + 1;
    entryDeets.phaseProgress.week = currentWeekOfCurrentPhase;
    if (lastStage === "before sprout") {
      resolveObj.parentId = "to-seedling";
    } else if (lastStage === "seedling") {
      resolveObj.parentId = "to-vegetative";
    } else if (currentWeekOfCurrentPhase > 2 && lastStage === "vegetative") {
      resolveObj.parentId = "to-flowering";
    } else if (currentWeekOfCurrentPhase > 1 && lastStage === "early bloom") {
      resolveObj.parentId = "to-peak-bloom";
    } else if (currentWeekOfCurrentPhase > 3 && lastStage === "peak bloom") {
      resolveObj.parentId = "to-late-bloom";
    } else if (currentWeekOfCurrentPhase > 4 && lastStage === "late bloom") {
      resolveObj.parentId = "to-flush";
    } else if (currentWeekOfCurrentPhase > 6 && lastStage === "flush") {
      resolveObj.parentId = "to-end";
    }
    appData.entryDeets = entryDeets;
    //console.log('calculateNeededUserInput() set appData.entryDeets equal to', appData.entryDeets);
    resolve(resolveObj);
  });
}

function calculateStartingPhase() {
  return new Promise ((resolve, reject) => {
    const resolveObj = {};
    resolveObj.entryDeets = {};
    resolveObj.entryDeets.number = 1;
    resolveObj.entryDeets.week = 1;
    resolveObj.entryDeets.phaseProgress = {};
    resolveObj.entryDeets.phaseProgress.week = 1;
    resolveObj.entryDeets.phaseProgress.stage = "before sprout";
    resolveObj.entryDeets.phaseProgress.phase = "vegetative";
    resolveObj.entryDeets.date = moment().format('YYYY-MM-DD');
    resolveObj.entryDeets.phaseProgress.phaseStartDate = moment().format('YYYY-MM-DD');
    resolveObj.parentId = "to-seedling";
    removeClass(document.getElementById("grow-progression"),'hidden');
    removeClass(document.getElementById("to-seedling"),'hidden');
    resolve(resolveObj);
  });
}

function calculateTimeLineEntry(index, side, topPosition) {
  const thisEntry = appData.allGrows.grows[appData.currentGrowIndex].entries[index];
  let entryHtml;
  if (thisEntry.phaseProgress.stage === "before sprout" || thisEntry.phaseProgress.stage === "seedling" && side === "left") {  //before sprout stage
    entryHtml = renderLeftTimelineEntry(index, topPosition, 'images/seedling.png'); //before sprout and left-side seedling
  } else if (thisEntry.phaseProgress.stage === "seedling" && side === "right") {  //right-side seedling
    entryHtml = renderRightTimelineEntry(index, topPosition, 'images/seedling.png');
  } else if (thisEntry.phaseProgress.phase === "vegetative" && thisEntry.phaseProgress.stage !== "seedling" && side === "left") {
    entryHtml = renderLeftTimelineEntry(index, topPosition, 'images/vegetative.png', 'transform:scaleX(-1); filter: FlipH;');
  } else if (thisEntry.phaseProgress.phase === "vegetative" && thisEntry.phaseProgress.stage !== "seedling" && side === "right") {
    entryHtml = renderRightTimelineEntry(index, topPosition, 'images/vegetative.png');
  } else if (thisEntry.phaseProgress.phase === "flowering" && side === "left") {
    entryHtml = renderLeftTimelineEntry(index, topPosition, 'images/flowering.png');
  } else if (thisEntry.phaseProgress.phase === "flowering" && side === "right") {
    entryHtml = renderRightTimelineEntry(index, topPosition, 'images/flowering.png', 'transform:scaleX(-1); filter: FlipH;');
  }
  return entryHtml;
}

function calculateInstructs() {
  return new Promise ((resolve, reject) => {
    const entryDeets = appData.entryDeets;
    if (entryDeets.number % 2 === 0 || entryDeets.phaseProgress.stage === 'flush') {
      entryDeets.wasWatered = false;
      entryDeets.wasFed = true;
    } else if (entryDeets.number % 2 != 0) {
      entryDeets.wasWatered = true;
      entryDeets.wasFed = false;
    }
    resolve(entryDeets);
  });
}

function populateEmptyInstructs(entry) {
  return new Promise ((resolve, reject) => {
    entry.nutrients = {};
    entry.nutrients.floraMicro = '0';
    entry.nutrients.floraGrow = '0';
    entry.nutrients.floraBloom = '0';
    entry.nutrients.caliMagic = '0';
    resolve(entry);
    reject('populateEmptyInstructs() failed.');
  });
}

function whichSide(arrayLength) {
  if (arrayLength % 2 === 0) {
    return "left";
  }
  else if (arrayLength % 2 !== 0) {
    return "right";
  }
}

//event listeners

function onEnterClick() {
  let enterButton;
  if (screen.width < 1000) {
    enterButton = document.getElementById("cover-page-mobile");
  } else {
    enterButton = document.getElementById("enter-button");
  }
  enterButton.onclick = function() {
    noLoop();
    turnPage("cover-page", "grow-collection-page", "grows");
  };
}

function onGrowClick() {
  const growLinks = Array.from(document.getElementsByClassName("grow-links")).forEach(function(element) {
    element.onclick =  function () {
      //console.log('grow was clicked');
      const imageId = this.getAttribute('id');
      appData.currentGrowIndex = Number(imageId.slice(5, imageId.length));
      //console.log('onGrowClick() set appData.currentGrowIndex to ', appData.currentGrowIndex);
      const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
      if (thisGrow.entries.length < 1) {
        turnPage("grow-collection-page", "first-entry-page", "add-first-entry");
      } else {
        turnPage("grow-collection-page", "grow-entries-page", "timeline");
      }
    };
  });
}

function onAddClick(selector, previousPage, nextPage, newPageName) {
  const addSomething = document.getElementById(selector);
  addSomething.onclick = function () {
    turnPage(previousPage, nextPage, newPageName);
  };
}

function onEntryClick() {
  //console.log('onEntryClick() is running');
  Array.from(document.getElementsByClassName("past-entry")).forEach(function(element) {
    element.onclick = function () {
      const entryId = this.getAttribute('id');
      appData.currentEntryIndex = Number(entryId.slice(6, entryId.length));
      //console.log('onEntryClick() set appData.currentEntryIndex equal to ', appData.currentEntryIndex);
      turnPage("grow-entries-page", "view-entry-page", "view-entry");
    };
  });
}

function onDeleteClick(selector, previousPage, newPage, newPageName) {
  const deleteThis = document.getElementById(selector);
  deleteThis.onclick = function () {
    turnPage(previousPage, newPage, newPageName);
  };
}

function onDeleteConfirm(selector, previousPage, newPage, newPageName, deleteFunction) {
  const deleteConfirm = document.getElementById(selector);
  deleteConfirm.onclick = function () {
    //console.log('delete confirm was clicked');
    deleteFunction().then(function(){
      return getAllGrows();
    }).then(function(){
      turnPage(previousPage, newPage, newPageName);
    });
  };
}

function onDeleteDeny(selector, previousPage, newPage, newPageName){
  const deleteDeny = document.getElementById(selector);
  deleteDeny.onclick = function () {
    turnPage(previousPage, newPage, newPageName);
  };
}

//////main()//////
function main() {

  if (appData.page === "" || appData.page === "cover" ){
    onEnterClick();
  } else if (appData.page === "grows" ){
    getAllGrows().then(function(resolve){
      //console.log('getAllGrows() is passing', resolve, 'to displayGrowGrid()');
      displayGrowGrid(resolve);
      onGrowClick();
      onAddClick('add-a-grow', 'grow-collection-page', 'add-grow-page', 'add-grow');
    });
  } else if (appData.page === "add-first-entry") {
    onAddClick('first-entry-hover', 'first-entry-page', 'add-entry-page', 'get-first-entry-stage');
    goBack("first-entry-page", "grow-collection-page", "#first-entry-page button", "grows");
  } else if (appData.page === "get-first-entry-stage") {
    calculateStartingPhase().then(function(resolve){
      //console.log('getStartingPhaseProgress is passing', resolve, 'to displayEntryInstructsHeader() and goBackFromEntry()');
      displayEntryInstructsHeader(resolve); //calls two event listeners (onProgressConfirm and onProgressDeny)
      goBackFromEntry(resolve);
    }); //that will add key/value pairs to entryDeets, depending on which one user clicks;
  }  else if (appData.page === "timeline") {
    renderFullTimeline().then(function(resolve){
      //console.log('renderFullTimeline is passing', resolve, 'to displayGrowTimeline()');
      return displayGrowTimeline(resolve);
    }).then(function(){
      const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
      const lastEntryTime = moment(thisGrow.entries[thisGrow.entries.length-1].date);
      const now = moment();
      if (now.diff(lastEntryTime, 'days') < 1) {
        onAddClick("add-entry", "grow-entries-page", "no-more-entries");
        goBack("no-more-entries", "grow-entries-page", "#no-more-entries button");
      } else if (now.diff(lastEntryTime, 'days') >= 1 && thisGrow.endDate === null) {
        onAddClick("add-entry", "grow-entries-page", "add-entry-page", "get-entry-stage");
      }
      onEntryClick();
      onDeleteClick("delete-grow", "grow-entries-page", "delete-grow-page", "delete-grow");
      goBack("grow-entries-page", "grow-collection-page", "#grow-entries-page button", "grows");
    });
  } else if (appData.page === "add-grow") {
    onSubmitGrowClick();
    goBack("add-grow-page", "grow-collection-page", "#add-grow-page button", "grows");
  } else if (appData.page === "get-entry-stage") {
    calculateNeededUserInput().then(function(resolve){
      //console.log('calculateNeededUserInput() is passing', resolve, "to:");
      if ('parentId' in resolve) {
        displayGrowProgressQuestion(resolve).then(function(resolve){
          //console.log('displayGrowProgressQuestion is passing', resolve, 'to displayEntryInstructsHeader() and goBackFromEntry()');
          displayEntryInstructsHeader(resolve); //calls two event listeners (onProgressConfirm and onProgressDeny) //entryDeets are passed to appData by both event listeners
          goBackFromEntry(resolve);
        });
      } else {
        appData.page = "add-entry";
        //console.log('main() set appData.page to ', appData.page);
        main();
      }
    });
  } else if (appData.page === "add-entry") {
      calculateInstructs().then(function(resolve){
        //console.log('calculateInstructs() is passing', resolve, 'to:');
        if (resolve.wasFed === true) {
            //console.log('getNutrientInstructs()');
            getNutrientInstructs(resolve).then(function(resolve){
              //console.log('getNutrientInstructs() is passing:', resolve, 'to displayEntryInstructs()');
              return displayEntryInstructs(resolve);
          }).then(function(resolve){
            //console.log('displayEntryInstructs() is passing:', resolve, 'to onSubmitEntryClick() and goBackFromEntry()');
            onSubmitEntryClick(resolve);
            goBackFromEntry(resolve);
          });
        } else {
          populateEmptyInstructs(resolve).then(function(resolve){
            //console.log('populateEmptyInstructs(), and populateEmptyInstructs() is passing', resolve, 'to displayEntryInstructs()');
            return displayEntryInstructs(resolve);
          }).then(function(resolve){
            //console.log('displayEntryInstructs() is passing:', resolve, 'to onSubmitEntryClick() and goBackFromEntry()');
            onSubmitEntryClick(resolve);
            goBackFromEntry(resolve);
          });
        }
      });
  } else if (appData.page === "view-entry") {
      displayEntry();
      goBackFromEntry();
      const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
      if (thisGrow.endDate === null) {
        onDeleteClick("delete-entry", "view-entry-page", "delete-entry-page", "delete-entry");
        onEditEntryClick();
      } else {
        addClass(document.getElementById("delete-entry"), 'hidden');
        addClass(document.getElementById("edit-entry"), 'hidden');
      }
  } else if (appData.page === "delete-entry") {
      onDeleteConfirm("delete-entry-confirm", "delete-entry-page", "grow-entries-page", "timeline", deleteEntry);
      onDeleteDeny("delete-entry-deny", "delete-entry-page", "grow-entries-page", "timeline");
  } else if (appData.page === "delete-grow") {
      onDeleteConfirm("delete-grow-confirm", "delete-grow-page", "grow-collection-page", "grows", deleteGrow);
      onDeleteDeny("delete-grow-deny", "delete-grow-page", "grow-entries-page", "timeline");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  main();
}, false);
