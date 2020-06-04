const request = require('request');
const forecast = (point,callback) => {
	const url = "http://api.weatherstack.com/current?access_key=148c4840ebb4f2e63bca31758f6c111a&query="+point.lat+','+point.long;
	request({url:url,json:true},(error,response) =>{
		if(error){
			callback("can't connect to the network",undefined);
		}
		else{
			callback(undefined,response.body.current);
		}
	} );
}
module.exports = forecast;