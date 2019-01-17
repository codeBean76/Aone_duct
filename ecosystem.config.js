module.exports = {
  apps: [{
    script: 'bin/www',
    watch: true,
    ignore_watch: ['node_modules', '.git', 'public'],
    watch_options: {
      'followSymlinks': false
    }
  }]
};