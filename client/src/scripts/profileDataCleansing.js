export function sentimentByDate(data){
  var totalEntries = data.length;

  var finalData = [];
  
  for(let i=0; i<data.length; i++){
    var date = data[i].date.slice(0,10)
    var child = {
      date: date,
      positive: data[i].score_positive,
      negative: data[i].score_negative,
      neutral: data[i].score_neutral,
      mixed: data[i].score_mixed,
    }
    finalData.push(child)
  }
  
  var uniqueDates = [];
  finalData.forEach(function(item){
    if(!uniqueDates.includes(item.date)){
      uniqueDates.push(item.date)
    }
  });
  
  var finalData2= [];
  
  for(var i =0; i < uniqueDates.length; i++){
    var count = 0;
    var positive = 0;
    var negative = 0;
    var neutral =0;
    var mixed=0;
    
    for(var j=0; j<finalData.length; j++){
      if(finalData[j].date === uniqueDates[i]){
       positive = positive + finalData[j].positive;
       negative = negative + finalData[j].negative;
       neutral = neutral + finalData[j].neutral;
       mixed = mixed + finalData[j].mixed;
      }
      count++;
    }
    
    var child2 = {
      date: uniqueDates[i],
      positive: positive/count,
      negative: negative/count,
      neutral: neutral/count,
      mixed:mixed/count
    };
    
    finalData2.push(child2)
    
  }
  
  return finalData2;
  
}