/*global QUnit*/

sap.ui.define([
	"com/heroku/HerokuDeploy/controller/IntialPage.controller"
], function (Controller) {
	"use strict";

	QUnit.module("IntialPage Controller");

	QUnit.test("I should test the IntialPage controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});