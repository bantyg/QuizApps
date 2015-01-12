function readSingleFile(evt) {
    var f = evt.target.files[0]; 
    if (f) {
      var r = new FileReader();

      r.onload = function(e) { 
	      var contents = JSON.parse(e.target.result);
        var isCorrectFormat = contents.every(function(question){
          return(question.Q && question.A);
        });
        console.log(isCorrectFormat)
        if(isCorrectFormat){
          $("#uploadMsg").text("Uploaded sucessfully");
        }
        else{
          $("#uploadMsg").text("Wrong file format");
        }
      }
      r.readAsText(f);
    }
    else { 
      $("#uploadMsg").text("Failed to load file");
    }
};

var onLoad = function() {
  document.getElementById('browseFile').addEventListener('change', readSingleFile, false);	
};

$(document).ready(onLoad);