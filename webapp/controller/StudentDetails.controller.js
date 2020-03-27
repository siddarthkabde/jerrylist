sap.ui.define([
	"./BaseController"
], function (BaseController) {
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
			var oStudentsModel = new sap.ui.model.json.JSONModel();
			oStudentsModel.setData(obj);

			// that._showFormFragment("Display");
			that.getView().byId("SimpleFormDisplay480_Trial").setModel(oStudentsModel).bindElement("/");

            var marks = 1500;
            var overalldues = obj["Overall Due"];
            var overallpaid = obj["Overall Paid"];
            var discountgiven = obj["Oerall Fees "]  - obj["Overall Adj"];

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

	});
});