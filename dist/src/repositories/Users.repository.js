import connection from "../database/database.js";
var TABLE = "users";
var insertUser = function (user) {
    return connection.query("INSERT INTO ".concat(TABLE, " (\n        name,\n        role_id,\n        permission_id,\n        institutional_id,\n        institutional_email,\n        personal_email,\n        phone,\n        cep,\n        address_number,\n        address_additional_information\n    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id;"), [
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
    ]);
};
function updateUserPermission(_a) {
    var permission_id = _a.permission_id, user_id = _a.user_id;
    return connection.query("UPDATE ".concat(TABLE, " SET  permission_id=$1 WHERE id=$2;"), [permission_id, user_id]);
}
function deleteUser(user_id) {
    return connection.query("DELETE FROM ".concat(TABLE, " WHERE \"id\"=$1"), [user_id]);
}
function getUser(user_id) {
    return connection.query("SELECT * FROM ".concat(TABLE, " WHERE \"id\"=$1"), [user_id]);
}
function getUserByName(search_name) {
    return connection.query("SELECT * FROM ".concat(TABLE, " WHERE lower(name) LIKE $1 ORDER BY name"), ["".concat(search_name.toLowerCase(), "%")]);
}
function countUsers() {
    return connection.query("SELECT COUNT(*) FROM ".concat(TABLE));
}
export { insertUser, updateUserPermission, deleteUser, getUser, getUserByName, countUsers, };
