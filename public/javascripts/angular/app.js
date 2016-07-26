var myapp = angular.module('myapp', ['ui.bootstrap',  'ui.router', 'ngCookies',"highcharts-ng"]);

myapp.controller('myctrl', function ($scope,$http,httpRequest) {
    $scope.predictors = []
    $scope.options = {
        type: 'line'
    }
    $scope.highchartsNG = {
      chart: {
          type: $scope.options.type
      },
      title: {
          text: 'Mark predictor'
      },
      // subtitle: {
      //     text: 'Source: WorldClimate.com'
      // },
      xAxis: {
          categories: ['Term3-2013','Term4-2013','Term1-2014','Term2-2014','Term3-2014','Term4-2014','Term1-2015','Term2-2015','Term3-2015','Term4-2015','Term1-2016','Term2-2016','Term3-2016','Term4-2016'],
          title: {
              text: 'Term'
          }
      },
      yAxis: {
          title: {
              text: 'Mark'
          },
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled: true
              },
              enableMouseTracking: false
          }
      },
      series: [{
          name: 'Actual',
          data: [80,85,60,92,80,70,87,66,75,91,79,85],
          type : 'line',
      },
      {
          name: 'Trend',
          data:  [80.0,78.51484230055658,78.60966625588736,79.19892916231004,78.63460440807553,78.90024724917686,79.02596894314573,79.06690428117477,78.79007600172352,78.80614490467505,79.05581016017935,78.91133745026089,78.90073335574718,78.87346989002434]
      },
      {
          name: 'Predited',
          data: [81,84,68,82,79,75,80,75,76,79,77,79,79,79]
      }],

        loading: false
    }

    $scope.addSeries = function () {
      $scope.data = [
              $scope.sub1,
              $scope.sub2,
              $scope.sub3,
              $scope.sub4,
              $scope.sub5,
              $scope.sub6,
              $scope.sub7,
              $scope.sub8,
              $scope.sub9,
              $scope.sub10,
              $scope.sub11,
              $scope.sub12,
            ]
      httpRequest.getPredictor($scope.data).success(function(data, status){
          $scope.predictors = data["data"];
          $scope.tendLine = data["trend_line"];
          $scope.highchartsNG.series = [{
              name: 'Actual',
              data: $scope.data
          },
          {
              name: 'Trend',
              data:  $scope.tendLine
          },
          {
              name: 'Predict',
              data:  $scope.predictors
          }]
      });



    }
});

myapp.directive('float', function(){
    return {
        require: '?ngModel',
        link: function(scope, ele, attr, ctrl){
          ctrl.$parsers.unshift(function(viewValue){
              return parseFloat(viewValue, 10);
          });
        }
    };
});

myapp.factory('httpRequest', function($http){
    var factory = {};
    factory.getPredictor = function(data){
        return $http.get('http://tude.agiratech.com/api/get_prediction_data', {type :'',params: {"data_set": JSON.stringify({data:data})}});
    };

    return factory;
});
