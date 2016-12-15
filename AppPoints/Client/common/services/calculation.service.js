(function () {
    angular.module('pointApp')
        .service('calcService', 
        function () {

            var calService = {
                errorMsg: []
            }

            var compare = function (a, b) {

                if (a.x !== b.x) return false;
                if (a.y !== b.y) return false;
                return true;
            }


           var checkForNegativeExtremes = function (slope) {
                if (!isFinite(slope) || slope === -0.0) {
                    slope = Math.abs(slope);
                }
                return slope;
            }

            Array.prototype.contains = function (obj) {
                var i = this.length;
                while (i--) {
                    if (
                        (this[i].a.x === obj.a.x && this[i].a.y === obj.a.y &&
                            this[i].b.x === obj.b.x && this[i].b.y === obj.b.y) ||
                        (this[i].a.x === obj.b.x && this[i].a.y === obj.b.y &&
                            this[i].b.x === obj.a.x && this[i].b.y === obj.a.y)
                    ) {
                        return true;
                    }
                }
                return false;
            }


            calService.findSquares = function (data) {

                var all = data;
                var m = new Map();
                var squares = [];

                for (var d = 0; d < all.length - 1; d++) {
                    var a = all[d];
                    for (var j = d + 1; j < all.length; j++) {
                        var b = all[j];
                        if (compare(a, b)) continue;
                        var sl = checkForNegativeExtremes((a.y - b.y) / (a.x - b.x));
                        var set = m.get(sl);
                        if (set === null || set === undefined) {
                            m.set(sl, set = new Set());
                        }
                        set.add({
                            a,
                            b
                        });

                    }
                }

                var keys = Array.from(m.keys());
                //keys.sort();
                for (var k = 0; k < keys.length; k++) {

                    var slope = keys[k];

                    var lTmp = m.get(slope);
                    if (lTmp === undefined || lTmp.size <= 1) continue;
                    var slopePerpendicular = checkForNegativeExtremes(-1. / slope);

                    var perpendiculars = m.get(slopePerpendicular);
                    m.delete(slopePerpendicular);
                    if (perpendiculars == undefined || perpendiculars.size <= 1) continue;
                    var per = Array.from(perpendiculars);
                    var l = Array.from(lTmp);
                    for (var i = 0; i < l.length - 1; i++) {
                        var l1 = l[i];
                        for (var j = i + 1; j < l.length; j++) {
                            var l2 = l[j];
                            if (per.contains({
                                a: l1.a,
                                b: l2.a
                            }) && per.contains({
                                a: l1.b,
                                b: l2.b
                            }) ||
                                per.contains({
                                    a: l1.a,
                                    b: l2.b
                                }) && per.contains({
                                    a: l1.b,
                                    b: l2.a
                                })) {
                                squares.push({
                                    A: l1.a,
                                    B: l1.b,
                                    C: l2.a,
                                    D: l2.b
                                });

                            }
                        }
                    }
                };
                return squares;
            }


            calService.dataForDownload = function (dataArray) {
                var data = [];
                var temp = "";
                for (var i in dataArray.xy) {
                    for (var key in dataArray.xy[i]) {
                        if (key.length === 1) {
                            if (!temp) {
                                temp = dataArray.xy[i][key].toString() + " ";
                            } else
                                temp = temp.concat(dataArray.xy[i][key].toString() + "\n");

                        }
                    }
                    data.push(temp);
                    temp = "";
                }
                return data.toString().replace(/\,/g, "");
            }


            calService.removeDuplicates = function (originalArray) {
                var trimmedArray = [];
                var values = [];
                var valueX, valueY;

                for (var i = 0; i < originalArray.length; i++) {
                    valueX = originalArray[i]['x'];
                    valueY = originalArray[i]['y'];

                    var index = values.findIndex(x => x.x === valueX && x.y === valueY);

                    if (index === -1) {
                        trimmedArray.push(originalArray[i]);
                        values.push({
                            "x": valueX,
                            "y": valueY
                        });
                    } else calService.errorMsg.push({
                        message: "Duplicate found: ",
                        value: valueX + " " + valueY
                    });
                }

                return trimmedArray;

            }


            isInt = function (val) {
                var intRegex = /^-?\d+$/;
                if (!intRegex.test(val))
                    return false;

                var intVal = parseInt(val, 10);
                return parseFloat(val) == intVal && !isNaN(intVal);
            }

            calService.checkValue = function (xy) {
                if (isInt(xy[0]) && isInt(xy[1])) {
                    if (parseInt(xy[0], 10) >= -5000 && parseInt(xy[1], 10) >= -5000 && parseInt(xy[0], 10) <= 5000 && parseInt(xy[1], 10) <= 5000)
                        return true;
                    calService.errorMsg.push({
                        message: "Value is incorrect: ",
                        value: xy[0] + " " + xy[1]
                    });
                } else if (xy[0].length && xy[1].length)
                    calService.errorMsg.push({
                        message: "Value is incorrect: ",
                        value: xy[0] + " " + xy[1]
                    });
                return false;
            }


            calService.toArrayOfObject = function (contents) {
                var splitedArray = [];
                contents.split(/\r\n|\r|\n/).map(function (i) {
                    var xy = i.split(" ");
                    if (calService.checkValue(xy))
                        if (splitedArray.length <= 10000) {
                            splitedArray.push({
                                "x": parseInt(xy[0], 10),
                                "y": parseInt(xy[1], 10)
                            });
                        } else
                            calService.errorMsg.push({
                                message: "List is full: ",
                                value: splitedArray.length
                            });

                    return;
                });
                return splitedArray;
            }

          

            return calService;

        });

})();