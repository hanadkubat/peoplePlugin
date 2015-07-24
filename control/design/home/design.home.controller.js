(function (angular) {
    angular.module('peoplePluginDesign')
        .controller('DesignHomeCtrl', ['$scope', 'Buildfire','TAG_NAMES', function ($scope, Buildfire, TAG_NAMES) {
            var DesignHome = this;
            var DesignHomeMaster;
            DesignHome.appId =134;
            DesignHome.changeListLayout = function (layoutName) {
                if (layoutName) {
                    //DesignHome.peopleInfo.design.$$hashKey="123445";
                    DesignHome.peopleInfo.design.listLayout = layoutName;
                    saveData(function (err, data) {
                            if (err) {
                                DesignHome.peopleInfo = angular.copy(DesignHomeMaster);
                            }
                            else {
                                if (data && data.obj) {
                                    DesignHomeMaster = data.obj;
                                }
                            }
                            $scope.$digest();
                        }
                    )
                    ;
                }
            };
            DesignHome.changeItemLayout = function (layoutName) {
                if (layoutName) {
                    DesignHome.peopleInfo.design.itemLayout = layoutName;
                    saveData(function (err, data) {
                        if (err) {
                            DesignHome.peopleInfo = angular.copy(DesignHomeMaster);
                        }
                        else {
                            if (data && data.obj) {
                                DesignHomeMaster = data.obj;
                            }
                        }
                        $scope.$digest();
                    });
                }
            };
            function saveData(callback) {
                callback = callback || function () {};
                Buildfire.datastore.save(DesignHome.peopleInfo, TAG_NAMES.PEOPLE_INFO, callback);
            }
            DesignHome.layouts = [
                {name: 'Layout1'},
                {name: 'Layout2'},
                {name: 'Layout3'},
                {name: 'Layout4'},
                {name: 'Layout5'},
                {name: 'Layout6'},
                {name: 'Layout7'},
                {name: 'Layout8'},
                {name: 'Layout9'},
                {name: 'Layout10'}
            ];
            DesignHome.peopleInfo = {
                design: {
                    listLayout: "",
                    itemLayout: "",
                    backgroundImage: ""
                },
                content: {
                    images: [
                        {
                            imageUrl: "",
                            links: ""
                        }
                    ],
                    description: ""
                }
            };

            function init() {

                Buildfire.datastore.get(TAG_NAMES.PEOPLE_INFO, function (err, data) {
                    if (err) {
                        return;
                    }
                    else {
                        if (data && data.data) {
                            DesignHome.peopleInfo = angular.copy(data.data);
                            DesignHomeMaster = angular.copy(data.data);
                        }
                    }
                });
            }

            init();
        }]);
})(window.angular);