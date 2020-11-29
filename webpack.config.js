const HtmlWebPackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const rules = [
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
      presets: ['@babel/preset-react']
    }
  }
]

module.exports = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === 'development'
        ? 'http://localhost:8081/'
        : 'https://prod-test-consumer.netlify.app/'
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json']
  },

  devServer: {
    port: 8081
  },
  devtool: 'inline-source-map',
  module: { rules },

  plugins: [
    new ModuleFederationPlugin({
      name: 'consumer',
      filename: 'remoteEntry.js',
      remotes: {
        somemodulename: 'somemodulename@https://module-federation-exposes.netlify.app/remoteEntry.js'
      },
      exposes: {},
      shared: require('./package.json').dependencies
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html'
    })
  ]
})
