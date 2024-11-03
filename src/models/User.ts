import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definición de la interfaz para el documento de usuario
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  identificationNumber: string;
  role: 'user' | 'admin';
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema: Schema<IUser> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  identificationNumber: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
}, {
  timestamps: true,
  toJSON: {
    transform: function (_, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret.password;
      delete ret._id;
      return ret;
    }
  }
});

// Middleware para encriptar la contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para comparar la contraseña
userSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Exportar el modelo de usuario
export default mongoose.model<IUser>('User', userSchema);

