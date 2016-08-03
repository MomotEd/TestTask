var TestTaskApp = angular.module('Authentication', ['ngRoute']);

TestTaskApp.controller('AuthenticationCtrl', function ($scope, $http, $location) {
    
    succsessAuthentication = {"Auth": "Logged", "Theme": "Simple", "Language": "EN"};
    vrongPass = {"Auth": "Denied"};
    banned = {"Auth": "Banned", "Time": 300};
    HOTPRequired = {"Auth": "HOTP required"};
    
    $scope.dataLoading = false;
    $scope.showErrorMassage = false;
    $scope.HOTPrequired = false;
    $scope.buttonText = "Login ";
    
    $scope.Login = function () {
        $scope.dataLoading = true;
        data = {'Login': $scope.login, 'Password': $scope.password, 'HOTP': $scope.HOTP};
        $http.post('https://93.183.203.13:10443/login', data).success(function (data,status,headers,config) {

            if (data==succsessAuthentication){
                $location.path('logined.html');
            }
            else if(data==banned){
                $scope.showErrorMassage = "too many attempts to enter";
            }
            else if(data==vrongPass){
                $scope.showErrorMassage = true;
                $scope.showErrorMassage = "wrong login or password";
            }
            else if(data==HOTPRequired){
                $scope.HOTPrequired = true;
                $scope.buttonText = "Continue ";
            }

        }).error(function (data,status,headers,config) {
            console.log('Data '+data+' status '+status + 'error');
            $scope.dataLoading = false;
        })
    }
 }
);

