/**
 *  Copyright (c) 2014-2015, Ernesto Freyre G.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['react'], factory);
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = factory(require('react'));
  } else {
    // Browser globals (root is window)
    root.poorMansFluxMixin = factory(root.React);
  }
}(this, function (react) {
  return function(store, actions) {
    return {
      getInitialState: function() {
        return store;
      },

      childContextTypes: {
        flux: react.PropTypes.object
      },

      getChildContext: function() {
        var
          flux;

        flux = { store: this.state };
        flux.actions = actions(this.dispatch, flux);

        return {
          flux: flux
        };
      },

      dispatch: function(data) {
        this.setState(data);
      }
    };
  };
}));








