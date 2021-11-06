module.exports = {
    env: {
      test: {
          presets: ["@babel/preset-react"],
          plugins: ["@babel/plugin-transform-modules-commonjs"] //для работы import
    }
  }
};