export const annualCalculator = (joinDate: string) => {
  const d_vacation = 15;
  const max_vacation = 25;

  const joinCompanyMonthly = Math.floor(
    (Date.now() - Number(joinDate)) / 1000 / 60 / 60 / 24 / 30,
  );

  const joinCompanyAnnual = Math.floor(
    (Date.now() - Number(joinDate)) / 1000 / 60 / 60 / 24 / 365,
  );
  if (joinCompanyMonthly === 0) {
    return 0;
  } else if (joinCompanyAnnual === 0) {
    return joinCompanyMonthly;
  } else if (joinCompanyAnnual > 0 && joinCompanyAnnual <= 2) {
    return d_vacation;
  } else if (joinCompanyAnnual > 2 && joinCompanyAnnual % 2 === 0) {
    if (d_vacation + joinCompanyAnnual / 2 >= max_vacation) {
      return max_vacation;
    } else {
      return d_vacation + joinCompanyAnnual / 2;
    }
  } else if (joinCompanyAnnual > 2 && joinCompanyAnnual % 2 !== 0) {
    return d_vacation + Math.ceil(joinCompanyAnnual / 2) - 1;
  } else {
    return 0;
  }
};
