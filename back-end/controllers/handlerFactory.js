const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const Trajet = require("../models/trajetModel");

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    const doc1 = await Trajet.deleteMany({ Conducteur: req.params.id });
    const doc2 = await Review.deleteMany({ conducteur: req.params.id });
    const doc3 = await Review.deleteMany({ user: req.params.id });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    if (!doc1) {
      return next(new AppError("No document trajet found with that ID", 404));
    }
    if (!doc2) {
      return next(new AppError("No document Review found with that ID", 404));
    }
    if (!doc3) {
      return next(new AppError("No document Review found with that ID", 404));
    }

    res.status(204).json({
      //204 = no content
      status: "success",
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, //too return it
    });
    // for update
    //or affter serching tours if (id > tours.length){} or if !tour

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        Model: doc,
      },
    });
  });

exports.getOne = (
  Model,
  popOptions // = popoption because in tours we have .populate
) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);

    const doc = await query; //populate review to have the reviews on the tour when we get a  tour // params has all paramatres like the :id
    // or  Tour.findOne({ _id: req.params.id });

    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }

    res.status(200).json({
      //to resive tours const array
      status: "success",
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    //to allow for nested get reviews on toour (hack)
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    //execute the query
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const doc = await features.query;
    // const doc = await features.query.explain(); juste to see indexes a quoi ils servent
    await Model.populate(doc, {
      path: "Conducteur",
      select: "name photo slug ranking phone ratingsAverage active email",
    });
    await Model.populate(doc, {
      path: "Passagers",
      select: "name photo",
    });
    await Model.populate(doc, {
      path: "reviews",
      populate: {
        path: "user",
        select: "name photo",
      },
    });

    //SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: doc.length,
      data: {
        data: doc, // juste hire
      },
    });
  });
