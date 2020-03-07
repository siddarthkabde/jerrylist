sap.ui.define([
	"nl/newitera/markdevlieger/contactlist/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel){
	"use strict";
	return BaseController.extend("nl.newitera.markdevlieger.contactlist.controller.Detail",{
		onInit: function(){
			var oRouter = this.getRouter();
			oRouter.getRoute("contactdetail").attachMatched(this._onRouteMatched, this);
			this._createButtonModel();
			this._setDisplayMode();
		},

		onButtonEdit: function(oEvent){
			this._setChangeMode();
		},

		onButtonSave: function(oEvent){
			// Use the loadData of a JSONModel to do the POST request
			var oModel = new JSONModel();
			oModel.loadData(
				"/service/contactlistDb/saveContact",			//sURL
				this.getView().getModel("Detail").getData(),	//oParameters
				false,											//bAsync
				'POST'											//sType
				);
			//Reload Master model, in case of an insert/change in Name
			this.getOwnerComponent().getModel("Master").loadData("/service/contactlistDb/contactlist", {}, false);
			//Return to display mode
			this._setDisplayMode();		
		},

		onButtonCancel: function(oEvent){
			//Reload contact and return to display mode
			var oModel = this.getView().getModel("Detail");
			var aData = oModel.getData();
			oModel.loadData("/service/contactlistDb/singleContact?contactId=" + aData._id, {}, false);
			this._setDisplayMode();
		},

		onButtonDelete: function(oEvent){
			//Use the loadData of a JSONModel to do the POST request
			var oModel = new JSONModel();
			oModel.loadData(
				"/service/contactlistDb/deleteContact",			//sURL
				this.getView().getModel("Detail").getData(),	//oParameters
				false,											//bAsync
				'POST'											//sType
				);
			//Reload Master model, in case of an insert/change in Name
			this.getOwnerComponent().getModel("Master").loadData("/service/contactlistDb/contactlist", {}, false);
			//Navigate to home route
			this.getRouter().navTo("home");
		},

		_setDisplayMode: function(){
			this._setButtonModel("Display");
			this._setFragment("Display");
		},

		_setChangeMode: function(){
			this._setButtonModel("Change");
			this._setFragment("Change");
		},

		_onRouteMatched: function(oEvent){
			var oArgs = oEvent.getParameter("arguments");

			var oModel = new JSONModel();
			// If contactId = "new", a new contact is to be created
			if ( oArgs.contactId !== "new" ){
				oModel.loadData("/service/contactlistDb/singleContact?contactId=" + oArgs.contactId, {}, false);
				//ensure that subobjects are created
				var aData = oModel.getData();
				if (!aData.address){
					aData.address = {};
					oModel.setJSON(aData);
				}
			} else {
				//ensure subobjects are created, otherwise they will not be saved on change
				oModel.setData({firstName :"", lastName:"", address: {}});
			}
			this.getOwnerComponent().setModel(oModel, "Detail");

			if ( oArgs.contactId !== "new"){
				this._setDisplayMode();
			} else {
				this._setChangeMode();
			}
		},

		_createButtonModel: function(){
			var aModel = {
				displayEdit: true,
				displaySave: false,
				displayCancel: false
			};
			var oModel = new JSONModel(aModel);
			this.getView().setModel(oModel, "buttonModel");
		},

		_setButtonModel: function(sMode){
			var oModel = this.getView().getModel("buttonModel");
			var aModel = oModel.getData();
			switch(sMode){
				case "Display":
					aModel = {
						displayEdit: true,
						displaySave: false,
						displayCancel: false
					};
					break;
				case "Change":
					aModel = {
						displayEdit: false,
						displaySave: true,
						displayCancel: true
					};
					break;
			}
			oModel.setData(aModel);
		},

		_setFragment: function(sFragment){
			var oPage = this.getView().byId("page");
			oPage.removeAllContent();
			oPage.insertContent(sap.ui.xmlfragment( this.getView().getId(), "nl.newitera.markdevlieger.contactlist.view." + sFragment) );
		}
	});
});