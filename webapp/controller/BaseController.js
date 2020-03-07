sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function(Controller, History){
	"use strict";

	return Controller.extend("nl.newitera.markdevlieger.contactlist.controller.BaseController", {
		getRouter: function(){
			return sap.ui.core.UIComponent.getRouterFor(this);
		},

		onNavBack: function(oEvent){
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				this.getRouter().navTo("start", {}, true);
			}
		}
	});
});