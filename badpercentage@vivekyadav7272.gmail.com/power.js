const { GObject } = imports.gi;
const Lang = imports.lang;
const UPower = imports.gi.UPowerGlib;
const BaseIndicator = imports.ui.status.power.Indicator;

var Indicator = GObject.registerClass(class Indicator extends BaseIndicator {
   // Adapted from _getStatus of the parent.
   _getBatteryStatus() {
      log("Called _getBatteryStatus()...");
      let percentage = this._proxy.Percentage;

      if (percentage == 64)
         percentage = "ew";
      else
         percentage = percentage.toString();

      // Ensure percentage label is enabled regardless of gsettings
      this._percentageLabel.visible = true

      return percentage + "%";
   }

   _sync() {
      super._sync();
      this._percentageLabel.clutter_text.set_markup('<span size="smaller">' + this._getBatteryStatus() + '</span>');
   }
});

var BaTime = {
   imports: {
      power: {
         Indicator: Indicator
      }
   }
};
