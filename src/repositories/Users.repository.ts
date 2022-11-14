import connection from "../database/database.js";
import { user } from "../protocols/user.js";

const TABLE = "users";

const insertUser = (user: user) => {
  return connection.query(
    `INSERT INTO ${TABLE} (
        name,
        role_id,
        permission_id,
        institutional_id,
        institutional_email,
        personal_email,
        phone,
        cep,
        address_number,
        address_additional_information
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;`,
    [
      user.name,
      user.role_id,
      user.permission_id,
      user.institutional_id,
      user.institutional_email,
      user.personal_email,
      user.phone,
      user.cep,
      user.address_number,
      user.address_additional_information,
    ]
  );
};

function updateUserPermission({
  permission_id,
  user_id,
}: {
  permission_id: number;
  user_id: number;
}) {
  return connection.query(
    `UPDATE ${TABLE} SET  permission_id=$1 WHERE id=$2;`,
    [permission_id, user_id]
  );
}

function deleteUser(user_id: number) {
  return connection.query(`DELETE FROM ${TABLE} WHERE "id"=$1`, [user_id]);
}

function getUser(user_id: number) {
  return connection.query(`SELECT * FROM ${TABLE} WHERE "id"=$1`, [user_id]);
}

function getUserByName(search_name: string) {
  return connection.query(
    `SELECT * FROM ${TABLE} WHERE lower(name) LIKE $1 ORDER BY name`,
    [`${search_name.toLowerCase()}%`]
  );
}

function countUsers() {
  return connection.query(`SELECT COUNT(*) FROM ${TABLE}`);
}

export {
  insertUser,
  updateUserPermission,
  deleteUser,
  getUser,
  getUserByName,
  countUsers,
};
