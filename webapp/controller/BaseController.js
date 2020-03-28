sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/core/UIComponent",
	"sap/m/MessageBox"
], function (Controller, History, UIComponent, MessageBox) {
	"use strict";

	return Controller.extend("Loyola.controller.BaseController", {

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
		},

		getModel: function (sModel) {
			return this.getOwnerComponent().getModel(sModel);
		},

		setModel: function (oModel, sName) {
			return this.getOwnerComponent().setModel(oModel, sName);
		},

	});

});