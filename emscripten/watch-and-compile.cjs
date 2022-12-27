const { exec } = require("child_process");
const chokidar = require("chokidar")

// One-liner for current directory
chokidar.watch('program.cpp', {
  persistent: true,
  // awaitWriteFinish: {
  //   stabilityThreshold: 500,
  //   pollInterval: 100
  // }
}).on('all', (event, path) => {
  exec("./build.sh", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
});
