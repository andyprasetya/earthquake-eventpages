'use strict';


var DyfiPinView = require('core/BasicPinView'), // TODO
    FiniteFaultPinView = require('core/BasicPinView'), // TODO
    FocalMechanismPinView = require('core/BasicPinView'), // TODO
    InteractiveMapPinView = require('core/BasicPinView'), // TODO
    MomentTensorPinView = require('core/BasicPinView'), // TODO
    OriginPinView = require('core/BasicPinView'), // TODO
    PagerPinView = require('core/BasicPinView'), // TODO
    Product = require('pdl/Product'),
    RegionInfoPinView = require('core/BasicPinView'), // TODO
    ShakeMapPinView = require('core/BasicPinView'), // TODO
    SummaryModule = require('core/SummaryModule'),
    TsunamiPinView = require('core/BasicPinView'), // TODO
    Util = require('util/Util');


var _ID,
    _DEFAULTS,
    _TITLE,

    _hasContent;


_ID = 'executive';
_TITLE = 'Executive Summary';

_hasContent = function (eventPageModel) {
  var ev;

  ev = eventPageModel.get('event');
  if (ev !== null) {
    // only show this module if there is an event
    return true;
  }

  return false;
};

_DEFAULTS = {
};


var ExecutiveSummary = function (options) {
  var _this,
      _initialize;


  options = Util.extend({}, _DEFAULTS, options);
  _this = SummaryModule(options);

  _initialize = function (/*options*/) {
    var el;

    el = _this.el;

    _this.ID = _ID;
    _this.TITLE = _TITLE;

    el.classList.add('executive-summary');

    _this.clearPins(true);
    _this.clearTexts(true); // general-header + general-text
    _this.clearLinks(true);
  };


  /**
   * Clears the views associated with pins.
   *
   * @param init {Boolean} Optional. Default false.
   *     Flag whether to re-initialize the views array. By default the views
   *     array is set to null, if true, initializes views array to empty array.
   *
   * @see #_this.clearViews
   */
  _this.clearPins = function (init) {
    _this.clearViews(_this.pinViews);

    if (init) {
      _this.pinViews = [];
    } else {
      _this.pinViews = null;
    }
  };

  /**
   * Creates an LI element, appends it to _this.pinList and sets appropriate
   * classes. The `executive-summary-pin` class is added by default but other
   * classes my be added by providing them in the `classes` parameter.
   *
   * @param classes {Array} Optional.
   *      An array of classes to add to the created container.
   *
   * @return {DOMElement}
   */
  _this.createPinContainer = function (parent, classes) {
    var container;

    container = parent.appendChild(document.createElement('li'));
    container.classList.add('executive-summary-pin');

    classes = classes || [];
    classes.forEach(function (className) {
      container.classList.add(className);
    });

    return container;
  };

  _this.destroy = Util.compose(function () {
    if (_this === null) {
      return; // Already destroyed
    }

    _this.clearPins();

    _initialize = null;
    _this = null;
  }, _this.destroy);

  /**
   * APIMethod.
   *
   * Implementing classes should override this method.
   *
   * @return {DOMElement}
   *     A header to label the links section for this {SummaryModule}. If no
   *     header is desired, return an empty {DocumentFragment}.
   */
  _this.getLinksHeader = function () {
    var header;

    header = document.createElement('h3');
    header.innerHTML = 'For More Information';

    return header;
  };

  /**
   * Does a comparison of one Product against an array of Products to see if
   * the same "url" property already exists in the array.
   *
   * @param {boolean}
   *     return true if the link already exists in the array
   *
   */
  _this.isDuplicate = function (needle, haystack) {
    var i;

    try {
      for (i = 0; i < haystack.length; i++) {
        if (haystack[i].get('properties').url ===
            needle.get('properties').url) {
          return true;
        }
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  /**
   * Remove duplicate items from the array that have the same "url" property
   *
   * @param links {Array<Product>}
   *     An array of Products
   *
   */
  _this.removeDuplicateLinks = function (links) {
    var i,
        link,
        products;

    // add the first item since it cannot be a duplicate yet
    products = [];

    if (links.length) {
      products.push(links[0]);

      // add all additional links that do not already exist in products array
      for (i = 1; i < links.length; i++) {
        link = links[i];
        if (!_this.isDuplicate(link, products)) {
          products.push(link);
        }
      }
    }

    return products;
  };

  /**
   * Renders the module by delegating to three sub-render methods.
   *
   */
  _this.render = function () {
    var config,
        content,
        ev,
        headers,
        links,
        texts;

    ev = _this.model.get('event');

    _this.clearTexts(true);
    _this.clearLinks(true);
    _this.clearPins(true);

    Util.empty(_this.header);
    Util.empty(_this.content);
    Util.empty(_this.footer);

    if (!ev) {
      return;
    }

    config = _this.model.get('config');
    content = document.createDocumentFragment();
    headers = ev.getProducts(Product.getFullType('general-header'), config);
    texts = ev.getProducts(Product.getFullType('general-text'), config);
    links = _this.removeDuplicateLinks(ev.getProducts(
        Product.getFullType('general-link'), config));


    _this.header.appendChild(_this.getTexts(headers));

    content.appendChild(_this.getPins(ev));
    content.appendChild(_this.getTexts(texts));
    content.appendChild(_this.getLinks(links));
    _this.content.appendChild(content);

    // Render the pin views after they are in the DOM so they have extents
    _this.pinViews.forEach(function (view) {
      view.render();
    });
  };

  /**
   * Renders each of the pins in order within _this.pinList container.
   *
   * @param ev {CatalogEvent}
   *     The event data to render.
   */
  _this.getPins = function (ev) {
    var config,
        list,
        product;


    _this.pinViews = _this.pinViews || [];

    if (!ev) {
      return;
    }

    config = _this.model.get('config');
    list = document.createElement('ul');
    list.classList.add('executive-summary-pins');

    // Origin pin
    product = ev.getPreferredOriginProduct();
    if (product) {
      _this.pinViews.push(OriginPinView({
        el: _this.createPinContainer(list),
        model: product
      }));
    }

    // Interactive Map pin
    // TODO :: Product ???
    _this.pinViews.push(InteractiveMapPinView({
      el: _this.createPinContainer(list),
      model: ev.getPreferredOriginProduct() // TODO ...
    }));


    // Regional Info pin
    // TODO :: Product ???
    _this.pinViews.push(RegionInfoPinView({
      el: _this.createPinContainer(list),
      model: ev.getPreferredOriginProduct() // TODO ...
    }));

    // DYFI pin
    product = ev.getPreferredProduct(Product.getFullType('dyfi', config));
    if (product) {
      _this.pinViews.push(DyfiPinView({
        el: _this.createPinContainer(list),
        model: product
      }));
    }

    // ShakeMap pin
    product = ev.getPreferredProduct(Product.getFullType('shakemap', config));
    if (product) {
      _this.pinViews.push(ShakeMapPinView({
        el: _this.createPinContainer(list),
        model: product
      }));
    }

    // PAGER pin
    product = ev.getPreferredProduct(Product.getFullType('losspager', config));
    if (product) {
      _this.pinViews.push(PagerPinView({
        el: _this.createPinContainer(list),
        model: product
      }));
    }

    // Tsunami pin
    if (ev.getSummary().properties.tsunami === 1) {
      _this.pinViews.push(TsunamiPinView({
        el: _this.createPinContainer(list),
        model: ev.getPreferredOriginProduct() // TODO ...
      }));
    }

    // Moment Tensor pin
    product = ev.getPreferredProduct(Product.getFullType('moment-tensor',
        config));
    if (product) {
      _this.pinViews.push(MomentTensorPinView({
        el: _this.createPinContainer(list),
        model: product
      }));
    } else {
      // Only show focal mechanism if no moment tensor

      // Focal Mechanism pin
      product = ev.getPreferredProduct(Product.getFullType('focal-mechanism',
          config));
      if (product) {
        _this.pinViews.push(FocalMechanismPinView({
          el: _this.createPinContainer(list),
          model: product
        }));
      }
    }

    // Finite Fault pin
    product = ev.getPreferredProduct(Product.getFullType('finite-fault',
        config));
    if (product) {
      _this.pinViews.push(FiniteFaultPinView({
        el: _this.createPinContainer(list),
        model: product
      }));
    }

    return list;
  };


  _initialize(options);
  options = null;
  return _this;
};


ExecutiveSummary.ID = _ID;
ExecutiveSummary.TITLE = _TITLE;

ExecutiveSummary.hasContent = _hasContent;


module.exports = ExecutiveSummary;
