import validate from 'validate.js';

const topUpBalanceValidator = (payload) => {
  const constraints = {
    topUpAmount: {
      presence: true,
      numericality : {
        onlyInteger: true,
        greaterThan: 25000,
      }
    },
  };
  return validate(payload, constraints);
};

export default topUpBalanceValidator;