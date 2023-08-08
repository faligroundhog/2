const proPlugins = [];
//如果是开发环境，则添加 transform-remove-console 插件
if (process.env.NODE_DEV == "production") {
  proPlugins.push("transform-remove-console");
}
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    ...proPlugins
  ]
}