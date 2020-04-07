sap.ui.define([
	"./BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/json/JSONModel",
	"sap/m/Column",
	"sap/m/ColumnListItem",
	"sap/m/Label",
	"sap/m/Text",
	"sap/m/TablePersoController",
	"sap/m/ListType",
	'sap/ui/model/Sorter',
	'sap/ui/Device'

], function (BaseController, Filter, FilterOperator, JSONModel, Column, ColumnListItem, Label, Text, TablePersoController, ListType,
	Sorter, Device) {
	"use strict";

	return BaseController.extend("loyolabdn.controller.StudentTableView", {
		// on Init method. 
		onInit: function () {

			// Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
			this._mViewSettingsDialogs = {};

			this.mGroupFunctions = {
				Class: function (oContext) {
					var Class = oContext.getProperty("Class");
					return {
						key: Class,
						text: Class
					};
				},

				Address: function (oContext) {
					var Address = oContext.getProperty("Address");
					return {
						key: Address,
						text: Address
					};
				},

				Price: function (oContext) {
					var price = oContext.getProperty("Price");
					var currencyCode = oContext.getProperty("CurrencyCode");
					var key, text;
					if (price <= 100) {
						key = "LE100";
						text = "100 " + currencyCode + " or less";
					} else if (price <= 1000) {
						key = "BT100-1000";
						text = "Between 100 and 1000 " + currencyCode;
					} else {
						key = "GT1000";
						text = "More than 1000 " + currencyCode;
					}
					return {
						key: key,
						text: text
					};
				}
			};

			// start of code
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("/products/test", {}, false);
			var oFinalResult = oModel.getData();
			
// Filter the array. 			
			var flags = {};
			var newPlaces = oFinalResult.filter(function (entry) {
				if (flags[entry.Class]) {
					return false;
				}
				flags[entry.class] = true;
				return true;
			});

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

			var oTable = this.byId("idProductsTable");
			oTable.setAlternateRowColors(true);
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

				oItemTemplate.setType(sap.m.ListType.Navigation);
				// oItemTemplate.press("NavigateToStudentDetails");

				if (current < 4) {
					oTable.getColumns()[j].setVisible(true);
				} else {
					oTable.getColumns()[j].setVisible(false);
				}
				current++;
			});

			oTable.bindItems("/", oItemTemplate);
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
			// this.oPersoService.resetPersData();

			if (this.oTPC === undefined) {
				this.oTPC = new TablePersoController("idPersonalize", {
					table: oTable,
					persoService: this.oPersoService,
					hasGrouping: false
				});
				this.oTPC.activate();
			}

			// end of code

			var oRouter = this.getRouter();
			oRouter.getRoute("employeeList").attachMatched(this._onRouteMatched, this);
		},

		// Method triggered when routing is matched. 
		_onRouteMatched: function (oEvent) {
			var oArgs, oView;
			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			var oStore1 = jQuery.sap.storage(jQuery.sap.storage.Type.local);

			// var oModel = new sap.ui.model.json.JSONModel();
			// oModel.loadData("/products/test", {}, false);
			// var oFinalResult = oModel.getData();
			// oModel.setProperty("/", oFinalResult);
			// var oModelData = oModel.getProperty("/");

			// var oColumns = Object.keys(oModelData[0]);
			// var oColumnNames = [];

			// $.each(oColumns, function (i, value) {
			// 	oColumnNames.push({
			// 		Text: oColumns[i]
			// 	});
			// });

			// oModel.setProperty("/columnNames", oColumnNames);
			// var oTemplate = new Column({
			// 	header: new Label({
			// 		text: "{Text}"
			// 	})
			// });

			// var oTable = this.byId("idProductsTable");
			// oTable.setModel(oModel);
			// oTable.bindAggregation("columns", "/columnNames", oTemplate);
			// var oItemTemplate = new ColumnListItem();
			// var oTableHeaders = oTable.getColumns("columns");
			// // oTableHeaders = oModel.getProperty("/columnNames");
			// var current = 0;
			// $.each(oTableHeaders, function (j, value) {
			// 	var oHeaderName = oTableHeaders[j].getHeader().getText();
			// 	// var oHeaderName = oTableHeaders[j].Text;
			// 	oItemTemplate.addCell(new Text({
			// 		text: "{" + oHeaderName + "}"
			// 	}));

			// 	oItemTemplate.setType(sap.m.ListType.Navigation);
			// 	// oItemTemplate.press("NavigateToStudentDetails");

			// 	if (current < 4) {
			// 		oTable.getColumns()[j].setVisible(true);
			// 	} else {
			// 		oTable.getColumns()[j].setVisible(false);
			// 	}
			// 	current++;
			// });

			// oTable.bindItems("/", oItemTemplate);
			// this.oPersoService = {
			// 	getPersData: function () {
			// 		var oDeferred = new jQuery.Deferred();
			// 		var oBundle = this._oBundle;
			// 		oDeferred.resolve(oBundle);
			// 		return oDeferred.promise();
			// 	},

			// 	setPersData: function (oBundle) {
			// 		var oDeferred = new jQuery.Deferred();
			// 		this._oBundle = oBundle;
			// 		oDeferred.resolve();
			// 		return oDeferred.promise();
			// 	},

			// 	resetPersData: function () {
			// 		var oDeferred = new jQuery.Deferred();

			// 		var oInitialData = {
			// 			_persoSchemaVersion: "1.0",
			// 			aColumns: [{
			// 				id: "empty_component-testTable-LASTNAME",
			// 				order: 2,
			// 				text: "LASTNAME",
			// 				visible: false
			// 			}, {
			// 				id: "empty_component-testTable-FIRSTNAME",
			// 				order: 1,
			// 				text: "FIRSTNAME",
			// 				visible: true
			// 			}, {
			// 				id: "empty_component-testTable-EMPID",
			// 				order: 0,
			// 				text: "EMPID",
			// 				visible: true
			// 			}]
			// 		};

			// 		this._oBundle = oInitialData;
			// 		oDeferred.resolve();
			// 		return oDeferred.promise();
			// 	},

			// 	getCaption: function (oColumn) {
			// 		if (oColumn.getHeader() && oColumn.getHeader().getText) {
			// 			if (oColumn.getHeader().getText() == "Color") {
			// 				return "Color: this is a very very very very long Column Name to check how the TablePersoDialog deals with it";
			// 			}
			// 		}
			// 		return null;
			// 	},

			// 	getGroup: function (oColumn) {
			// 		if (oColumn.getHeader() && oColumn.getHeader().getText) {
			// 			if (oColumn.getHeader().getText() == "Color") {
			// 				return "Primary Group";
			// 			}
			// 		}

			// 		return "Secondary Group";
			// 	}
			// };
			// // this.oPersoService.resetPersData();

			// if (this.oTPC === undefined) {
			// 	this.oTPC = new TablePersoController("idPersonalize", {
			// 		table: oTable,
			// 		persoService: this.oPersoService,
			// 		hasGrouping: false
			// 	});
			// 	this.oTPC.activate();
			// }

		},

		// NavigateToStudentDetails: function (oEvent) {
		// 	alert('Triggering');
		// },

		onPersoButtonPressed: function (oEvent) {
			this.oTPC.openDialog();
		},

		// method used to navigate to the student details. 
		NavigateToStudentDetails: function (oEvent) {
			var that = this;
			var oItem, oCtx;
			var oTable = that.getView().byId("idProductsTable");
			oItem = oEvent.getSource();
			oCtx = oItem.getBindingContext();
			var path = oEvent.getSource().getBinding("items").getContexts()[oEvent.getSource().indexOfItem(oEvent.getParameters().listItem)].sPath
			var selectedRow = oTable.getModel().getProperty(path);
			sap.ui.getCore().navObject = selectedRow;
			// var path = oCtx.sPath;
			var newpath = path.replace("/", "prefix");

			this.getRouter().navTo("studentDetails", {
				Adm: newpath

			});
		},

		// code to implement the live functoinality 
		onlivechange: function (oEvent) {
			var aFilter = [];
			var sQuery = this.getView().byId("idSearch1").getValue();
			var datatype = typeof sQuery;
			var oFilter1 = new Filter("Adm", FilterOperator.Contains, sQuery);
			var oFilter2 = new Filter("Name", FilterOperator.Contains, sQuery);
			var oFilter4 = new Filter("Cell", FilterOperator.Contains, sQuery);
			// var oFilter5 = new Filter("Father Name", FilterOperator.Contains, sQuery);
			// var allFilter = new Filter([oFilter1, oFilter2, oFilter4, oFilter5], false);
			var allFilter = new Filter([oFilter1, oFilter2, oFilter4]);
			// filter binding
			var oTable = this.getView().byId("idProductsTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(allFilter);
		},

		createViewSettingsDialog: function (sDialogFragmentName) {
			var oDialog = this._mViewSettingsDialogs[sDialogFragmentName];

			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(sDialogFragmentName, this);
				this._mViewSettingsDialogs[sDialogFragmentName] = oDialog;

				if (Device.system.desktop) {
					oDialog.addStyleClass("sapUiSizeCompact");
				}
			}
			return oDialog;
		},

		// Group Settings Implementation. 
		handleGroupButtonPressed: function () {
			// this.createViewSettingsDialog("loyolabdn.fragments.GroupDialog").open();

		},

		handleFilterButtonPressed: function () {
			var oDialog = this.createViewSettingsDialog("loyolabdn.fragments.FilterDialog");
			var oModel = new JSONModel();
			var data = [{
				invoiceid: 1,
				businessArea: "test 1"
			}, {
				invoiceid: 2,
				businessArea: "test 2"
			}, {
				invoiceid: 3,
				businessArea: "test 3"
			}];
			oModel.setData(data);
			oDialog.setModel(oModel);

			oDialog.open();
		},

		handleSortDialogConfirm: function (oEvent) {
			var oTable = this.byId("idProductsTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				aSorters = [];

			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));

			// apply the selected sort and group settings
			oBinding.sort(aSorters);
		},

		handleGroupDialogConfirm: function (oEvent) {
			var oTable = this.byId("idProductsTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				vGroup,
				aGroups = [];

			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aGroups.push(new Sorter(sPath, bDescending, vGroup));
				// apply the selected group settings
				oBinding.sort(aGroups);

			} else {

				oTable.getModel().refresh(true);
			}

		},

		handleFilterDialogConfirm: function (oEvent) {
			var oTable = this.byId("idProductsTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				aFilters = [];

			mParams.filterItems.forEach(function (oItem) {
				var aSplit = oItem.getKey().split("___"),
					sPath = aSplit[0],
					sOperator = aSplit[1],
					sValue1 = aSplit[2],
					sValue2 = aSplit[3],
					oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
				aFilters.push(oFilter);
			});

			// apply filter settings
			oBinding.filter(aFilters);

			// update filter bar
			this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
			this.byId("vsdFilterLabel").setText(mParams.filterString);
		},

		onPrint: function (oEvent) {
				// var oTarget = this.getView(),
				// 	sTargetId = oEvent.getSource().data("targetId");

				// if (sTargetId) {
				// 	oTarget = oTarget.byId(sTargetId);
				// }

				// if (oTarget) {
				// 	var $domTarget = oTarget.$()[0],
				// 		sTargetContent = $domTarget.innerHTML,
				// 		sOriginalContent = document.body.innerHTML;

				// 	document.body.innerHTML = sTargetContent;
				// 	window.print();
				// 	document.body.innerHTML = sOriginalContent;
				// } else {
				// 	jQuery.sap.log.error("onPrint needs a valid target container [view|data:targetId=\"SID\"]");
				// }
			}
			// }
	});

});