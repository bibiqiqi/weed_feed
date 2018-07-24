/*jshint esversion: 6*/

const appData = {
  page: "",
  allGrows: "",
  currentGrowIndex: "",
  currentEntryIndex: "",
};

//ajax call functions
function getNutrientInstructs(objectToAddTo) {
  const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
  const nutrientSchedule = thisGrow.growType;
  return new Promise ((resolve, reject) => {
    console.log(`getNutrientInstructs() is making a request to this endpoint: /nutrient-schedules/${nutrientSchedule}`);
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `/nutrient-schedules/${nutrientSchedule}`);
    xhr.onload = () => {
      const parsedData = JSON.parse(xhr.response);
      const index = objectToAddTo.week - 1;
      const nutrientInstructs = parsedData.schedule[index].nutrients;
      objectToAddTo.nutrients = nutrientInstructs;
      return (xhr.status === 200 ? resolve(objectToAddTo) : reject(Error(xhr.statusText)));
    };
    xhr.send();
  });
}

function getAllGrows() {
  return new Promise((resolve, reject) => {
    console.log('getAllGrows() is making a request to this endpoint: /grows');
    const xhr = new XMLHttpRequest();
    xhr.open('GET', '/grows');
    xhr.onload = () => {
      const parsedData = JSON.parse(xhr.response);
      appData.allGrows = parsedData;
      console.log('appData.allGrows has all the grows from the db now:', appData.allGrows);
      return (xhr.status === 200 ? resolve(parsedData) : reject(Error(xhr.statusText)));
    };
    xhr.send();
  });
}

function postGrow(grow) {
  return new Promise((resolve, reject) => {
    console.log('postGrow() is making a request with', grow, 'to this endpoint: /grows');
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/grows', true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = () => {
      console.log(xhr.response);
      const parsedResp = JSON.parse(xhr.response);
      return (xhr.status === 201 ? resolve(parsedResp) : reject(Error(xhr.statusText)));
    };
    xhr.send(JSON.stringify(grow));
   });
}

function postEntry(entry) {
  return new Promise((resolve, reject) => {
    const growId = appData.allGrows.grows[appData.currentGrowIndex].shortId;
    console.log('postEntry() is making a request with', entry, 'to this endpoint: /entries', growId, '/', entryId);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `/entries/${growId}`, true);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.onload = () => {
      console.log(xhr.response);
      const parsedResp = JSON.parse(xhr.response);
      return (xhr.status === 201 ? resolve(parsedResp) : reject(Error(xhr.statusText)));
    };
    xhr.send(JSON.stringify(entry));
   });
}

function putEntry(edit) {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const growId = thisGrow.shortId;
    const entryId = thisGrow.entries[appData.currentEntryIndex].shortId;
    console.log('putEntry() is making a request with', edit, 'to this endpoint: /entries', growId, '/', entryId);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', `/entries/${growId}/${entryId}`, true);
    xhr.setRequestHeader("Content-type", "application/json", "charset=utf-8");
    xhr.onload = () => {
      return (xhr.status === 204 ? resolve(console.log("your content wad edited")) : reject(Error(xhr.statusText)));
    };
    xhr.send(JSON.stringify(edit));
   });
}

function deleteGrow() {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex], growId = thisGrow.shortId, growName = thisGrow.name;
    console.log('deleteGrow() is making a request to this endpoint: /grows/', growId);
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `grows/${growId}/`, true);
    xhr.onload = () => {
      return (xhr.status === 204 ? resolve(console.log(`${growName} was deleted`)) : reject(Error(xhr.statusText)));
    };
    xhr.send(null);
  });
}

function deleteEntry() {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex], growId = thisGrow.shortId, growName = thisGrow.name;
    const thisEntry = thisGrow.entries[appData.currentEntryIndex], entryId = thisEntry.shortId, entryNumber = thisEntry.number;
    console.log('deleteEntry() is making a request to this endpoint: /entries/', growId, '/', entryId);
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", `entries/${growId}/${entryId}`, true);
    xhr.onload = () => {
      return (xhr.status === 204 ? resolve(console.log(`Entry ${entryNumber} of ${growName} was deleted`)) : reject(Error(xhr.statusText)));
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
  console.log('turning page from', previousPage, 'to', newPage);
  if (newPageName !== 0) {
    appData.page = newPageName;
    console.log('appData.page = ', appData.page);
    main();
  }
}

