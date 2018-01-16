(function () {
    "use strict";

    angular
        .module("employeeApp", ["ngMaterial", "md.data.table", "ngMessages", "ui.router"])
        .config(function ($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state("home",
                {
                    url: "/home",
                    templateUrl: "Templates/home.html",
                    controller: "homeController"
                })
                .state("employee",
                {
                    url: "/employee",
                    templateUrl: "Templates/employee.html",
                    controller: "employeeController"
                })

            $urlRouterProvider.otherwise('/employee');

        })
        .controller("AppCtrl", appControl)
        .controller("homeController", function ($state) {
            this.message = "Sample Demo Application";
            this.reloadData = function () {
                $state.reload();
            }
        })
        .controller("employeeController", function ($state, $http) {

            $http({
                method: 'GET',
                url:
                'http://baas-bl-edu-kms-staging-v1.azurewebsites.net/api/edu/v1/Subject/FindAllSubject_FullDetail?subjectType=Activity'
            }).then(function (response) {
                console.log(response);
            });

            this.limitOptions = [5, 10, 15];

            this.query = {
                order: 'firstName',
                limit: 5,
                page: 1
            };


            if (localStorage.getItem('employeeList') !== null) {
                this.employeeList = JSON.parse(localStorage.getItem('employeeList'));
            } else {

                this.employeeList = {
                    "count": 9,
                    data: [
                        {
                            "firstName": "karan",
                            "lastName": "khatri",
                            "gender": "Male",
                            "email": "khatri.karankhatri.karan@gmail.com",
                            "dateofbirth": "12/09/1990"
                        },
                        {
                            "firstName": "Arjun",
                            "lastName": "Khatri",
                            "gender": "Male",
                            "email": "arjun@gmail.com",
                            "dateofbirth": "12/09/1991"
                        }]
                };

                localStorage.setItem('employeeList', JSON.stringify(this.employeeList));
            }

            this.EmpModel = {
                firstName: '',
                lastName: '',
                gender: '',
                email: '',
                dateofbirth: ''
            };

            this.AddEmployee = function () {
                if (this.EmpModel.firstName != "") {
                    var _emp = {
                        "firstName": this.EmpModel.firstName,
                        "lastName": this.EmpModel.lastName,
                        "gender": this.EmpModel.gender,
                        "email": this.EmpModel.email,
                        "dateofbirth": this.EmpModel.dateofbirth
                    };
                    this.employeeList.data.push(_emp);
                    localStorage.setItem('employeeList', JSON.stringify(this.employeeList));
                    $state.reload();
                }
            }

            this.deleteEmployee = function (email) {
                var empList = JSON.parse(localStorage.getItem('employeeList'));
                empList.data = empList.data.filter(
                    function (value) {
                        return value.email !== email;
                    });
                localStorage.setItem('employeeList', JSON.stringify(empList));
                $state.reload();
            }


        })
        .controller("courseController", function () {
            this.course = ["Asp.Net", "Angular js", "React Js"];
        })
        .controller("studentController", function () {
            var employee = [{
                name: "karan",
                age: 25,
                salary: 600000,
                like: 0,
                dislike: 0,
                dateofbirth: new Date("November 23, 1980")
            }, {
                name: "Shyam",
                age: 25,
                salary: 100000,
                like: 0,
                dislike: 0,
                dateofbirth: new Date("November 23, 1980")
            }, {
                name: "Jay",
                age: 25,
                salary: 640000,
                like: 0,
                dislike: 0,
                dateofbirth: new Date("November 23, 1980")
            }, {
                name: "Vimal",
                age: 25,
                salary: 680000,
                like: 0,
                dislike: 0,
                dateofbirth: new Date("November 23, 1980")
            }, {
                name: "Nayan",
                age: 25,
                salary: 680000,
                like: 0,
                dislike: 0,
                dateofbirth: new Date("November 23, 1980")
            }, {
                name: "Kinjal",
                age: 25,
                salary: 1200000,
                like: 0,
                dislike: 0,
                dateofbirth: new Date("November 23, 1980")
            }];

            this.incrementLike = function (technology) {
                technology.like++;
            }
            this.decrementLike = function (technology) {
                technology.dislike++;
            }
            this.rowlimit = 3;
            this.employees = employee;
            this.message = "karan";
        });

    function appControl() {

    }


})();