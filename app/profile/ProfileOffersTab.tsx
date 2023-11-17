// import { getServerSession } from "next-auth";
// import { revalidateTag } from "next/cache";

// import { authConfig } from "@/lib/auth";
// import { fetchOffers } from "@/services";
// import { getUsers } from "@/services/users";

// import { ProfileOffers } from "./DisplayOffers";

// export const ProfileOffersTab = async () => {
//   const offers = await fetchOffers();
//   const users = await getUsers();
//   revalidateTag("users");
//   revalidateTag("offers");
//   // console.log(users);
//   const session = await getServerSession(authConfig);
//   const sessionUser = session?.user?.email;

//   // Find logged user
//   let userData;
//   for (const user in users) {
//     if (sessionUser === users[user].email) userData = users[user];
//   }
//   // console.log(userData);

//   // Find published offers
//   let userOffers = [];
//   // console.log(offers);

//   for (const offer in offers) {
//     for (const published of userData.offersPublished) {
//       if (published === offer) userOffers.push(offers[offer]);
//     }
//   }

//   return (
//     <ul>
//       {userOffers.map((item) => (
//         <li key={item}>
//           <ProfileOffers data={item} />
//         </li>
//       ))}
//     </ul>
//   );
// };
