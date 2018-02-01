export function doughnutChartData(dataSet){

	// final array for formatted data
	var formattedData = [];

	// reformat object into array of objects with key value pairs
	for(var key in dataSet){
	  if(key != 'sentiment'){
	  	var tmp = key.split("_")

	    var child = {
	      name: tmp[1],
	      value: Number(dataSet[key])
	    }
	    formattedData.push(child);
	  }
	}

	// sort data by sentiment name
	formattedData.sort(function(a, b) {
		return b.name - a.name ;
	});	

	return formattedData;
}

