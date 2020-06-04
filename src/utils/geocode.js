const request = require('request');

const geocodeurl="https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoiYXNoLXRyaSIsImEiOiJja2F3N3duNGYwNWZtMnRtdTBxb2I2eGpqIn0.EyLKxNBPdTpzceWsl2aurA"


const geocode = (address , callback) => {
	const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXNoLXRyaSIsImEiOiJja2F3N3duNGYwNWZtMnRtdTBxb2I2eGpqIn0.EyLKxNBPdTpzceWsl2aurA";
	request({url:url,json:true},(error,response)=>{
	if(error){
		callback("can't connect to the network",undefined);
	}
	else {
		
		if(!response.body.features.length) {
			
			callback("can't find location with given name",undefined);
		}
		else {
			var coords = response.body.features[0].center;
			var lat = coords[1];
			var long = coords[0];
			var loc = response.body.features[0].place_name;
			var point = {
				lat, long, loc
			};
			callback(error,point);
		}
		
	}
		

});
}

module.exports = geocode;
