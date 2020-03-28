/*eslint linebreak-style: ["error", "unix"]*/
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"loyolabdn/model/models",
	"sap/m/Button"
], function(UIComponent, Device, models, Button) {
	"use strict";

	return UIComponent.extend("loyolabdn.Component", {
		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			UIComponent.prototype.init.apply(this, arguments);
			// enable routing
			this.getRouter().initialize();
		}
	});
});