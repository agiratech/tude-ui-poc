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
          text: 'Monthly Average Temperature'
      },
      subtitle: {
          text: 'Source: WorldClimate.com'
      },
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
          // data: [30,50,85,60,45,23,80,60,45,20,50,60],
          type : 'line',
      },

      {
          name: 'Predited',
          // data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
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
          console.log(data)
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
        return $http.get('http://localhost:3001/api/get_prediction_data', {type :'',params: {"data_set": JSON.stringify({data:data})}});
    };

    return factory;
});
