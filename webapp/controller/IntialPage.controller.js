sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("com.heroku.HerokuDeploy.controller.IntialPage", {
		onInit: function () {
			
			alert("Iam Triggering");

		}
	});
});