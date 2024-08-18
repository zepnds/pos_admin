"use client";

import DefaultButton from "@/app/components/button/Default";
import InputPassword from "@/app/components/input/InputPassword";
import InputText from "@/app/components/input/InputText";
import Footer from "@/app/layout/footer";

export default function Login() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className=" w-1/2 p-6">
          <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
            <h2 className="text-2xl uppercase font-medium mb-1">Login</h2>
            <p className="text-gray-600 mb-6 text-sm">
              Welcome! So good to have you back!
            </p>
            <form>
              <p className="text-red-500"></p>
              <InputText />
              <InputPassword />
              <div className="mt-4">
                <DefaultButton title="Login" className={`mt-8`} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
