export function doughnutChartData(dataSet){

	var formattedData = [];

	for(var key in dataSet){
	  if(key != 'sentiment'){
	    var child = {
	      name: (key.split("_")).join(' '),
	      value: Number(dataSet[key])
	    }
	    formattedData.push(child);
	  }
	}

	return formattedData;
}

