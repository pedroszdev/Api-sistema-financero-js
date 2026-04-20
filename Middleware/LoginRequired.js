export default async function LoginRequired(req, res, next) {
  if (!req.session.usuario) {
    req.flash("error", "Você precisa fazer login.");
    req.session.save(() => {
      res.redirect("/login");
    });
    return;
  }
  next();
}
