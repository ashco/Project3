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


export function overallTrends(data){

    var total = data.length;

    var uniqueSentiments = ['neutral', 'positive', 'negative', 'mixed'];

    var sentimentData = [];
    for(let i=0; i < uniqueSentiments.length; i++){
      var count = 1;
      var actualCount = 0;
      for(let j=0; j<data.length; j++){
        if(data[j].sentiment === uniqueSentiments[i]){
            actualCount ++;
            count ++;
        }
      }
      
      
      var child = {
        sentiment: uniqueSentiments[i],
        index: 1,
        actualValue: actualCount,
        percentOfTotal: Math.round(((actualCount/total)*100)),
        value: count
      }
      sentimentData.push(child);
    }
    
  return sentimentData;
}

export function keywordStats(data){
    
    var keywords = [];
  
    data.forEach(function(item){
      if(item.keyword1){
        keywords.push(item.keyword1)
      } 
      if(item.keyword2){
        keywords.push(item.keyword2)
      } 
      if(item.keyword3){
        keywords.push(item.keyword3)
      } 
      if(item.keyword4){
        keywords.push(item.keyword4)
      } 
      if(item.keyword5){
        keywords.push(item.keyword5)
      } 
    });
  
    var keywordTotals = [];
    
    // copy original array of keywords
    var copy = keywords.slice(0);
 
    for (let i = 0; i < keywords.length; i++) {
      var count = 0;  
      for (var j = 0; j < copy.length; j++) {
        if (keywords[i] == copy[j]) {
          count++;
          delete copy[j];
        }
      }
 
    if (count > 0) {
      var a = new Object();
      a.keyword = keywords[i];
      a.value = count;
      keywordTotals.push(a);
    }
  }
  
  keywordTotals.sort(function(a, b) {
        return b.value - a.value ;
  });
  
  
  if(keywordTotals.length > 10){
    keywordTotals = keywordTotals.slice(0,10)
  }
 
  return keywordTotals;

}