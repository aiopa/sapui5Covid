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
			var allModel = new JSONModel();
			allModel.setSizeLimit(100000000);
			this.getView().setModel(allModel, "all");
		},
		onCountryMatch: function (oEvent) {
			var countrySlug = oEvent.getParameter("arguments").country;
			var promises = [
				this.covidApi.confirmed(countrySlug).get(),
				this.covidApi.deaths(countrySlug).get(),
				this.covidApi.recovered(countrySlug).get()
			];
			var oVizFrame = this.byId("case-types-line-chart");
			oVizFrame.setBusy(true);
			Promise.all(promises).then(function succsess(requests) {
				oVizFrame.setBusy(false);
				var confirmed = JSON.parse(requests[0].response);
				var deaths = JSON.parse(requests[1].response);
				var recovered = JSON.parse(requests[2].response);

				if (confirmed.length > 0 && deaths.length > 0 && recovered.length > 0) {
					this.getView().getModel("total").setProperty("/Cases", confirmed[confirmed.length - 1].Cases);
					this.getView().getModel("total").setProperty("/Deaths", deaths[deaths.length - 1].Cases);
					this.getView().getModel("total").setProperty("/Recovered", recovered[recovered.length - 1].Cases);

					var totalDeaths = deaths[deaths.length - 1].Cases.toLocaleString('no');
					var totalRecovered = recovered[recovered.length - 1].Cases.toLocaleString('no');
					var totalConfirmed = confirmed[confirmed.length - 1].Cases.toLocaleString('no');

					var lineGraphArr = [];
					for (var i = 0; i < confirmed.length; i++) {
						lineGraphArr.push({
							Country: confirmed[i].Country,
							date: confirmed[i].Date,
							confirmed: confirmed[i].Cases,
							deaths: deaths[i].Cases,
							recovered: recovered[i].Cases
						});
					}

					var lineGraphModel = new JSONModel();
					lineGraphModel.setSizeLimit(lineGraphArr.length);
					lineGraphModel.setData(lineGraphArr);
					this.getView().setModel(lineGraphModel, "allCaseTypes");
					var liveModel = new JSONModel();
					liveModel.setData({
						toDay: {
							Confirmed: totalConfirmed,
							Deaths: totalDeaths,
							Recovered: totalRecovered
						}
					});
					this.getView().setModel(liveModel, "liveTotals");

					oVizFrame.setVizProperties({
						plotArea: {
							window: {
								start: "entireDataSet"
							}
						},
						title: {
							text: "Cases"
						}
					});
				} else {
					sap.m.MessageToast.show("No data receaved\n\nTry another country");
				}

			}.bind(this));
		},
		navBack: function () {
			this.oRouter.navTo("home");
		},
		formatSmallNumber: function (nNumber) {
			if (nNumber.toString().length > 4) {
				return "M";
			}
			return "";
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