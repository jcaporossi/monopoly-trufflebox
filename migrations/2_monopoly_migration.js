const MonopolyMono = artifacts.require("MonopolyMono");
const MonopolyBoard = artifacts.require("MonopolyBoard");
const MonopolyProp = artifacts.require("MonopolyProp");
const MonopolyBuild = artifacts.require("MonopolyBuild");
const MonopolyBank = artifacts.require("MonopolyBank");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(MonopolyMono, web3.utils.toWei("15000", "ether"));
  const MonopolyMonoInstance = await MonopolyMono.deployed();

  await deployer.deploy(MonopolyBoard);
  const MonopolyBoardInstance = await MonopolyBoard.deployed();

  await deployer.deploy(
    MonopolyProp,
    MonopolyBoardInstance.address,
    "Monopoly World Properties",
    "MWP",
    "http://token-cdn-uri/"
  );

  await deployer.deploy(
    MonopolyBuild,
    MonopolyBoardInstance.address,
    "http://token-cdn-uri/"
  );

  const MonopolyPropInstance = await MonopolyProp.deployed();
  const MonopolyBuildInstance = await MonopolyBuild.deployed();

  await deployer.deploy(
    MonopolyBank,
    MonopolyPropInstance.address,
    MonopolyBuildInstance.address,
    MonopolyMonoInstance.address
  );

  await MonopolyMonoInstance.mint(
    accounts[1],
    web3.utils.toWei("1000", "ether")
  );
};