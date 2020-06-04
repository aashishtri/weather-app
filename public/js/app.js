
var weatherform = document.querySelector("button");
var search = document.querySelector("input");
var successMessage = document.querySelector(".success");
weatherform.addEventListener("click", (e) => {
	
	successMessage.innerHTML = "";
	e.preventDefault();
	console.log(search.value);
	findweather(search.value);
})
var findweather = (location) => {
	const url = "/weather?address=" + location;
	try {
		fetch(url).then(response => {
			response.json().then((data) => {
				if (data.error) {
					return successMessage.innerHTML = "Unable to find Location. Please try again";
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
		location,
		temperature,
		humidity,
		precip,
	} = data;
	console.log(data);
	return "Location : " + location + "<br><br>" + "Temperature : " + temperature + "<br>" + "Humidity : " + humidity + "<br>" + "Precip : " + precip*100;



}