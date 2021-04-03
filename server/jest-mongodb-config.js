module.exports = {
    mongodbMemoryServerOptions: {
      instance: {
        dbName: 'jest'
      },
      binary: {
        // MongoDB version
        version: '4.0.14',
        skipMD5: true
      },
      autoStart: false
    }
};