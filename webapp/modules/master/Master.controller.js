sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	'sap/ui/model/Sorter',
	"covid/visual/services/covidAPI"
], function (Controller, JSONModel, Filter, FilterOperator, Sorter, CovidAPI) {
	"use strict";

	return Controller.extend("covid.visual.modules.master.Master", {

		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter();
			this._bDescendingSort = true;
		},
		onContrySelect: function (oEvent) {
			var countryPath = oEvent.getSource().getBindingContext("summaryNumbers").getPath();
			var country = oEvent.getSource().getBindingContext("summaryNumbers").getModel().getProperty(countryPath);
			this.oRouter.navTo("detail", {
				country: country.Slug
			});
		},
		onSearch: function (oEvent) {
			var oTableSearchState = [],
				sQuery = oEvent.getParameter("query");

			if (sQuery && sQuery.length > 0) {
				oTableSearchState = [new Filter("Country", FilterOperator.Contains, sQuery)];
			}

			this.getView().byId("country-table").getBinding("items").filter(oTableSearchState, "Application");
		},
		onSort: function (oEvent) {
			this._bDescendingSort = !this._bDescendingSort;
			var oView = this.getView(),
				oTable = oView.byId("country-table"),
				oBinding = oTable.getBinding("items"),
				oSorter = new Sorter("TotalDeaths", this._bDescendingSort);

			oBinding.sort(oSorter);
		}
	});
});