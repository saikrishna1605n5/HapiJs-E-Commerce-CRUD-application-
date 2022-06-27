const Boom = require('@hapi/boom');


exports.createOne = Model =>  async (req, res)=> {
  try {
      const doc = await Model.create(req.payload);
      return { status:'success', data: doc, statusCode: 200 };
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

exports.getAll= Model => async(req,res) => {
  try {
    const  docs = await Model.find({});
    return { status:'success', data: docs, statusCode: 200 };
  } catch (error) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};


exports.getOne= Model => async (req, res) =>{
  try {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return Boom.notFound("document with this id doesn't exists");
    } else {
      return { status:'success', data: doc, statusCode: 200 };
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

 exports.updateOne  = Model => async (req, res)=> {
  try {
    const doc = await Model.findById( req.params.id );
    if (!doc) {
      return Boom.notFound("document with this id doesn't exists");
    } else {
      return await Model.findByIdAndUpdate( req.params.id , req.payload,{
        new: true,
        runValidators: true
      });
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

exports.deleteOne = Model => async (req, res) =>{
  try {
    const doc = await Model.findById( req.params.id);
    if (!doc) {
      return Boom.notFound("document with this id doesn't exists");
    } else {
      return await Model.findByIdAndDelete(req.params.id);
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};



exports.getOneWithPopulate = (Model, popOptions) => async (req, res, next) => {
      try{
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

      if (!doc) {
        return Boom.notFound("document with this id doesn't exists");
      } else {
        return { status:'success', data: doc, statusCode: 200 };
      }
    } catch (e) {
      console.log(e.message);
      return Boom.badImplementation();
    }
  };
  