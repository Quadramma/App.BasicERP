angular.module("FrontEndHelperService", []).factory("$FEHelper", [
    "$timeout",
    function($timeout) {
        return {
            bindDtp: function(p) {
                //$item, selector, itemField defaultValue autoBindItem onChange
                //var date = p.$item[p.itemField];
                var date = p.defaultValue || null;
                if (!_.isNull(date)) {
                    console.info("[FEHelper][" + p.selector + " initial][" + date + "]");
                    var milli = moment(new Date(date).getTime());
                    console.info("[FEHelper][" + p.selector + " milli][" + milli + "]");
                    var formated = milli.format("DD/MM/YYYY");
                    console.info("[FEHelper][" + p.selector + " formated][" + formated + "]");
                }

                $.fn.datetimepicker.defaults = {
                    pickDate: true, //en/disables the date picker
                    pickTime: false, //en/disables the time picker
                    useMinutes: false, //en/disables the minutes picker
                    useSeconds: false, //en/disables the seconds picker
                    useCurrent: true, //when true, picker will set the value to the current date/time     
                    showToday: true, //shows the today indicator
                    language: 'es', //sets language locale
                };
                var dtp = $(p.selector).datetimepicker({});
                dtp.on("change", function() {
                    var value = $(p.selector + " input").val();
                    console.info("[FEHelper][dtp change][" + value + "]");
                    if (!_.isUndefined(p.onChange)) p.onChange(value);
                })
                if (!_.isNull(date)) {
                    $(p.selector).data("DateTimePicker").setDate(formated);
                }
                return dtp;
            },
            bindDropdown: function(p) {
                //SET CURRENT async
                p.$remoteScope.$on(p.waitFor || "ItemGet", function() {
                    if (p.autoBindItem) $(p.selector + " input").val(p.$remoteScope.item[p.fieldID]);
                    if (!_.isUndefined(p.onInit)) $(p.selector + " input").val(p.onInit());
                })
                p.apiService.query({
                    pageNumber: p.pageNumber,
                    itemsPerPage: p.itemsPerPage,
                }, function(res) {
                    p.onQuerySuccess(res);
                    $timeout(function() {
                        //INIT semantic dropdown
                        $(p.selector)
                            .dropdown({
                                onChange: function(val) { //SET ON CHANGE
                                    if (p.autoBindItem) p.$remoteScope.item[p.fieldID] = $(p.selector + " input").val();
                                    console.info("[FEHelper][bindDropdown][" + p.selector + ":change][" +
                                        val + "]");
                                    if (!_.isUndefined(p.onChange)) p.onChange(val);
                                }
                            });
                        console.info("[FEHelper][bindDropdown][" + p.selector + ":init]");

                    }, p.semanticUIInitDelay || 1000);
                }, p.onQueryFailure || null);
            }
        }
    }
]);