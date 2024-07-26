const cron = require('node-cron')
const moment = require('moment')
const fs = require('fs')
const spawn = require('child_process').spawn

// You can adjust the backup frequency as you like, this case will run once a day
cron.schedule('*/10 * * * * *', () => {
    console.log(moment());
// Use moment.js or any other way to dynamically generate file name
  const fileName = `${moment().format("DD-MM-yyyy hh:mm:ss")}.sql`
  const wstream = fs.createWriteStream(`./${fileName}`)
  console.log('---------------------')
  console.log('Running Database Backup Cron Job')
  const mysqldump = spawn('mysqldump', [ '-u', 'root', '-pMapaev27*', 'orphanage' ])

  mysqldump
    .stdout
    .pipe(wstream)
    .on('finish', () => {
      console.log('DB Backup Completed!')
    })
    .on('error', (err) => {
      console.log(err)
    })
})