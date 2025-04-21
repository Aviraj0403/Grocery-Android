import { Slide } from "react-awesome-reveal";
import appstore from "../../images/appstore-btn.svg";
import googleplay from "../../images/googleplay-btn.svg";
import iphone from "../../images/iphone-2.png";

const DownloadAppSection = () => {
  return (
    <section className="py-12 bg-green-50">
      <div className="container">
        <div className="row items-center">
          <Slide direction="left">
            <div className="col-md-6 mb-4 mb-md-0">
              <h2 className="text-2xl font-bold mb-3">Get the Shanu-Mart App</h2>
              <p className="text-sm mb-4">
                We’ll send you a link, open it on your phone to download the app.
              </p>
              <div className="flex gap-3">
                <img src={appstore} alt="appstore" className="h-12" />
                <img src={googleplay} alt="googleplay" className="h-12" />
              </div>
            </div>
          </Slide>

          <Slide direction="right">
            <div className="col-md-6 text-center">
              <img src={iphone} alt="app" className="img-fluid" />
            </div>
          </Slide>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;