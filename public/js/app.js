console.log("js file");
// fetch("http://puzzle.mead.io/puzzle").then((response)=>{
// 	response.json().then((data)=>{
// 		console.log(data)
// 	})
// })
// 
var weatherform = document.querySelector("button");
var search = document.querySelector("input");
var successMessage = document.querySelector(".success");
var failureMessage = document.querySelector(".failure");
weatherform.addEventListener("click", (e) => {
	failureMessage.innerHTML = "";
	successMessage.innerHTML = "";
	e.preventDefault();
	console.log(search.value);
	findweather(search.value);
})
var findweather = (location) => {
	const url = "http://api.weatherstack.com/current?access_key=148c4840ebb4f2e63bca31758f6c111a&query=" + location;
	try {
		fetch(url).then(response => {
			response.json().then((data) => {
				if (data.error) {
					return failureMessage.innerHTML = "location not found";
				}
				return successMessage.innerHTML = weatherdata(data);

			})
		})
	} catch (e) {
		console.log(e);
	}
}

var weatherdata = (data) => {
	const {
		temperature,
		humidity,
		precip,
	} = data.current;
	return "location :" + data.location.name + "<br><br>" + "temperature :" + temperature + "<br>" + "humidity :" + humidity + "<br>" + "precip :" + precip;



}