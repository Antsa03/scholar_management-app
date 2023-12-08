import JsReport from "jsreport";

const jsreport = JsReport();

if (process.env.JSREPORT_CLI) {
  // export jsreport instance to make it possible to use jsreport-cli
  module.exports = jsreport
} else {
  jsreport.init().then(() => {
    // running
  }).catch((e: any) => {
    // error during startup
    console.error(e.stack)
    process.exit(1)
  })
}
