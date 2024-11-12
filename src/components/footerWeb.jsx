import Logout from "./logout";

const FooterWeb = () => {
    return (
        <div className="fixed left-0-0 top-0 p-4 w-[20%] bg-green-400 text-white">
            <div>
                <h1>UbayPix</h1>

            </div>

            <div>
                <Logout/>
            </div>
        </div>
    );
}

export default FooterWeb;
