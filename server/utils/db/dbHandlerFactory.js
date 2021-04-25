const catchError = require('../errors/catchErrorAsync');
const AppError = require('../errors/appError');

exports.getAll = (Model, populateOptions) => {
  return catchError(async (req, res, next) => {
    let query = Model.find();

    if (populateOptions) {
      for (const option of populateOptions) {
        query = query.populate(option);
      }
    }

    const docs = await query;

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
      for (const option of populateOptions) {
        query = query.populate(option);
      }
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

exports.createOne = (Model, populateOptions) => {
  return catchError(async (req, res, next) => {
    let doc = await Model.create(req.body);
    let newlyCreatedDoc = false;

    if (populateOptions) {
      let query = Model.findById(doc._id);

      for (const option of populateOptions) {
        query = query.populate(option);
      }

      newlyCreatedDoc = await query;
    }

    if (newlyCreatedDoc) {
      doc = newlyCreatedDoc;
    }

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
    await Model.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null
    });
  });
};

exports.deleteMany = (Model) => {
  return catchError(async (req, res, next) => {
    await Model.deleteMany({ _id: { $in: req.body.ids } });

    res.status(204).json({
      status: 'success',
      data: null
    });
  });
};