const CompraDeBoletos = artifacts.require("CompraDeBoletos");

module.exports = function (deployer) {
    deployer.deploy(CompraDeBoletos);
};
