import { Button } from "@/components/ui"; // Assuming you might use this later
import logo from "../assets/images/two-african-american-pharmacist-working-drugstore-hospital-pharmacy-african-healthcare.jpg";

export default function FirstHero() {
  return (
    <section className="bg-blue-50 min-h-100dvh w-full flex flex-col lg:flex-row items-center justify-center px-6 lg:px-20 gap-10 py-10">
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
        <picture>
          <img
            src={logo}
            alt="Wholesale Medical Supplies"
            className="w-full h-auto object-contain max-h-400px lg:max-h-600px"
          />
        </picture>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
        <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
          Medcheck
        </h1>
        <p className="mt-4 text-xl text-slate-700 font-medium">
          Your trusted partner in healthcare management.
        </p>
        <p className="mt-4 text-slate-600 leading-relaxed max-w-lg">
          Here at MedCheck, we prioritize your health and well-being with
          innovative solutions designed to streamline your medical supply chain.
        </p>
      </div>
    </section>
  );
}
