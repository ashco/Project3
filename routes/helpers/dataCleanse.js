module.exports = {
	dataFormat: function(results){
		// REMOVE WORDS
		let removeWords = ['a', 'the', 'my', 'of', 'in', 'to', 'for', 'with','on', 'at', 'from', 'by', 'about', 'as', 'into', 'like']
						
		let rawData = results.KeyPhrases;
		let keyWords = [];
		
		rawData.sort(function(a, b) {
				return b.Score - a.Score ;
		});	
		rawData.forEach(function(item){
			var text = item.Text;
			var array = text.split(' ');
			for(let i=0; i < array.length; i++){
				if(!removeWords.includes(array[i])){
					keyWords.push(array[i].toLowerCase());
				}
			}
		});				
		if (keyWords.length > 5){
		keyWords = keyWords.splice(0, 5);
		}		
	
		var keyWordsValuePairs = {};

		for(var i=0;i<keyWords.length;i++){
		  var tmp = keyWords[i]
		  var label = 'keyword'.concat(i+1);
		  keyWordsValuePairs[label] = tmp
		}

		var result = [keyWords, keyWordsValuePairs]
		return result;

	}
}