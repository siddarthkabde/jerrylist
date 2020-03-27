var oRouter;
var oModel = new sap.ui.model.json.JSONModel();
sap.ui.define([
	"./BaseController"
], function (BaseController) {
	"use strict";

	return BaseController.extend("loyolabdn.controller.FileUpload", {
		onInit: function () {},

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
							var oStore = jQuery.sap.storage(jQuery.sap.storage.Type.local);
							// //storage
							oStore.put("studentModel", XL_row_object);
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