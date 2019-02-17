var MaintenanceReport = artifacts.require("./MaintenanceReport.sol");

module.exports = function(deployer) {
  deployer.deploy(MaintenanceReport);
};