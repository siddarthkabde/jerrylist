var oStudentsModel = new sap.ui.model.json.JSONModel();
sap.ui.define([
	"./BaseController",
	"sap/ui/core/Fragment",
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	'sap/m/MessageToast'
], function (BaseController, Fragment, Filter, FilterOperator, MessageToast) {
	"use strict";

	return BaseController.extend("loyolabdn.controller.StudentDetails", {
		onInit: function () {

			var oRouter = this.getRouter();
			oRouter.getRoute("studentDetails").attachMatched(this._onRouteMatched, this);
			// Set the initial form to be the display one
			var oView = this.getView();
			// this._showFormFragment("Display");
		},

		_onRouteMatched: function (oEvent) {
			var that = this;
			var oArgs, oView;

			oArgs = oEvent.getParameter("arguments");
			oView = this.getView();
			var sObjectId = oEvent.getParameter("arguments").Adm;
			var newpath = sObjectId.replace("prefix", "/");

			var obj = sap.ui.getCore().navObject;
			var that = this;
			
			var oForm = that.getView().byId("SimpleFormDisplay480_Trial");
			oForm.destroyContent();
			oStudentsModel.setData(obj);
			var columnNames = [];
			var counter = 0;
			var string;
			var labelid;
			var textid;

			$.each(obj, function (i, value) {
				columnNames.push({
					Text: i
				});

				string = counter.toString();
				labelid = "label".concat(string);
				var oLabel = new sap.m.Label({
					text: i
				});
				oLabel.setVisible(true);

				var textid = "text".concat(string);
				var oText = new sap.m.Text({
					text: value
				});

				oText.setVisible(true);

				oForm.addContent(oLabel);
				oForm.addContent(oText);

				counter++;

			});

			oStudentsModel.setData(columnNames);

			// that._showFormFragment("Display");
			// that.getView().byId("SimpleFormDisplay480_Trial").setModel(oStudentsModel).bindElement("/");

			var marks = 1500;
			var overalldues = obj["Overall Due"];
			var overallpaid = obj["Overall Paid"];
			var discountgiven = obj["Oerall Fees "] - obj["Overall Adj"];

			// code to write the chart. 
			Highcharts.chart('contain', {
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false,
					type: 'pie'
				},
				title: {
					text: 'Student Fee'
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							format: '<b>{point.name}</b>: {point.percentage:.1f} %'
						}
					}
				},
				series: [{
					name: 'Fee Structure',
					colorByPoint: true,
					data: [{
						name: 'Discount Given',
						y: discountgiven,
						sliced: true,
						selected: true
					}, {
						name: 'OverAll Paid',
						y: overallpaid
					}, {
						name: 'Overll Dues',
						y: overalldues
					}]
				}]
			});

		},
		_formFragments: {},

		handleSelectDialogPress: function (oEvent) {
			var oButton = oEvent.getSource();
			if (!this._oDialog) {
				var that;
				Fragment.load({
					name: "loyolabdn.fragments.Dialog",
					controller: this
				}).then(function (oDialog) {
					that = this;
					this._oDialog = oDialog;
					this._oDialog.setModel(oStudentsModel);
					this._configDialog(oButton);
					var oColumns = oStudentsModel.getData(); //
					var that = this;
					var oItems = this._oDialog.getItems()
					$.each(oItems, function (i, value) {
						that._oDialog.getItems()[i].setSelected(true);
					}); //
					this._oDialog.open();
				}.bind(this));
			} else {
				this._configDialog(oButton);
				this._oDialog.open();
			}

		},

		_configDialog: function (oButton) {
			// Multi-select if required
			var bMultiSelect = !!oButton.data("multi");
			this._oDialog.setMultiSelect(bMultiSelect);

			var sCustomConfirmButtonText = oButton.data("confirmButtonText");
			this._oDialog.setConfirmButtonText(sCustomConfirmButtonText);

			// Remember selections if required
			var bRemember = !!oButton.data("remember");
			this._oDialog.setRememberSelections(bRemember);

			//add Clear button if needed
			var bShowClearButton = !!oButton.data("showClearButton");
			this._oDialog.setShowClearButton(bShowClearButton);

			// Set growing property
			var bGrowing = oButton.data("growing");
			this._oDialog.setGrowing(bGrowing == "true");

			// Set growing threshold
			var sGrowingThreshold = oButton.data("threshold");
			if (sGrowingThreshold) {
				this._oDialog.setGrowingThreshold(parseInt(sGrowingThreshold));
			}

			// Set draggable property
			var bDraggable = oButton.data("draggable");
			this._oDialog.setDraggable(bDraggable == "true");

			// Set draggable property
			var bResizable = oButton.data("resizable");
			this._oDialog.setResizable(bResizable == "true");

			// Set style classes
			var sResponsiveStyleClasses =
				"sapUiResponsivePadding--header sapUiResponsivePadding--subHeader sapUiResponsivePadding--content sapUiResponsivePadding--footer";
			var sResponsivePadding = oButton.data("responsivePadding");
			if (sResponsivePadding) {
				this._oDialog.addStyleClass(sResponsiveStyleClasses);
			} else {
				this._oDialog.removeStyleClass(sResponsiveStyleClasses);
			}

			// clear the old search filter
			// this._oDialog.getBinding("items").filter([]);

			// toggle compact style
			jQuery.sap.syncStyleClass("sapUiSizeCompact", this.getView(), this._oDialog);
		},

		_getFormFragment: function (sFragmentName) {
			var oFormFragment = this._formFragments[sFragmentName];

			if (oFormFragment) {
				return oFormFragment;
			}

			oFormFragment = sap.ui.xmlfragment(this.getView().getId(), "loyolabdn.view." + sFragmentName);

			this._formFragments[sFragmentName] = oFormFragment;
			return this._formFragments[sFragmentName];
		},

		_showFormFragment: function (sFragmentName) {
			var oPage = this.byId("page");

			oPage.removeAllContent();
			oPage.insertContent(this._getFormFragment(sFragmentName));
			this._toggleButtonsAndView(false);
		},

		handleEditPress: function () {
			this._toggleButtonsAndView(true);

		},

		handleCancelPress: function () {

			//Restore the data
			var oModel = this.getView().getModel();
			var oData = oModel.getData();

			oData.SupplierCollection[0] = this._oSupplier;

			oModel.setData(oData);
			this._toggleButtonsAndView(false);

		},

		handleSavePress: function () {

			this._toggleButtonsAndView(false);

		},
		onExit: function () {
			for (var sPropertyName in this._formFragments) {
				if (!this._formFragments.hasOwnProperty(sPropertyName) || this._formFragments[sPropertyName] == null) {
					return;
				}

				this._formFragments[sPropertyName].destroy();
				this._formFragments[sPropertyName] = null;
			}
		},

		_toggleButtonsAndView: function (bEdit) {
			var oView = this.getView();

			// Show the appropriate action buttons
			// oView.byId("edit").setVisible(!bEdit);
			// oView.byId("save").setVisible(bEdit);
			// oView.byId("cancel").setVisible(bEdit);

			// Set the right form type
			// this._showFormFragment(bEdit ? "Change" : "Display");
		},

		handleSearch: function (oEvent) {
			var sValue = oEvent.getParameter("value");
			var oFilter = new Filter("Text", FilterOperator.Contains, sValue);
			var oBinding = oEvent.getSource().getBinding("items");
			oBinding.filter([oFilter]);
		},

		handleClose: function (oEvent) {
			var that = this;
			var aContexts = oEvent.getParameter("selectedContexts");
			if (aContexts && aContexts.length) {
				var oForm = that.getView().byId("SimpleFormDisplay480_Trial");
				aContexts.map(function (oContext) {
					var colname = oContext.getObject().Text;
					return oContext.getObject().Text;
				}).join(", ")

				MessageToast.show("You have chosen " + aContexts.map(function (oContext) {
					return oContext.getObject().Text;
				}).join(", "));
			} else {
				MessageToast.show("No new item was selected.");
			}
			oEvent.getSource().getBinding("items").filter([]);
		},

	});
});