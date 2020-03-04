sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function(UIComponent, JSONModel){
	"use strict";

	return UIComponent.extend("jerrylist.Component",{
		metadata:{
			manifest: "json"
		},

		init: function(){
			//Init of superclass
			UIComponent.prototype.init.apply(this, arguments);

			//Initialize router
			this.getRouter().initialize();

			//Set a model
			var oModel = new JSONModel();
			oModel.loadData("model/mock.json", {}, false);
			this.setModel(oModel);

		}
	});
});