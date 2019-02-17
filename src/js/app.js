App = {
	web3Provider: null,
	contracts: {},
	account: '0x0',
	
	init: function() {
    	return App.initWeb3();
  	},

  	initWeb3: function() {
	    if (typeof web3 !== 'undefined') {
	      // If a web3 instance is already provided by Meta Mask.
	      App.web3Provider = web3.currentProvider;
	      web3 = new Web3(web3.currentProvider);
	    } else {
	      // Specify default instance if no web3 instance provided
	      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
	      web3 = new Web3(App.web3Provider);
	    }
    	return App.initContract();
  	},

  	initContract: function() {

  		$.getJSON("MaintenanceReport.json", function(maintenance_report) {
  			App.contracts.MaintenanceReport = TruffleContract(maintenance_report);
  			App.contracts.MaintenanceReport.setProvider(App.web3Provider);

  			App.listenForEvents();

  			return App.render();
  		});
  	},

  	listenForEvents: function() {
    	App.contracts.MaintenanceReport.deployed().then(function(instance) {

    		instance.ProblemAdded({}, {
		        fromBlock: 0,
		        toBlock: 'latest'
			}).watch(function(error, event) {
				console.log("Problem Added", event)
			});

    	});

    	App.contracts.MaintenanceReport.deployed().then(function(instance) {

    		instance.Incentive({}, {
		        fromBlock: 0,
		        toBlock: 'latest'
			}).watch(function(error, event) {
				console.log("Incentive Added", event)
			});

    	});
  	},

  	render: function(){
  		var MaintenanceReportBalance;
  		var acc;

		web3.eth.getCoinbase(function(err, account) {
			if (err === null) {
				App.account = account;
			}
	    });

  		// Dashboard Layout
	    App.contracts.MaintenanceReport.deployed().then(function(instance) {
			return instance.getToken.call(App.account, { from: App.account });
		}).then(function(result, err){
			// console.log(result)
			$("#TokenValue").html(result.valueOf());
		}).catch(function(err){
			console.error(err);
		});

		App.contracts.MaintenanceReport.deployed().then(function(instance) {
			return instance.getRoomCondition.call("MA001", { from: App.account });
		}).then(function(result, err){
			$("#number_report_1").html(result[0].valueOf());
			$("#status_room_1").html(result[1].valueOf());	
		}).catch(function(err){
			console.error(err);
		});

		App.contracts.MaintenanceReport.deployed().then(function(instance) {
			return instance.getRoomCondition.call("MA002", { from: App.account });
		}).then(function(result, err){
			// console.log(result[0].valueOf());
			$("#number_report_2").html(result[0].valueOf());
			$("#status_room_2").html(result[1].valueOf());	
		}).catch(function(err){
			console.error(err);
		});

		App.contracts.MaintenanceReport.deployed().then(function(instance) {
			return instance.getRoomCondition.call("MA003", { from: App.account });
		}).then(function(result, err){
			$("#number_report_3").html(result[0].valueOf());
			$("#status_room_3").html(result[1].valueOf());	
		}).catch(function(err){
			console.error(err);
		});

		App.contracts.MaintenanceReport.deployed().then(function(instance) {
			return instance.getRoomCondition.call("MA004", { from: App.account });
		}).then(function(result, err){
			$("#number_report_4").html(result[0].valueOf());
			$("#status_room_4").html(result[1].valueOf());	
		}).catch(function(err){
			console.error(err);
		});

  	},

  	Report: function() {

  		web3.eth.getCoinbase(function(err, account) {
			if (err === null) {
				App.account = account;
			}
	    });

  		var room_problem = String($("#room_problem").val());
  		var equip_problem = String($("#equip_problem").val());
  		var problem = String($("#Problem").val());

  		App.contracts.MaintenanceReport.deployed().then(function(instance) {
			return instance.reportRoom(App.account, room_problem, equip_problem, problem, { from: App.account, gas:3000000 });
		});

  	}

};

$(function() {
  $(window).on('load', function() {
    App.init();
  });
});