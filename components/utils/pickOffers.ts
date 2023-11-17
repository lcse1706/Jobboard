export const pickOffers = (
  offers: [],
  users: any,
  sessionUser: any,
  pickOffers: string
) => {
  let userData;
  for (const user in users) {
    if (sessionUser === users[user].email) userData = users[user];
  }
  // console.log(userData);

  // Find published offers
  let userOffers: any[] = [];
  // console.log(offers);

  for (const offer in offers) {
    for (const published of userData[pickOffers]) {
      if (published === offer) userOffers.push(offers[offer]);
    }
  }

  return userOffers;
};
