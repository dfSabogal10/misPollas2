import { Meteor } from "meteor/meteor";
import {Users} from "../imports/api/Users"
import {Pollas} from "../imports/api/Pollas"

import {HTTP} from "meteor/http"

Meteor.startup(() => {
Meteor.methods({
  getGame:function(day,month,year,day2,month2,year2)
    {
      this.unblock();
      var apiUrl = "http://api.football-data.org/v1/competitions/440/fixtures?timeFrameStart="+year+"-"+month+"-"+day+"&timeFrameEnd="+year2+"-"+month2+"-"+day2
      return   Meteor.http.call("GET",apiUrl);
}
}
);
});
