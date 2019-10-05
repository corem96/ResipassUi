/*jshint esversion:6 */
export const dev = {
  configureWebpack: {
    // The URL where the .NET Core app will be listening.
    // Read the ASPNET_URL environment variable, injected by VueDevelopmentServerMiddleware
    devServer: {
      // When running in IISExpress, the env variable won’t be provided. 
      // Hardcode a fallback here based on your launchSettings.json
      proxy: process.env.ASPNET_URL || 'https://localhost:5001',
      
    },
    // … devtool and output are same as in the earlier template …
  }
  // proxyTable: {
  //     '/api': {
  //         target: 'https://localhost:5001',
  //         changeOrigin: true,
  //         pathRewrite: {
  //             '^/api': ''
  //         }
  //     }
  // }
};