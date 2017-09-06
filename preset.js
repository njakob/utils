/* eslint-disable import/no-extraneous-dependencies */

const presetES2015 = require('babel-preset-es2015');
const presetStage0 = require('babel-preset-stage-0');
const pluginExternalHelpers = require('babel-plugin-external-helpers');
const pluginTransformFlowStripTypes = require('babel-plugin-transform-flow-strip-types');

module.exports = function buildPreset() {
  const modules = false;
  let externalHelpers = false;

  if (process.env.BABEL_ROLLUP) {
    externalHelpers = true;
  }

  return {
    comments: false,
    presets: [
      presetStage0,
      [presetES2015.buildPreset, { modules }],
    ],
    plugins: [
      pluginTransformFlowStripTypes,
      externalHelpers && pluginExternalHelpers,
    ].filter(Boolean),
  };
};
