import { Button } from "@/components/ui"; // Assuming you might use this later
import logo from "../assets/images/two-african-american-pharmacist-working-drugstore-hospital-pharmacy-african-healthcare.jpg";

export default function SecondHero() {
  return (
    <section className="bg-blue-50 min-h-100dvh w-full flex flex-col lg:flex-col items-center justify-center px-6 lg:px-20 gap-5 py-10">
      
      <p className="text-l text-gray-700 m-4 text-center gap-top-10">
        "We have identified a threat in our society. The threat of counterfeit
        drugs in the market. Many individuals have lost their lives to this menace, and many more are at risk. MedCheck is our response to this crisis. We are committed to ensuring that every drug that reaches the hands of consumers is authentic and safe. With MedCheck, we can save lives and restore trust in the pharmaceutical industry."
      </p>
      <p className="text-l text-gray-700 m-4 text-center">
        "MedCheck is not just a solution; it's a movement towards a safer and healthier future. We are dedicated to empowering individuals with the tools they need to verify the authenticity of their medications, ultimately saving lives and improving health outcomes."
      </p>
      <p>- Durodola Abolaji Toliat</p>
      
    </section>
  );
}
