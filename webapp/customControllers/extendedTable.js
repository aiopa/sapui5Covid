sap.ui.define([
	"sap/m/Table"
], function (GenericTag) {
	"use strict";

	return sap.m.Table.extend('covid.visual.lib.extendedTable', {
		metadata: {
			events: {
				columnPress: {}
			}
		},
		renderer: function (oRm, oControl) {
			sap.m.TableRenderer.render(oRm, oControl);
		},
		onAfterRendering: function () {
			var that = this;

			function colClick(idx, col) {
				col.css('cursor', 'pointer');
				col.children().each(function () {
					$(this).css('cursor', 'pointer');
				});
				col.click(function () {
					that.fireColumnPress({
						'columnIndex': idx
					});
				});
			}
			sap.m.Table.prototype.onAfterRendering.apply(this, arguments);
			var count = 0;
			this.$().find('th.sapMListTblCell').each(function () {
				colClick(count++, $(this));
			});
		}

	});
});