import { loginIsRequiredServer } from "@/lib/auth";

import { AddOfferForm } from "../../components/AddOfferForm";

export default async function AddOffer() {
  await loginIsRequiredServer();
  return <AddOfferForm />;
}
