const connection = require("../db/database");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Login = function (login) {};

Login.getAll = (req, res) => {
  var email = req.body.email;
  var pass = req.body.password;
  var md5 = require("md5");
  var password = md5(pass);
  var data = [];
  //console.log(req.body.email);
  //   console.log(password);

  const query =
    "SELECT " +
    " p.id,p.NickName,p.Team,p.Office,p.Email,u.role_key" +
    " FROM bz_timestamp.t_admin_user u " +
    " LEFT JOIN baezenic_people.t_people p ON u.uid=p.id" +
    " WHERE p.status<>'Y' " +
    " AND p.Email='" +
    email +
    "' AND p.password='" +
    password +
    "'" +
    " ORDER BY p.id ASC";
  connection.query(query, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      var item = result[0];
      console.log(result);
      const jwtGenerate = (item) => {
        const token = jwt.sign(
          { email: item.Email, id: item.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "3d", algorithm: "HS256" }
        );

        return token;
      };
      const jwtRefreshTokenGenerate = (user) => {
        const refreshToken = jwt.sign(
          { name: user.name, id: user.id },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "1d", algorithm: "HS256" }
        );

        return refreshToken;
      };

      const token = jwtGenerate(item.Email);
      const refresh_token = jwtRefreshTokenGenerate(item.Email);
      item.Email.refresh = refresh_token;

      console.log("Login success");

      var obj = {
        id: item.id,
        email: item.Email,
        nickname: item.NickName,
        team: item.Team,
        office: item.Office,
        roleKey: item.role_key,
        token: token,
        refresh_token,
      };
      data.push(obj);
      res(null, data);
    }
  });
};

module.exports = Login;
