   var units, venues;
   var enteredUnits = [];
   var enteredVenues = [];
   var timeSlots = [];
   arrDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
   arrTime = ["8AM-11AM", "11AM-2PM", "2PM-5PM", "8AM-1PM", "11AM-4PM"];
   utp = [], utt = [], ud5 = [], ud3 = [], uy4 = [], uy3 = [], uy2 = [], uy1 = [];
   arrFinal = [];
   arrTT = [];

   function init() {
       var setup = document.getElementById('setup');

       var h3 = "<h3>Setup semester variables below</h3>";
       var f2 = "<form><fieldset id=\"f2\"><legend>Unit Info</legend></fieldset></form>";
       var f3 = "<form><fieldset id=\"f3\"><legend>Venue Info</legend></fieldset></form>";

       setup.innerHTML = h3 + f2 + f3;
       units = document.getElementById('units').value;
       venues = document.getElementById('venues').value;
       setp();
   }

   function setp() {
       var form2 = document.getElementById('f2');
       var form3 = document.getElementById('f3');
       var br = "<br>";
       for (var i = 0; i < units; i++) {
           var input = "<input type=\"text\" id=\"unit" + (i + 1) + "\" placeholder=\"Unit " + (i + 1) + "\">";
           var types = "<select id=\"ut" + (i + 1) + "\"><option>Theory</option><option>Practical</option> </select>";
           var duration = "<select id=\"ud" + (i + 1) + "\"><option>3 Hours</option><option>5 Hours</option></select>";
           var year = "<select id=\"uy" + (i + 1) + "\"><option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option></select>";
           form2.innerHTML += input + types + duration + year + br;
       }
       for (var j = 0; j < venues; j++) {
           var vinput = "<input type=\"text\" id=\"venue" + (j + 1) + "\" placeholder=\"Venue" + (j + 1) + "\">";
           var vtypes = "<select id=\"vt" + (j + 1) + "\"><option>Class</option><option>Lab</option><option>Hall</option></select>";
           form3.innerHTML += vinput + vtypes + br;
       }
       setup.innerHTML += "<button onclick=\"generateTT()\">Generate Timetable</button>";
   }

   function generateTT() {
       enteredUnits = [];
       enteredVenues = [];
       utp = [], utt = [], ud5 = [], ud3 = [], uy4 = [], uy3 = [], uy2 = [], uy1 = [];
       arrFinal = [];
       timeSlots = [];
       arrTT = [];
       for (var k = 1; k <= units; k++) {
           var un = document.getElementById('unit' + k).value;
           var ut = document.getElementById('ut' + k).value;
           var ud = document.getElementById('ud' + k).value;
           var uy = document.getElementById('uy' + k).value;
           if (un == "") {
               alert("All fields need to be filled");
               document.getElementById('unit' + k).focus();
               break;
           } else {
               enteredUnits.push({
                   name: un,
                   type: ut,
                   duration: ud,
                   year: uy,
                   allocated: false
               });
           }
       }

       for (var l = 1; l <= venues; l++) {
           var vn = document.getElementById('venue' + l).value;
           var vt = document.getElementById('vt' + l).value;
           if (vn == "") {
               alert("All fields need to be filled");
               document.getElementById('venue' + l).focus();
               break;
           } else {
               enteredVenues.push({
                   name: vn,
                   type: vt
               });
           }
       }

       for (var e = 0; e < enteredUnits.length; e++) {
           if (enteredUnits[e].type == "Practical") {
               utp.push(e);
               if (enteredUnits[e].duration == "5 Hours") {
                   ud5.push(e);
                   if (enteredUnits[e].year == "4th Year") {
                       uy4.push(e);
                   } else if (enteredUnits[e].year == "3rd Year") {
                       uy3.push(e);
                   } else if (enteredUnits[e].year == "2nd Year") {
                       uy2.push(e);
                   } else if (enteredUnits[e].year == "1st Year") {
                       uy1.push(e);
                   }
               } else {
                   ud3.push(e);
                   if (enteredUnits[e].year == "4th Year") {
                       uy4.push(e);
                   } else if (enteredUnits[e].year == "3rd Year") {
                       uy3.push(e);
                   } else if (enteredUnits[e].year == "2nd Year") {
                       uy2.push(e);
                   } else if (enteredUnits[e].year == "1st Year") {
                       uy1.push(e);
                   }
               }
           } else if (enteredUnits[e].type == "Theory") {
               utt.push(e);
               ud3.push(e);
               if (enteredUnits[e].year == "4th Year") {
                   uy4.push(e);
               } else if (enteredUnits[e].year == "3rd Year") {
                   uy3.push(e);
               } else if (enteredUnits[e].year == "2nd Year") {
                   uy2.push(e);
               } else if (enteredUnits[e].year == "1st Year") {
                   uy1.push(e);
               }
           }
       }

       for (var a = 0; a < arrDays.length; a++) {
           if (a == 3) {
               for (var b = 0; b < venues; b++) {
                   for (var c = 0; c < 2; c++) {
                       if (c == 0) {
                           timeSlots.push({
                               day: arrDays[a],
                               venue: enteredVenues[b].name,
                               venueType: enteredVenues[b].type,
                               time: "8AM-11AM",
                               unit: null,
                               taken: false
                           });
                       } else {
                           timeSlots.push({
                               day: arrDays[a],
                               venue: enteredVenues[b].name,
                               venueType: enteredVenues[b].type,
                               time: "2PM-5PM",
                               unit: null,
                               taken: false
                           });
                       }
                   }
               }
           } else {
               for (var b = 0; b < venues; b++) {
                   for (var c = 0; c < arrTime.length; c++) {
                       timeSlots.push({
                           day: arrDays[a],
                           venue: enteredVenues[b].name,
                           venueType: enteredVenues[b].type,
                           time: arrTime[c],
                           unit: null,
                           taken: false
                       });
                   }
               }
           }
       }
       assignLoops();

       for (var u = 0; u < timeSlots.length; u++) {
           if (timeSlots[u].taken == true) {
               arrFinal.push(timeSlots[u]);
           } else {
               continue;
           }
       }

       for (var v = 0; v < arrFinal.length; v++) {
           if (arrFinal[v].unit != null) {
               arrTT.push(arrFinal[v]);
           } else {
               continue;
           }
       }

       for (var w = 0; w < arrTT.length; w++) {
           var tDay = arrTT[w].day,
               tUnit = arrTT[w].unit,
               tTime = arrTT[w].time,
               tVenue = arrTT[w].venue;
           var hUnit = document.getElementById(tDay + 'Unit');
           var hTime = document.getElementById(tDay + 'Time');
           var hVenue = document.getElementById(tDay + 'Venue');
           hUnit.innerHTML += "<li>" + tUnit + "</li>";
           hTime.innerHTML += "<li>" + tTime + "</li>";
           hVenue.innerHTML += "<li>" + tVenue + "</li>";
       }

       console.log(arrTT);
   }

   function assignLoops() {
       for (var m = 0; m < utp.length; m++) {
           assign(utp[m]);
       }
       for (var n = 0; n < utt.length; n++) {
           assign(utt[n]);
       }
       for (var o = 0; o < ud5.length; o++) {
           assign(ud5[o]);
       }
       for (var p = 0; p < ud3.length; p++) {
           assign(ud3[p]);
       }
       for (var q = 0; q < uy4.length; q++) {
           assign(uy4[q]);
       }
       for (var r = 0; r < uy3.length; r++) {
           assign(uy3[r]);
       }
       for (var s = 0; s < uy2.length; s++) {
           assign(uy2[s]);
       }
       for (var t = 0; t < uy1.length; t++) {
           assign(uy1[t]);
       }
   }

   function assign(x) {
       if (enteredUnits[x].type == "Practical" && enteredUnits[x].allocated == false) {
           var slot = Math.floor(Math.random() * timeSlots.length);
           if (timeSlots[slot].venueType == "Lab") {
               if (enteredUnits[x].duration == "5 Hours") {
                   if (timeSlots[slot].time == "8AM-1PM" || timeSlots[slot].time == "11AM-4PM") {
                       if (timeSlots[slot].taken == false) {
                           var elimDay = timeSlots[slot].day;
                           var elimVenue = timeSlots[slot].venue;
                           if (timeSlots[slot].time == "8AM-1PM") {
                               for (var v = 0; v < timeSlots.length; v++) {
                                   if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "8AM-11AM") {
                                       timeSlots[v].taken = true;
                                   } else if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "11AM-2PM") {
                                       timeSlots[v].taken = true;
                                   }
                               }
                           } else if (timeSlots[slot].time == "11AM-4PM") {
                               for (var v = 0; v < timeSlots.length; v++) {
                                   if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "11AM-2PM") {
                                       timeSlots[v].taken = true;
                                   } else if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "2PM-5PM") {
                                       timeSlots[v].taken = true;
                                   }
                               }
                           }
                           timeSlots[slot].unit = enteredUnits[x].name;
                           timeSlots[slot].taken = true;
                           enteredUnits[x].allocated = true;
                       } else {
                           assign(x);
                       }
                   } else {
                       assign(x);
                   }
               } else {
                   if (timeSlots[slot].time == "8AM-11AM" || timeSlots[slot].time == "11AM-2PM" || timeSlots[slot].time == "2PM-5PM") {
                       if (timeSlots[slot].taken == false) {
                           var elimDay = timeSlots[slot].day;
                           var elimVenue = timeSlots[slot].venue;
                           if (timeSlots[slot].time == "8AM-11AM") {
                               for (var v = 0; v < timeSlots.length; v++) {
                                   if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "8AM-1PM") {
                                       timeSlots[v].taken = true;
                                   }
                               }
                           }
                           if (timeSlots[slot].time == "11AM-2PM") {
                               for (var v = 0; v < timeSlots.length; v++) {
                                   if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "8AM-1PM") {
                                       timeSlots[v].taken = true;
                                   } else if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "11AM-4PM") {
                                       timeSlots[v].taken = true;
                                   }
                               }
                           }
                           if (timeSlots[slot].time == "2PM-5PM") {
                               for (var v = 0; v < timeSlots.length; v++) {
                                   if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "11AM-4PM") {
                                       timeSlots[v].taken = true;
                                   }
                               }
                           }
                           timeSlots[slot].unit = enteredUnits[x].name;
                           timeSlots[slot].taken = true;
                           enteredUnits[x].allocated = true;
                       } else {
                           assign(x);
                       }
                   } else {
                       assign(x);
                   }
               }
           } else {
               assign(x);
           }

       } else if (enteredUnits[x].type == "Theory" && enteredUnits[x].allocated == false) {
           var slot = Math.floor(Math.random() * timeSlots.length);
           if (timeSlots[slot].time == "8AM-11AM" || timeSlots[slot].time == "11AM-2PM" || timeSlots[slot].time == "2PM-5PM") {
               if (timeSlots[slot].taken == false) {
                   var elimDay = timeSlots[slot].day;
                   var elimVenue = timeSlots[slot].venue;
                   if (timeSlots[slot].time == "8AM-11AM") {
                       for (var v = 0; v < timeSlots.length; v++) {
                           if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "8AM-1PM") {
                               timeSlots[v].taken = true;
                           }
                       }
                   }
                   if (timeSlots[slot].time == "11AM-2PM") {
                       for (var v = 0; v < timeSlots.length; v++) {
                           if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "8AM-1PM") {
                               timeSlots[v].taken = true;
                           } else if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "11AM-4PM") {
                               timeSlots[v].taken = true;
                           }
                       }
                   }
                   if (timeSlots[slot].time == "2PM-5PM") {
                       for (var v = 0; v < timeSlots.length; v++) {
                           if (timeSlots[v].day == elimDay && timeSlots[v].venue == elimVenue && timeSlots[v].time == "11AM-4PM") {
                               timeSlots[v].taken = true;
                           }
                       }
                   }
                   timeSlots[slot].unit = enteredUnits[x].name;
                   timeSlots[slot].taken = true;
                   enteredUnits[x].allocated = true;
               } else {
                   assign(x);
               }
           } else {
               assign(x);
           }
       }
   }