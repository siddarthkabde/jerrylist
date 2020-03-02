var XL_row_object;
sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("ZIProfile.controller.Profile", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ZIProfile.view.Profile
		 */
		onInit: function () {
			// var imgLinkedin,imgProfile;
			// imgLinkedin = this.getView().byId("imgLinkedin");
			// imgProfile = sap.ui.getCore().byId("__content0");
			// imgLinkedin.addStyleClass("imgLinkedin");
			// imgProfile.addStyleClass("imgProfile");
		},

		handleUploadPress: function () {
			var oEntry1 = this.mapoEntry1();

			var oModel = new sap.ui.model.json.JSONModel();
			var aData = jQuery.ajax({
				type: "GET",
				contentType: "application/json",
				url: "/loyoladb",
				dataType: "json",
				async: false,
				success: function (data, textStatus, jqXHR) {
					oModel.setData({
						modelData: data
					});
				}
			});

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

							XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
							var finalArr = XL_row_object.filter(function (val) {
								// return val.Agrmnt No. != "";
								if (!val.Name) {
									return;
								}
								if (val.Adm) {
									val.Adm = val.Adm.toString();
								}
								if (val.Cell) {
									val.Cell = val.Cell.toString();
								}

							});

							oModel.setData(XL_row_object);
							// var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
							// // //storage
							// oStore.put("studentModel", XL_row_object);
							// sap.ui.getCore().setModel(oModel, "studentsModel");

							// var oStore1 = jQuery.sap.storage(jQuery.sap.storage.Type.local);
							// var oDate = oStore1.get("studentData");

						});
					};

					reader.readAsBinaryString(file);

				}
			}

		},

	});

});