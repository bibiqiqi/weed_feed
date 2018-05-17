function getGrows(callback) {
//
}

function displayGrows (data) {

}

//this function is just using a timeout function until I've built a live API,
//when i'll change it to an AJAX call
function getEntries(callback) {
	setTimeout(function(){ callback(MOCK_GROW_ENTRIES)}, 1);
}


function displayEntries(data, growName) {
    for (index in data.growName) {
	   $('body').append(
        `<p> ${data.growName[index].date} </p>`);
    }
}

function getAndDisplayEntries() {
	getEntries(displayEntries);
}
