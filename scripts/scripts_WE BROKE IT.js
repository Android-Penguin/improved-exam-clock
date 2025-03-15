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
    a.examTitle = "Two-Hour Exam", a.times.readingTime = 10, a.times.writingTime = 120, a.times.intervalTime = 15, a.mayLeaveStart = 4500, a.mayLeaveStop(), a.totalTime(), a.initIntervals(), a.writingTimer.setTime(60 * a.times.writingTime), a.readingTimer.setTime(60 * a.times.readingTime)
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
    a.examTitle = "Three-Hour Exam", a.times.readingTime = 10, a.times.writingTime = 180, a.times.intervalTime = 15, a.mayLeaveStart = 6300, a.mayLeaveStop(), a.totalTime(), a.initIntervals(), a.writingTimer.setTime(60 * a.times.writingTime), a.readingTimer.setTime(60 * a.times.readingTime)
}]), angular.module("examClockAngularApp").controller("ExamTimerCtrl", ["$scope", "$timeout", function(a, b) {
    a.stopLabel = "Stop", a.stopOn = !0, a.examTitle = "Two-Hour Exam", a.times = {}, a.times.readingTime = 10, a.times.writingTime = 120, a.times.intervalTime = 15, a.times.readingStartTime = new Date, a.writingStartTime = function() {
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
        for (var c = 1; b > 0;) b -= b > 15 ? a.times.intervalTime : 5, a.intervals[c] = {
            time: a.times.writingTime - b,
            label: b,
            passed: "",
            group: Math.floor(c / 4)
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
        clockFace: "HourlyCounter",
        countdown: !0,
        autoStart: !1,
        callbacks: {
            start: function() {
                a.showWritingStartTime = !0, 60 * a.times.writingTime - a.writingTimer.getTime() < 5 && "$apply" != a.$root.$$phase && "$digest" != a.$root.$$phase && a.$apply()
            },
            interval: function() {
                a.tick++, "$apply" != a.$root.$$phase && "$digest" != a.$root.$$phase && a.$apply()
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
    a.examTitle = "Custom Exam", a.times.readingTime = null != b.reading && isFinite(b.reading) && b.reading >= 0 ? Math.floor(b.reading) : 10, a.times.writingTime = null != b.writing && isFinite(b.writing) && b.writing >= 0 ? Math.floor(b.writing) : 120, a.times.intervalTime = 15, a.mayLeaveStop(), a.totalTime(), a.writingStartTime(), a.initIntervals(), a.writingTimer.setTime(60 * a.times.writingTime), a.readingTimer.setTime(60 * a.times.readingTime)
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
    a.put("views/custom-exam-start.html",
<div id="start" class="container" ng-controller="CustomExamStartCtrl">
    <div class="row">
        <div class="col-sm-7 col-md-5 text-left">
            <div class="row">
                <div class="col-sm-11 col-md-11 text-center"> <a href="#/">            <h3><strong>University of Auckland</strong><br /><strong>Exam Clock Home Page</strong></h3>          </a> </div> </div> </div>
        <div class="col-sm-2 col-md-4 text-center">
            <div class="row">
                <div class="btn-group" role="group"> <button id="stopButton" type="button" ng-confirm-click="Are you sure you want to stop the clock?" ng-confirm-on="stopOn" ng-click="stopTimer()" class="btn btn-default">{{stopLabel}}</button> <a href="#/custom-exam" ng-confirm-click="Are you sure you want to reset the exam clock?"
                        ng-confirm-on="true" ng-click="resetTimer()" class="btn btn-danger">Reset</a> </div> </div> </div>
        <div class="col-sm-3 col-md-3"> <img src="images/UoA_Logo_2015.png" class="img-responsive" /> </div> </div>
    <div class="row text-center">
        <editable-title exam-title="examTitle"></editable-title> </div>
    <div class="row" ng-show="finished">
        <div class="jumbotron">
            <h1>Exam Finished</h1>
            <h2>Please put your pen down and remain seated.</h2> </div> </div>
    <div class="row" ng-show="showGoodLuck">
        <div class="jumbotron">
            <h1>You May Start Now</h1>
            <h1>GOOD LUCK</h1> </div> </div>
    <div class="row" ng-hide="finished || showGoodLuck">
        <div class="col-sm-4 col-md-4">
            <div id="analog-clock-wrapper"> <canvas id="analog-clock-2" class="CoolClock:chunkySwiss:160"></canvas> </div> </div>
        <div class="col-sm-8 col-md-8 text-center">
            <div class="row">
                <div class="col-sm-4 col-md-4 col-lg-6 text-right">
                    <h3>Remaining Reading Time</h3> </div>
                <div class="col-sm-8 col-md-8 col-lg-6">
                    <div class="reading-timer"></div> </div> </div>
            <div class="row">
                <div class="col-sm-4 col-md-4 col-lg-6 text-right">
                    <h3>Remaining Writing Time</h3> </div>
                <div class="col-sm-10 col-md-10 col-lg-10">
                    <div class="writing-timer"></div> </div> </div>
            <div class="row text-left">
                <div class="col-sm-5 col-md-4 col-lg-3">
                    <ul class="intervals">
                        <li ng-repeat="i in intervals | filter: {group: 0} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>
                        <li ng-repeat="i in intervals | filter: {group: 1} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li> </ul> </div>
                <div class="col-sm-5 col-md-4 col-lg-3">
                    <ul class="intervals">
                        <li ng-repeat="i in intervals | filter: {group: 2} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>
                        <li ng-repeat="i in intervals | filter: {group: 3} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li> </ul> </div>
                {/* <!--<div id="mayLeaveDiv" class="col-sm-10 col-md-4 col-lg-6 text-center">          <div ng-if="(tick < mayLeaveStart) || (tick > mayLeaveStop())" class="alert alert-danger" role="alert"><h1>You may <strong>NOT</strong><br /> leave the room.</h1></div>          <div ng-if="(tick >= mayLeaveStart) && (tick <= mayLeaveStop())" class="alert alert-success" role="alert"><h1>You may leave the room.</h1></div>        </div>      </div>      --> */}
                <div class="row text-right">
                    <h3>READING TIME STARTS AT: {{times.readingStartTime | date: \'HH:mm:ss\'\}}</h3>

                    
                    <h3 ng-if="showWritingStartTime">WRITING TIME STARTS AT: {{writingStartTime() | date: \'HH:mm:ss\'}}</h3> '), a.put("views/custom-exam.html",'
                    </div> </div> </div></div>
    <div id="start" class="container">
        {/* <!-- AngularJS does not like short tags --> */}
        <exam-clock-header></exam-clock-header>
        <div class="row text-center">
            <h1>Custom Exam</h1>
        </div>
        <div class="row">
            <div class="col-md-5">
                <div id="analog-clock-wrapper"> <canvas id="analog-clock-1" class="CoolClock:chunkySwiss:160"></canvas> </div> </div>
            <div class="col-md-7 text-center">
                <div class="row start-container text-left">
                    <form class="form-horizontal" name="customTimeForm" ng-controller="CustomFormCtrl">
                        <div class="form-group form-group-lg"> <label for="readingTime" class="col-md-5 control-label">Reading Time<br /><span>Do not change</span></label>
                            <div class="col-md-5">
                                <div class="input-group" ng-class="((customTimeForm.$submitted || customTimeForm.readingTime.$touched) && customTimeForm.readingTime.$invalid)?\'has-error\':\'has-success\'"> <input type="number" min="0" max="1000" required class="form-control" id="readingTime" name="readingTime" ng-model="customForm.readingTime" placeholder="Enter minutes" aria-describedby="min-addonr" /> <span class="input-group-addon"
                                        id="min-addonr">min.</span> </div> </div> </div>
                        <div class="form-group form-group-lg"> <label for="writingTime" class="col-md-5 control-label">Writing Time<br />2 hours = 120 minutes<br />3 hours = 180 minutes</label>
                            <div class="col-md-5">
                                <div class="input-group" ng-class="((customTimeForm.$submitted || customTimeForm.writingTime.$touched) && customTimeForm.writingTime.$invalid)?\'has-error\':\'has-success\'"> <input type="number" min="0" max="1000" required class="form-control" id="writingTime" name="writingTime" ng-model="customForm.writingTime" placeholder="Enter minutes" aria-describedby="min-addonw" /> <span class="input-group-addon"
                                        id="min-addonw">min.</span> </div> </div> </div>
                        <div class="form-group form-group-lg">
                            <div class="col-md-offset-5 col-md-5"> <input type="submit" class="btn btn-lg btn-default" ng-click="customExamStart()" value="Start" /> </div> </div>
                            </form> </div>
                <h3>Press start at the commencement of Reading Time</h3> </div> </div></div>'), a.put("views/editable-title.html", '
    <form ng-show="editingTitle" ng-submit="examTitle = editForm.examTitleEdit" class="edit-form" name="editForm">
        <div class="form-group form-group-lg">
            <div class="input-group input-group-lg"> <input type="text" class="form-control" id="examTitle" ng-model="editForm.examTitleEdit" /> <span class="input-group-btn">        <button type="submit" class="btn btn-default" ng-click="hideEditForm()">          <span class="glyphicon glyphicon-ok"></span>
                </button> <button type="button" class="btn btn-default" ng-click="hideEditForm()">          <span class="glyphicon glyphicon-remove"></span>        </button> </span> </div> </div></form>
    <h1 title="Click to Edit Exam Title"
        class="exam-title" ng-hide="editingTitle" ng-click="showEditForm()">{{examTitle}}</h1>'), a.put("views/exam-clock-header.html", '
    <div class="row">
        <div class="col-md-5 text-left">
            <div class="row">
                <div class="col-md-11 text-center"> <a href="#/">          <h3><strong>University of Auckland</strong><br /><strong>Exam Clock Home Page</strong></h3>        </a> </div> </div> </div>
        <div class="col-md-4"></div>
        <div class="col-md-3"> <img src="images/UoA_Logo_2015.png" class="img-responsive" /> </div></div>'), a.put("views/main.html", '
    <div id="start" class="container">
        <div class="row">
            <div class="col-md-6 text-left">
                <div class="row">
                    <div class="col-md-11 text-center">
                        <h3><strong>University of Auckland</strong><br /><strong>Exam Clock Home Page</strong></h3> </div> </div> </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-4"></div>
                    <div class="col-md-8"> <img src="images/UoA_Logo_2015.png" class="img-responsive" /> </div> </div> </div> </div>
        <div class="row text-center">
            <h1>Welcome to</h1>
            <h1>The University of Auckland<br />Examination Clock</h1>
            <h2>Please select the appropriate exam period</h2>
            <div class="col-md-3"></div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-4"> <a class="btn btn-lg btn-default" href="#/two-hours-exam">            <i class="fa fa-clock-o fa-2x"></i><br />2 Hours</a> </div>
                    <div class="col-md-4"> <a class="btn btn-lg btn-default" href="#/three-hours-exam">            <i class="fa fa-clock-o fa-2x"></i><br />3 Hours</a> </div>
                    <div class="col-md-4"> <a class="btn btn-lg btn-default" href="#/custom-exam">            <i class="fa fa-clock-o fa-2x"></i><br />Custom</a> </div> </div> </div>
            <div class="col-md-3"></div> </div></div>'), a.put("views/three-hours-exam-start.html", '
    <div id="start" class="container" ng-controller="ThreeHoursExamStartCtrl">
        <div class="row">
            <div class="col-sm-7 col-md-5 text-left">
                <div class="row">
                    <div class="col-sm-11 col-md-11 text-center"> <a href="#/">            <h3><strong>University of Auckland</strong><br /><strong>Exam Clock Home Page</strong></h3>          </a> </div> </div> </div>
            <div class="col-sm-2 col-md-4 text-center">
                <div class="row">
                    <div class="btn-group" role="group"> <button id="stopButton" type="button" ng-confirm-click="Are you sure you want to stop the clock?" ng-confirm-on="stopOn" ng-click="stopTimer()" class="btn btn-default">{{stopLabel}}</button> <a href="#/three-hours-exam" ng-confirm-click="Are you sure you want to reset the exam clock?"
                            ng-confirm-on="true" ng-click="resetTimer()" class="btn btn-danger">Reset</a> </div> </div> </div>
            <div class="col-sm-3 col-md-3"> <img src="images/UoA_Logo_2015.png" class="img-responsive" /> </div> </div>
        <div class="row text-center">
            <editable-title exam-title="examTitle"></editable-title> </div>
        <div class="row" ng-show="finished">
            <div class="jumbotron">
                <h1>Exam Finished</h1>
                <h2>Please put your pen down and remain seated.</h2> </div> </div>
        <div class="row" ng-show="showGoodLuck">
            <div class="jumbotron">
                <h1>You May Start Now</h1>
                <h1>GOOD LUCK</h1> </div> </div>
        <div class="row" ng-hide="finished || showGoodLuck">
            <div class="col-sm-4 col-md-4">
                <div id="analog-clock-wrapper"> <canvas id="analog-clock-2" class="CoolClock:chunkySwiss:160"></canvas> </div> </div>
            <div class="col-sm-8 col-md-8 text-center">
                <div class="row">
                    <div class="col-sm-4 col-md-4 col-lg-6 text-right">
                        <h3>Remaining Reading Time</h3> </div>
                    <div class="col-sm-8 col-md-8 col-lg-6">
                        <div class="reading-timer"></div> </div> </div>
                <div class="row">
                    <div class="col-sm-4 col-md-4 col-lg-6 text-right">
                        <h3>Remaining Writing Time</h3> </div>
                    <div class="col-sm-10 col-md-10 col-lg-10">
                        <div class="writing-timer"></div> </div> </div>
                <div class="row text-left">
                    <div class="col-sm-5 col-md-4 col-lg-3">
                        <ul class="intervals">
                            <li ng-repeat="i in intervals | filter: {group: 0} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>
                            <li ng-repeat="i in intervals | filter: {group: 1} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li> </ul> </div>
                    <div class="col-sm-5 col-md-4 col-lg-3">
                        <ul class="intervals">
                            <li ng-repeat="i in intervals | filter: {group: 2} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>
                            <li ng-repeat="i in intervals | filter: {group: 3} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li> </ul> </div>
                    <div id="mayLeaveDiv" class="col-sm-10 col-md-4 col-lg-6 text-center">
                        <div ng-if="(tick < mayLeaveStart) || (tick > mayLeaveStop())" class="alert alert-danger" role="alert">
                            <h1>You may <strong>NOT</strong><br /> leave the room.</h1>
                        </div>
                        <div ng-if="(tick >= mayLeaveStart) && (tick <= mayLeaveStop())" class="alert alert-success" role="alert">
                            <h1>You may leave the room.</h1>
                        </div> </div> </div>
                <div class="row text-right">
                    <h3>READING TIME STARTS AT: {{times.readingStartTime | date: \'HH:mm:ss\'}}</h3>
                    <h3 ng-if="showWritingStartTime">WRITING TIME STARTS AT: {{writingStartTime() | date: \'HH:mm:ss\'}}</h3> '), a.put("views/three-hours-exam.html", '
                    </div> </div> </div></div>
    <div id="start" class="container">
        {/* <!-- AngularJS does not like short tags --> */}
        <exam-clock-header></exam-clock-header>
        <div class="row text-center">
            <h1>Three-Hour Exam</h1> </div>
        <div class="row">
            <div class="col-md-5">
                <div id="analog-clock-wrapper"> <canvas id="analog-clock-1" class="CoolClock:chunkySwiss:160"></canvas> </div> </div>
            <div class="col-md-7 text-center">
                <p class="start-container"><a class="btn btn-lg btn-default btn-start" href="#/three-hours-exam-start">Start</a></p>
                <h3>Press start at the commencement of Reading Time</h3> </div> </div></div>'), a.put("views/two-hours-exam-start.html", '
    <div id="start" class="container" ng-controller="TwoHoursExamStartCtrl">
        <div class="row">
            <div class="col-sm-7 col-md-5 text-left">
                <div class="row">
                    <div class="col-sm-11 col-md-11 text-center"> <a href="#/">            <h3><strong>University of Auckland</strong><br /><strong>Exam Clock Home Page</strong></h3>          </a> </div> </div> </div>
            <div class="col-sm-2 col-md-4 text-center">
                <div class="row">
                    <div class="btn-group" role="group"> <button id="stopButton" type="button" ng-confirm-click="Are you sure you want to stop the clock?" ng-confirm-on="stopOn" ng-click="stopTimer()" class="btn btn-default">{{stopLabel}}</button> <a href="#/two-hours-exam" ng-confirm-click="Are you sure you want to reset the exam clock?"
                            ng-confirm-on="true" ng-click="resetTimer()" class="btn btn-danger">Reset</a> </div> </div> </div>
            <div class="col-sm-3 col-md-3"> <img src="images/UoA_Logo_2015.png" class="img-responsive" /> </div> </div>
        <div class="row text-center">
            <editable-title exam-title="examTitle"></editable-title> </div>
        <div class="row" ng-show="finished">
            <div class="jumbotron">
                <h1>Exam Finished</h1>
                <h2>Please put your pen down and remain seated.</h2> </div> </div>
        <div class="row" ng-show="showGoodLuck">
            <div class="jumbotron">
                <h1>You May Start Now</h1>
                <h1>GOOD LUCK</h1> </div> </div>
        <div class="row" ng-hide="finished || showGoodLuck">
            <div class="col-sm-4 col-md-4">
                <div id="analog-clock-wrapper"> <canvas id="analog-clock-2" class="CoolClock:chunkySwiss:160"></canvas> </div> </div>
            <div class="col-sm-8 col-md-8 text-center">
                <div class="row">
                    <div class="col-sm-4 col-md-4 col-lg-6 text-right">
                        <h3>Remaining Reading Time</h3> </div>
                    <div class="col-sm-8 col-md-8 col-lg-6">
                        <div class="reading-timer"></div> </div> </div>
                <div class="row">
                    <div class="col-sm-4 col-md-4 col-lg-6 text-right">
                        <h3>Remaining Writing Time</h3> </div>
                    <div class="col-sm-10 col-md-10 col-lg-10">
                        <div class="writing-timer"></div> </div> </div>
                <div class="row text-left">
                    <div class="col-sm-5 col-md-4 col-lg-3">
                        <ul class="intervals">
                            <li ng-repeat="i in intervals | filter: {group: 0} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li> </ul> </div>
                    <div class="col-sm-5 col-md-4 col-lg-3">
                        <ul class="intervals">
                            <li ng-repeat="i in intervals | filter: {group: 1} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li>
                            <li ng-repeat="i in intervals | filter: {group: 2} track by $index" ng-class="i.passed">{{i.label | hourtime}}</li> </ul> </div>
                    <div id="mayLeaveDiv" class="col-sm-10 col-md-4 col-lg-6 text-center">
                        <div ng-if="(tick < mayLeaveStart) || (tick > mayLeaveStop())" class="alert alert-danger" role="alert">
                            <h1>You may <strong>NOT</strong><br /> leave the room.</h1>
                        </div>
                        <div ng-if="(tick >= mayLeaveStart) && (tick <= mayLeaveStop())" class="alert alert-success" role="alert">
                            <h1>You may leave the room.</h1>
                        </div> </div> </div>
                <div class="row text-right">
                    {/* <h3>READING TIME STARTS AT: {{times.readingStartTime | date: \'HH:mm:ss\'}}</h3> */}
                    {/* <h3 ng-if="showWritingStartTime">WRITING TIME STARTS AT: {{writingStartTime() | date: \'HH:mm:ss\'}}</h3> '), a.put("views/two-hours-exam.html", ' */}
                    </div> </div> </div></div>
    <div id="start" class="container">
        {/* <!-- AngularJS does not like short tags --> */}
        <exam-clock-header></exam-clock-header>
        <div class="row text-center">
            <h1>Two-Hour Exam</h1> </div>
        <div class="row">
            <div class="col-md-5">
                <div id="analog-clock-wrapper"> <canvas id="analog-clock-1" class="CoolClock:chunkySwiss:160"></canvas> </div> </div>
            <div class="col-md-7 text-center">
                <p class="start-container"><a class="btn btn-lg btn-default btn-start" href="#/two-hours-exam-start">Start</a></p>
                <h3>Press start at the commencement of Reading Time</h3> </div> </div></div>')
}]);