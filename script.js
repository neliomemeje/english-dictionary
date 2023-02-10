const inputEl = document.querySelector(".input");
const info = document.querySelector(".info");
const searchedTitle = document.querySelector("span.title");
const wordMeaning = document.querySelector("span.meaning")
const audioSrc= document.getElementById("audio")
const meaningContainer = document.querySelector(".meaning-container")


const fetchDictionary = async (word) => {
	const source = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
	try {
		info.style.display = "block";
		meaningContainer.style.display = "none"
		info.innerText = `Searching for "${word}"`

		const response = await fetch(source);
		const data = await response.json();	

		if(data.title){
			meaningContainer.style.display = "block"
			info.style.display = "none"
			searchedTitle.innerText = word;
	 		wordMeaning.innerText = "N/A";
	 		audioSrc.style.display = "none"	
		} else {
	 		info.style.display = "none"
	 		meaningContainer.style.display = "block"
	 		audioSrc.style.display = "inline-flex"	
	 		searchedTitle.innerText = data[0].word;
	 		wordMeaning.innerText = data[0].meanings[0].definitions[0].definition;	 
	 		audioSrc.src = data[0].phonetics[0].audio;		 	
		}

	} catch (err) {
		console.log(err)
		info.innerHTML = "Something happened, please try again later"
	}

}

inputEl.addEventListener("keyup", (e) => {
	if(e.target.value && e.key === 'Enter'){
		fetchDictionary(e.target.value)
	}
})


