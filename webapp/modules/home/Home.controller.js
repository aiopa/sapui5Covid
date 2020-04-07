sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("covid.visual.modules.home.Home", {
		onInit: function () {
			var dataModel = new JSONModel("https://api.covid19api.com/all");
			dataModel.setSizeLimit(1000000);
			setTimeout(function () {
				this.getView().setModel(dataModel, "All");
				console.log(this.getView().getModel("All"))
			}.bind(this), 5000);

		},
		onAfterRendering: function () {

		}
	});
});