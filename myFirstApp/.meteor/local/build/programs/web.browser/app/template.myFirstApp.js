(function(){
Template.body.addContent((function() {
  var view = this;
  return HTML.DIV({
    id: "container"
  }, HTML.Raw("\n  <h1>Dit is mijn Prototype</h1>\n\n    "), Spacebars.include(view.lookupTemplate("hello")), "\n\n");
}));
Meteor.startup(Template.body.renderToDocument);

Template.__checkName("hello");
Template["hello"] = new Template("Template.hello", (function() {
  var view = this;
  return Spacebars.With(function() {
    return Spacebars.call(view.lookup("arduino"));
  }, function() {
    return [ "\n  ", HTML.P("Potvalue: ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("potValue"));
    })), "\n  ", HTML.P("PressureBalue: ", Blaze.View(function() {
      return Spacebars.mustache(view.lookup("pressureValue"));
    })), "\n  " ];
  });
}));

})();
