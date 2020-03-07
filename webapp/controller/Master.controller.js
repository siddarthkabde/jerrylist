sap.ui.define([
	"nl/newitera/markdevlieger/contactlist/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel){
	"use strict";
	return BaseController.extend("nl.newitera.markdevlieger.contactlist.controller.Master",{
		onInit: function(oEvent){
			//Set model
			var oModel = new JSONModel();
			oModel.loadData("/service/contactlistDb/contactlist", {}, false);
			this.getOwnerComponent().setModel(oModel, "Master");
		},

		onListItemPressed: function(oEvent){
			var oItem = oEvent.getSource();
			var oCtx  = oItem.getBindingContext("Master");
			this.getRouter().navTo( "contactdetail",{
				contactId : oCtx.getProperty("_id")
			});
		},

		onButtonAdd: function(oEvent){

			this.getRouter().navTo("contactdetail", {
				contactId: "new"
			});
		}
	});
});