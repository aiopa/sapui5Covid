sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"covid/visual/model/models",
	"sap/ui/model/json/JSONModel",
	"covid/visual/services/covidAPI"
], function (UIComponent, Device, models, JSONModel, CovidAPI) {
	"use strict";

	return UIComponent.extend("covid.visual.Component", {
		covidApi: new CovidAPI(),
		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			this.covidApi.summary().get().then(function succsess(request) {
				var data = JSON.parse(request.response);
				var summaryModel = new JSONModel();
				summaryModel.setSizeLimit(data.Countries.length);
				summaryModel.setData(data);
				this.setModel(summaryModel, "summaryNumbers");
			}.bind(this));

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

		}
	});
});