///goBack function (event listener that's on most pages)
function goBack(currentPageId, returningPageId, newPageName, selector) {
  const backArrow = document.querySelectorAll(selector);
  backArrow[0].onclick =  function () {
    turnPage(currentPageId, returningPageId, newPageName);
  };
}

function goBackFromEntry() {
  turnPage("entry-edit", "notes-box");
  addClass(document.getElementById("vegetative-phase"),'hidden');
  addClass(document.getElementById("flowering-phase"),'hidden');
  addClass(document.getElementById("watered"),'hidden');
  addClass(document.getElementById("fed"),'hidden');
  addClass(document.querySelectorAll("#view-entry-page .nutrient-list"),'hidden');
  goBack("view-entry-page", "grow-entries-page", "timeline", "#view-entry-page button");
}

///drawing cover-page canvas wallpaper
// TODO: should i cite the website I got this from?
//https://neworgans.net/

  let mobile;
  const loadedImageArray = [];

function makeImagePathArray() {
  const imageArray = [];
  let i = 1;
  while (i < 9) {
    imageArray.push(`weed_plants/weed-${i}.png`);
    i++;
  }
  return imageArray;
}

function isMobile() {
  var check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
}

function preload() {
  const imagePathArray = makeImagePathArray();
  imagePathArray.forEach(function(e){
    loadedImageArray.push(loadImage(e));
  });
}

function setup() {
  const c = createCanvas(windowWidth, windowHeight);
  c.parent('cover-page');
  mobile = isMobile();
  imageMode(CENTER);
}

function getRandomImage() {
  return new Promise ((resolve, reject) => {
    const min = Math.ceil(0);
    console.log(min);
    const max = Math.floor(loadedImageArray.length-1);
    console.log(max);
    const num = Math.floor(Math.random() * (max - min + 1));
    const img = loadedImageArray[num];
    resolve(img);
  });
}

function draw() {
  if (mobile) {
    drawZoomyWeeds();
  } else {
    getRandomImage().then(function(img) {
      console.log('getRandomImage() is passing', img, 'to drawWeed');
      return drawWeed(img);
    });
  }
}

function drawZoomyWeeds() {
  let weeds = [];
  weeds = weeds.sort(function(a, b) {
    return b.w - a.w;
  });

  for (var i = 0; i < weeds.length; i++) {
    weeds[i].draw();
  }

  if (weeds.length < 200 && frameCount % 10 == 0) {
    weeds.push(new weed());
  }
}

