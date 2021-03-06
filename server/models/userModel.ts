import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true, lowercase: true, trim: true },
  password: String,
  role: String
});

// Before saving the user, hash the password
userSchema.pre('save', function(next) {
  console.log("in pre");
  const user = this;
  if (!user.isModified('password')) { return next(); }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, function(error, hash) {
      if (error) { return next(error); }
      user.password = hash;
      console.log("in pre"+user.password);
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  console.log("1"+candidatePassword+"2"+this.password);
  
  bcrypt.compare(candidatePassword,this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function(doc, ret, options) {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', userSchema);

export default User;
