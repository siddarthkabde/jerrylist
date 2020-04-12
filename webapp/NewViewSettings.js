sap.ui.define([
	"sap/m/ViewSettingsDialog",
	"sap/m/SearchField"
], function (V, S) {
	"use strict";
	return V.extend("demo.NewViewSettings", {
		_getFilterSearchField: function(F) {
        var t = this
          , o = new S({
            search: function(e) {
                var Q = e.getParameter('query').toLowerCase();
                F.getItems().forEach(function(i) {
                    //Model Contains
                    var s = i.getTitle().toLowerCase().indexOf(Q) !== -1;
                    i.setVisible(s);
                });
                t._updateSelectAllCheckBoxState();
            }
        });
        return o;
    }
	});
});