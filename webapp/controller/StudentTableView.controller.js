sap.ui.define([
	"./BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"

], function (BaseController, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("loyolabdn.controller.StudentTableView", {

		onInit: function () {
			var oRouter = this.getRouter();
			oRouter.getRoute("employeeList").attachMatched(this._onRouteMatched, this);

		},

		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			var oStore1 = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			var oModel = new sap.ui.model.json.JSONModel();
			var oData = oStore1.get("studentModel");
			oModel.setData(oData);
			var oTable = this.byId("idTable");
			// oGlobalBusyDialog.close();
			oTable.setModel(oModel);
		},

		NavigateToStudentDetails: function (oEvent) {

			var that = this;
			var oItem, oCtx;
			var oTable = that.getView().byId("idTable");
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			var selectedRow = oTable.getModel().getProperty(oCtx.sPath);
			sap.ui.getCore().navObject = selectedRow;
			var path = oCtx.sPath;
			var newpath = path.replace("/", "prefix");

			this.getRouter().navTo("studentDetails", {
				Adm: newpath
					// row: selectedRow
			});
		},

		onlivechange: function (oEvent) {
			var aFilter = [];
			var sQuery = this.getView().byId("idSearch1").getValue();
			var datatype = typeof sQuery;
			// if	(datatype === 'number') {
			// 	parseInt(sQuery);
			// }
			// if (sQuery) {
			// 	aFilter.push(new Filter("Adm", FilterOperator.Contains, sQuery, FilterOperator.oValue2 = "", FilterOperator._bMultiFilter =
			// 		true));
			// 	aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery, FilterOperator.ovalue2 = "", FilterOperator._bMultiFilter =
			// 		true));
			// }

			var oFilter1 = new Filter("Adm", FilterOperator.Contains, sQuery);
			var oFilter2 = new Filter("Name", FilterOperator.Contains, sQuery);
			var oFilter4 = new Filter("Cell", FilterOperator.Contains, sQuery);
			// var oFilter5 = new Filter("Father Name", FilterOperator.Contains, sQuery);
			// var allFilter = new Filter([oFilter1, oFilter2, oFilter4, oFilter5], false);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter4]);
			// filter binding
			var oTable = this.getView().byId("idTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(allFilter);
		},

	});

});