function drawWeed(weedImg) {
    var w = random(10, 200);
    var h = w / weedImg.width * weedImg.height;
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
    image(weedImg, 0, 0, w, h);
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

function renderAddEntry(side, topPosition) {
  const addEntryHtml= `
  <div class="timeline-entry ${side}" id="add-entry" style="top:${topPosition}px">
    <h2>Add An Entry</h2>
  </div>
  `
  return addEntryHtml;
}

function renderTimelineEntry(index, side, topPosition) {
  const theseEntries = appData.allGrows.grows[appData.currentGrowIndex].entries;
   if (theseEntries[index].phase === "flowering" && side === "left") {
    const entryHtml= `
    <div class="timeline-entry past-entry ${side}" id="entry-${index}" style="top:${topPosition}px">
      <h2>${theseEntries[index].date}</h2>
      <img src="images/flowering.png"/>
    </div>
    `;
    return entryHtml;
  } else if (theseEntries[index].phase === "vegetative" && side === "left") {
    const entryHtml= `
    <div class="timeline-entry past-entry ${side}" id="entry-${index}" style="top:${topPosition}px">
      <h2>${theseEntries[index].date}</h2>
      <img src="images/vegetative.png" style="transform:scaleX(-1);
          filter: FlipH;"/>
    </div>
    `;
    return entryHtml;
  } else if (theseEntries[index].phase === "flowering" && side === "right") {
    const entryHtml= `
    <div class="timeline-entry past-entry ${side}" id="entry-${index}" style="top:${topPosition}px">
      <img src="images/flowering.png" style="transform:scaleX(-1);
          filter: FlipH;"/>
      <h2>${theseEntries[index].date}</h2>
    </div>
    `;
    return entryHtml;
  } else if (theseEntries[index].phase === "vegetative" && side === "right") {
    const entryHtml= `
    <div class="timeline-entry past-entry ${side}" id="entry-${index}" style="top:${topPosition}px">
      <img src="images/vegetative.png"/>
      <h2>${theseEntries[index].date}</h2>
    </div>
    `;
    return entryHtml;
  }
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
    let leftSideHtml = '';
    let rightSideHtml = '';
    let timelineMoment = firstEntryDate;
    let x = 0;
    let i;
      for (i = 0; i < timeLineDays; i++){
        if ( x < theseEntries.length) {
          if (timelineMoment.isSame(theseEntries[x].date, 'day')){
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
      leftSideHtml += renderAddEntry("left", timelineHeight);
    } else if (whichSide(theseEntries.length) == "right") {
      rightSideHtml += renderAddEntry("right", timelineHeight);
    }
    const timelineHtml = {
      leftSide: leftSideHtml,
      rightSide: rightSideHtml
    }
    resolve(timelineHtml);
    reject("didnt render the timeline");
  });
}

//display functions
function displayGrowGrid(data) {
  return new Promise ((resolve, reject) => {
    const imageGrid = data.grows.map((item, index) => renderGrowHtml(item, index)) + renderAddGrow();
    document.getElementById("grow-grid").innerHTML = imageGrid;
    removeClass(document.getElementById('add-a-grow'),'hidden');
    resolve(console.log('displayed grow grid'));
  });
}

function displayGrowTimeline(timelineHtml) {
  return new Promise ((resolve, reject) => {
    document.getElementById("grow-name").innerHTML = appData.allGrows.grows[appData.currentGrowIndex].name;
    document.getElementById("left-side").innerHTML = timelineHtml.leftSide;
    document.getElementById("right-side").innerHTML = timelineHtml.rightSide;
    resolve(console.log("displayed grow timeline"));
  });
}
function displayEntryInstructs(entryInstructs) {
  return new Promise ((resolve, reject) => {
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    const theseEntries = thisGrow.entries;
    document.querySelectorAll("#add-entry-page .week-number")[0].innerHTML = entryInstructs.week;
    document.querySelectorAll("#add-entry-page .entry-number")[0].innerHTML = entryInstructs.number;
    if (entryInstructs.wasFed) {
      removeClass(document.getElementById("feed-instruct"),'hidden');
      // TODO: convert my document.querySelectorAlls.....innerHTMLs to a function
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

function displayEntry() {
  return new Promise ((resolve, reject) => {
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

//form validation functions
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
    //growType validation
    let growTypeField;
    //getting the value of the radio element, if checked
    const growTypeRadios = document.getElementsByName("grow-type");
    growTypeRadios.forEach(function(element){
      if (element.checked) {
        growTypeField = element.value;
      }
    });
    //varifying whether a value was checked
    if (growTypeField != null) {
      growSubmit.growType = growTypeField;
    }
    else {
      alert("You have to select a strain type.");
    }
    //strain validation
    let strainField;
    //getting the value of the radio element, if checked
    const strainTypeRadios = document.getElementsByName("strain");
    strainTypeRadios.forEach(function(element){
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
      growSubmit.startDate = moment().format('YYYY-MM-DD');
    }
    else if (moment(dateField).isValid()) {
      growSubmit.startDate = moment(dateField).format('YYYY-MM-DD');
    }
    else {
      alert("Not a valid date.");
    }
    if (growSubmit.name !== "" && growSubmit.strain !== "" && growSubmit.growType !== "" && growSubmit.startDate !== "") {
      resolve(growSubmit);
    } else {
      reject("grow submission was not validated. calling submitGrow() again");
      onSubmitGrowClick();
    }
  });
}

//calculation functions
function calculateInstructs() {
  return new Promise ((resolve, reject) => {
    const entryInstructs = {};
    const todaysDate = moment();
    const startDate = moment(appData.allGrows.grows[appData.currentGrowIndex].startDate);
    entryInstructs.week = todaysDate.diff(startDate, 'weeks') + 1;
    const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
    entryInstructs.number = thisGrow.entries.length + 1;
    if (entryInstructs.number % 2 == 0) {
      entryInstructs.wasWatered = true;
      entryInstructs.wasFed = false;
    } else if (entryInstructs.number % 2 != 0) {
      entryInstructs.wasWatered = false;
      entryInstructs.wasFed = true;
    }
    resolve(entryInstructs);
    reject('instructions were not calculated');
  });
}

function populateEmptyInstructs(entry) {
  return new Promise ((resolve, reject) => {
    entry.nutrients = {};
    entry.nutrients.floraMicro = '';
    entry.nutrients.floraGrow = '';
    entry.nutrients.floraBloom = '';
    entry.nutrients.caliMagic = '';
    resolve(entry);
    reject('populateEmptyInstructs() failed.');
  });
}

function whichSide(arrayLength) {
  if (arrayLength % 2 == 0) {
    return "left";
  }
  else if (arrayLength % 2 != 0) {
    return "right";
  }
}

//event listeners

function onEnterClick() {
  const enterButton = document.getElementById("enter-button");
    enterButton.onclick = function() {
      turnPage("cover-page", "grow-collection-page", "grows");
      noLoop();
    };
}

function onGrowClick() {
  const growLinks = Array.from(document.getElementsByClassName("grow-links")).forEach(function(element) {
    element.onclick =  function () {
      const imageId = this.getAttribute('id');
      appData.currentGrowIndex = Number(imageId.slice(5, imageId.length));
      console.log('appData.currentGrowIndex = ', appData.currentGrowIndex);
      const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
      if (thisGrow.entries.length == 0) {
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
  Array.from(document.getElementsByClassName("past-entry")).forEach(function(element) {
    element.onclick = function () {
      const entryId = this.getAttribute('id');
      appData.currentEntryIndex = Number(entryId.slice(6, entryId.length));
      console.log('appData.currentEntryIndex = ', appData.currentEntryIndex);
      turnPage("grow-entries-page", "view-entry-page", "view-entry");
    };
  });
}

function onSubmitGrowClick() {
  const submitGrow = document.getElementById("submit-grow");
  submitGrow.onclick = function () {
    event.preventDefault();
    appData.allGrows = '';
    console.log('appData.allGrows is an empty string now');
    validateGrowSubmit().then(function(resolve){
      return postGrow(resolve);
    }).then(function(resolve){
      appData.allGrows = '';
      console.log('appData.allGrows is an empty string now');
      return getAllGrows(resolve);
    }).then(function(resolve){
      console.log('getAllGrows got all the grows:', resolve);
      appData.currentGrowIndex = resolve.grows.length-1;
      turnPage("add-grow-page", "first-entry-page", "add-first-entry");
    });
  };
}

function onSubmitEntryClick(entrySubmit) {
  const submitEntry = document.getElementById("submit-entry");
  submitEntry.onclick = function () {
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
    console.log('onSubmitEntryClick is passing:', entrySubmit, 'to postEntry()');
    postEntry(entrySubmit).then(function(){
      appData.allGrows = '';
      console.log('appData.allGrows is an empty string now');
      appData.currentEntryIndex = '';
      console.log('appData.currentEntryIndex is an empty string now');
      return getAllGrows();
    }).then(function(resolve){
      console.log('getAllGrows got all the grows:', resolve);
      turnPage("add-entry-page", "grow-entries-page", "timeline");
    });
  };
}

function onEditEntryClick() {
  const thisGrow = appData.allGrows.grows[appData.currentGrowIndex];
  const thisEntry = thisGrow.entries[appData.currentEntryIndex];
  const editEntry = document.getElementById("edit-entry");
  editEntry.onclick = function () {
    turnPage("notes-box", "entry-edit");
    document.getElementById("edit-notes").innerHTML = thisEntry.notes;
    const exitEdit = document.getElementById("exit-edit");
    exitEdit.onclick = function () {
      turnPage("entry-edit", "notes-box");
    };
  };
  onSubmitEditClick();
}

function onSubmitEditClick() {
  const submitEdit = document.getElementById("submit-edit");
  submitEdit.onclick = function () {
    event.preventDefault();
    const editNotes = document.getElementById("edit-notes").value;
    const putObject = {};
    putObject.notes = editNotes;
    console.log('onEditEntryClick() is passing:', putObject, 'to putEntry()');
    putEntry(putObject).then(function(){
        appData.allGrows = '';
        console.log('appData.allGrows is an empty string now');
        return getAllGrows();
    }).then(function(resolve){
      console.log('getAllGrows got all the grows:', resolve);
      turnPage("view-entry-page", "grow-entries-page", "timeline");
    });
  };
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
    console.log('delete confirm was clicked');
    deleteFunction().then(function(){
      return getAllGrows();
    }).then(function(resolve){
     console.log('getAllGrows() got all the grows:', resolve);
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
        console.log('getAllGrows() is passing', resolve, 'to displayGrowGrid()');
        return displayGrowGrid(resolve);
    }).then(function(){
      onGrowClick();
      onAddClick('add-a-grow', 'grow-collection-page', 'add-grow-page', 'add-grow');
    });
  } else if (appData.page === "add-first-entry") {
    onAddClick('first-entry-hover', 'first-entry-page', 'add-entry-page', 'add-entry');
    goBack("first-entry-page", "grow-collection-page", "grows", "#first-entry-page button");
  } else if (appData.page === "timeline") {
    renderFullTimeline().then(function(resolve){
      console.log('renderFullTimeline is passing', resolve, 'to displayGrowTimeline()');
      return displayGrowTimeline(resolve);
    }).then(function(){
      onEntryClick();
      onAddClick('add-entry', "grow-entries-page", "add-entry-page", "add-entry");
      onDeleteClick("delete-grow", "grow-entries-page", "delete-grow-page", "delete-grow");
      goBack("grow-entries-page", "grow-collection-page", "grows", "#grow-entries-page button");
    });
  } else if (appData.page === "add-grow") {
    onSubmitGrowClick();
    goBack("add-grow-page", "grow-collection-page", "grows", "#add-grow-page button");
  } else if (appData.page === "add-entry") {
      calculateInstructs().then(function(resolve){
        console.log('calculateInstructs() is passing', resolve, 'to:');
        if (resolve.wasFed === true) {
            getNutrientInstructs(resolve).then(function(resolve){
              console.log('getNutrientInstructs(), and getNutrientInstructs() is passing:', resolve, 'to displayEntryInstructs()');
              return displayEntryInstructs(resolve);
          }).then(function(resolve){
            console.log('displayEntryInstructs() is passing:', resolve, 'to onSubmitEntryClick()');
            onSubmitEntryClick(resolve);
            goBack("add-entry-page", "grow-entries-page", "timeline", "#add-entry-page button");
          });
        } else {
          populateEmptyInstructs(resolve).then(function(resolve){
            console.log('populateEmptyInstructs(), and populateEmptyInstructs() is passing', resolve, 'to displayEntryInstructs()');
            return displayEntryInstructs(resolve);
          }).then(function(resolve){
            console.log('displayEntryInstructs() is passing:', resolve, 'to onSubmitEntryClick()');
            onSubmitEntryClick(resolve);
            goBack("add-entry-page", "grow-entries-page", "timeline", "#add-entry-page button");
          });
        }
      });
  } else if (appData.page === "view-entry") {
      displayEntry().then(function(){
      onDeleteClick("delete-entry", "view-entry-page", "delete-entry-page", "delete-entry");
      onEditEntryClick();
      goBackFromEntry();
    });
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
