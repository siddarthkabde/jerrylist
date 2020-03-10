sap.ui.define([
	"./BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("ZIProfile.controller.App", {

		
		onOpenDialog: function() {
			this.getOwnerComponent().helloDialog.open(this.getView());
		}

	

	});

});