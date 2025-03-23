import ErrorHandler from "../middlewares/error.js";
import { Reservation } from "../models/reservation.js";


const send_reservation = async (req, res, next) => {

  const { firstName, lastName, email, date, time, phone } = req.body;
  
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    const myuser=await Reservation.create({ firstName, lastName, email, date, time, phone });
    
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
      _id: myuser.id
    });
  } catch (error) {
   
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

  
    return next(error);
  }
};


const getReservationById = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    
    if (!reservation) {
      return next(new ErrorHandler("Reservation not found.", 404));
    }

    res.json(reservation);
  } catch (error) {
    
    if (error.name === 'CastError') {
      return next(new ErrorHandler("Invalid reservation ID format.", 400));
    }

    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    
    return next(error);
  }
};


const getReservations= async(req, res, next)=>{

  const reservations= await Reservation.find();
  res.json(reservations);
  };
 

  const deleteReservation= async(req, res, next)=>{
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({message: "Reservation deleted successfully"});
  };

  const getReservationByUser = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
  
    if (!token) {
      return next(new ErrorHandler('No token provided, authorization denied', 401));
    }
  
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
      
      const user = await User.findById(decoded.userId);  
  
      if (!user) {
        return next(new ErrorHandler('User not found', 404));
      }
  
      // Attach user info to the request object
      req.user = user;
      next();
    } catch (error) {
      return next(new ErrorHandler('Invalid token', 401));
    }
  };


export default {send_reservation, getReservationById, getReservations, deleteReservation, getReservationByUser} ; // Export the functions as default exports
