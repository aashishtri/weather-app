
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
	const url = "/weather?address=" + location;
	try {
		fetch(url).then(response => {
			response.json().then((data) => {
				if (data.error) {
					return failureMessage.innerHTML = "Unable to find Location. Please try again";
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
	return "location :" + location + "<br><br>" + "temperature :" + temperature + "<br>" + "humidity :" + humidity + "<br>" + "precip :" + precip;



}