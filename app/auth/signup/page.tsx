import NavBarAuth from "@/components/UI/NavBarAuth";
import LoginForm from "@/components/VIEW/LoginForm";
import Image from "next/image";

export default function Home() {
  return (
    <NavBarAuth>
      <LoginForm />
    </NavBarAuth>
  );
}
