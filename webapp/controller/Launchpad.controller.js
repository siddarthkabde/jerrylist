var oRouter;
sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("loyolabdn.controller.Launchpad", {
		onInit: function () {
			oRouter = this.getRouter();
			var oModel = this.getModel("apps")
            this.getView().setModel(oModel);
            },



		tilePress: function (oEvent) {

			// oEvent.getSource().mProperties.header
			switch (oEvent.getSource().getTitle()) {
			case 'Student Master Data':
				oRouter.navTo("employeeList");
				break;

			case 'Upload File':
				oRouter.navTo("fileUpload");
				break;

			case 'Student - Performance Analysis':
				oRouter.navTo("studentMarks");
				break;

			default:
				oRouter.navTo("home");
			}
		},

		onNavToEmployees: function () {
			this.getRouter().navTo("employeeList");
		}


	});
});