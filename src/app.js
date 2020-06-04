const path = require('path')
const express = require('express')
const fs = require('fs')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast.js');
const port = process.env.PORT || 3000;

const app = express();
//paths
const publicDirSrc = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//steup handlebar engine and view paths
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.use(express.static(publicDirSrc));
app.get('', (req, res) => {
	
	
	res.render('index', {
		title: "Weather",
		name: "Aashish"
	});
})
app.get('/about', (req, res) => {
	res.render('about', {
		title: "about",
		name: 'Aashish'
	});
})

app.get('/help', (req, res) => {
	res.render('help', {
		title: "help",
		name: "Aashish"
	});
})
app.get('/weather', (req, res) => {
	if(!req.query.address){
		return res.send({
			error : "please provide address",
		})
	}
	const address = req.query.address;
	geocode(address, (error, point) => {
		if (error) {
			return res.send({
				error,
			});
		} else {
			forecast(point, (error, forecastdata) => {
				if (error) {
					return res.send({
						error,
					});
				} else {
					//console.log(point.loc);
					const {
						temperature,
						precip,
						wind_speed,
						humidity
					} = forecastdata;
					// console.log('temprature : ' + temperature);
					// console.log('chances of rain : ' + forecastdata.precip + '\%');
					// console.log("wind speed : " + forecastdata.wind_speed);
					// console.log("humidity : " + forecastdata.humidity);
					return res.send({
						location : point.loc,
						temperature,
						precip,
						wind_speed,
						humidity,
					});
				}
			});
		}
	});
	// res.send({
	// 	location: req.query.address,
	// 	forecast: "rain"
	// })
})
app.get('/products', (req, res) => {
	if(!req.query.search) {
		return res.send({
			error:"you must provide a search term",
		});
	}
	res.send({
		products : []
	})
})
app.get('/help/*', (req, res) => {
	res.render('error', {

		error: "no help articles to display"
	})
})
app.get('/*', (req, res) => {
	res.render('error', {
		title:"404",
		error: "404 not found"
	})
})
app.listen(port, () => {
	console.log("server is up on port" + port)
})