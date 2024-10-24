import { Router } from "express";
import { register,login,getUsers } from "../controller";
import { authenticateUser } from "../middleware";
import { registerUser } from "../utilities";
import  validator  from "../middleware/validator"

const router = Router();


router.post('/register',validator(registerUser), register);
router.post('/login', validator(registerUser), login)
router.get('/getuser', authenticateUser, getUsers)

export default router;