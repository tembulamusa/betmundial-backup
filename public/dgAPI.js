let xlg = {
    websocket: null,
    wsUri: null,
    tableId: null,
    casinoId: "ppcwx00000016711",
    tryToConnect: true,

    // public
    connect: function (wsUri, casinoId, tableId) {
        try {
            let self = this;
            self.tryToConnect = true;
            self.wsUri = wsUri;
            if (self.websocket !== null && self.websocket.readyState !== 3) {
                self.websocket.close();
            }
            self.websocket = new WebSocket('wss://' + wsUri + '/ws');
            self.websocket.onopen = function (evt) {
                self.onWsOpen(evt, casinoId, tableId)
            };
            self.websocket.onclose = function (evt) {
                self.onWsClose(evt)
            };
            self.websocket.onmessage = function (evt) {
                self.onWsMessage(evt)
            };
            self.websocket.onerror = function (evt) {
                self.onWsError(evt)
            };
            if (tableId) {
                self.tableId = tableId;
            }
            self.casinoId = casinoId;
        } catch(err) {
            console.log(er)
        }
        
    },
    // public
    onMessage: function (data) {
        // to fill
        let gameId = data.tableId;
        $("#" + gameId).attr("src", data.tableImage);

        if (data.hasOwnProperty('tableLimits')) {

            let tableLimits = data.tableLimits
            let limits = "";
            if (tableLimits.hasOwnProperty("minBet")) {
                limits = limits + "Kshs." + tableLimits.minBet;
            }
            if (tableLimits.hasOwnProperty("maxBet")) {
                limits = limits + " - Kshs." + tableLimits.maxBet;
            }

            if (limits.length > 0) {
                $("#betlimit-" + gameId).html(limits)
                $("#betlimit-" + gameId).css("display", "block")
            }
        }

        if (data.hasOwnProperty("totalSeatedPlayers")) {

            $("#seated-player-num-" + gameId).html(data.totalSeatedPlayers)
            $("#seated-players-" + gameId).css("display", "block")
        }

        if (data.hasOwnProperty("tableOpen")) {

            if (data.tableOpen) {
                $("#table-" + gameId).html('<div class="prag-bet-table" style="background:#000000; width: 50px; margin: auto; font-size:10px" title="Table Open uppercase">OPEN</div>')
                $("#table-" + gameId).css("display", "block")
            } else {
                $("#table-" + gameId).html('<div class="prag-bet-table" style="background:red;" title="Table Closed">C</div>')
                $("#table-" + gameId).css("display", "block")
            }
        }

        if (data.hasOwnProperty("last20Results") || data.hasOwnProperty("gameResult")) {

            let results = null;
            if (data.hasOwnProperty("last20Results")) {

                results = data.last20Results;
            } else if (data.hasOwnProperty("gameResult")) {

                results = data.gameResult;
            }

            let innerHtml = "";
            for (let i = 0; i < results.length; i++) {

                if (window.screen.availWidth <= 400) {

                    if (i == 4) {
                        break;
                    }
                } else {

                    if (i == 6) {
                        break;
                    }
                }
                let oneResult = results[i];

                if (oneResult.hasOwnProperty("color")) {

                    innerHtml = innerHtml + '<div class="prag-bet-result" style="background:' + oneResult.color + ';">';
                } else {
                    if (i % 2 == 0) {
                        innerHtml = innerHtml + '<div class="prag-bet-result" style="background:green;">';
                    } else {
                        innerHtml = innerHtml + '<div class="prag-bet-result" style="background:red;">';
                    }
                }

                let content = "";
                if (oneResult.hasOwnProperty("result")) {

                    content = oneResult.result;

                    if (!/\d/.test(content)) {
                        content = content.substring(0, 2).toUpperCase()
                    }
                } else if (oneResult.hasOwnProperty("winner")) {
                    content = oneResult.winner;
                    if (content == "TIE") {
                        content = "--";
                    } else {
                        content = content.substring(0, 2).toUpperCase()
                    }
                } else if (oneResult.hasOwnProperty("totalSum")) {
                    content = oneResult.totalSum;
                }

                innerHtml = innerHtml + content + '</div>';
            }

            $("#result-" + gameId).html(innerHtml)
            $("#result-" + gameId).css("display", "block")
        }
    },
    // public
    onConnect: function () {
        const tables = ["201", "203", "204", "225", "229", "230", "240",
            "303", "545", "401", "402", "701", "801", "901", "902", "1001",
            "1024", "1101", "1301", "1320", "1401", "1501", "1601", "1701"
        ];

        dga.available("ppcwx00000016711")

        tables.forEach(function (value) {
            dga.subscribe("ppcwx00000016711", value, "KES")
        })
    },
    // public
    disconnect: function () {
        let self = this;
        self.tryToConnect = false;
        self.websocket.close();
    },
    // public
    subscribe: function (casinoId, tableId, currency) {
        let subscribeMessage = {
            type: 'subscribe',
            key: tableId,
            casinoId: casinoId,
            currency: currency
        }

        let self = this;
        let jsonSub = JSON.stringify(subscribeMessage);
        self.doWsSend(jsonSub);
    },

    // public
    available: function (casinoId) {
        let availableMessage = {
            type: 'available',
            casinoId: casinoId
        }
        let self = this;
        let jsonSub = JSON.stringify(availableMessage);
        self.doWsSend(jsonSub);
    },

    onWsOpen: function (evt) {
        let self = this;

        if (self.onConnect != null) {
            self.onConnect();
        }

        if (self.tableId) {
            self.subscribe(self.casinoId, self.tableId)
        }
    },

    onWsClose: function (evt) {
        let self = this;
        if (self.tryToConnect === true) {
            self.connect(self.wsUri, self.casinoId, self.tableId);
        }
    },

    onWsMessage: function (evt) {
        let self = this;
        let data = JSON.parse(evt.data);
        if (self.onMessage != null) {
            self.onMessage(data);
        }
    },

    onWsError: function (evt) {
        console.log('ERROR: ' + evt.data);
    },

    ping: function () {
        let self = this;
        let pingMessage = {
            type: 'ping',
            pingTime: Date.now().toString()
        }
        let jsonSub = JSON.stringify(pingMessage);
        self.doWsSend(jsonSub);
    },

    doWsSend: function (message) {
        let self = this;
        self.websocket.send(message);
    }
};

let dga = xlg;
dga.connect("prelive-dga0.pragmaticplaylive.net")
