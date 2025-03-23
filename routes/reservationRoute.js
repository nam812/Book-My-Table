import express from "express";
import reservation from "../controller/reservation.js";

const router = express.Router();
const {send_reservation, getReservationById, getReservations, deleteReservation, getReservationByUser}= reservation;


router.post("/send", send_reservation);

router.get("/:id", getReservationById);
router.get("/", getReservations);
router.delete("/:id", deleteReservation);
router.get("/", getReservationByUser);


export default router;