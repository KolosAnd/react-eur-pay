import moment from "moment";


export const makeFees = (dataCashIn, dataLegal, dataNatural, operations) => {
    let weeklyLimits = {}; // Free weekly limit
    const fees = [];

    const roundFee = (fee) => {
        const feeInCents = fee * 100;
        const roundedFeeInCents = Math.ceil(feeInCents);
        const roundedFee = roundedFeeInCents / 100;
        return roundedFee.toFixed(2);
    }

    //If we write this check on the day of the week on the backend side,
    // then we have access to the database and we can already send some status to the frontend about the limit admissible per week to the user for a specific task, and that's how I assumed it.
    // On the frontend, I would like to see either full data from the backend or another request to check the permissible limit per week.
    function calculateSingleCommission(transaction, weeklyLimits, freeLimit, commissionRate) {
        // Calculate the start of the week for the transaction date
        const weekStart = moment(transaction.date).startOf('isoWeek').format('YYYY-MM-DD');

        // Create a unique key for the user and week to track limits
        const userWeekKey = `${transaction.user_id}_${weekStart}`;

        // Initialize the used limit for the week if it does not already exist
        if (!weeklyLimits[userWeekKey]) {
            weeklyLimits[userWeekKey] = 0;
        }

        let amount = transaction.operation.amount;
        let commission = 0;

        if (weeklyLimits[userWeekKey] < freeLimit) {
            // If the user still has a free limit available
            let freeAmount = freeLimit - weeklyLimits[userWeekKey];
            if (amount > freeAmount) {
                // Calculate commission for the amount exceeding the limit
                commission = (amount - freeAmount) * commissionRate;
            }
        } else {
            // Limit is exceeded, calculate commission for the entire amount
            commission = amount * commissionRate;
        }

        // Update the used limit for the user for this week
        weeklyLimits[userWeekKey] += amount;

        return commission;
    }



    const cashIn = (item) => {
        let cashInFee = 0;
        const fee = item?.operation.amount / 100 * dataCashIn.percents;
        if(fee > dataCashIn.max.amount) cashInFee = dataCashIn.max.amount;
         else cashInFee = fee;

         return roundFee(cashInFee);
    }


    const cashOut = (item) => {
        let cashOutFee = 0;
        let fee = 0;
        const type = item.user_type;
        switch (type) {
            case 'natural':
                cashOutFee = calculateSingleCommission(item, weeklyLimits, dataNatural.week_limit.amount,dataNatural.percents/100 );
                break;
            case 'juridical':
                fee = item?.operation.amount / 100 * dataLegal.percents;
                if(fee < dataLegal.min.amount) cashOutFee = dataLegal.min.amount;
                else cashOutFee = fee;
                break;
            default:
                console.log('Unknown type of operation for cash out');
        }
        return roundFee(cashOutFee);
    }

    operations.map((item) => {
        const type = item.type;
        switch (type) {
            case 'cash_in':
                fees.push(cashIn(item));
                break;
            case 'cash_out':
                fees.push(cashOut(item));
                break;
            default:
                console.log('Unknown type of operation');
        }
    })

    return {fees}
}
