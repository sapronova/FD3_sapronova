var Scales = /** @class */ (function () {
    function Scales() {
        this.productsArray = [];
    }
    Scales.prototype.add = function (_newProd) {
        this.productsArray.push(_newProd);
    };
    Scales.prototype.getSumScale = function () {
        var totalweight = this.productsArray.reduce(function (acc, obj) { return acc + obj.getScale(); }, 0);
        return totalweight;
    };
    Scales.prototype.getNameList = function () {
        var namelist = [];
        this.productsArray.forEach(function (v) { namelist.push(v.getName()); });
        return namelist;
    };
    return Scales;
}());
;
var Apple = /** @class */ (function () {
    function Apple(_name, _weight) {
        this.name = _name;
        this.weight = _weight;
    }
    Apple.prototype.getName = function () {
        return this.name;
    };
    Apple.prototype.getScale = function () {
        return this.weight;
    };
    return Apple;
}());
;
var Tomato = /** @class */ (function () {
    function Tomato(_name, _weight) {
        this.name = _name;
        this.weight = _weight;
    }
    Tomato.prototype.getName = function () {
        return this.name;
    };
    Tomato.prototype.getScale = function () {
        return this.weight;
    };
    return Tomato;
}());
;
var Orange = /** @class */ (function () {
    function Orange(_name, _weight) {
        this.name = _name;
        this.weight = _weight;
    }
    Orange.prototype.getName = function () {
        return this.name;
    };
    Orange.prototype.getScale = function () {
        return this.weight;
    };
    return Orange;
}());
;
var myApple_antonovka = new Apple('Антоновка', 20);
var myApple_krimskoe = new Apple('Крымское', 7.3);
var myTomato_vityaz = new Tomato('Витязь', 14);
var myTomato_koenigsberg = new Tomato('Кенигсберг', 3);
var myOrange_sanguinello = new Orange('Сангвинелло', 58);
var myOrange_tarocco = new Orange('Тарокко', 5);
var scales_0404 = new Scales;
scales_0404.add(myApple_antonovka);
scales_0404.add(myApple_krimskoe);
scales_0404.add(myTomato_vityaz);
scales_0404.add(myTomato_koenigsberg);
scales_0404.add(myOrange_sanguinello);
scales_0404.add(myOrange_tarocco);
console.log(scales_0404.getSumScale());
console.log(scales_0404.getNameList());
//# sourceMappingURL=app.js.map