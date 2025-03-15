let uncomfortableTime = 23;

"use strict";
angular.module("examClockAngularApp", ["ngAnimate", "ngCookies", "ngResource", "ngRoute", "ngSanitize", "ngTouch", "ui.bootstrap"]).config(["$routeProvider", function(a) {
    a.when("/", {
        templateUrl: "views/main.html",
        controller: "MainCtrl",
        controllerAs: "main"
    }).when("/two-hours-exam", {
        templateUrl: "views/two-hours-exam.html",
        controller: "TwoHoursExamCtrl",
        controllerAs: "two-hours-exam"
    }).when("/two-hours-exam-start", {
        templateUrl: "views/two-hours-exam-start.html",
        controller: "ExamTimerCtrl",
        controllerAs: "two-hours-exam-start"
    }).when("/three-hours-exam", {
        templateUrl: "views/three-hours-exam.html",
        controller: "ThreeHoursExamCtrl",
        controllerAs: "three-hours-exam"
    }).when("/three-hours-exam-start", {
        templateUrl: "views/three-hours-exam-start.html",
        controller: "ExamTimerCtrl",
        controllerAs: "three-hours-exam-start"
    }).when("/custom-exam", {
        templateUrl: "views/custom-exam.html",
        controller: "CustomExamCtrl",
        controllerAs: "custom-exam"
    }).when("/custom-exam-start", {
        templateUrl: "views/custom-exam-start.html",
        controller: "ExamTimerCtrl",
        controllerAs: "custom-exam-start"
    }).otherwise({
        redirectTo: "/"
    })
}]), angular.module("examClockAngularApp").controller("MainCtrl", function() {}), angular.module("examClockAngularApp").controller("TwoHoursExamCtrl", function() {
    window.CoolClock.findAndCreateClocks()
}), angular.module("examClockAngularApp").controller("TwoHoursExamStartCtrl", ["$scope", function(a) {
    a.examTitle = "Two-Hour Exam", a.times.readingTime = 10, a.times.writingTime = 120, a.times.intervalTime = uncomfortableTime, a.mayLeaveStart = 4500, a.mayLeaveStop(), a.totalTime(), a.initIntervals(), a.writingTimer.setTime(60 * a.times.writingTime), a.readingTimer.setTime(60 * a.times.readingTime)
}]), angular.module("examClockAngularApp").filter("hourtime", function() {
    return function(a) {
        return ("0" + Math.floor(a / 60)).slice(-2) + " : " + ("0" + a % 60).slice(-2)
    }
}), angular.module("examClockAngularApp").directive("ngConfirmClick", function() {
    return {
        template: "",
        priority: -1,
        restrict: "A",
        scope: {
            ngConfirmOn: "="
        },
        link: function(a, b, c) {
            b.bind("click", function(b) {
                var d = c.ngConfirmClick;
                a.ngConfirmOn && d && !confirm(d) && (b.stopImmediatePropagation(), b.preventDefault())
            })
        }
    }
}), angular.module("examClockAngularApp").controller("ThreeHoursExamCtrl", function() {
    window.CoolClock.findAndCreateClocks()
}), angular.module("examClockAngularApp").controller("ThreeHoursExamStartCtrl", ["$scope", function(a) {
    a.examTitle = "Three-Hour Exam", a.times.readingTime = 10, a.times.writingTime = 180, a.times.intervalTime = uncomfortableTime, a.mayLeaveStart = 6300, a.mayLeaveStop(), a.totalTime(), a.initIntervals(), a.writingTimer.setTime(60 * a.times.writingTime), a.readingTimer.setTime(60 * a.times.readingTime)
}]), angular.module("examClockAngularApp").controller("ExamTimerCtrl", ["$scope", "$timeout", function(a, b) {
    a.stopLabel = "Stop", a.stopOn = !0, a.examTitle = "Two-Hour Exam", a.times = {}, a.times.readingTime = 10, a.times.writingTime = 120, a.times.intervalTime = uncomfortableTime, a.times.readingStartTime = new Date, a.writingStartTime = function() {
        return new Date(a.times.readingStartTime.getTime() + 6e4 * a.times.readingTime)
    }, a.showWritingStartTime = !1, a.intervals = [], a.tick = 0, a.mayLeaveStart = 900, a.mayLeaveStop = function() {
        return 60 * (a.times.writingTime - 15)
    }, a.totalTime = function() {
        return a.times.readingTime + a.times.writingTime
    }, a.showGoodLuck = !1, a.readingFinished = !1, a.finished = !1, a.initIntervals = function() {
        a.intervals = [];
        var b = a.times.writingTime;
        a.intervals[0] = {
            time: 0,
            label: b,
            passed: "",
            group: 0
        };
        for (var c = 1; b > 0;) b -= b > 7 ? a.times.intervalTime : 1, a.intervals[c] = {
            time: a.times.writingTime - b,
            label: b,
            passed: "",
            group: Math.floor(c / 6)
        }, c++
    }, a.initIntervals(), a.$watch("tick", function(b) {
        angular.forEach(a.intervals, function(a) {
            a.passed = 60 * a.time < b ? "interval-pass" : ""
        })
    }), a.by_group = function() {
        var b = 0;
        return angular.forEach(a.intervals, function(a) {
            b += "" === a.passed ? 0 : 1
        }), Math.floor(b / 4)
    }, a.filterByGroup = function(b) {
        return b.group === a.by_group()
    }, FlipClock.List.prototype.createListItem = function(a, b) {
        return ['<li class="' + (a ? a : "") + '">', "<a>", '<div class="up">', '<div class="shadow"></div>', '<div class="inn">' + (b ? b : "") + "</div>", "</div>", '<div class="down">', '<div class="shadow"></div>', '<div class="inn">' + (b ? b : "") + "</div>", "</div>", "</a>", "</li>"].join("")
    }, a.writingTimer = angular.element(".writing-timer").FlipClock(60 * a.times.writingTime, {
        clockFace: "MinuteCounter",
        countdown: !0,
        autoStart: !1,
        callbacks: {
            start: function() {
                a.showWritingStartTime = !0, 60 * a.times.writingTime - a.writingTimer.getTime() < 5 && "$apply" != a.$root.$$phase && "$digest" != a.$root.$$phase && a.$apply()
            },
            interval: function() {
                a.tick++, "$apply" != a.$root.$$phase && "$digest" != a.$root.$$phase && a.$apply()
                console.log(a.writingTimer.getTime() - a.times.writingTime)
                // TODO PLACEHOLDER FOR FUNCTION
                timeStuff(a.times.writingTime*60, a.writingTimer.getTime() - a.times.writingTime);
            },
            stop: function() {
                0 == a.writingTimer.getTime() && (a.finished = !0, "$apply" != a.$root.$$phase && "$digest" != a.$root.$$phase && a.$apply())
            }
        }
    }), a.readingTimer = angular.element(".reading-timer").FlipClock(60 * a.times.readingTime, {
        clockFace: "MinuteCounter",
        countdown: !0,
        callbacks: {
            stop: function() {
                0 == a.readingTimer.getTime() && (a.readingFinished = !0, a.showGoodLuck = !0, a.writingTimer.start(), b(function() {
                    a.showGoodLuck = !1
                }, 5e3), "$apply" != a.$root.$$phase && "$digest" != a.$root.$$phase && a.$apply())
            }
        }
    }), a.stopTimer = function() {
        "Stop" === a.stopLabel ? (a.readingTimer.running ? a.readingTimer.stop() : a.writingTimer.stop(), a.stopOn = !1, a.stopLabel = "Continue") : (a.readingTimer.getTime() > 0 ? a.readingTimer.start() : a.writingTimer.start(), a.stopOn = !0, a.stopLabel = "Stop")
        // TODO ADD END CODE HERE


    }, a.resetTimer = function() {
        a.readingTimer.stop(), a.writingTimer.stop()
    }, angular.element(".reading-timer").removeClass("flip-clock-wrapper").addClass("flip-clock-small-wrapper"), angular.element(".writing-timer").parent().removeClass("col-sm-10").addClass("col-sm-8"), angular.element(".writing-timer").parent().removeClass("col-md-10").addClass("col-md-8"), angular.element(".writing-timer").parent().removeClass("col-lg-10").addClass("col-lg-6"), angular.element(".writing-timer").removeClass("flip-clock-wrapper").addClass("flip-clock-small-wrapper"), angular.element(".flip-clock-small-wrapper").find(".flip-clock-divider").removeClass("flip-clock-divider").addClass("flip-clock-small-divider"), angular.element(".flip-clock-small-wrapper").find(".flip-clock-dot").removeClass("flip-clock-dot").addClass("flip-clock-small-dot"), 720 == angular.element(".container").first().width() && (angular.element("#analog-clock-2").removeClass("CoolClock:chunkySwiss:160").addClass("CoolClock:chunkySwiss:120"), angular.element("#mayLeaveDiv").hide()), window.CoolClock.findAndCreateClocks()
}]), angular.module("examClockAngularApp").directive("editableTitle", function() {
    return {
        templateUrl: "views/editable-title.html",
        restrict: "E",
        scope: {
            examTitle: "="
        },
        link: function(a, b, c) {
            a.editingTitle = !1, a.editForm = {}, a.editForm.examTitleEdit = "", a.showEditForm = function() {
                a.editForm.examTitleEdit = a.examTitle, a.editingTitle = !0
            }, a.hideEditForm = function() {
                a.editingTitle = !1
            }, b.css("margin-top", "20px"), b.find("h1").css("cursor", "pointer")
        }
    }
}), angular.module("examClockAngularApp").controller("CustomExamCtrl", ["$scope", "$location", function(a, b) {
    window.CoolClock.findAndCreateClocks()
}]), angular.module("examClockAngularApp").directive("examClockHeader", function() {
    return {
        templateUrl: "views/exam-clock-header.html",
        restrict: "E",
        link: function(a, b, c) {
            a.today = new Date
        }
    }
}), angular.module("examClockAngularApp").controller("CustomExamStartCtrl", ["$scope", "$routeParams", function(a, b) {
    a.examTitle = "Custom Exam", a.times.readingTime = null != b.reading && isFinite(b.reading) && b.reading >= 0 ? Math.floor(b.reading) : 10, a.times.writingTime = null != b.writing && isFinite(b.writing) && b.writing >= 0 ? Math.floor(b.writing) : 120, a.times.intervalTime = uncomfortableTime, a.mayLeaveStop(), a.totalTime(), a.writingStartTime(), a.initIntervals(), a.writingTimer.setTime(60 * a.times.writingTime), a.readingTimer.setTime(60 * a.times.readingTime)
}]), angular.module("examClockAngularApp").controller("CustomFormCtrl", ["$scope", "$location", function(a, b) {
    a.customForm = {
        readingTime: 10,
        writingTime: 120
    }, a.customExamStart = function() {
        a.customTimeForm.$valid && b.path("/custom-exam-start").search({
            reading: a.customForm.readingTime,
            writing: a.customForm.writingTime
        })
    }
}]), angular.module("examClockAngularApp").run(["$templateCache", function(a) {
    a.put("views/custom-exam-start.html", '<div id="start" class="container" ng-controller="CustomExamStartCtrl">\n  <div class="row">\n    <div class="col-sm-7 col-md-5 text-left">\n      <div class="row">\n        <div class="col-sm-11 col-md-11 text-center">\n          <a href="#/">\n            <h3 id="top-title-text"><b>U</b><b>n</b><b>i</b><b>v</b><b>e</b><b>r</b><b>s</b><b>s</b><b>i</b><b>t</b><b>y</b> <b>o</b><b>f</b> <b>A</b><b>u</b><b>c</b><b>k</b><b>t</b><b>a</b><b>n</b><b>d</b><br><span id="smaller-title-text"><b>E</b><b>x</b><b>a</b><b>m</b> <b>C</b><b>o</b><b>c</b><b>k</b> <b>H</b><b>o</b><b>m</b><b>e</b> <b>P</b><b>a</b><b>g</b><b>e</b></span></h3>\n          </a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-2 col-md-4 text-center">\n      <div class="row">\n        <div class="btn-group" role="group">\n          <button id="stopButton" type="button" ng-confirm-click="Are you sure you want to stop the clock?" ng-confirm-on="stopOn" ng-click="stopTimer()" class="btn btn-default">{{stopLabel}}</button>\n          <a href="#/custom-exam" ng-confirm-click="Are you sure you want to reset the exam clock?" ng-confirm-on="true" ng-click="resetTimer()" class="btn btn-danger">Reset</a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-3 col-md-3">\n      <img src="images/UoA_Logo_2015.png" class="img-responsive">\n    </div>\n  </div>\n\n  <div class="row text-center">\n    <editable-title exam-title="examTitle"></editable-title>\n  </div>\n\n  <div class="row" ng-show="finished">\n    <div class="jumbotron">\n      <h1>Exam Finished</h1>\n      <h2>Please put your pen down and remain seated.</h2>\n    </div>\n  </div>\n  <div class="row" ng-show="showGoodLuck">\n    <div class="jumbotron">\n      <h1>You May Start Now</h1>\n      <h1>GOOD LUCK</h1>\n    </div>\n  </div>\n\n  <div class="row" ng-hide="finished || showGoodLuck">\n    <div class="col-sm-4 col-md-4">\n      <div id="analog-clock-wrapper">\n        <canvas id="analog-clock-2" class="CoolClock:chunkySwiss:160"></canvas>\n      </div>\n    </div>\n\n    <div class="col-sm-8 col-md-8 text-center">\n      <div class="row">\n        <div class="col-sm-4 col-md-4 col-lg-6 text-right">\n          <h3>Remaining Reading Time</h3>\n        </div>\n        <div class="col-sm-8 col-md-8 col-lg-6">\n          <div class="reading-timer"></div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-sm-4 col-md-4 col-lg-6 text-right">\n          <h3>Remaining Writing Time</h3>\n        </div>\n        <div class="col-sm-10 col-md-10 col-lg-10">\n          <div class="writing-timer"></div>\n        </div>\n      </div>\n      <div class="row text-left">\n        <div class="col-sm-5 col-md-4 col-lg-3">\n          <ul class="intervals">\n            <li ng-repeat="i in intervals | filter: {group: 0} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n            <li ng-repeat="i in intervals | filter: {group: 1} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n          </ul>\n        </div>\n        <div class="col-sm-5 col-md-4 col-lg-3">\n          <ul class="intervals">\n            <li ng-repeat="i in intervals | filter: {group: 2} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n            <li ng-repeat="i in intervals | filter: {group: 3} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n          </ul>\n        </div>\n        <!--<div id="mayLeaveDiv" class="col-sm-10 col-md-4 col-lg-6 text-center">\n          <div ng-if="(tick < mayLeaveStart) || (tick > mayLeaveStop())" class="alert alert-danger" role="alert"><h1>You may <strong>NOT</strong><br> leave the room.</h1></div>\n          <div ng-if="(tick >= mayLeaveStart) && (tick <= mayLeaveStop())" class="alert alert-success" role="alert"><h1>You may leave the room.</h1></div>\n        </div>\n      </div>\n      --><div class="row text-right">\n        <h3>READING TIME STARTS AT: {{times.readingStartTime | date: \'HH:mm:ss\'}}</h3>\n        <h3 ng-if="showWritingStartTime">WRITING TIME STARTS AT: {{writingStartTime() | date: \'HH:mm:ss\'}}</h3>\n      </div>\n    </div>\n  </div>\n</div>'), a.put("views/custom-exam.html", '<div id="start" class="container">\n  <!-- AngularJS does not like short tags -->\n  <exam-clock-header></exam-clock-header>\n\n  <div class="row text-center">\n    <h1>Custom Exam</h1>\n  </div>\n\n  <div class="row">\n    <div class="col-md-5">\n      <div id="analog-clock-wrapper">\n        <canvas id="analog-clock-1" class="CoolClock:chunkySwiss:160"></canvas>\n      </div>\n    </div>\n\n    <div class="col-md-7 text-center">\n      <div class="row start-container text-left">\n        <form class="form-horizontal" name="customTimeForm" ng-controller="CustomFormCtrl">\n          <div class="form-group form-group-lg">\n            <label for="readingTime" class="col-md-5 control-label">Reading Time<br><span>Do not change</span></label>\n            <div class="col-md-5">\n              <div class="input-group" ng-class="((customTimeForm.$submitted || customTimeForm.readingTime.$touched) && customTimeForm.readingTime.$invalid)?\'has-error\':\'has-success\'">\n                <input type="number" min="0" max="1000" required class="form-control" id="readingTime" name="readingTime" ng-model="customForm.readingTime" placeholder="Enter minutes" aria-describedby="min-addonr">\n                <span class="input-group-addon" id="min-addonr">min.</span>\n              </div>\n            </div>\n          </div>\n          <div class="form-group form-group-lg">\n            <label for="writingTime" class="col-md-5 control-label">Writing Time<br>2 hours = 120 minutes<br>3 hours = 180 minutes</label>\n            <div class="col-md-5">\n              <div class="input-group" ng-class="((customTimeForm.$submitted || customTimeForm.writingTime.$touched) && customTimeForm.writingTime.$invalid)?\'has-error\':\'has-success\'">\n                <input type="number" min="0" max="1000" required class="form-control" id="writingTime" name="writingTime" ng-model="customForm.writingTime" placeholder="Enter minutes" aria-describedby="min-addonw">\n                <span class="input-group-addon" id="min-addonw">min.</span>\n              </div>\n            </div>\n          </div>\n          <div class="form-group form-group-lg">\n            <div class="col-md-offset-5 col-md-5">\n              <input type="submit" class="btn btn-lg btn-default" ng-click="customExamStart()" value="Start">\n            </div>\n          </div>\n        </form>\n      </div>\n      <h3>Press start at the commencement of Reading Time</h3>\n    </div>\n  </div>\n</div>'), a.put("views/editable-title.html", '<form ng-show="editingTitle" ng-submit="examTitle = editForm.examTitleEdit" class="edit-form" name="editForm">\n  <div class="form-group form-group-lg">\n    <div class="input-group input-group-lg">\n      <input type="text" class="form-control" id="examTitle" ng-model="editForm.examTitleEdit">\n      <span class="input-group-btn">\n        <button type="submit" class="btn btn-default" ng-click="hideEditForm()">\n          <span class="glyphicon glyphicon-ok"></span>\n        </button>\n        <button type="button" class="btn btn-default" ng-click="hideEditForm()">\n          <span class="glyphicon glyphicon-remove"></span>\n        </button>\n      </span>\n    </div>\n  </div>\n</form>\n<h1 title="Click to Edit Exam Title" class="exam-title" ng-hide="editingTitle" ng-click="showEditForm()">{{examTitle}}</h1>'), a.put("views/exam-clock-header.html", '<div class="row">\n  <div class="col-md-5 text-left">\n    <div class="row">\n      <div class="col-md-11 text-center">\n        <a href="#/">\n          <h3><strong>University of Auckland</strong><br><strong>Exam Clock Home Page</strong></h3>\n        </a>\n      </div>\n    </div>\n  </div>\n  <div class="col-md-4"></div>\n  <div class="col-md-3">\n    <img src="images/UoA_Logo_2015.png" class="img-responsive">\n  </div>\n</div>'), a.put("views/main.html", '<div id="start" class="container">\n  <div class="row">\n    <div class="col-md-6 text-left">\n      <div class="row">\n        <div class="col-md-11 text-center">\n          <h3><strong>University of Auckland</strong><br><strong>Exam Clock Home Page</strong></h3>\n        </div>\n      </div>\n    </div>\n    <div class="col-md-6">\n      <div class="row">\n        <div class="col-md-4"></div>\n        <div class="col-md-8">\n          <img src="images/UoA_Logo_2015.png" class="img-responsive">\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class="row text-center">\n    <h1>Welcome to</h1>\n    <h1>The University of Auckland<br>Examination Clock</h1>\n    <h2>Please select the appropriate exam period</h2>\n    <div class="col-md-3"></div>\n    <div class="col-md-6">\n      <div class="row">\n        <div class="col-md-4">\n          <a class="btn btn-lg btn-default" href="#/two-hours-exam">\n            <i class="fa fa-clock-o fa-2x"></i><br>2 Hours</a>\n        </div>\n        <div class="col-md-4">\n          <a class="btn btn-lg btn-default" href="#/three-hours-exam">\n            <i class="fa fa-clock-o fa-2x"></i><br>3 Hours</a>\n        </div>\n        <div class="col-md-4">\n          <a class="btn btn-lg btn-default" href="#/custom-exam">\n            <i class="fa fa-clock-o fa-2x"></i><br>Custom</a>\n        </div>\n      </div>\n    </div>\n    <div class="col-md-3"></div>\n  </div>\n</div>'), a.put("views/three-hours-exam-start.html", '<div id="start" class="container" ng-controller="ThreeHoursExamStartCtrl">\n  <div class="row">\n    <div class="col-sm-7 col-md-5 text-left">\n      <div class="row">\n        <div class="col-sm-11 col-md-11 text-center">\n          <a href="#/">\n            <h3><strong>University of Auckland</strong><br><strong>Exam Clock Home Page</strong></h3>\n          </a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-2 col-md-4 text-center">\n      <div class="row">\n        <div class="btn-group" role="group">\n          <button id="stopButton" type="button" ng-confirm-click="Are you sure you want to stop the clock?" ng-confirm-on="stopOn" ng-click="stopTimer()" class="btn btn-default">{{stopLabel}}</button>\n          <a href="#/three-hours-exam" ng-confirm-click="Are you sure you want to reset the exam clock?" ng-confirm-on="true" ng-click="resetTimer()" class="btn btn-danger">Reset</a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-3 col-md-3">\n      <img src="images/UoA_Logo_2015.png" class="img-responsive">\n    </div>\n  </div>\n\n  <div class="row text-center">\n    <editable-title exam-title="examTitle"></editable-title>\n  </div>\n\n  <div class="row" ng-show="finished">\n    <div class="jumbotron">\n      <h1>Exam Finished</h1>\n      <h2>Please put your pen down and remain seated.</h2>\n    </div>\n  </div>\n  <div class="row" ng-show="showGoodLuck">\n    <div class="jumbotron">\n      <h1>You May Start Now</h1>\n      <h1>GOOD LUCK</h1>\n    </div>\n  </div>\n\n  <div class="row" ng-hide="finished || showGoodLuck">\n    <div class="col-sm-4 col-md-4">\n      <div id="analog-clock-wrapper">\n        <canvas id="analog-clock-2" class="CoolClock:chunkySwiss:160"></canvas>\n      </div>\n    </div>\n\n    <div class="col-sm-8 col-md-8 text-center">\n      <div class="row">\n        <div class="col-sm-4 col-md-4 col-lg-6 text-right">\n          <h3>Remaining Reading Time</h3>\n        </div>\n        <div class="col-sm-8 col-md-8 col-lg-6">\n          <div class="reading-timer"></div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-sm-4 col-md-4 col-lg-6 text-right">\n          <h3>Remaining Writing Time</h3>\n        </div>\n        <div class="col-sm-10 col-md-10 col-lg-10">\n          <div class="writing-timer"></div>\n        </div>\n      </div>\n      <div class="row text-left">\n        <div class="col-sm-5 col-md-4 col-lg-3">\n          <ul class="intervals">\n            <li ng-repeat="i in intervals | filter: {group: 0} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n            <li ng-repeat="i in intervals | filter: {group: 1} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n          </ul>\n        </div>\n        <div class="col-sm-5 col-md-4 col-lg-3">\n          <ul class="intervals">\n            <li ng-repeat="i in intervals | filter: {group: 2} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n            <li ng-repeat="i in intervals | filter: {group: 3} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n          </ul>\n        </div>\n        <div id="mayLeaveDiv" class="col-sm-10 col-md-4 col-lg-6 text-center">\n          <div ng-if="(tick < mayLeaveStart) || (tick > mayLeaveStop())" class="alert alert-danger" role="alert"><h1>You may <strong>NOT</strong><br> leave the room.</h1></div>\n          <div ng-if="(tick >= mayLeaveStart) && (tick <= mayLeaveStop())" class="alert alert-success" role="alert"><h1>You may leave the room.</h1></div>\n        </div>\n      </div>\n      <div class="row text-right">\n        <h3>READING TIME STARTS AT: {{times.readingStartTime | date: \'HH:mm:ss\'}}</h3>\n        <h3 ng-if="showWritingStartTime">WRITING TIME STARTS AT: {{writingStartTime() | date: \'HH:mm:ss\'}}</h3>\n      </div>\n    </div>\n  </div>\n</div>'), a.put("views/three-hours-exam.html", '<div id="start" class="container">\n  <!-- AngularJS does not like short tags -->\n  <exam-clock-header></exam-clock-header>\n\n  <div class="row text-center">\n    <h1>Three-Hour Exam</h1>\n  </div>\n\n  <div class="row">\n    <div class="col-md-5">\n      <div id="analog-clock-wrapper">\n        <canvas id="analog-clock-1" class="CoolClock:chunkySwiss:160"></canvas>\n      </div>\n    </div>\n\n    <div class="col-md-7 text-center">\n      <p class="start-container"><a class="btn btn-lg btn-default btn-start" href="#/three-hours-exam-start">Start</a></p>\n      <h3>Press start at the commencement of Reading Time</h3>\n    </div>\n  </div>\n</div>'), a.put("views/two-hours-exam-start.html", '<div id="start" class="container" ng-controller="TwoHoursExamStartCtrl">\n  <div class="row">\n    <div class="col-sm-7 col-md-5 text-left">\n      <div class="row">\n        <div class="col-sm-11 col-md-11 text-center">\n          <a href="#/">\n            <h3><strong>University of Auckland</strong><br><strong>Exam Clock Home Page</strong></h3>\n          </a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-2 col-md-4 text-center">\n      <div class="row">\n        <div class="btn-group" role="group">\n          <button id="stopButton" type="button" ng-confirm-click="Are you sure you want to stop the clock?" ng-confirm-on="stopOn" ng-click="stopTimer()" class="btn btn-default">{{stopLabel}}</button>\n          <a href="#/two-hours-exam" ng-confirm-click="Are you sure you want to reset the exam clock?" ng-confirm-on="true" ng-click="resetTimer()" class="btn btn-danger">Reset</a>\n        </div>\n      </div>\n    </div>\n    <div class="col-sm-3 col-md-3">\n      <img src="images/UoA_Logo_2015.png" class="img-responsive">\n    </div>\n  </div>\n\n  <div class="row text-center">\n    <editable-title exam-title="examTitle"></editable-title>\n  </div>\n\n  <div class="row" ng-show="finished">\n    <div class="jumbotron">\n      <h1>Exam Finished</h1>\n      <h2>Please put your pen down and remain seated.</h2>\n    </div>\n  </div>\n  <div class="row" ng-show="showGoodLuck">\n    <div class="jumbotron">\n      <h1>You May Start Now</h1>\n      <h1>GOOD LUCK</h1>\n    </div>\n  </div>\n\n  <div class="row" ng-hide="finished || showGoodLuck">\n    <div class="col-sm-4 col-md-4">\n      <div id="analog-clock-wrapper">\n        <canvas id="analog-clock-2" class="CoolClock:chunkySwiss:160"></canvas>\n      </div>\n    </div>\n\n    <div class="col-sm-8 col-md-8 text-center">\n      <div class="row">\n        <div class="col-sm-4 col-md-4 col-lg-6 text-right">\n          <h3>Remaining Reading Time</h3>\n        </div>\n        <div class="col-sm-8 col-md-8 col-lg-6">\n          <div class="reading-timer"></div>\n        </div>\n      </div>\n      <div class="row">\n        <div class="col-sm-4 col-md-4 col-lg-6 text-right">\n          <h3>Remaining Writing Time</h3>\n        </div>\n        <div class="col-sm-10 col-md-10 col-lg-10">\n          <div class="writing-timer"></div>\n        </div>\n      </div>\n      <div class="row text-left">\n        <div class="col-sm-5 col-md-4 col-lg-3">\n          <ul class="intervals">\n            <li ng-repeat="i in intervals | filter: {group: 0} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n          </ul>\n        </div>\n        <div class="col-sm-5 col-md-4 col-lg-3">\n          <ul class="intervals">\n            <li ng-repeat="i in intervals | filter: {group: 1} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n            <li ng-repeat="i in intervals | filter: {group: 2} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>\n          </ul>\n        </div>\n        <div id="mayLeaveDiv" class="col-sm-10 col-md-4 col-lg-6 text-center">\n          <div ng-if="(tick < mayLeaveStart) || (tick > mayLeaveStop())" class="alert alert-danger" role="alert"><h1>You may <strong>NOT</strong><br> leave the room.</h1></div>\n          <div ng-if="(tick >= mayLeaveStart) && (tick <= mayLeaveStop())" class="alert alert-success" role="alert"><h1>You may leave the room.</h1></div>\n        </div>\n      </div>\n      <div class="row text-right">\n        <h3>READING TIME STARTS AT: {{times.readingStartTime | date: \'HH:mm:ss\'}}</h3>\n        <h3 ng-if="showWritingStartTime">WRITING TIME STARTS AT: {{writingStartTime() | date: \'HH:mm:ss\'}}</h3>\n      </div>\n    </div>\n  </div>\n</div>'), a.put("views/two-hours-exam.html", '<div id="start" class="container">\n  <!-- AngularJS does not like short tags -->\n  <exam-clock-header></exam-clock-header>\n\n  <div class="row text-center">\n    <h1>Two-Hour Exam</h1>\n  </div>\n\n  <div class="row">\n    <div class="col-md-5">\n      <div id="analog-clock-wrapper">\n        <canvas id="analog-clock-1" class="CoolClock:chunkySwiss:160"></canvas>\n      </div>\n    </div>\n\n    <div class="col-md-7 text-center">\n      <p class="start-container"><a class="btn btn-lg btn-default btn-start" href="#/two-hours-exam-start">Start</a></p>\n      <h3>Press start at the commencement of Reading Time</h3>\n    </div>\n  </div>\n</div>')
}]);


var r = document.querySelector(':root');
var fontSize = 40;

// # EVERYTHING FUNCTION
function timeStuff(tTotal, tRemaining) {
    // console.log("hi")
    // For a 7 hour timer, this starts at 7 * 60 * 60 = 25200
    
    

    fontSize = Math.floor(40 + 160*((tTotal-tRemaining)/tTotal));
    console.log(((tTotal - tRemaining) / tTotal))
    r.style.setProperty('--uoa-font-size', fontSize + "px");


    // Grow title font to 200px over total time
    // if (tRemaining % (tTotal / 160) == 0) {
    //     r.style.setProperty('--uoa-font-size', fontSize + "px");
    //     fontSize++;
    //     console.log("font size is now: ", fontSize);
    // }

}