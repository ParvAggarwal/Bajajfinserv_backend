const Book = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

exports.getUsers = catchAsync(async(req, res)=>{
  res.status(200).json({ operation_code: 1 });
})

exports.createUser = catchAsync(async(req, res)=>{
  try {
    const { data } = req.body;
    console.log(data);

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        message: 'Invalid input: data should be an array and is required.'
      });
    }

    const name = "Parv Aggarwal";
    const dob = "26092003";
    const email = "parv.aggarwal2003@gmail.com";
    const roll_number = "21BIT0121";

    const userId = `${name}_${dob}`;

    const numbers = [];
    const alphabets = [];
    let highestLowercase = '';

    data.forEach(item => {
      if (!isNaN(item)) {
        numbers.push(item.toString());
      } else if (typeof item === 'string' && item.length === 1) {
        alphabets.push(item);
        if (item === item.toLowerCase() && (highestLowercase === '' || item > highestLowercase)) {
          highestLowercase = item;
        }
      } else {
        return res.status(400).json({
          is_success: false,
          message: 'Invalid input: data array can only contain single-character strings and numbers.'
        });
      }
    });

    return res.json({
      is_success: true,
      user_id: userId,
      email,
      roll_number,
      numbers,
      alphabets,
      highest_lowercase_alphabet: [highestLowercase]
    });
  } catch (err) {
    console.log(err);
  }
})