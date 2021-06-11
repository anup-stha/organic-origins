import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("admin123456", 10),
    isAdmin: true,
  },
  {
    name: "Normal User",
    email: "user@example.com",
    password: bcrypt.hashSync("user123456", 10),
  },
];

export default users;
