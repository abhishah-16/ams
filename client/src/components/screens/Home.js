import React from "react";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import NavBar from "../Navbar";
import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };
  return (
    <>
      {/* <NavBar /> */}
      <div className="card card-home">
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
              <img
                className="object-cover object-center rounded"
                alt="home-service"
                src="https://res.cloudinary.com/hhah/image/upload/v1614401480/home_eos1jk.jpg"
              />
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <h4>Auditoria</h4>
              <br />
              <h1 className="title-font sm:text-3xl text-3xl mb-4 font-medium text-gray-900">
                Quality Home Services, On Demand
              </h1>
              <p className="mb-8 leading-relaxed">
                Experianced, Hand-picked Professionals to serve you at doorstep
              </p>
              <div>
                <p className="font-thin">
                  Our professionals are well trained and have on-job expertise.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="card card-home">
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h2 className="text-xs text-blue-500 tracking-widest font-medium title-font mb-1">
                Auditoria
              </h2>
              <h1 className="sm:text-3xl text-5xl font-medium title-font mb-4 text-gray-900">
                Our Services
              </h1>
              <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
                This platform is to make our urban lives more fulfilling to
                solve our needs in a clap. They want to be the go-to platform
                helping customers to complete the projects that are important to
                their lives. It enables users to find any service professional
                like.
              </p>
            </div>
            <div className="flex flex-wrap -m-12">
              <div className="p-10 md:w-1/2">
                <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative card">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block opacity-25 absolute inset-0 rounded-2xl hoverable"
                    src="https://res.cloudinary.com/hhah/image/upload/v1614625034/carpenter_gpsztf.jpg"
                  />
                  <div className="text-center relative z-10 w-full">
                    <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                      Carpenter
                    </h2>
                    <p className="leading-relaxed">
                      Skateboard +1 mustache fixie paleo lumbersexual.
                    </p>
                    <Link
                      className="mt-3 text-blue-500 inline-flex items-center"
                      to="/usercarpenter"
                    >
                      Explore
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-10 md:w-1/2">
                <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative card">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block opacity-25 absolute inset-0 rounded-2xl hoverable"
                    src="https://res.cloudinary.com/hhah/image/upload/v1614625031/electrician_bpdibc.jpg"
                  />
                  <div className="text-center relative z-10 w-full">
                    <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                      Electrician
                    </h2>
                    <p className="leading-relaxed">
                      Skateboard +1 mustache fixie paleo lumbersexual.
                    </p>
                    <Link
                      className="mt-3 text-blue-500 inline-flex items-center "
                      to="/userelectrician"
                    >
                      Explore
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-10 md:w-1/2">
                <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative card">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block opacity-25 absolute inset-0 rounded-2xl hoverable"
                    src="https://res.cloudinary.com/hhah/image/upload/v1614625031/plumber_sr5tnu.jpg"
                  />
                  <div className="text-center relative z-10 w-full">
                    <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                      Plumber
                    </h2>
                    <p className="leading-relaxed">
                      Skateboard +1 mustache fixie paleo lumbersexual.
                    </p>
                    <Link
                      className="mt-3 text-blue-500 inline-flex items-center"
                      to="/userplumber"
                    >
                      Explore
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-10 md:w-1/2">
                <div className="flex flex-wrap w-full bg-gray-100 sm:py-24 py-16 sm:px-10 px-6 relative card">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block opacity-25 absolute inset-0 rounded-2xl hoverable"
                    src="https://res.cloudinary.com/hhah/image/upload/v1614625031/pest-control-worker-spraying-pesticide-wooden-cabinet-woman-looking-male-149401048_e6yw5x.jpg"
                  />
                  <div className="text-center relative z-10 w-full">
                    <h2 className="text-xl text-gray-900 font-medium title-font mb-2">
                      Pest Control
                    </h2>
                    <p className="leading-relaxed">
                      Skateboard +1 mustache fixie paleo lumbersexual.
                    </p>
                    <Link
                      className="mt-3 text-blue-500 inline-flex items-center"
                      to="/userpestcontrol"
                    >
                      Explore
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Home;