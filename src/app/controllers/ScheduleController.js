import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import Appointment from '../models/Appointment';
import User from '../models/User';

class ScheduleController{
  async index(req, res){

    const provider = await User.findOne({
      where: {id: req.userId, provider: true},
    });

    if(!provider){
      return res.status(400).json({error: 'User is not a provider.'});
    }

    const { date } = req.query;
    const parseDate = parseISO(date);

    const appointment  = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(parseDate),
            endOfDay(parseDate),
          ]
        }
      },
      order: ['date'],
    });

    return res.json(appointment);
  }
}

export default new ScheduleController();