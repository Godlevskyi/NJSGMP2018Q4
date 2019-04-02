
import { userModel } from '../models/User';

export const getAllUsers = (req, res, next) => {
  userModel.find({}, (err, data) => {
    if (err) next(err);
    res.send(data);
  })
};
export const deleteUserById = (req, res, next) => {
  const id = Number(req.params.id);
  userModel.deleteOne({ id: id }, (err, data) => {
    if (err) next(err);
    res.send('This user was deleted: ' + data);
  });
};