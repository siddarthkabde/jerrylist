sap.ui.define([
	"./BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"sap/m/Column",
	"sap/m/ColumnListItem",
	"sap/m/Label",
	"sap/m/Text",
	"sap/m/TablePersoController"

], function (BaseController, Filter, FilterOperator, JSONModel, Column, ColumnListItem, Label, Text, TablePersoController) {
	"use strict";

	return BaseController.extend("loyolabdn.controller.StudentTableView", {
		// on Init method. 
		onInit: function () {
			this.oPersoService = {
				getPersData: function () {
					var oDeferred = new jQuery.Deferred();
					var oBundle = this._oBundle;
					oDeferred.resolve(oBundle);
					return oDeferred.promise();
				},

				setPersData: function (oBundle) {
					var oDeferred = new jQuery.Deferred();
					this._oBundle = oBundle;
					oDeferred.resolve();
					return oDeferred.promise();
				},

				resetPersData: function () {
					var oDeferred = new jQuery.Deferred();

					var oInitialData = {
						_persoSchemaVersion: "1.0",
						aColumns: [{
							id: "empty_component-testTable-LASTNAME",
							order: 2,
							text: "LASTNAME",
							visible: false
						}, {
							id: "empty_component-testTable-FIRSTNAME",
							order: 1,
							text: "FIRSTNAME",
							visible: true
						}, {
							id: "empty_component-testTable-EMPID",
							order: 0,
							text: "EMPID",
							visible: true
						}]
					};

					this._oBundle = oInitialData;

					//				this._oBundle = null;
					oDeferred.resolve();
					return oDeferred.promise();
				},

				getCaption: function (oColumn) {
					if (oColumn.getHeader() && oColumn.getHeader().getText) {
						if (oColumn.getHeader().getText() == "Color") {
							return "Color: this is a very very very very long Column Name to check how the TablePersoDialog deals with it";
						}
					}
					return null;
				},

				getGroup: function (oColumn) {
					if (oColumn.getHeader() && oColumn.getHeader().getText) {
						if (oColumn.getHeader().getText() == "Color") {
							return "Primary Group";
						}
					}
					return "Secondary Group";
				}
			};
			var oRouter = this.getRouter();
			oRouter.getRoute("employeeList").attachMatched(this._onRouteMatched, this);
		},

		// Method triggered when routing is matched. 
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			var oStore1 = jQuery.sap.storage(jQuery.sap.storage.Type.local);
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/products/test", {}, false);
			var oFinalResult = oModel.getData();
			oModel.setProperty("/", oFinalResult);
			var oModelData = oModel.getProperty("/");

			var oColumns = Object.keys(oModelData[0]);
			var oColumnNames = [];

			$.each(oColumns, function (i, value) {
				oColumnNames.push({
					Text: oColumns[i]
				});
			});

			oModel.setProperty("/columnNames", oColumnNames);
			var oTemplate = new Column({
				header: new Label({
					text: "{Text}"
				})
			});

			var oTable = this.byId("idTable");
			oTable.setModel(oModel);
			oTable.bindAggregation("columns", "/columnNames", oTemplate);
			var oItemTemplate = new ColumnListItem();
			var oTableHeaders = oTable.getColumns("columns");
			// oTableHeaders = oModel.getProperty("/columnNames");
			var current = 0;
			$.each(oTableHeaders, function (j, value) {
				var oHeaderName = oTableHeaders[j].getHeader().getText();
				// var oHeaderName = oTableHeaders[j].Text;
				oItemTemplate.addCell(new Text({
					text: "{" + oHeaderName + "}"
				}));

				if (current < 4) {
					oTable.getColumns()[j].setVisible(true);
				} else {
					oTable.getColumns()[j].setVisible(false);
				}
				current++;

			});

			oTable.bindItems("/", oItemTemplate);
			this.oPersoService.resetPersData();
			this.oTPC = new TablePersoController("idPersonalize", {
				table: oTable,
				persoService: this.oPersoService,
				hasGrouping: false
			});

			this.oTPC.activate();

		},

		// method used to navigate to the student details. 
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

		// code to implement the live functoinality 
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