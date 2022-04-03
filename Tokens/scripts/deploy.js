console.log(
  "============================== Start Deploying =============================="
);

const sleepDuration = 10000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  require("./deploy-USDC");
  await sleep(sleepDuration);
  console.log();

  require("./deploy-USDT");
  await sleep(sleepDuration);
  console.log();

  // require("./deploy-WETH");
  // await sleep(sleepDuration);
  // console.log();
})();
