export default function IndexPage() {
  return (
    <div className="pb-44 h-36  w-full justify-center bg-th-background">
      <ul className="w-44 text-th-primary-dark pt-6 font-futura text-base flex flex-row justify-center text-center mx-auto">
        <li className=" mx-1.5">
          <a href="/about" className="cursor-pointer">
            About
          </a>
        </li>
        <li className=" mx-1.5">
          <a href="/team" className="cursor-pointer">
            Team
          </a>
        </li>
        <li className=" mx-1.5">
          <a href="/contact" className="cursor-pointer">
            Contact
          </a>
        </li>
      </ul>
      <ul className="w-56 text-th-primary-dark mt-3 font-futura text-base flex flex-col mx-auto">
        <li className="flex justify-center">Tetra Games LLC</li>
        <li className="flex justify-center">Terms & Conditions</li>
        <li className="flex justify-center">Privacy Policy</li>
      </ul>
    </div>
  );
}
