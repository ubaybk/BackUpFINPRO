// components/Layout.js
const Layout = ({ children }) => {
    return (
      <div className="md:flex md:justify-center md:items-center md:flex-col">
        {children}
      </div>
    );
  };
  
  export default Layout;
  