var TestTaskApp = angular.module('Authentication', []);

/*Application controller*/
TestTaskApp.controller('AuthenticationCtrl', function ($scope, $http, $location) {
    /*set variables with all the options for a response from the server*/
    succsessAuthentication = {"Auth": "Logged", "Theme": "Simple", "Language": "EN"};
    vrongPass = {"Auth": "Denied"};
    banned = {"Auth": "Banned", "Time": 300};
    HOTPRequired = {"Auth": "HOTP required"};

    /*set default view options*/
    $scope.dataLoading = false;
    $scope.showErrorMassage = false;
    $scope.HOTPrequired = false;
    $scope.buttonText = "Login ";

    /*function that provides login servises*/
    $scope.Login = function () {
        /*set image to login button*/
        $scope.dataLoading = true;

        /*get user data and send request*/
        data = {'Login': $scope.login, 'Password': $scope.password, 'HOTP': $scope.HOTP};
        $http.post('https://93.183.203.13:10443/login', data).success(function (data,status,headers,config) {
            /*trying to analyze data from server and login*/
            if (data==succsessAuthentication){
                $location.path('logined.html');
            }
            else if(data==banned){
                $scope.dataLoading = false;
                $scope.showErrorMassage = "too many attempts to enter";
            }
            else if(data==vrongPass){
                $scope.dataLoading = false;
                $scope.showErrorMassage = true;
                $scope.showErrorMassage = "wrong login or password";
            }
            else if(data==HOTPRequired){
                $scope.dataLoading = false;
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

