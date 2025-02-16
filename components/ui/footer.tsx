import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pb-10 pt-6 mt-auto">
      <div className="mx-auto max-w-7xl px-4">
        <p className="text-xs opacity-30 text-center">© {currentYear} Todo.easy - Michail Ozdemir</p>
      </div>
    </footer>
  );
};

export default Footer;
