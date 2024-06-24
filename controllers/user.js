import User from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

const Home = async (req, res) => {
    res.json({
        success: true,
        message: "Home page"
    });
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json({
            success: true,
            message: "All users retrieved successfully",
            users: users
        });
        console.log("All users retrieved successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving users",
            error: error.message
        });
        console.error("Error retrieving users:", error.message);
    }
}

const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ name, email, password: hashedPassword });

        sendCookie(newUser, res, "Registration successful", 201);

        console.log("User created successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        });
        console.error("Error creating user:", error.message);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Email or password not matching with database",
            });
        }

        sendCookie(user, res, `Welcome ${user.name}`, 200);

        console.log("Login successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging in",
            error: error.message
        });
        console.error("Error logging in:", error.message);
    }
}

const logout = async (req, res) => {
    try {
        res.status(200)
            .cookie("token", "", { expires: new Date(Date.now()) })
            .json({
                success: true,
                message: "Logout successful",
            });
        console.log("Logout successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error logging out",
            error: error.message
        });
        console.error("Error logging out:", error.message);
    }
};

const newUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.create({ name, email, password });

        res.cookie("name", "firstone").json({
            success: true,
            message: "User created successfully",
            user: user
        });
        console.log("User created successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating user",
            error: error.message
        });
        console.error("Error creating user:", error.message);
    }
}

const singleUser = (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            user: req.user
        });
        console.log("Single user retrieved successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error retrieving user",
            error: error.message
        });
        console.error("Error retrieving user:", error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await user.deleteOne();

        res.json({
            success: true,
            message: "User deleted successfully",
            user: user,
        });

        console.log("User deleted successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting user",
            error: error.message
        });
        console.error("Error deleting user:", error.message);
    }
}

const killAll = async (req, res) => {
    try {
        await User.deleteMany({});
        res.json({
            success: true,
            message: "All users deleted successfully"
        });
        console.log("All users deleted successfully");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting all users",
            error: error.message
        });
        console.error("Error deleting all users:", error.message);
    }
}

export { getAllUsers, Home, newUser, singleUser, deleteUser, Register, login, logout, killAll };
