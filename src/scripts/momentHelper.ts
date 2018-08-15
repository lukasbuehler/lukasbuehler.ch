
import * as moment from "moment";

/** DD.MM.YYYY */
export function getAge(birthdayString: string)
{
    var birthdayMoment = moment(birthdayString, 'DD.MM.YYYY');
    var nowMoment = moment();

    return nowMoment.diff(birthdayMoment, "years");
}