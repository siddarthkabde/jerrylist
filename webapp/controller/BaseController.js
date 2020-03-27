sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"loyolabdn/util/xlsx",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
], function (Controller, History, UIComponent, xlsx,
              Filter, FilterOperator) {
	'use strict';

	return Controller.extend("loyolabdn.controller.BaseController", {

		onInit: function () {

		},

		getModel: function (sModel) {
			return this.getOwnerComponent().getModel(sModel);
		},

		setModel: function (oModel, sName) {
			return this.getOwnerComponent().setModel(oModel, sName);
		},

		getResourceBundle: function () {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		getRouter: function () {
			return UIComponent.getRouterFor(this);
		},

		onNavBack: function () {
			var oHistory, sPreviousHash;

			oHistory = History.getInstance();
			sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("appHome", {}, true /*no history*/ );
			}
		}
	});
});