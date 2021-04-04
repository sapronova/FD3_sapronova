var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Product = /** @class */ (function () {
    function Product(_name, _weight) {
        this.name = _name;
        this.weight = _weight;
    }
    Product.prototype.getName = function () {
        return this.name;
    };
    Product.prototype.getScale = function () {
        return this.weight;
    };
    return Product;
}());
;
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
var Apple = /** @class */ (function (_super) {
    __extends(Apple, _super);
    function Apple() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Apple;
}(Product));
;
var Tomato = /** @class */ (function (_super) {
    __extends(Tomato, _super);
    function Tomato() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Tomato;
}(Product));
;
var Orange = /** @class */ (function (_super) {
    __extends(Orange, _super);
    function Orange() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Orange;
}(Product));
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