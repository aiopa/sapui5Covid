sap.ui.define([
	"sap/ui/core/mvc/Controller",
], function (Controller) {
	"use strict";
	var xhr = new XMLHttpRequest();
	var covid19api = Controller.extend("covid.visual.services.covidAPI", {
		url: "https://api.covid19api.com/",
		all: function () {
			var serviceEndpoint = this.url + "all";
			return {
				get: function (id, params) {
					var request = new XMLHttpRequest();

					// Return it as a Promise
					return new Promise(function (resolve, reject) {
						// Setup our listener to process compeleted requests
						request.onreadystatechange = function () {

							// Only run if the request is complete
							if (request.readyState !== 4) return;

							// Process the response
							if (request.status >= 200 && request.status < 300) {
								// If successful
								resolve(request);
							} else {
								// If failed
								reject({
									status: request.status,
									statusText: request.statusText
								});
							}
						};
						// Setup our HTTP request
						request.open('GET', serviceEndpoint, true);

						// Send the request
						request.send();

					});
				}
			};
		},
		summary: function () {
			var serviceEndpoint = this.url + "summary";
			return {
				get: function (id, params) {
					var request = new XMLHttpRequest();

					// Return it as a Promise
					return new Promise(function (resolve, reject) {
						// Setup our listener to process compeleted requests
						request.onreadystatechange = function () {

							// Only run if the request is complete
							if (request.readyState !== 4) return;

							// Process the response
							if (request.status >= 200 && request.status < 300) {
								// If successful
								resolve(request);
							} else {
								// If failed
								reject({
									status: request.status,
									statusText: request.statusText
								});
							}
						};
						// Setup our HTTP request
						request.open('GET', serviceEndpoint, true);

						// Send the request
						request.send();

					});
				}
			};
		},
		confirmed: function (countrySlug) {
			var serviceEndpoint = this.url + "total/country/" + countrySlug + "/status/confirmed";
			return {
				get: function () {
					var request = new XMLHttpRequest();

					// Return it as a Promise
					return new Promise(function (resolve, reject) {
						// Setup our listener to process compeleted requests
						request.onreadystatechange = function () {

							// Only run if the request is complete
							if (request.readyState !== 4) return;

							// Process the response
							if (request.status >= 200 && request.status < 300) {
								// If successful
								resolve(request);
							} else {
								// If failed
								reject({
									status: request.status,
									statusText: request.statusText
								});
							}
						};
						// Setup our HTTP request
						request.open('GET', serviceEndpoint, true);

						// Send the request
						request.send();

					});
				}
			};
		},
		deaths: function (countrySlug) {
			var serviceEndpoint = this.url + "total/country/" + countrySlug + "/status/deaths";
			return {
				get: function (id, params) {
					var request = new XMLHttpRequest();

					// Return it as a Promise
					return new Promise(function (resolve, reject) {
						// Setup our listener to process compeleted requests
						request.onreadystatechange = function () {

							// Only run if the request is complete
							if (request.readyState !== 4) return;

							// Process the response
							if (request.status >= 200 && request.status < 300) {
								// If successful
								resolve(request);
							} else {
								// If failed
								reject({
									status: request.status,
									statusText: request.statusText
								});
							}
						};
						// Setup our HTTP request
						request.open('GET', serviceEndpoint, true);

						// Send the request
						request.send();

					});
				}
			};
		},
		recovered: function (countrySlug) {
			var serviceEndpoint = this.url + "total/country/" + countrySlug + "/status/recovered";
			return {
				get: function (id, params) {
					var request = new XMLHttpRequest();

					// Return it as a Promise
					return new Promise(function (resolve, reject) {
						// Setup our listener to process compeleted requests
						request.onreadystatechange = function () {

							// Only run if the request is complete
							if (request.readyState !== 4) return;

							// Process the response
							if (request.status >= 200 && request.status < 300) {
								// If successful
								resolve(request);
							} else {
								// If failed
								reject({
									status: request.status,
									statusText: request.statusText
								});
							}
						};
						// Setup our HTTP request
						request.open('GET', serviceEndpoint, true);

						// Send the request
						request.send();

					});
				}
			};
		},
		liveTotals: function (countrySlug) {
			var serviceEndpoint = this.url + "live/country/" + countrySlug + "/status/deaths";
			return {
				get: function (id, params) {
					var request = new XMLHttpRequest();

					// Return it as a Promise
					return new Promise(function (resolve, reject) {
						// Setup our listener to process compeleted requests
						request.onreadystatechange = function () {

							// Only run if the request is complete
							if (request.readyState !== 4) return;

							// Process the response
							if (request.status >= 200 && request.status < 300) {
								// If successful
								resolve(request);
							} else {
								// If failed
								reject({
									status: request.status,
									statusText: request.statusText
								});
							}
						};
						// Setup our HTTP request
						request.open('GET', serviceEndpoint, true);

						// Send the request
						request.send();

					});
				}
			};
		}
	});
	return covid19api;
});