/**
 * Format the given date
 * @param date
 * @param format
 */
function fdlite (date, format) {
    var weekDaysShort = ["Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"];
    var weekDaysLong = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var monthsShort = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var monthsLong = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function getWeekDayName(index, isLong) {
        return isLong ? weekDaysLong[index] : weekDaysShort[index];
    }

    function getMonthName(index, isLong) {
        return isLong ? monthsLong[index] : monthsShort[index];
    }

    function getMeridiem (t, isUpper) {
        var m = t.getHours() < 12 ? "am" : "pm";
        return isUpper ? m.toUpperCase() : m;
    }

    function get12Hour (t) {
        var hr = t.getHours();
        return hr < 13 ? (hr == 0 ? 12 : hr + 1) : hr - 12;
    }

    function pad(str, len) {
        str = "" + str;

        while (str.length < len) {
            str = "0" + str;
        }

        return str;
    }

    var terms = {
        "MMMM": function(t){return getMonthName(t.getMonth(), true);},
        "MMM": function(t){return getMonthName(t.getMonth(), false);},
        "MM": function(t){return pad(t.getMonth() + 1, 2);},
        "M": function(t){return t.getMonth() + 1;},
        "DD": function(t){return pad(t.getDate(), 2);},
        "D": function(t){return t.getDate();},
        "dddd": function(t){return getWeekDayName(t.getDay(), true);},
        "ddd": function(t){return getWeekDayName(t.getDay(), false);},
        "d": function(t){return t.getDay();},
        "YYYY": function(t){return t.getFullYear();},
        "YY": function(t){return t.getFullYear().toString().substr(2,2);},
        "A": function(t){return getMeridiem(t, true);},
        "a": function(t){return getMeridiem(t, false);},
        "HH": function(t){return pad(t.getHours(), 2);},
        "H": function(t){return t.getHours();},
        "hh": function(t){return pad(get12Hour(t), 2);},
        "h": function(t){return get12Hour(t);},
        "mm": function(t){return pad(t.getMinutes(), 2);},
        "m": function(t){return t.getMinutes();},
        "ss": function(t){return pad(t.getSeconds(), 2);},
        "s": function(t){return t.getSeconds();},
        "SSS": function(t){return t.getMilliseconds();},
        "SS": function(t){return Math.floor(t.getMilliseconds() / 10);},
        "S": function(t){return Math.floor(t.getMilliseconds() / 100);}
    };

    if (!(date instanceof Date)) {
        date = new Date(date);
    }

    var regex = /[M]{1,4}|[D]{1,2}|[d]{3,4}|[d]{1}|[Y]{4}|[Y]{2}|[aA]|[Hh]{1,2}|[m]{1,2}|[s]{1,2}|[S]{1,3}/g;
    return format.replace(regex, function(key) { return terms[key](date); });
}