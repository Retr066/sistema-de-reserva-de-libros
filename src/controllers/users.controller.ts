import { AuthenticatedRequest } from "@interfaces/auth.interface";
import User from "@models/User";
import { Response } from "express";

const getProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const user = await User.findById(req.user?.userId).select('-password');
        res.json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const updateProfile = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, email } = req.body;
        const user = await User.findByIdAndUpdate(req.user?.userId, { name, email }, { new: true }).select('-password');
        res.json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const getUsers = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const createUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, email, password, identificationNumber, role } = req.body;
        const user = new User({ name, email, password, identificationNumber, role });
        await user.save();
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}


const updateUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const { name, email, role } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, role }, { new: true }).select('-password');
        res.json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

export { getProfile, updateProfile, getUsers, createUser, updateUser, deleteUser };
