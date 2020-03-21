var oModel = new sap.ui.model.json.JSONModel();
sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"jerrylist/libs/xlsx"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("jerrylist.view.controller.App", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf jerrylist.view.view.App
		 */
		onInit: function () {

			var oModel = new JSONModel();
			oModel.loadData("/", {}, false);
			var data = [];
			var oModel = new JSONModel();
			// oModel.loadData(
			// 	"/SaveStudentMaster", //sURL
			// 	data, //oParameters
			// 	false, //bAsync
			// 	'POST' //sType
			// );
			// //Reload Master model, in case of an insert/change in Name
			// this.getOwnerComponent().getModel("Master").loadData("/service/contactlistDb/contactlist", {}, false);
			//Return to display mode
			// this._setDisplayMode();		

			// $.ajax({
			// 	url: "./",
			// 	type: "GET",
			// 	dataType: "json"
			// }).done(function(data, status, jqxhr) {
			// 	var oModel = new sap.ui.model.json.JSONModel();
			// 	oModel.setData({modelData : data});
			// });

			var done;
		},

		handleUploadPress: function () {
			var oEntry1 = this.mapoEntry1();
		},

		// function to upload the data form the file into the table.
		mapoEntry1: function () {
			// var oGlobalBusyDialog = new sap.m.BusyDialog();
			// oGlobalBusyDialog.open();
			var t = this;
			var oFileUploader = this.getView().byId("fileUploader");
			if (!oFileUploader.getValue()) {
				MessageToast.show("choose a file first");
			} else {
				var oTable = this.getView().byId("idTable");
				var file = oFileUploader.getFocusDomRef().files[0];
				if (file && window.FileReader) {
					var reader = new FileReader();
					reader.onload = function (e) {
						var that = this;
						var data = e.target.result;
						var workbook = XLSX.read(data, {
							type: 'binary'
						});

						workbook.SheetNames.forEach(function (sheetName) {
							var that = this;
							if (sheetName != 'Student Master') {
								return;
							}

							var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
							var finalArr = XL_row_object.filter(function (val) {
								// return val.Agrmnt No. != "";
							});

							oModel.setData(XL_row_object);

							// documents array
					var books = [{ name: 'Mongoose Tutorial', price: 100 },
								{ name: 'NodeJS tutorial 2',  price: 200 },
								{ name: 'MongoDB Tutorial 3', price: 300 }];


							// var a = JSON.stringify(books);

							// var parsed = JSON.parse(a);
							// var isarray;
							// isarray =	Array.isArray(parsed);

							var url = "/products/create";	
							
							var settings = {
								"url": "http://localhost:1234/products/create",
								"dataType": "json",
								"contentType": "application/json; charset=utf-8",
								"method": "POST",
								"timeout": 0,
								"data": JSON.stringify(XL_row_object)
							  };
							  
							  $.ajax(settings).done(function (response) {
								console.log(response);
								MessageToast.show("choose a file first");
							  });

							// var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
							// //storage
							// oStore.put("studentMarks", XL_row_object);
							// sap.ui.getCore().setModel(oModel, "studentsModel");

							// var oStore1 = jQuery.sap.storage(jQuery.sap.storage.Type.local);
							// var oDate = oStore1.get("studentData");

						});

						// oTable = t.byId("idTable");
						// oGlobalBusyDialog.close();
						// oTable.setModel(sap.ui.getCore().getModel("studentsModel"));
					};

					reader.readAsBinaryString(file);

				}
			}

		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf jerrylist.view.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf jerrylist.view.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf jerrylist.view.view.App
		 */
		//	onExit: function() {
		//
		//	}

	});

});