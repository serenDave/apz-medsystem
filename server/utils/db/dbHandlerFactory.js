const catchError = require('../errors/catchErrorAsync');
const AppError = require('../errors/appError');

exports.getAll = (Model) => {
  return catchError(async (req, res, next) => {
    const docs = await Model.find();

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: { docs }
    });
  });
};

exports.getOne = (Model, populateOptions) => {
  return catchError(async (req, res, next) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError('No doc found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { doc }
    });
  });
};

exports.createOne = (Model) => {
  return catchError(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      message: 'New doc successfully added',
      data: { doc }
    });
  });
};

exports.updateOne = (Model) => {
  return catchError(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!doc) {
      return next(new AppError('No doc found with that id', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { doc }
    });
  });
};

exports.deleteOne = (Model) => {
  return catchError(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  });
};