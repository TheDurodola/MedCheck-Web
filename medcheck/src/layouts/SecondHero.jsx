import { Button } from "@/components/ui"; // Assuming you might use this later
import logo from "../assets/images/two-african-american-pharmacist-working-drugstore-hospital-pharmacy-african-healthcare.jpg";

export default function SecondHero() {
  return (
    <section className="bg-blue-50 min-h-100dvh w-full flex flex-col lg:flex-col items-center justify-center px-6 lg:px-20 gap-10 py-10">
      <p className="text-xl text-gray-700 m-">
        "We have identified a threat in our society. The threat of counterfeit
        drugs in the market."
      </p>
      <p>- Durodola Abolaji Toliat</p>
    </section>
  );
}
