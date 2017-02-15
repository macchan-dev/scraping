try {
    var Spooky = require('spooky');
} catch (e) {
    var Spooky = require('../lib/spooky');
}

var spooky = new Spooky({
    child: {
        // 画面に結果を出力する設定
        transport: 'stdio'
    },
    casper: {
        logLevel: 'debug',
        verbose: true
    }
}, function (err) {
    if (err) {
        e = new Error('Failed to initialize SpookyJS');
        e.details = err;
        throw e;
    }

    spooky.start('https://www.google.co.jp/search?q=スクレイピング');

    spooky.then(function () {
        this.emit('load', this.evaluate(function () {
            var a_list = document.querySelectorAll('#ires .r a')
            return Array.prototype.map.call(a_list, function (e) {
                return e.getAttribute('href')
            });
        }));
    });

    spooky.run();
});

spooky.on('error', function (e, stack) {
    console.error(e);

    if (stack) {
        console.log(stack);
    }
});

spooky.on('load', function (list) {
    list.forEach(function (element, index, array) {
        console.log(element);
    });
    // 終了
    spooky.destroy();
});
