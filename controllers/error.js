exports.get404 = (req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "/404" });
};

//dont forget that we need a path here
