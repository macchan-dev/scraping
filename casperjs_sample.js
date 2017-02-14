var casper = require('casper').create();

// スクレイピング対象のURL
casper.start("https://www.google.co.jp/search?q=スクレイピング");

// URLが表示されたときの処理
casper.then(function () {
    // loadイベントを発火させる
    this.emit('load', this.evaluate(function () {
        // start()で指定したURLがPhantomJS上で実行されるので、
        // そのページに対して行いたい処理を記述する。
        // 今回は検索結果のdiv(id=ires)下のタイトル(class=r)のaタグを取得する。
        var a_list = document.querySelectorAll('#ires .r a')
        return Array.prototype.map.call(a_list, function (e) {
            return e.getAttribute('href')
        })
    }));
});

// イベントを受け取る
casper.on('load', function (list) {
    list.forEach(function (element, index, array) {
        console.log(element);
    });
});

// 実行
casper.run();