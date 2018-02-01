export function sentimentByDate(data){
  
  var formattedData = [];
  
  for(let i=0; i<data.length; i++){
    let date = data[i].date.slice(0,10)
    let child = {
      date: date,
      positive: data[i].score_positive,
      negative: data[i].score_negative,
      neutral: data[i].score_neutral,
      mixed: data[i].score_mixed,
    }
    formattedData.push(child)
  }
  
  var uniqueDates = [];
  
  formattedData.forEach(function(item){
    if(!uniqueDates.includes(item.date)){
      uniqueDates.push(item.date)
    }
  });
  
  var aggregatedData= [];
  
  for(let i =0; i < uniqueDates.length; i++){
    
    var count = 0;
    var positive = 0;
    var negative = 0;
    var neutral =0;
    var mixed=0;
    
    for(let j=0; j<formattedData.length; j++){
      if(formattedData[j].date === uniqueDates[i]){
       positive = positive + formattedData[j].positive;
       negative = negative + formattedData[j].negative;
       neutral = neutral + formattedData[j].neutral;
       mixed = mixed + formattedData[j].mixed;
      }
      count++;
    }
    
    let child = {
      date: uniqueDates[i],
      positive: positive/count,
      negative: negative/count,
      neutral: neutral/count,
      mixed:mixed/count
    };
    
    aggregatedData.push(child)
    
  }
  
  return aggregatedData;
}