var ScalesStorageEngineArray = /** @class */ (function () {
    function ScalesStorageEngineArray() {
        this.productsArray = [];
    }
    ScalesStorageEngineArray.prototype.addItem = function (item) {
        this.productsArray.push(item);
    };
    ScalesStorageEngineArray.prototype.getItem = function (index) {
        return this.productsArray[index];
    };
    ScalesStorageEngineArray.prototype.getCount = function () {
        return this.productsArray.length;
    };
    return ScalesStorageEngineArray;
}());
var ScalesStorageEngineLocalStorage = /** @class */ (function () {
    function ScalesStorageEngineLocalStorage() {
        this.LSkey = 'productsarr';
    }
    ScalesStorageEngineLocalStorage.prototype.addItem = function (item) {
        if (localStorage.getItem(this.LSkey)) {
            var newItemarr = JSON.parse(localStorage.getItem(this.LSkey));
            newItemarr.push(item);
            localStorage.setItem(this.LSkey, JSON.stringify(newItemarr));
        }
        else {
            var newItemarr = [];
            newItemarr.push(item);
            localStorage.setItem(this.LSkey, JSON.stringify(newItemarr));
        }
    };
    ScalesStorageEngineLocalStorage.prototype.getItem = function (index) {
        var newItemarr = JSON.parse(localStorage.getItem(this.LSkey));
        var parsedProd = new Product(newItemarr[index].name, newItemarr[index].weight);
        return parsedProd;
    };
    ScalesStorageEngineLocalStorage.prototype.getCount = function () {
        var newItemarr = JSON.parse(localStorage.getItem(this.LSkey));
        return newItemarr.length;
    };
    return ScalesStorageEngineLocalStorage;
}());
var Scales = /** @class */ (function () {
    function Scales(_storageengine) {
        this.storageengine = _storageengine;
    }
    Scales.prototype.add = function (item) {
        this.storageengine.addItem(item);
    };
    Scales.prototype.getSumScale = function () {
        var count = 0;
        for (var i = 0; i < this.storageengine.getCount(); i++) {
            count += this.storageengine.getItem(i).getScale();
        }
        return count;
    };
    Scales.prototype.getNameList = function () {
        var namelist = [];
        for (var i = 0; i < this.storageengine.getCount(); i++) {
            namelist.push(this.storageengine.getItem(i).getName());
        }
        ;
        return namelist;
    };
    return Scales;
}());
;
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
var myApple_antonovka = new Product('Антоновка', 20);
var myApple_krimskoe = new Product('Крымское', 7.3);
var myTomato_vityaz = new Product('Витязь', 14);
var myTomato_koenigsberg = new Product('Кенигсберг', 3);
var newscalesSEA = new ScalesStorageEngineArray();
var scales_01 = new Scales(newscalesSEA);
scales_01.add(myApple_antonovka);
scales_01.add(myApple_krimskoe);
scales_01.add(myTomato_vityaz);
scales_01.add(myTomato_koenigsberg);
console.log(scales_01.getSumScale());
console.log(scales_01.getNameList());
var newscalesSELS = new ScalesStorageEngineLocalStorage();
var scales_02 = new Scales(newscalesSELS);
localStorage.removeItem('productsarr');
scales_02.add(myApple_antonovka);
scales_02.add(myApple_krimskoe);
scales_02.add(myTomato_vityaz);
scales_02.add(myTomato_koenigsberg);
console.log(scales_02.getSumScale());
console.log(scales_02.getNameList());
//gt
//# sourceMappingURL=app.js.map