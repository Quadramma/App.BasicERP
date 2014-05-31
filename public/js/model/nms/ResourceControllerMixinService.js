//Custom Controller 
//Follow methods will be injected ->

//select(item)  -> save the item in controller.itemFieldName
//  Ej: $scope.item = item;

//create() --> create a new resource in controller.itemFieldName
//	Ej: $scope.item = new Tema();

//query() -> query api and store array in controller.itemsFieldName

//delete --> deletes current item (see onDeleteSuccess and onDeleteError callbacks)

//save --> save or update current item (see onSaveSuccess and onSaveError callbacks)

//$Resource (defaults will be used)->
/*
{ 'get':    {method:'GET'},
    'save':   {method:'POST'},
    'query':  {method:'GET', isArray:true},
    'remove': {method:'DELETE'},
    'delete': {method:'DELETE'} };
*/

var rcmService = angular.module('ResourceControllerMixinService', [])
    .factory('RCM', [

        function() {
            var defaultFields = {};
            return {
                setDefaultFields: function(fields) {
                    defaultFields = fields;
                },
                mixin: function(settings) {
                    //required
                    var idField = settings.idField;
                    var itemFieldName = settings.itemFieldName;
                    var itemsFieldName = settings.itemsFieldName;
                    var $ctrlScope = settings.$ctrlScope;
                    var $res = settings.$res;
                    //optional
                    var onCreateHandler = settings["onCreateHandler"] || undefined;
                    var onSelectHandler = settings["onSelectHandler"] || undefined;
                    var onQuerySuccess = settings["onQuerySuccess"] || undefined;
                    var onDeleteSuccess = settings["onDeleteSuccess"] || null;
                    var onDeleteError = settings["onDeleteError"] || null;
                    var onSaveSuccess = settings["onSaveSuccess"] || null;
                    var onSaveError = settings["onSaveError"] || null;
                    var resourceApiIdFieldName = settings.resourceApiIdFieldName;
                    var callQueryAfterMixin = settings.callQueryAfterMixin || false;
                    defaultFields = settings["createDefaults"] || {};
                    var debug = settings.debug;

                    $ctrlScope.select = function(item) {
                        //$ctrlScope[itemFieldName] = item;

                        $res.get({
                            id: item[idField]
                        }, {}, function(itemFromDB) {
                            if (debug) console.log("RCM Get from db:");
                            if (debug) console.log(itemFromDB);
                            $ctrlScope[itemFieldName] = itemFromDB[0];
                            if (!_.isUndefined(onSelectHandler)) {
                                onSelectHandler(itemFromDB[0]);
                            }
                            if (debug) console.log("RCM Selected:" + $ctrlScope[itemFieldName][idField]);
                        })



                    };
                    $ctrlScope.create = function() {
                        $ctrlScope[itemFieldName] = new $res();

                        for (var key in defaultFields) {
                            $ctrlScope[itemFieldName][key] = defaultFields[key];
                            if (debug) console.log("RCM Create ->injecting default " + key + " " + defaultFields[key]);
                        }
                        if (!_.isUndefined(onCreateHandler)) {
                            onCreateHandler();
                        }

                        if (debug) console.log("RCM Create");
                    }
                    $ctrlScope.query = function() {
                        $res.query(function(data) {
                            $ctrlScope[itemsFieldName] = data
                            if (debug) console.log("RCM Query OK [" + data.length + "]");
                            if (!_.isUndefined(onQuerySuccess)) {
                                onQuerySuccess(data);
                            }
                        });

                        if (debug) console.log("RCM Query");
                    }

                    $ctrlScope.delete = function() {
                        var params = {};
                        params[resourceApiIdFieldName] = $ctrlScope[itemFieldName][idField];
                        if (debug) console.log("RCM Delete:" + $ctrlScope[itemFieldName][idField]);
                        $res.delete(params, $ctrlScope[itemFieldName], function(data) {
                            if (debug) console.log("RCM Delete Success");
                            if (!_.isUndefined(onDeleteSuccess)) {
                                onDeleteSuccess(data);
                            }
                        }, function() {
                            if (debug) console.log("RCM Delete Error");
                            if (_.isFunction(onDeleteError)) {
                                onDeleteError();
                            }
                        });
                    }

                    /*
					$ctrlScope.save = function() {
						if (_.isUndefined($ctrlScope[itemFieldName]) || _.isNull($ctrlScope[itemFieldName])) {
							if (debug) console.log("RCM Save item null or undefined");
							return;
						}
						var bNewItem = _.isUndefined($ctrlScope[itemFieldName][idField]) || _.isNull($ctrlScope[itemFieldName][idField]);
						if (bNewItem) {
							if (debug) console.log("RCM Save new");
							$res.save({}, $ctrlScope[itemFieldName], function(data) {
								if (debug) console.log("RCM Save Success");
								if (_.isFunction(onSaveSuccess)) {
									onSaveSuccess(data);
								}
							}, function() {
								if (debug) console.log("RCM save Error");
								if (_.isFunction(onSaveError)) {
									onSaveError();
								}
							});
						} else {
							if (debug) console.log("RCM Update" + $ctrlScope[itemFieldName][idField]);
							$res.update({}, $ctrlScope[itemFieldName], function(data) {
								if (debug) console.log("RCM Update Success");
								if (_.isFunction(onSaveSuccess)) {
									onSaveSuccess(data);
								}
							}, function() {
								if (debug) console.log("RCM Update Error");
								if (_.isFunction(onSaveError)) {
									onSaveError();
								}
							});
						}
					}
*/
                    //
                    if (callQueryAfterMixin) {
                        $ctrlScope.query();
                    }


                }
            }
        }
    ]);