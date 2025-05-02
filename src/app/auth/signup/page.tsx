import { SignupForm } from "./form/SignUpForm";

export default function Page() {
  return (
    <div className="flex bg-orange-50 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <SignupForm />
      </div>
    </div>
  )
}
