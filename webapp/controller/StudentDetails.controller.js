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

			// Keeps reference to any of the created sap.m.ViewSettingsDialog-s in this sample
			this._mViewSettingsDialogs = {};
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
			var counter = 1;
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
			this.getView().setModel(oStudentsModel);

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


			 // get form Items.
			 


             // start of code
				if (this._oDialog) { // Implies oDialog instance is still valid. 
					var aContextsRemembered = this._oDialog.getItems(); 
// get the form Items. 
					var FormItems = oForm.getContent();
// Loop 1
					$.each(aContextsRemembered, function(index, value){

						var fieldname = aContextsRemembered[index].getTitle()
						var selected  = aContextsRemembered[index].getSelected();
// Loop 2
						$.each(FormItems, function(index, value){
							if (FormItems[index].getText() === fieldname){
								if (selected === false){
									oForm.getContent()[index].setVisible(false);
						        	var counter = index + 1;
									oForm.getContent()[counter].setVisible(false);
								} else {
									oForm.getContent()[index].setVisible(true);
						        	var counter = index + 1;
							        oForm.getContent()[counter].setVisible(true);
								}
							}; 
			
						 })
						   
					})		
       

				}

				// end of code





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
					this._oDialog.setModel(this.getView().getModel());
					this._configDialog(oButton);
					var oColumns = oStudentsModel.getData(); //
					var that = this;
					var oItems = this._oDialog.getItems()
					$.each(oItems, function (i, value) {
						that._oDialog.getItems()[i].setSelected(true);
					});
					this._oDialog.open();
				}.bind(this));
			} else {
				this._configDialog(oButton);
				this._oDialog.open();
			}

		},

		_configDialog: function (oButton) {
			// Multi-select if required
			// var bMultiSelect = !!oButton.data("multi");
			this._oDialog.setMultiSelect(true);

			var sCustomConfirmButtonText = oButton.data("confirmButtonText");
			this._oDialog.setConfirmButtonText(sCustomConfirmButtonText);

			// Remember selections if required
			// var bRemember = !!oButton.data("remember");
			this._oDialog.setRememberSelections(true);

			//add Clear button if needed
			var bShowClearButton = !!oButton.data("showClearButton");
			this._oDialog.setShowClearButton(bShowClearButton);

			// Set growing property
			var bGrowing = oButton.data("growing");
			this._oDialog.setGrowing(bGrowing == "false");

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
				var oForm = that.getView().byId("SimpleFormDisplay480_Trial");
				var bindedItems = oForm.getContent(); //array of content binded to control.

			// get the contexts array. 
			// var aContexts = oEvent.getParameter("selectedContexts");
			var aContexts = this._oDialog.getItems();
			aContexts.forEach(function (aContext, index) {
				var fieldname = aContexts[index].getTitle()
				var selected  = aContexts[index].getSelected();			

           // Second Loop
				bindedItems.forEach(function (formItem, index) {					
					if (formItem.getText() === fieldname){
                        if (selected === false ){
							oForm.getContent()[index].setVisible(false);
							var counter = index + 1;
							oForm.getContent()[counter].setVisible(false);
						} else {
							oForm.getContent()[index].setVisible(true);	
							var counter = index + 1;
							oForm.getContent()[counter].setVisible(true);					
						};
						var counter = null;
					}	
				});		    
				
				});

			// if (aContexts && aContexts.length) {
			// 	var oForm = that.getView().byId("SimpleFormDisplay480_Trial");
				// aContexts.map(function (oContext) {
				// 	var colname = oContext.getObject().Text;
				// 	return oContext.getObject().Text;
				// }).join(", ")

				// MessageToast.show("You have chosen " + aContexts.map(function (oContext) {
				// 	return oContext.getObject().Text;
				// }).join(", "));
			// } else {
			// 	MessageToast.show("No new item was selected.");
			// }
			// oEvent.getSource().getBinding("items").filter([]);
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
			this.createViewSettingsDialog("loyolabdn.fragments.GroupDialog").open();
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
			}
		}

	});
});