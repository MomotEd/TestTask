var TestTaskApp = angular.module('Authentication', []);

TestTaskApp.controller('AuthenticationCtrl', function ($scope, $http) {
    succsessAuthentication = {
        "Auth": "Logged",
        "Theme": "Simple",
        "Language": "EN"
    };
    vrongPass = {
        "Auth": "Denied"
    };
    banned = {
        "Auth": "Banned",
        "Time": 300
    };
    $scope.dataLoading = false;
    $scope.showErrorMassage = false;
    $scope.buttonText = "Login ";
    $scope.Login = function () {
        $scope.dataLoading = true;
        data = {'Login': $scope.login, 'Password': $scope.password};
        $http.post('https://93.183.203.13:10443/login', data).success(function (data,status,headers,config) {
            console.log('Data '+data+' status '+status);
            if (data== succsessAuthentication){$location.path('logined.html');}
            else if(data==banned){}
            else if(data==vrongPass){
                $scope.showErrorMassage = true;
            }
        }).error(function (data,status,headers,config) {
            console.log('Data '+data+' status '+status);
            $scope.dataLoading = false;
        })

    }
 }
);

