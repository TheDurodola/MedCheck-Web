import { Button } from "@/components/ui"; // Assuming you might use this later
import logo from "../assets/images/two-african-american-pharmacist-working-drugstore-hospital-pharmacy-african-healthcare.jpg";

export default function FirstHero() {
  return (
    <section className="bg-gray-50 min-h-100dvh w-full flex flex-col   lg:flex-row items-center justify-center px-6 lg:px-20 gap-10 py-10">
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start">
        <picture>
          <img
            src={logo}
            alt="Wholesale Medical Supplies"
            className="w-full h-auto object-contain max-h-400px lg:max-h-600px"
          />
        </picture>
      </div>

      <div className="w-full lg:w-1/2 flex  flex-col items-center lg:items-start text-center lg:text-left border-r-8">
        <p className="font-bold text-5xl text-slate-800 height-40 leading-relaxed font-sans">
          MedCheck
        </p>

        <p className="mt-4 font-medium text-slate-700 ">
          Your trusted partner in the drug industry.
        </p>
        <p className="mt-7 text-slate-600  text-5">
          Here at MedCheck, we prioritize your health and well-being with
          innovative solutions designed to ensure that you received authentic
          drugs only.
        </p>
      </div>
    </section>
  );
}
