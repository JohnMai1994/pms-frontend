const CracoLessPlugin = require('craco-less');
const modifyVars = require("./theme/nx.js")


module.exports = {


    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars,
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};