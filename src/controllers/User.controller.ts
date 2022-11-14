import { STATUS_CODE } from "../protocols/status_code.js";
import { Response, Request } from "express";
import * as users_repository from "../repositories/Users.repository.js";
import { user } from "../protocols/user.js";
import { QueryResult } from "pg";

async function sign_up(request: Request, response: Response) {
  try {
    const UNDERGRADUATE_STUDENT = 4;
    const STANDARD_PERMISSION = 1;
    const user_data: user = response.locals.safeData;
    user_data.role_id = UNDERGRADUATE_STUDENT;
    user_data.permission_id = STANDARD_PERMISSION;
    console.log(response.locals);
    const query: QueryResult = await users_repository.insertUser(user_data);

    if (query.rowCount === 0) {
      response.sendStatus(STATUS_CODE.SERVER_ERROR);
      return;
    }

    response.sendStatus(STATUS_CODE.CREATED);
  } catch (error) {
    console.log(error);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

async function update_user_permission(request: Request, response: Response) {
  try {
    const {
      permission_id,
      user_id,
    }: { permission_id: number; user_id: number } = response.locals.safeData;
    const query: QueryResult = await users_repository.updateUserPermission({
      permission_id,
      user_id,
    });

    if (query.rowCount === 0) {
      response.sendStatus(STATUS_CODE.SERVER_ERROR);
      return;
    }

    response.sendStatus(STATUS_CODE.NO_CONTENT);
  } catch (error) {
    console.log(error);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

async function delete_user(request: Request, response: Response) {
  try {
    const user_id: number = response.locals.safeData.id;
    const query: QueryResult = await users_repository.deleteUser(user_id);

    if (query.rowCount === 0) {
      response.sendStatus(STATUS_CODE.SERVER_ERROR);
      return;
    }

    response.sendStatus(STATUS_CODE.OK);
  } catch (error) {
    console.log(error);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

async function get_user(request: Request, response: Response) {
  try {
    const user_id: number = response.locals.safeData.id;
    const query: QueryResult = await users_repository.getUser(user_id);

    if (query.rowCount === 0) {
      response.sendStatus(STATUS_CODE.SERVER_ERROR);
      return;
    }

    response.send(query.rows[0]);
  } catch (error) {
    console.log(error);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

async function get_user_by_name(request: Request, response: Response) {
  try {
    const { search_name }: { search_name: string } = response.locals.safeData;
    const query: QueryResult = await users_repository.getUserByName(
      search_name
    );

    if (query.rowCount === 0) {
      response.sendStatus(STATUS_CODE.NOT_FOUND);
      return;
    }

    response.send(query.rows);
  } catch (error) {
    console.log(error);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

async function count_users(request: Request, response: Response) {
  try {
    const query: QueryResult = await users_repository.countUsers();

    response.send(query.rows[0].count);
  } catch (error) {
    console.log(error);
    response.sendStatus(STATUS_CODE.SERVER_ERROR);
    return;
  }
}

export {
  sign_up,
  update_user_permission,
  delete_user,
  get_user,
  get_user_by_name,
  count_users,
};
