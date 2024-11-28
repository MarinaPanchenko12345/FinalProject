import express from "express";
import { adminGuard, getUser, guard } from "../../../middlewares/guard.mjs";
import {
  deleteUser,
  getAllUsers,
  getDeletedUsers,
  getUserById,
  restoreUser,
  toggleBusinessStatus,
  updateUser,
} from "../service/userService.mjs";
import { handleBadRequest, handleError } from "../../../utils/handleErrors.mjs";
import { userUpdateValidation } from "../validation/userUpdateJoi.mjs";

const router = express.Router();

//*UsersEndPoints*//

//Get all users
router.get("/", guard, adminGuard, async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// Get deleted users
router.get("/deleted-users", guard, adminGuard, async (req, res) => {
  try {
    const users = await getDeletedUsers();
    res.send(users);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// Restore a deleted user
router.patch("/restore-user/:id", guard, adminGuard, async (req, res) => {
  try {
    const { id } = req.params;
    const restoredUser = await restoreUser(id);
    res.send(restoredUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Get user by id
router.get("/:id", guard, async (req, res) => {
  try {
    const currentUser = getUser(req);
    const user = await getUserById(req.params.id, currentUser);
    res.send(user);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// Edit user
router.put("/:id", guard, async (req, res) => {
  try {
    const { error } = userUpdateValidation.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return handleBadRequest(res, error);
    }
    const currentUser = getUser(req);
    const updatedUser = await updateUser(req.params.id, currentUser, req.body);
    res.send(updatedUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

//Change isBusiness status
router.patch("/:id", guard, async (req, res) => {
  try {
    const currentUser = getUser(req);

    const updatedUser = await toggleBusinessStatus(req.params.id, currentUser);
    res.send(updatedUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});

// Delete user
router.delete("/:id", guard, async (req, res) => {
  try {
    const currentUser = getUser(req);
    const deletedUser = await deleteUser(req.params.id, currentUser);
    res.send(deletedUser);
  } catch (error) {
    return handleError(res, error.status || 500, error.message);
  }
});


export default router;
