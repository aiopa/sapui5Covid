sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"covid/visual/services/covidAPI"
], function (Controller, JSONModel, CovidAPI) {
	"use strict";

	return Controller.extend("covid.visual.modules.country_details.Country_details", {
		covidApi: new CovidAPI(),
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.getRoute("detail").attachPatternMatched(this.onCountryMatch, this);
			this.getView().setModel(new JSONModel(), "total");
			var allModel = new JSONModel()
			allModel.setSizeLimit(100000000)
			this.getView().setModel(allModel, "all");
		},
		onCountryMatch: function (oEvent) {
			var countrySlug = oEvent.getParameter("arguments").country;

			//Get confirmed
			this.covidApi.confirmed(countrySlug).get().then(function succsess(request) {
				var data = JSON.parse(request.response);
				var confirmedModel = new JSONModel();
				confirmedModel.setSizeLimit(data.length);
				confirmedModel.setData(data);
				this.getView().setModel(confirmedModel, "confirmed");
				this.getView().getModel("total").setProperty("/Cases", data[data.length - 1].Cases);
				this.getView().getModel("all").setProperty("/confirmed", data);
			}.bind(this));

			//Get deaths
			this.covidApi.deaths(countrySlug).get().then(function succsess(request) {
				var data = JSON.parse(request.response);
				var confirmedModel = new JSONModel();
				confirmedModel.setSizeLimit(data.length);
				confirmedModel.setData(data);
				this.getView().setModel(confirmedModel, "deaths");
				this.getView().getModel("total").setProperty("/Deaths", data[data.length - 1].Cases);
				this.getView().getModel("all").setProperty("/deaths", data);
			}.bind(this));

			//Get recovered
			this.covidApi.recovered(countrySlug).get().then(function succsess(request) {
				var data = JSON.parse(request.response);
				var recoveredModel = new JSONModel();
				recoveredModel.setSizeLimit(data.length);
				recoveredModel.setData(data);
				this.getView().setModel(recoveredModel, "recovered");
				this.getView().getModel("total").setProperty("/Recovered", data[data.length - 1].Cases);
				this.getView().getModel("all").setProperty("/recovered", data);
			}.bind(this));

			//Get Active
			/*	this.covidApi.active(countrySlug).get().then(function succsess(request) {
					var data = JSON.parse(request.response);
					var activeModel = new JSONModel();
					activeModel.setSizeLimit(data.length);
					activeModel.setData(data);
					this.getView().setModel(activeModel, "active");
					this.getView().getModel("total").setProperty("/Active", data[data.length - 1].Cases);
					this.getView().getModel("all").setProperty("/active", data);
				}.bind(this));*/
		},
		navBack: function () {
			this.oRouter.navTo("home");
		},
		formatDates: function (sDate) {
			if (sDate) {
				var date = new Date(sDate);
				//Add a 0 if it is one number
				var day = date.getDate() <= 9 ? "0" + date.getDate() : date.getDate();
				var month = date.getMonth() <= 8 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
				var year = date.getFullYear();

				return day + "/" + month + "/" + year;
			} else {
				return sDate;
			}
		}
	});
});